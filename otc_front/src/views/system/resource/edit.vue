<template>
  <div class="edit_page">


    <div class="top_box">
      <div class="title">
        {{ title }}
      </div>
      <div>
        <el-button @click="save('formValidate')">保存</el-button>
        <el-button @click="backTo('formValidate')">返回</el-button>
      </div>
    </div>
    <div class="edit_content">
      <el-form
        class="u_form"
        :model="formValidate"
        :rules="rules"
        ref="formValidate"
        label-width="100px"
      >
       
       
              <el-form-item label="类型：" prop="resType">
                <el-select
                  v-model="formValidate.resType"
                  placeholder="请选择类型"
                >
                  <el-option
                    v-for="item in dics.resType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="标题：" prop="title">
                <el-input v-model="formValidate.title"></el-input>
              </el-form-item>
              <el-form-item label="资源名称(English)：" v-show="formValidate.resType == '3'">
                <el-input v-model="formValidate.resName"></el-input>
              </el-form-item>
              <el-form-item label="上一级：" prop="parentId" v-show="formValidate.resType != '4'">
                <SelectTree
                  :checkedKey.sync="formValidate.parentId"
                  :checkStrictly="true"
                  :defaultProps="resourceProps"
                  :nodeKey="'id'"
                  :data="menus"
                  :width="100"
                />
              </el-form-item>

              <el-form-item label="资源标识：" prop="resCode" v-show="formValidate.resType == '2'">
                <el-input v-model="formValidate.resCode"></el-input>
              </el-form-item>

              <el-form-item label="URL：" prop="resUrl" v-show="formValidate.resType == '3'">
                <el-input v-model="formValidate.resUrl"></el-input>
              </el-form-item>

              <el-form-item label="图标：" prop="icon"  v-show="formValidate.resType == '3'">
                <el-input v-model="formValidate.icon"></el-input>
              </el-form-item>

              <el-form-item label="组件：" prop="component" v-show="formValidate.resType == '3'">
                <el-input v-model="formValidate.component"></el-input>
              </el-form-item>

              <el-form-item label="是否显示菜单：" v-show="formValidate.resType == '3'">
                <el-radio-group v-model="formValidate.showMenu">
                  <el-radio :label="true">是</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="是否基础权限：" v-show="formValidate.resType == '2'">
                <el-radio-group v-model="formValidate.isBasicPermissions">
                  <el-radio :label="true">是</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>
         
              <el-form-item label="重定向路径：" prop="redirect" v-show="formValidate.resType == '3'">
                <el-input v-model="formValidate.redirect"></el-input>
              </el-form-item>

              <el-form-item label="排序号：" prop="number" v-show="formValidate.resType == '3'">
                <el-input v-model="formValidate.number"></el-input>
              </el-form-item>



      </el-form>
    </div>




  </div>
</template>
<script>
import SelectTree from "@/components/tree/SelectTree.vue";

import { ResourceAllTree , ResourceInfo , ResourceUpdate , ResourceAdd} from "@a/system";

export default {
  name: "Edit",
  components: { SelectTree },
  data() {
    return {
      pk: "",
      title: "",
      params: {},
      formValidate: {
        isBasicPermissions: false,
        showMenu: true,
        resType: "1"
      },
      menus: [], //上级菜单数据
      defaultProps: {
        children: "children",
        label: "label"
      },
      resourceProps: {
        children: "children",
        label: "label",
        value: "id"
      },

      treeLabel: "",
      treeId: "",
      rules: {
        resName: [
          { required: true, message: "请输入模型名称", trigger: "blur" }
        ],
        resType: [{ required: true, message: "请输入名称", trigger: "blur" }],
        appName: [{ required: true, message: "请输入排序", trigger: "blur" }]
      },
      dialogVisible: false,
      otherType: ""
    };
  },
  methods: {
    async ResourceAllTree() {
      let data  = await ResourceAllTree();
      this.menus = data;
    },
    //获取列表详情接口
    async getInfo(params, id) {
      let  data  = await ResourceInfo(id);
        this.formValidate = data;
        this.otherType = this.formValidate.resType;
    },
    //获取上级菜单接口
    async parentDirectory(params) {
      let data  = await ResourceAllTree(params);
        this.data = data;
    },
    //新增保存接口
    async addData(params) {
       await ResourceAdd(params);
        this.$message.success("新增成功");
        this.resetForm();
        // 路由跳转至首页
        this.$router.push({
          name: "Resource"
        });
    },
    //编辑保存接口
    async editData(params, id) {
      if (!Number(this.formValidate.resType)) {
        this.formValidate.resType = this.otherType;
      }
       await ResourceUpdate(params,id);
        this.$message.success("修改成功");
        this.resetForm();
        // 路由跳转至首页
        this.$router.push({
          name: "Resource"
        });
    },
    //保存
    save(formName) {
      //验证表单必填
      this.$refs[formName].validate(valid => {
        if (!valid) {
          this.$message.error("请检查表单红字段!");
          return;
        }
        if (this.pk) {
          this.editData(this.formValidate, this.pk);
        } else {
          this.addData(this.formValidate);
        }
      });
    },
    //打开上级菜单弹窗
    openDailog() {
      if (this.formValidate.resType == 1 || this.formValidate.resType == 2) {
        this.parentDirectory({ resType: 1 });
      } else {
        this.parentDirectory({ resType: this.formValidate.resType });
      }
      this.dialogVisible = true;
    },
    //树选中数据
    handleNodeClick(data) {
      this.treeLabel = data.label;
      this.treeId = data.id;
    },
    //确定选中的上级菜单
    submit() {
      this.dialogVisible = false;
      this.formValidate.parentName = this.treeLabel;
      this.formValidate.parentId = this.treeId;
    },

    //重置
    resetForm(formName) {
      this.formValidate = {};
    },
    //返回
    backTo() {
      this.$router.push({
        name: "Resource"
      });
    }
  },
  async mounted() {
    await this.ResourceAllTree();
    //拿到从列表页传过来的ID
    this.pk = this.$route.query.id;
    if (!this.pk) {
      this.title = "新增信息";
    } else {
      this.title = "编辑信息";
      this.getInfo(this.params, this.pk);
    }
  }
};
</script>
