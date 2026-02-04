<template>
  <div style="padding: 38px 50px 48px 50px;height:100%">
    <div class="leftClass">
      <el-tree
        :data="data"
        :props="defaultProps"
        node-key="id"
        :default-expanded-keys="expandIds"
        :expand-on-click-node="false"
        :render-content="renderContent"
      ></el-tree>
      <!-- default-expand-all -->
    </div>
    <div class="rightClass">
      <el-form
        v-if="Object.keys(formValidate).length != 0"
        :model="formValidate"
        :rules="rules"
        ref="formValidate"
        style="position: fixed;
        top: 10%;
        right:0;
        width: 40%;"
        label-width="150px"
      >
        <el-form-item label="区划名称：" prop="orgName" style="width:70%">
          <el-input
            v-model="formValidate.orgName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="区划简称：" prop="orgShortName" style="width:70%">
          <el-input
            v-model="formValidate.orgShortName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="区划层级：" style="width:70%">
          <el-select
            v-model="formValidate.orgLevel"
            placeholder="请选择类型"
            style="width:100%;"
          >
            <el-option
              v-for="item in dics.qhcj"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="父区划：" style="width:70%">
 

              <SelectTree
                  :checkedKey.sync="formValidate.orgParentId"
                  :checkStrictly="true"
                  :defaultProps="orgProps"
                  :nodeKey="'id'"
                  :data="data"
                  :width="100"
                />

        </el-form-item>
        <el-form-item style="width:70%">
          <el-button type="primary" @click="save('formValidate')"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
      <el-dialog
        title="选择目录"
        custom-class="dialogStyle"
        :visible.sync="dialogVisible"
        :modal-append-to-body="false"
        width="30%"
      >
        <el-tree
          :data="treeData"
          :props="defaultProps"
          @node-click="handleNodeClick"
        ></el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import SelectTree from "@/components/tree/SelectTree.vue";
import {AreaTree,AreaSave,AreaDelete,AreaInfo,AreaUpdate} from "@a/system";

let id = 1000;

export default {
  name: "org",
  components: { SelectTree },
  data() {
    return {
      // 数据默认字段
      orgProps: {
        parent: "parentId", // 父级唯一标识
        value: "id", // 唯一标识
        label: "label", // 标签显示
        children: "children" // 子级
      },
      data: [],
      treeData: [],
      list: { "0": "国家", "1": "省", "2": "市", "3": "区", "4": "街道" },
      expandIds: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      selectNode: null,
      selectData: null,
      // type:type,
      title: "",
      params: {},
      formValidate: {},
      defaultProps: {
        children: "children",
        label: "label"
      },
      treeLabel: "",
      treeId: "",
      rules: {},
      dialogVisible: false,
      otherType: ""
    };
  },
  created() {},
  methods: {
    async tree(id) {
      //创建loading对象开始遮罩
	    // var rLoading = loading.open();
      let  data  = await AreaTree();
      // loading.close(rLoading);
      this.data = data;
      if (id) {
        this.expandIds = [id];
      }

      rLoading.close();
    },
    async append(node, values) {
      this.selectNode = node;

      var params = {
        orgParentId: values.id,
        orgName: "未填写"
      };
      let  data  = await AreaSave(params);


      const newChild = {
        id: data.orgId,
        orgParentId: data.orgParentId,
        parentName: data.parentName,
        label: data.orgName,
        children: []
      };

      if(isEmpty(values.children)){
        values.children=[];
      }

      values.children.push(newChild);
      this.formValidate = data;
      if (data.orgId) {
        this.expandIds = [data.orgId];
      }
    },

    edit(node, data) {
      this.selectNode = node;
      this.getInfo(data.id);
    },
    remove(node, data) {
      this.selectNode = node;
      this.selectData = data;
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var totalArr = [];
          totalArr.push(data.id);
          this.delData(totalArr);
        })
        .catch(() => {});
    },
    deleteNode() {
      const parent = this.selectNode.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === this.selectData.id);
      children.splice(index, 1);
    },
    //删除接口
    async delData(array) {
     await AreaDelete(array);

      this.deleteNode();

      this.$message.success("删除成功");
      this.resetForm();
    },
    renderContent(h, { node, data, store }) {
      return (
        <span
          on-dblclick={() => this.edit(node, data)}
          style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;"
        >
          <span>
            <span>{node.label}</span>
          </span>
          <span>
            <el-button
              style="font-size: 12px;"
              type="text"
              on-click={() => this.append(node, data)}
            >
              添加
            </el-button>
            <el-button
              style="font-size: 12px;"
              type="text"
              on-click={() => this.edit(node, data)}
            >
              编辑
            </el-button>
            <el-button
              style="font-size: 12px;"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              删除
            </el-button>
          </span>
        </span>
      );
    },
    //获取列表详情接口
    async getInfo(id) {
      let data  = await AreaInfo(id);
      this.formValidate = data;
    },
    //获取上级菜单接口
    async parentDirectory(params) {
      let data = await AreaTree();
      this.treeData = data;
    },
    //新增保存接口
    async addData(params) {
      let data  = await AreaSave(params);

      this.$message.success("添加成功");
      this.tree(data.orgId);
      this.resetForm();
    },
    //编辑保存接口
    async editData(params, id) {
      let data  = await AreaUpdate(params, id);
      this.$message.success("修改成功");
      this.tree(data.orgId);
      this.resetForm();
    },

    //保存
    save(formName) {
      //验证表单必填
      this.$refs[formName].validate(valid => {
        if (!valid) {
          this.$message.error("请检查表单红字段!");
          return;
        }
        if (this.formValidate.orgId) {
          this.editData(this.formValidate, this.formValidate.orgId);
        } else {
          this.addData(this.formValidate);
        }
      });
    },
    //打开上级菜单弹窗
    openDailog() {
      this.parentDirectory();
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
      this.formValidate.orgParentId = this.treeId;
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
  mounted() {
    this.tree();
    this.title = "新增信息";
  }
};
</script>

<style lang="scss" scoped>
.leftClass {
  width: 50%;
  float: left;    
  overflow-y: auto;
    max-height: 100%;
}
.rightClass {
  width: 50%;
  float: left;
  text-align: center;
}
</style>
