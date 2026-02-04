<template>
  <div class="edit_page">
    <div class="top_box">
      <div class="title">
        用户信息
      </div>
      <div>
     
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
          <el-input v-model="formValidate.userName" disabled  ></el-input>
        </el-form-item>

        <el-form-item label="手机号：" prop="phoneNum">
          <el-input v-model="formValidate.phoneNum" disabled  ></el-input>
        </el-form-item>

       <el-form-item label="邮箱地址：" prop="emailAddress">
          <el-input v-model="formValidate.emailAddress" disabled  ></el-input>
        </el-form-item>


        <el-form-item label="头像：" prop="header">

          <el-upload
                 disabled  
                class="avatar-uploader"
                :action="upload_url"
                :show-file-list="false"
                accept=".jpg, .jpeg, .JPG, .JPEG, .png"
                :on-success="handleIconSuccess">
                <img v-if="formValidate.header" :src="formValidate.header" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>


        </el-form-item> 



              




        <el-form-item label="姓名：" prop="fullName">
          <el-input v-model="formValidate.fullName" disabled  ></el-input>
        </el-form-item>        

        <el-form-item label="昵称：" prop="nickName">
          <el-input v-model="formValidate.nickName" disabled  ></el-input>
        </el-form-item>        
<!--         
        <el-form-item label="组织机构：" prop="inst">

          <el-select  v-model="formValidate.inst"  placeholder="请选择组织机构" style="width: 100%;">
            <el-option  v-for="item in inst" :key="item.id" :label="item.orgName" :value="item.id"></el-option>
          </el-select>


        </el-form-item> -->

        <!-- <el-form-item      label="角色：" prop="post">
          <SelectTree
            :checkedKeys.sync="formValidate.post"
            :checkStrictly="true"
            multiple
            :defaultProps="postProps"
            :nodeKey="'value'"
            :data="posts"
            :width="100"
          />
        </el-form-item> -->


       <el-form-item label="邀请码：" prop="memberId">
          <el-input disabled v-model="formValidate.memberId"></el-input>
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

            

        <!-- <el-form-item label="密码：">
          <el-button type="primary" @click="comfirmpassword">
            重置密码
          </el-button>
        </el-form-item> -->

      </el-form>
    </div>
  </div>
</template>
<script>
import SelectTree from "@/components/tree/SelectTree.vue";
import { AreaList,orgCascade } from "@a/system";
import { MySellUserInfo, UserSave, UserUpdate,  ResetPassword, PostCascader } from "@a/system";

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
    await this.getPosts();
    await this.getAreaCascade();
      this.getInfo();


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
      const data = await MySellUserInfo();
      this.formValidate = data;

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