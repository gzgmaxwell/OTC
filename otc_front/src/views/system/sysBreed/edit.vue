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
          <el-col :span="16" >
            <el-form-item label="名称" prop="label">
              <el-input v-model="formValidate.label" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
        </el-row>


        
       <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="16" >

               <el-form-item label="上一级：" >
                <SelectTree
                  :checkedKey.sync="formValidate.parentId"
                  :checkStrictly="true"
                  :defaultProps="defaultProps"
                  :nodeKey="'id'"
                  :data="breeds"
                  :width="100"
                />
              </el-form-item>

          </el-col>	
        </el-row>


		
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="8" >
            <el-form-item label="图片地址" >

              
             <el-upload
              class="avatar-uploader"
              :action="upload_url"
              :show-file-list="false"
              :on-success="handleIconSuccess">
              <img v-if="formValidate.picUrl" :src="formValidate.picUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>


              <!-- <el-input v-model="formValidate.picUrl" style="width: 100%;"></el-input> -->
            </el-form-item>
          </el-col>	
          <el-col :span="8" >
           
          </el-col>	
        </el-row>

		



        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="16" >
            <el-form-item label="内容" prop="content">
              <!-- <el-input v-model="formValidate.content" style="width: 100%;"></el-input> -->

              <editor ref="ntiContent"  style="width: 100%;" @change="catchData" />

            </el-form-item>
          </el-col>	
        </el-row>
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="16" >
            <el-form-item label="品种级别" >
              <el-input v-model="formValidate.level" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>	
        </el-row>


        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="16" >
            
              <el-form-item label="排序号："  >
                <el-input v-model="formValidate.px"></el-input>
              </el-form-item>
          </el-col>	

        </el-row>
       


      </el-form>
      <el-dialog
        title="推荐品种"
        :visible.sync="dialogSelectVisible"
        :before-close="closeDialog"
        :modal-append-to-body="false"
        width="800px"
        top="15vh"
      >
        <div class="selectBox">
          <el-table
            ref="multipleTable"
            v-if="dialogSelectVisible"
            v-loading="tableLoading"
            :data="tableData"
            class="customTable"
            border
            row-key="id"
            height="500px"
            tooltip-effect="dark"
            style="width: 100%"

            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              reserve-selection
              width="55">
            </el-table-column>
            <el-table-column
              v-for="(item,index) in columnList" :key="index"
              :label="item.label"
              :prop="item.prop"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <img v-if="item.type === 'img'" style="width: 60%;"  :src="scope.row.picUrl" >
                <span v-else>{{ scope.row[item.prop] }}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            @size-change="sizeChange"
            @current-change="changePage"
            :current-page="params.current"
            :page-sizes="[10, 20, 30]"
            :page-size="params.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableDataTotal"
          ></el-pagination>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="saveSelect"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      </div>
  </div>





