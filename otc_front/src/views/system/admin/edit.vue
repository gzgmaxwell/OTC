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
        <el-form-item label="账号：" prop="userName">
          <el-input v-model="formValidate.userName"></el-input>
        </el-form-item>

        <el-form-item label="姓名：" prop="fullName">
          <el-input v-model="formValidate.fullName"></el-input>
        </el-form-item>

        <el-form-item label="角色：" prop="post">
          <SelectTree
            :checkedKeys.sync="formValidate.post"
            :checkStrictly="false"
            multiple
            :defaultProps="postProps"
            :nodeKey="'value'"
            :data="posts"
            :width="100"
          />
        </el-form-item>

        <el-form-item label="区域：">
          <el-select
            v-model="formValidate.province"
            placeholder="请选择省"
            @change="change2"
            class="mr-5"
          >
            <el-option
              v-for="item in areaList2"
              :key="item.orgId"
              :label="item.orgName"
              :value="item.orgId"
            ></el-option>
          </el-select>
          <el-select
            v-model="formValidate.city"
            placeholder="请选择市"
            @change="change3"
            class="mr-5"
          >
            <el-option
              v-for="item in areaList3"
              :key="item.orgId"
              :label="item.orgName"
              :value="item.orgId"
            ></el-option>
          </el-select>
          <el-select v-model="formValidate.county"
          
            @change="change4"
             placeholder="请选择区">
            <el-option
              v-for="item in areaList4"
              :key="item.orgId"
              :label="item.orgName"
              :value="item.orgId"
            ></el-option>
          </el-select>
          <el-select v-model="formValidate.street" placeholder="请选择街道">
            <el-option
              v-for="item in areaList5"
              :key="item.orgId"
              :label="item.orgName"
              :value="item.orgId"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="id" label="密码：">
          <el-button type="primary" @click="comfirmpassword">
            重置密码
          </el-button>
        </el-form-item>
        <el-form-item v-else label="密码：" prop="userPassword">
          <el-input
            v-model="formValidate.userPassword"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import SelectTree from "@/components/tree/SelectTree.vue";
import { AreaList } from "@a/system";
import {
  AdminInfo,
  AdminSave,
  AdminUpdate,
  ResetPassword,
  PostCascader
} from "@a/system";

export default {
  name: "Edit",
  components: { SelectTree },
  data() {
    return {
      id: "",
      posts: [], //角色列表
      postProps: {
        children: "children",
        label: "label",
        value: "value"
      },
      formValidate: {
        userName: "",
        fullName: "",
        departmentId: [],
        roleId: [],
        post: [],
        nation: "",
        province: "",
        city: "",
        county: "",
        street: ""
      },
      areaList2: [], //地区信息
      areaList3: [], //地区信息
      areaList4: [], //地区信息
      areaList5: [], //地区信息
      rules: {
        userName: [{ required: true, message: "请输入账号", trigger: "blur" }],
        post: [{ required: true, message: "请选择角色", trigger: "blur" }],
        fullName: [
          { required: true, message: "请输入管理员名称", trigger: "blur" }
        ],
        roleId: [{ required: true, message: "请输入角色ID", trigger: "change" }]
      }
    };
  },
  async mounted() {
    this.id = this.$route.query.id;
    await this.getPosts();
    if (this.id) {
      this.getInfo();
    } else {
      this.areaList2 = await this.getAreaList();
    }
  },
  methods: {
    //获取角色Cascader
    async getPosts() {
      this.posts = await PostCascader();
    },
    //获取地区信息
    getAreaList(data = { orgLevel: 1 }) {
      return AreaList(data);
    },
    //获取列表详情接口
    async getInfo() {
      const data = await AdminInfo(this.id);
      this.formValidate = data;
      if (data.nation) {
        this.areaList2 = await this.getAreaList({ orgParentId: data.nation });
      } else {
        this.areaList2 = await this.getAreaList();
      }
      if (data.province) {
        this.areaList3 = await this.getAreaList({
          orgParentId: data.province
        });
      }
      if (data.city) {
        this.areaList4 = await this.getAreaList({ orgParentId: data.city });
      }
      if (data.county) {
        this.areaList5 = await this.getAreaList({ orgParentId: data.county });
      }
    },
    //新增保存接口
    async addData() {
      await AdminSave(this.formValidate);
      this.$message.success("保存成功");
      this.$router.push({
        name: "Admin"
      });
    },
    //编辑保存接口
    async editData() {
      await AdminUpdate(this.formValidate, this.id);
      this.$message.success("修改成功");
      this.$router.push({
        name: "Admin"
      });
    },

    //保存
    save() {
      return this.$refs["formValidate"].validate().then(() => {
        return this.id ? this.editData() : this.addData();
      });
    },

    change2(value) {
      if (value) {
        this.getAreaList({ orgParentId: value }).then(res => {
          this.areaList3 = res;
          this.formValidate.city = "";
          this.formValidate.county = "";
        });
      }
    },
    change3(value) {
      if (value) {
        this.getAreaList({ orgParentId: value }).then(res => {
          this.areaList4 = res;
          this.formValidate.county = "";
        });
      }
    },
    change4(value) {
      if (value) {
        this.getAreaList({ orgParentId: value }).then(res => {
          this.areaList5 = res;
          this.formValidate.street = "";
        });
      }
    },
    //返回
    backTo() {
      this.$router.push({
        name: "Admin"
      });
    },
    async comfirmpassword() {
      await ResetPassword(this.formValidate.userId);
      this.$message.success("重置成功");
    }
  }
};
</script>
