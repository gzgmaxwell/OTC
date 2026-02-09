<template>
  <div class="list_page">


    <div class="top_wrapper">
      <div class="search_box">
        <el-input  placeholder="字典名称" style="width: 15%;" v-model="params.dicName" @keyup.enter.native="search()" ></el-input>
        
        <el-input  placeholder="字典类型" style="margin-left: 1%;width: 15%;" v-model="params.dicModel" @keyup.enter.native="search()" ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="search">
          搜索
        </el-button>
        <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="openDialog()">
          添加
        </el-button>
      </div>
    </div>

    <div class="table_wrapper">

       <el-table
          :data="list"
          border height="100%"
          row-key="dicId"
          @selection-change="selectChange"
          :tree-props="{ children: 'children' }"
        >
          
          <el-table-column
            prop="dicName"
            label="名称"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column prop="dicModel" label="模型"></el-table-column>

          <el-table-column
            prop="dicValue"
            label="值"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="dicLabel"
            label="label"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="dicNum"
            label="排序"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作"  width="200">
            <template slot-scope="scope">
              <TableOperate :rowData="scope" @edit="edit" @delete="Delete" />
            </template>
          </el-table-column>
        </el-table>

    </div>

        <el-pagination
            :key="elementui_page_component_key"
            background
            @size-change="sizeChange"
            @current-change="changePage"
            :current-page="params.current"
            :page-sizes="[10, 20, 30]"
            :page-size="params.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>

    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
      :modal-append-to-body="false"
      width="60%"
      top="25vh"
    >
      <el-form
        :model="formValidate"
        label-width="100px"
        ref="formValidate"
        :rules="rules"
      >
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="10">
            <el-form-item label="模型：" prop="dicModel">
              <el-autocomplete
                :disabled="formValidate.parentId=='0'?false:true"
                popper-class="my-autocomplete"
                v-model="formValidate.dicModel"
                :fetch-suggestions="querySearch"
                placeholder="请输入模型："
                @select="handleSelect"
              >
                <i
                  class="el-icon-edit el-input__icon"
                  slot="suffix"
                  @click="handleIconClick"
                ></i>
                <template slot-scope="{ item }">
                  <div class="name">{{ item.dicModel }}</div>
                  <span class="addr">{{ item.dicName }}</span>
                </template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="名称：" prop="dicName">
              <el-input
              :disabled="formValidate.parentId=='0'?false:true"
                v-model="formValidate.dicName"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="10">
            <el-form-item label="值：" prop="dicValue">
              <el-input
                v-model="formValidate.dicValue"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="label：" prop="dicLabel">
              <el-input
                v-model="formValidate.dicLabel"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="10">
            <el-form-item label="排序：" prop="dicNum">
              <el-input-number
                class="adjustInputNumber"
                v-model="formValidate.dicNum"
                label="请输入排序"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="10"></el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog()">取 消</el-button>
        <el-button type="primary" @click="save('formValidate')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<style scoped>
.adjustInputNumber {
  line-height: 33px;
}
</style>
<script>

import { DicList, DicPage , DictyDelete , DicAdd , DicUpdate ,DicInfo } from "@a/system";