</template>
<script>
import {BreedCascaderAll,SysBreedInfo ,SysBreedSave ,SysBreedUpdate, SysBreedTree, SysBreedChildPage} from "@a/system";
import SelectTree from "@/components/tree/SelectTree.vue";
import editor from "@/components/editor/index.vue";
export default {
  name: "Edit",
  components: {SelectTree,editor},
  data() {
    return {
      id: "",
      title: "",
      params: {
        current: 1,
        size: 10,
      },
      dialogSelectVisible: false,
      tableData: [],
      tableDataTotal: 0,
      multipleSelection: [],
      columnList: [
        {
          label:'名称',
          prop:'label',
        },
        {
          label:'图片',
          type: 'img',
          prop:'picUrl',
        }
      ],
      formValidate: {
        label: null,		
        parentId: null,		
        picUrl: null,		
        pzlx: null,		
        level: null,		
        createBy: null,		
        createName: null,		
        createTime: null,		
        updateBy: null,		
        updateName: null,		
        updateTime: null,		
        isDelete: null,
        zmzykList:[],
        zmzyk: null,
        zmzykName:''
      },
      breeds:[],
      defaultProps: {
        children: "children",
        label: "label",
        value: "id"
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
  // watch: {
  //   'formValidate.parentId'(newVal,oldVal) {
  //     console.log(newVal)
  //     this.result = []
  //     this.findParent(this.breeds, this.formValidate.parentId, this.result)  
  //     console.log(this.result,'result')
  //   },
  // },
  methods: {
    catchData(content) {
      this.formValidate.content = content;
    },
    //新增保存接口
    async getBreeds() {
        const  data = await BreedCascaderAll();
        this.breeds=data;
    },
      handleIconSuccess(res, file) {
        this.formValidate.picUrl = res.url;
      },
    //获取列表详情接口
    async getInfo(id) {
      const data = await SysBreedInfo(id);
      data.zmzykName = ''
      if(data.zmzykList && data.zmzykList.length>0){
        data.zmzykList.forEach((item,index) => {
          data.zmzykName += item.label
          if(index < data.zmzykList.length - 1){
            data.zmzykName += '、'
          }
        })
      }
      this.formValidate = data;
      // if(this.formValidate.zmzykList.length>0){
      //   this.$nextTick(() => {
      //     this.toggleSelection(this.formValidate.zmzykList)
      //   })
      // }
      if (data.content) {
        this.$refs.ntiContent.setHtml(data.content);
      }
   
    },
    //新增保存接口
    async addData() {
        const  data = await SysBreedSave(this.formValidate);
        this.$message.success("新增成功");
        this.backTo();
     
    },
    //编辑保存接口
    async editData() {
      const  data = await SysBreedUpdate(this.formValidate);
        this.$message.success("修改成功");
        this.backTo();
    },

    showDialog() {
      this.multipleSelection = []
      this.tableDataTotal = 0;
      this.tableData = [];
      this.List()
    },

    // 获取推荐品种
    async List() {
      this.dialogSelectVisible = true;
      this.tableLoading = false
      // if(this.$route.query.id){
      //   this.params.parentId = this.$route.query.id
      // }else{
      //   this.params.parentId = this.formValidate.parentId
      // }
      if(this.formValidate.parentId){
        this.params.parentId = this.formValidate.parentId
      }else{
        this.params.parentId = this.$route.query.id
      }
      this.params.current = 1
      this.params.size = 10
      const data  = await SysBreedChildPage(this.params);
      console.log(data)
      this.tableDataTotal = data.total;
      this.tableData = data.records;
      this.tableLoading = false
      if(this.formValidate.zmzykList.length>0){
        this.$nextTick(() => {
          this.toggleSelection(this.formValidate.zmzykList)
        })
      }
    },
    findParent(data, target, result) {
      for (let i in data) {
        let item = data[i]
        if (item.id === target) {
          //将查找到的目标数据加入结果数组中
          //可根据需求unshift(item.id)或unshift(item)
          result.unshift(item)
          return true
        }
        if (item.children && item.children.length > 0) {
          let ok = this.findParent(item.children, target, result)
          if (ok) {
            result.unshift(item)
            return true
          }
        }
      }
      //走到这说明没找到目标
      return false
    },
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val;
    },
    toggleSelection(rows) {
      rows.forEach(key => {
        this.tableData.forEach(row => {
          if (row.id == key.id) {
            this.$refs.multipleTable.toggleRowSelection(row, true);
          }
        })
      })
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

    // 关闭选择弹窗
    closeDialog() {
      this.dialogSelectVisible = false;
      this.params.current = 1
      this.params.size = 10
    },
    saveSelect() {
      this.formValidate.zmzykList = this.multipleSelection;
      this.formValidate.zmzyk = ''
      this.formValidate.zmzykName = ''
      this.formValidate.zmzykList.forEach((item,index) => {
        this.formValidate.zmzyk += item.id
        this.formValidate.zmzykName += item.label
        if(index < this.formValidate.zmzykList.length - 1){
          this.formValidate.zmzyk += ','
          this.formValidate.zmzykName += '、'
        }
      })
      this.multipleSelection = []
      this.closeDialog()
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
        name: "SysBreed",
        query: {
          pzlx: this.formValidate.pzlx
        }
      });
    }
  },
 async mounted() {
    //拿到从列表页传过来的ID
    this.id = this.$route.query.id;
    this.formValidate.pzlx = this.$route.query.pzlx;
    await this.getBreeds();

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