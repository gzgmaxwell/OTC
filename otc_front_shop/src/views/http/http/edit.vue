<template>



<div class="edit_page">
      <div class="top_box">
      <div class="title">
        {{ this.id ? "编辑信息" : "新增信息" }}
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
            <el-form-item label="请求名称" prop="name">
              <el-input v-model="formValidate.name" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
        </el-row>

                  <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="20" >
            <el-form-item label="地址" prop="url">
              <el-input v-model="formValidate.url" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
        </el-row>

         <el-row :gutter="20" type="flex" class="row-bg" justify="center">
         
          <el-col :span="20" >
            <el-form-item label="请求内容" prop="text">
              <el-input v-model="formValidate.text" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
        </el-row>
        

         <el-row :gutter="20" type="flex" class="row-bg" justify="center">
         
          <el-col :span="20" >
            <el-form-item label="请求方式" prop="method">
              <el-input v-model="formValidate.method" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
        </el-row>


		
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="10" >
            <el-form-item label="开始时间" prop="startTime">
              <el-time-picker
                type="date"
                v-model="formValidate.startTime"
                format="HH:mm" value-format="HH:mm"
                placeholder="选择开始时间"
                style="width: 100%;"
              ></el-time-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10" >
            <el-form-item label="结束时间" prop="endTime">
              <el-time-picker
                type="date"
                v-model="formValidate.endTime"
                format="HH:mm" value-format="HH:mm"
                placeholder="选择结束时间"
                style="width: 100%;"
              ></el-time-picker>
            </el-form-item>
          </el-col>
        </el-row>
		

        <el-form-item label="请求头：">
            <div>
              <div style="display: flex-end;padding: 8px 0;">
                <el-button type="primary" icon="el-icon-plus" @click="addHeader">
                  添加
                </el-button>
              </div>
              <el-table
                ref="multipleTable"
                :data="formValidate.headers"
                border
              >
            

                <el-table-column  prop="label"   label="名称" width="200" >
                <template slot-scope="scope">
                    <span v-if="showEdit != scope.$index">
                      {{ scope.row.label }}
                    </span>

                    <el-input v-else  v-model="scope.row.label" style="width: 100%;"></el-input>
                  </template>
                
                </el-table-column>

                <el-table-column
                  prop="content"
                  label="值"
                >
                 <template slot-scope="scope">
                    <span v-if="showEdit != scope.$index">
                      {{ scope.row.content }}
                    </span>
                <el-input v-else type="textarea"   rows="6"  v-model="scope.row.content" style="width: 100%;"></el-input>


                  </template>
                </el-table-column>

                <el-table-column label="操作" width="260">
                  <template slot-scope="scope">

                    <el-button v-if="showEdit == scope.$index" size="mini" @click="saveHeader(scope.$index)">保存</el-button>
		                <el-button  size="mini" type="primary"  @click="editHeader(scope.$index)" >编辑</el-button>
                    <el-button size="mini" type="danger" @click="deleteHeader( scope.$index)" >删除</el-button >
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form-item>
       


      </el-form>
      </div>
  </div>





</template>
<script>
import {HttpInfo ,HttpSave ,HttpUpdate} from "@a/http";

export default {
  name: "Edit",
  components: {},
  data() {
    return {
      showEdit: null,
      id: "",
      title: "",
      params: {},
      formValidate: {
        headers: [],		
        url: null,		
        text: null,		
        startTime: null,		
        endTime: null,		
        createBy: null,		
        createTime: null,		
        updateBy: null,		
        updateTime: null,		
        isDelete: null		
      },
      data: [],
      rules: {
        url: [
          { required: true, message: '请输入地址', trigger: 'blur' }
		],
        text: [
          { required: true, message: '请输入请求内容', trigger: 'blur' }
		],
        startTime: [
          { required: true, message: '请输入开始时间', trigger: 'blur' }
		],
        endTime: [
          { required: true, message: '请输入结束时间', trigger: 'blur' }
		],

      },
      dialogVisible: false,
      otherType: ""
    };
  },
  methods: {   
    saveHeader(){
      this.showEdit=null;
    },
    addHeader() {
      if(!this.formValidate.headers){
        this.formValidate.headers=[];
      }


      var header = { label: null, content: null };
      this.formValidate.headers.push(header);
      this.showEdit=this.formValidate.headers.length-1;
    },
    editHeader(index) {
      this.showEdit=null;
      this.showEdit = index;
    },
    deleteHeader(index) {
      this.formValidate.headers.splice( index,   1);
    },
    //获取列表详情接口
    async getInfo(id) {
      
      const  data = await HttpInfo(id);
  
        this.formValidate = data;
   
    },
    //新增保存接口
    async addData() {
        const  data = await HttpSave(this.formValidate);
        this.$message.success("新增成功");
        this.resetForm();
        this.backTo();
     
    },
    //编辑保存接口
    async editData() {
        const  data = await HttpUpdate(this.formValidate);
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
        name: "Http"
      });
    }
  },
  mounted() {
    //拿到从列表页传过来的ID
    this.id = this.$route.query.id;

    if (this.id) {
      this.getInfo(this.id);
    }
  }
};
</script>
