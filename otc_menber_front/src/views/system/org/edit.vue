<template>



<div class="edit_page">
      <div class="top_box">
      <div class="title">
        查看信息
      </div>
      <div>
        <ja-button type="primary" :click="save">
          保存
        </ja-button>
        <el-button @click="backTo()">返回</el-button>
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
     

         <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="16" >
            <el-form-item label="名称" prop="orgName">
              <el-input v-model="formValidate.orgName" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
        </el-row>


        
       <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="16" >

               <el-form-item label="上一级：" >
                <SelectTree
                  :checkedKey.sync="formValidate.orgParentId"
                  :checkStrictly="true"
                  :defaultProps="defaultProps"
                  :nodeKey="'orgId'"
                  :data="orgs"
                  :width="100"
                />
              </el-form-item>

          </el-col>	
        </el-row>


		  <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="16" >
            <el-form-item label="编号" prop="num">
              <el-input v-model="formValidate.num" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
        </el-row>

		  <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="16" >
            <el-form-item label="排序" prop="px">
              <el-input v-model="formValidate.px"  oninput="value=value.replace(/[^0-9.]/g,'')" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
        </el-row>

       


      </el-form>
    
      </div>
  </div>





</template>
<script>
import SelectTree from "@/components/tree/SelectTree.vue";


import {AreaTree,AreaSave,AreaDelete,AreaInfo,AreaUpdate} from "@a/system";
export default {
  name: "Edit",
  components: {SelectTree},
  data() {
    return {
      id: "",
      title: "",
      orgs:[],
      formValidate: {
        orgId: null,		
        orgName: null,		
      },
      breeds:[],
      defaultProps: {
        children: "children",
        label: "orgName",
        value: "orgId"
      },
      data: [],
      rules: {
        label: [
          { required: true, message: '请输入名称', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        parentId: [
          { required: true, message: '请输入父id', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        picUrl: [
          { required: true, message: '请输入图片地址', trigger: 'blur' } , {  max: 250, message: '长度最多为250', trigger: "blur" }
		],
       
        level: [
          { required: true, message: '请输入品种级别', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
      px: [{ required: true, message: "请输入排序", trigger: "blur" }],

        createName: [
          { required: true, message: '请输入创建人', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],
        updateName: [
          { required: true, message: '请输入更新人', trigger: 'blur' } , {  max: 50, message: '长度最多为50', trigger: "blur" }
		],

      },
      dialogVisible: false,
      otherType: "",
      result: []
    };
  },
  methods: {
    //获取列表
    async getOrgs() {
        const   data  = await AreaTree();
    
        this.orgs = data;
      
    },
      handleIconSuccess(res, file) {
        this.formValidate.picUrl = res.url;
      },
    //获取列表详情接口
    async getInfo(id) {
      const data = await AreaInfo(id);
      this.formValidate = data;
     
   
    },
    //新增保存接口
    async addData() {
        const  data = await AreaSave(this.formValidate);
        this.$message.success("新增成功");
        this.backTo();
     
    },
    //编辑保存接口
    async editData() {
      const  data = await AreaUpdate(this.formValidate);
        this.$message.success("修改成功");
        this.backTo();
    },

    //每页多少条，切换显示条数
    sizeChange(val) {
      this.params.size = val;
      this.List();
    },
    //当前第几页，切换页码
    changePage(val) {
      this.params.current = val;
      this.List();
    },


    //保存
    save(formName) {
      return this.$refs["formValidate"].validate().then(() => {
        return this.id ? this.editData() : this.addData();
      });
    },

    //重置
    resetForm(formName) {
      this.formValidate = {};
    },
    //返回
    backTo() {
      this.$router.push({
        name: "Org"
      });
    }
  },
 async mounted() {
    //拿到从列表页传过来的ID
    this.id = this.$route.query.id;
   await this.getOrgs();
    if (this.id) {
      this.getInfo(this.id);
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
  .el-pagination{
    padding-top: 15px;
    text-align: right;
  }
</style>