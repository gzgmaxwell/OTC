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

        <el-form-item label="手机号：" prop="phoneNum">
          <el-input v-model="formValidate.phoneNum"></el-input>
        </el-form-item>

       <el-form-item label="邮箱地址：" prop="emailAddress">
          <el-input v-model="formValidate.emailAddress"></el-input>
        </el-form-item>


        <el-form-item label="头像：" prop="header">

          <el-upload
                
                class="avatar-uploader"
                :action="upload_url"
                :show-file-list="false"
                accept=".jpg, .jpeg, .JPG, .JPEG, .png"
                :on-success="handleIconSuccess">
                <img v-if="formValidate.header" :src="formValidate.header" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>


        </el-form-item> 



              




        <el-form-item label="姓名：" >
          <el-input v-model="formValidate.fullName"></el-input>
        </el-form-item>        

        <el-form-item label="昵称：" prop="nickName">
          <el-input v-model="formValidate.nickName"></el-input>
        </el-form-item>        
<!--         
        <el-form-item label="组织机构：" prop="inst">

          <el-select  v-model="formValidate.inst"  placeholder="请选择组织机构" style="width: 100%;">
            <el-option  v-for="item in inst" :key="item.id" :label="item.orgName" :value="item.id"></el-option>
          </el-select>


        </el-form-item> -->

        <el-form-item label="角色：" prop="post">
          <SelectTree
            :checkedKeys.sync="formValidate.post"
            :checkStrictly="true"
            multiple
            :defaultProps="postProps"
            :nodeKey="'value'"
            :data="posts"
            :width="100"
          />
        </el-form-item>

         
<!--          
             <el-form-item label="所在县市" prop="szxs">




                  <SelectTree
                    :checkedKey.sync="formValidate.szxs"
                    :checkStrictly="true"
                    :defaultProps="orgProps"
                    :nodeKey="'value'"
                    :data="orgs"
                    :width="100"
                  />

            </el-form-item> -->

            

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
import { AreaList,orgCascade } from "@a/system";
import { UserInfo, UserSave, UserUpdate,  ResetPassword, PostCascader } from "@a/system";

export default {
  name: "Edit",
  components: { SelectTree },
  data() {
    return {
      inst:[],
      id: "",
      posts: [], //角色列表
      postProps: {
        children: "children",
        label: "label",
        value: "value"
      },
      orgs:[],
      orgProps: {
        children: "children",
        label: "label",
        value: "value"
      },
      formValidate: {
        userName: "",
        fullName: "",
        header: null,
        departmentId: [],
        roleId: [],
        post: [],
        nation: "",
        province: "",
        city: "",
        county: "",
        street: "",
        userPassword: "123456"
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
    await this.getAreaCascade();
    if (this.id) {
      this.getInfo();
    } else {
    
    }

    // this.getInst();
  },
  methods: {
    //获取地区信息
    async getAreaCascade() {
      const data  = await orgCascade();
      this.orgs=data;
     
    },
    change4(value) {
      if (value) {
        this.getAreaList({ orgParentId: value }).then(res => {
          this.areaList5 = res;
          this.formValidate.street = "";
        });
      }
    },
      handleIconSuccess(res, file) {
        this.formValidate.header = res.url;
      },
    async getInst(){
      this.inst=await SysInstList();
    },
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
      const data = await UserInfo(this.id);
      this.formValidate = data;

      // if (data.province) {
      //   this.areaList3 = await this.getAreaList({
      //     orgParentId: data.province
      //   });
      // }
      // if (data.city) {
      //   this.areaList4 = await this.getAreaList({ orgParentId: data.city });
      // }
      // if (data.county) {
      //   this.areaList5 = await this.getAreaList({ orgParentId: data.county });
      // }
    },
    //新增保存接口
    async addData() {
      await UserSave(this.formValidate);
      this.$message.success("保存成功");
      this.$router.push({
        name: "User"
      });
    },
    //编辑保存接口
    async editData() {
      await UserUpdate(this.formValidate, this.id);
      this.$message.success("修改成功");
      this.$router.push({
        name: "User"
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
    //返回
    backTo() {
      this.$router.push({
        name: "User"
      });
    },
    async comfirmpassword() {
      await ResetPassword(this.formValidate.userId);
      this.$message.success("重置成功");
    }
  }
};
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>