export default {
  name: "DataDictionary",
  components: {},
  data() {
    return {
      id: "",
      params: {
        size: 10,
        current: 1,
        dicModel: null
      },
      total: 0,
      list: [], //表格数据
      selectedList: [], //批量删除的数组
      select: "",
      isShow: false,
      showOperate: false,
      title: "",
      dialogFormVisible: false,
      isEdit: false, //是否是编辑
      formValidate: {
        dicModel: "",
        dicName: "",
        dicValue: "",
        dicLabel: "",
        parentId: "0",
        dicNum: ""
      },
      roleList: [], //角色信息
      rules: {
        dicModel: [
          { required: true, message: "请输入模型名称", trigger: "blur" }
        ],
        dicName: [{ required: true, message: "请输入名称", trigger: "blur" }]
      },
      elementui_page_component_key:0
    };
  },
  created() {},
  methods: {
    async querySearch(queryString, cb) {
      let  data  = await DicList({
        dicModel: queryString,
        descs: "a.update_time"
      });
      // // 调用 callback 返回建议列表的数据
      cb(data);
    },
    handleSelect(item) {
      this.formValidate.dicModel = item.dicModel;
      this.formValidate.dicName = item.dicName;
      this.formValidate.parentId = item.dicId;
    },
    handleIconClick(ev) {
      console.log(ev);
    },
    //搜索
    search() {
      //列表查询和搜索
      this.List();
    },
    //搜索更多
    searchMore() {
      if (!this.isShow) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
    //搜索重置
    reset() {
      
      this.params = {};
      //列表查询和搜索
      this.search();
    },
    //返回搜索
    back() {
      this.isShow = false;
    },

    //展开操作
    operate() {
      this.showOperate = true;
    },
    //收起操作
    collapse() {
      this.showOperate = false;
    },
    //批量删除
    totalDel(total) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var totalArr = [];
          total.forEach(item => {
            totalArr.push(item.dicId);
          });
          this.delData(totalArr);
        })
        .catch(() => {});
    },
    //获取列表接口
    async List() {
      this.params.descs = "a.update_time";
      let data = await DicPage( this.params );
        this.total = data.total;
        this.list = data.records;
    },
    //获取列表详情接口
    async getInfo(id) {
      let data = await DicInfo(id);
        this.formValidate = data;
    },

    //新增保存接口
    async addData() {
        await DicAdd(this.formValidate);
        this.$message.success("操作成功");
        this.search();
        this.closeDialog();
    },
    //编辑保存接口
    async editData() {
     await DicUpdate(this.formValidate , this.formValidate.dicId);
        this.$message.success("操作成功");
        this.search();
        this.closeDialog();
    },
    //删除接口
    async delData(array) {
      await DictyDelete(array);
        this.$message.success("删除成功");
        // this.params.current = 1;
        this.search();
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
    //选择批量删除的数据
    selectChange(val) {
      this.selectedList = val;
    },
    //设置表格表头颜色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background: #f2f2f2;color: #333;font-weight: 500;";
      }
    },

    //打开弹窗，判断是新增还是编辑
    openDialog(row) {
      if (!row) {
        this.title = "新建";
        this.isEdit = false;
      } else {
        this.title = "编辑";
        this.isEdit = true;
      }
      this.dialogFormVisible = true;
    },
    //关闭弹窗
    closeDialog() {
      this.dialogFormVisible = false;
      //清空弹框数据
      this.resetForm("formValidate");
    },
    //重置表单
    resetForm(formName) {
      this.formValidate = {
        dicModel: "",
        dicName: "",
        dicValue: "",
        dicLabel: "",
        parentId: "0",
        dicNum: ""
      };
      this.$refs[formName].resetFields();
    },
    //弹框关闭
    handleClose(done) {
      this.resetForm("formValidate");
      done();
    },
    //保存
    save(formName) {
      //验证表单必填
      this.$refs[formName].validate(valid => {
        if (!valid) {
          this.$message.error("请检查表单红字段!");
          return;
        }
        if (this.isEdit) {
          this.editData();
        } else {
          this.addData();
        }
      });
    },
    //编辑
    edit(index, row) {
      this.openDialog(row);
      this.id = row.dicId;
      this.getInfo( row.dicId );
    },
    //删除
    Delete(index, row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var arr = [];
          arr.push(row.dicId);
          this.delData(arr);
        })
        .catch(() => {});
    },
     //强制刷新组件
    autoIncrasePageComKey: function () {
      this.elementui_page_component_key ++
    }
  },
  mounted() {
    if(this.$route.query.current){
      this.params.current=parseInt(this.$route.query.current)
      this.autoIncrasePageComKey();
    }
    if(this.$route.query.size){
      this.params.size=parseInt(this.$route.query.size)
      this.autoIncrasePageComKey();
    }
    this.search();
  }
};
</script>
