<template>
  <div class="page" style="padding:20px;">
    <el-tree
      :data="data"
      node-key="id"
      :expand-on-click-node="false"
      @node-contextmenu="rightClick"
      :highlight-current="true"
      @node-click="handleNodeClick"
    ></el-tree>
    <div v-show="menuVisible">
      <ul id="menu" class="menu">
        <li class="menu__item" @click="addCard">增加子节点</li>
        <li class="menu__item" @click="editCard">修改当前节点</li>
        <li class="menu__item" @click="deleteCard">删除当前节点</li>
      </ul>
    </div>
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      :modal-append-to-body="false"
      :before-close="handleClose"
      width="30%"
      top="25vh"
    >
      <el-form
        :model="formValidate"
        label-width="100px"
        ref="formValidate"
        :rules="rules"
      >
        <el-form-item label="区划名称：" prop="orgName">
          <el-input
            v-model="formValidate.orgName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="区划简称：" prop="orgShortName">
          <el-input
            v-model="formValidate.orgShortName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="区划层级：" prop="orgId">
          <el-select
            v-model="formValidate.orgLevel"
            placeholder="请选择类型"
            style="width:100%;"
          >
            <el-option
              v-for="item in dics.list"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="父区划：" prop="orgParentName">
          <el-input
            v-model="formValidate.orgParentName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="save('formValidate')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      params: {},
      parentLabel: "",
      label: "",
      id: "",
      defaultProps: {
        children: "children",
        label: "label"
      },
      menuVisible: false,
      dialogFormVisible: false,
      title: "",
      formValidate: {
        orgName: "",
        orgShortName: "",
        orgId: "",
        orgParentName: "",
        orgLevel: ""
      },
      isEdit: false,
      rules: {
        orgName: [
          { required: true, message: "请输入上级部门名称", trigger: "blur" }
        ],
        orgShortName: [
          { required: true, message: "请输入部门名称", trigger: "blur" }
        ]
      },
      list: { 0: "国家", 1: "省", 2: "市", 3: "区" }
    };
  },
  mounted() {
    this.areaTree();
  },
  methods: {
    //获取地区树接口
    async areaTree() {
      let { code, data } = await this.$ajax.systemApi.areaTree();
      this.data = data;
    },
    //获取地区详情接口
    async getInfo(id) {
      let { code, data } = await this.$ajax.systemApi.areaInfo(id);
      if (code == 200) {
        this.formValidate = data;
        this.formValidate.orgLevel = this.list[this.formValidate.orgLevel];
      }
    },
    //新增保存接口
    async addData(params) {
      let { code, data, msg } = await this.$ajax.systemApi.areaSave(params);
      this.$message.success(msg);
      this.areaTree();
      this.closeDialog();
    },
    //编辑保存接口
    async editData(params, id) {
      let { code, data, msg } = await this.$ajax.systemApi.areaUpdate(
        params,
        id
      );
      if (code == 200) {
        this.$message.success(msg);
        this.areaTree();
        this.closeDialog();
      } else {
        this.$message.error(msg);
      }
    },
    //删除接口
    async delData(array) {
      let { code, data, msg } = await this.$ajax.systemApi.areaDelete(array);
      if (code == 200) {
        this.$message.success("删除成功");
        this.areaTree();
      } else {
        this.$message.error(msg);
      }
    },
    rightClick(MouseEvent, object, Node, element) {
      this.id = Node.key;
      this.label = Node.label;
      this.menuVisible = false; // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
      this.menuVisible = true; // 显示模态窗口，跳出自定义菜单栏
      var menu = document.querySelector("#menu");
      menu.style.left = MouseEvent.clientX - 170 + "px";
      document.addEventListener("click", this.foo); // 给整个document添加监听鼠标事件，点击任何位置执行foo方法
      menu.style.top = MouseEvent.clientY - 60 + "px";
    },
    foo() {
      // 取消鼠标监听事件 菜单栏
      this.menuVisible = false;
      document.removeEventListener("click", this.foo);
    },
    addCard() {
      this.dialogFormVisible = true;
      this.title = "新建";
      this.isEdit = false;
      this.formValidate.orgParentName = this.label;
    },
    editCard() {
      this.dialogFormVisible = true;
      this.title = "编辑";
      this.isEdit = true;
      this.getInfo(this.params, this.id);
    },
    deleteCard() {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var arr = [];
          arr.push(this.id);
          this.delData(arr);
        })
        .catch(() => {});
    },
    handleNodeClick() {},
    //关闭弹窗
    closeDialog() {
      this.dialogFormVisible = false;
      //清空弹框数据
      this.resetForm("formValidate");
    },
    //重置表单
    resetForm(formName) {
      this.formValidate = {};
      this.$refs[formName].resetFields();
    },
    //弹框关闭
    handleClose(done) {
      this.resetForm("formValidate");
      done();
    },
    //保存
    save(formName) {
      //验证表单必填
      this.$refs[formName].validate(valid => {
        if (!valid) {
          this.$message.error("请检查表单红字段!");
          return;
        }
        if (this.isEdit) {
          this.editData(this.formValidate, this.id);
        } else {
          this.addData(this.formValidate);
        }
      });
    }
  }
};
</script>
