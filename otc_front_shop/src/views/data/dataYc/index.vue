<template>
  <div class="list_page">
 
 
 
       <div class="top_wrapper">
      <div class="search_box">
	  
          <el-input placeholder="请输入公司" style="width: 30%;" v-model="params.qymc" @keyup.enter.native="search"></el-input>

        <el-button type="primary" icon="el-icon-search" @click="search">
          搜索
        </el-button>
        <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="newEdit()">
          添加
        </el-button>
      </div>
    </div>
	
	
	<div class="table_wrapper">
      <el-table ref="multipleTable" :data="list" border height="100%">
        
																
				
						  <el-table-column prop="qymc" label="公司"></el-table-column>
				
				

												
				
						  <el-table-column prop="cm" label="船名"></el-table-column>
				
				

												
				
						  <el-table-column prop="mmsi" label="mmsi"></el-table-column>
				
				

												
				
						  <el-table-column prop="hh" label="呼号"></el-table-column>
				
				

												
				
						  <el-table-column prop="zd" label="总吨"></el-table-column>
				
				

																																																
        <el-table-column label="操作"  width="280">
          <template slot-scope="scope">
		   <el-button size="mini" @click="edit(scope.row)">查看</el-button>
		   <el-button  size="mini" type="primary"  @click="edit(scope.row)" >编辑</el-button>
           <el-button size="mini" type="danger" @click="Delete( scope.row)" >删除</el-button >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      background
      @size-change="sizeChange"
      @current-change="changePage"
      :current-page="params.current"
      :page-sizes="[10, 20, 30]"
      :page-size="params.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

      


  </div>
</template>

<script>

import {DataYcPage , DataYcDelete} from "@a/data";



export default {
  name: "DataYc",
  components: {},
  data() {
    return {
      id: "",
      params: {
        size: 10,
        current: 1
      },
      total: 0,
      list: [], //表格数据
      selectedList: [], //批量删除的数组
      select: "",
      isShow: false,
      showOperate: false,
      fileList: []
    };
  },
  created() {},
  methods: {
    //搜索
    search() {
	this.params.current = 1;
      //列表查询和搜索
      this.List();
    },
    //重置
    reset() {
      this.params = {};
    },
    //返回搜索
    back() {
      this.isShow = false;
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
            totalArr.push(item.id);
          });
          this.delData(totalArr);
        })
        .catch(() => {});
    },
    //获取列表
    async List() {
	  this.params.descs = "a.update_time";
        const   data  = await DataYcPage(this.params);
    
        this.total = data.total;
        this.list = data.records;
      
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
    //删除接口
    async delData(array) {
       await DataYcDelete(array);

        this.$message.success("删除成功");

        this.search();

    },
    //新增
    newEdit() {
      this.$router.push({
        name: "newDataYc"
      });
    },
    //编辑
    edit( row ) {
      this.$router.push({
        name: "newDataYc",
        query: {
          id: row.id
        }
      });
    },
    //删除
    Delete( row ) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var arr = [];
          arr.push(row.id);
          this.delData(arr);
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.search();
  }
};
</script>

