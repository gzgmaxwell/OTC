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
          <el-col :span="20" >
            <el-form-item label="栏目" prop="columnId">
              <!-- <el-input v-model="formValidate.columnId" style="width: 100%;"></el-input> -->
<!-- 
           <el-select style="width: 100%;" v-model="formValidate.columnId"  placeholder="请选择栏目" >
            <el-option   v-for="item in column" :key="item.id" :label="item.columnName" :value="item.id"></el-option>
          </el-select> -->

             <SelectTree
                  :checkedKey.sync="formValidate.columnId"
                  :checkStrictly="true"
                  :defaultProps="defaultProps"
                  :nodeKey="'id'"
                  :data="columnNameList"
                  :width="100"
                />




            </el-form-item>
          </el-col>	
        </el-row>

        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
       
          <el-col :span="20" >
            <el-form-item label="标题" prop="title">
              <el-input v-model="formValidate.title" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
        </el-row>

		
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="20" >
            <el-form-item label="内容" prop="content">
              <!-- <el-input v-model="formValidate.content" style="width: 100%;"></el-input> -->

              <editor ref="ntiContent" @change="catchData" />

            </el-form-item>
          </el-col>	
          
        </el-row>


            <el-row :gutter="20" type="flex" class="row-bg" justify="center">

          <el-col :span="20" >
            <el-form-item label="附件">

              <el-upload
                class="upload-demo"
                :action="upload_url"
                :on-preview="handlePreview"
                :on-success="handleFjSuccess"
                  :on-remove="handleRemove"
                multiple
                :file-list="formValidate.fj">
                <el-button size="small"  type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">不超过50Mb</div>
              </el-upload>


            </el-form-item>
          </el-col>	
        </el-row>

       <el-row :gutter="20" type="flex" class="row-bg" justify="center">
       
          <el-col :span="20" >
            <el-form-item label="来源" prop="source">
              <el-input v-model="formValidate.source" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
        </el-row>

        

      </el-form>
      </div>
  </div>





</template>
<script>
import {SysColumnContentInfo ,SysColumnContentSave ,SysColumnContentUpdate,SysColumnList,SysColumnTree} from "@a/column";

import {DeletesByUrl} from "@a/system";
import SelectTree from "@/components/tree/SelectTree.vue";

import editor from "@/components/editor/index.vue";
export default {
  name: "Edit",
  components: {editor,SelectTree},
  data() {
    return {
      column:[],
      id: "",
      columnNameList:[ ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      title: "",
      params: {},
      formValidate: {
        columnId: null,		
        title: null,		
        fj: [],		
        content: null,		
        createBy: null,		
        createTime: null,		
        updateBy: null,		
        updateTime: null		
      },
      data: [],
      rules: {
        columnId: [
          { required: true, message: '请输入栏目名称', trigger: 'blur' },{  max: 50, message: "最多50位", trigger: "blur" }
		],
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },{  max: 50, message: "最多50位", trigger: "blur" }
		],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' },{  max: 200000, message: "最多200000位", trigger: "blur" }
		],

      },
      dialogVisible: false,
      otherType: ""
    };
  },
  methods: { 
      handleFjSuccess(res, file) {
        this.formValidate.fj.push(res);
      },
    beforeJdpfbUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 50;
 
        if (!isLt2M) {
          this.$message.error('上传文件大小不能超过 50MB!');
        }
        return isLt2M
      },
    async  handleRemove(res, fileList) {
       
         this.formValidate.fj.splice(this.formValidate.fj.indexOf(res),1);
        // await  DeletesByUrl([res.url]);
        this.$message.success("删除成功");
      },
 

      handlePreview(file) {
        if(file.response){
            if(file.response.url){

                download(file.response.url);

            }
        }
        if(file.url){
                download(file.url);
        }

      }, 
    async getClumnTree(){
          this.columnNameList= await SysColumnTree();
    },
    async getColumn(){
     this.column = await SysColumnList();
    },
    catchData(content) {
      this.formValidate.content = content;
    },
    //获取列表详情接口
    async getInfo(id) {
      
      const  data = await SysColumnContentInfo(id);
  
        this.formValidate = data;
        if (data.content) {
          this.$refs.ntiContent.setHtml(data.content);
        }

   
    },
    //新增保存接口
    async addData() {
        const  data = await SysColumnContentSave(this.formValidate);
        this.$message.success("新增成功");
        this.resetForm();
        this.backTo();
     
    },
    //编辑保存接口
    async editData() {
        const  data = await SysColumnContentUpdate(this.formValidate);
        this.$message.success("修改成功");
        this.resetForm();
        this.backTo();
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
        name: "SysColumnContent"
      });
    }
  },
  mounted() {
    
    this.getColumn();
    
    this.getClumnTree();
    //拿到从列表页传过来的ID
    this.id = this.$route.query.id;

    if (this.id) {
      this.getInfo(this.id);
    }
    this.getColumn();
  }
};
</script>
<style scoped>
.el-select-dropdown {
  z-index: 120010;
}
</style>