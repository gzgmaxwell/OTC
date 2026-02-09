<template>
  <div class="edit_page">
    <div class="top_box">
      <div class="title">
        {{ id ? "编辑信息" : "新增信息" }}
      </div>
      <div>
        <ja-button type="primary" :click="save">
          保存
        </ja-button>
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
        <el-form-item label="角色名称" prop="postName">
          <el-input
            v-model="formValidate.postName"
            style="width: 100%;"
          ></el-input>
        </el-form-item>

        <!-- <el-form-item label="部门">
          <SelectTree
            :checkedKey.sync="formValidate.departmentId"
            :checkStrictly="true"
            :defaultProps="departmentProps"
            :nodeKey="'value'"
            :data="departments"
            :width="100"
          />
        </el-form-item> -->

        <!-- <el-form-item label="上级角色" prop="parent">
          <SelectTree
            :checkedKey.sync="formValidate.parent"
            :checkStrictly="true"
            :defaultProps="postProps"
            :nodeKey="'value'"
            :data="posts"
            :width="100"
          />
        </el-form-item> -->

        <el-form-item label="角色职责" prop="postResp">
          <el-input
            v-model="formValidate.postResp"
            style="width: 100%;"
          ></el-input>
        </el-form-item>

        <el-form-item label="工作内容" prop="workContent">
          <el-input
            v-model="formValidate.workContent"
            style="width: 100%;"
          ></el-input>
        </el-form-item>

        <el-form-item label="数据权限" prop="selectType">
          <el-select
            v-model="formValidate.selectType"
            placeholder="请选择数据权限"
            style="width: 100%"
          >
            <el-option
              v-for="item in dics.dataSelectType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="角色权限">
          <el-tree
            :data="ress"
            :props="resProps"
            ref="postsTree"
            :default-checked-keys="formValidate.ress"
            show-checkbox
            :checkStrictly="true"
            node-key="id"
            :expand-on-click-node="false"
            @check="handleCheck"
          >
            <span class="custom-tree-node" slot-scope="{ node }">
              <span>{{ node.label }}</span>
            </span>
          </el-tree>
        </el-form-item>

        <el-form-item label="首页">
          <SelectTree
            :checkedKey.sync="formValidate.homePage"
            :checkStrictly="true"
            :defaultProps="menuProps"
            :nodeKey="'id'"
            :data="menus"
            :width="100"
          />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import SelectTree from "@/components/tree/SelectTree.vue";
import {
  GetAllMenu,
  ResourceAllTree,
  DepartmentCascader,
  PostCascader,
  PostSave,
  PostUpdate,
  PostInfo
} from "@a/system";

export default {
  name: "Edit",
  components: { SelectTree },
  data() {
    return {
      id: "",
      menuProps: {
        children: "children",
        label: "label",
        value: "id"
      },
      resProps: {
        children: "children",
        label: "label",
        value: "id"
      },
      postProps: {
        children: "children",
        label: "label",
        value: "value"
      },
      departmentProps: {
        parent: "parentValue", // 父级唯一标识
        value: "value", // 唯一标识
        label: "label", // 标签显示
        children: "children" // 子级
      },
      formValidate: {
        postResp: null,
        workContent: null,
        selectType: null,
        ress: []
      },
      departments: [], //部门列表
      posts: [], //角色列表
      menus: [], //菜单列表
      ress: [], // 权限列表
      rules: {
        postName: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ],
        selectType: [
          { required: true, message: "请选择数据权限", trigger: "blur" }
        ],
        appName: [
          { required: true, message: "请输入所属项目", trigger: "blur" }
        ]
      }
    };
  },
  async mounted() {
    this.id = this.$route.query.id;
    const dataList = await Promise.all([
      GetAllMenu(), // 所有菜单
      ResourceAllTree(), // 所有权限
      DepartmentCascader(), // 部门
      PostCascader() // 角色
    ]);
    const fields = ["menus", "ress", "departments", "posts"];
    dataList.map((item, index) => {
      this[fields[index]] = item;
    });
    if (this.id) {
      this.getInfo();
    }
  },
  methods: {
    //获取列表详情接口
    async getInfo() {
      const data = await PostInfo(this.id);
      this.formValidate = data;
    },
    //新增保存接口
    async addData() {
      this.formValidate.ress=this.$refs.postsTree.getCheckedKeys();
      await PostSave(this.formValidate);
      this.$message.success("保存成功");
      this.$router.push({
        name: "Post"
      });
    },
    //编辑保存接口
    async editData() {
      this.formValidate.ress=this.$refs.postsTree.getCheckedKeys();
      await PostUpdate(this.formValidate, this.id);
      this.$message.success("修改成功");
      this.$router.push({
        name: "Post"
      });
    },
    //保存
    save() {
      return this.$refs["formValidate"].validate().then(() => {
        return this.id ? this.editData() : this.addData();
      });
    },
    //返回
    backTo() {
      this.$router.push({ name: "Post" });
    },
    getChildNodeIds(node) {
      var ids = [];
      ids.push(node.data.id);
      var nodes = node.childNodes;
      if (nodes.length > 0) {
        for (let index = 0; index < nodes.length; index++) {
          const item = nodes[index];
          ids.push(item.data.id);
          if (item.childNodes.length > 0) {
            ids = ids.concat(this.getChildNodeIds(item));
          }
        }
      }
      return ids;
    },
    handleCheck(data) {
      let node = this.$refs.postsTree.getNode(data);
      var keys = this.getChildNodeIds(node);
      keys.forEach(id => {
        this.$refs.postsTree.setChecked(id, node.checked, true);
      });
    }
  }
};
</script>
