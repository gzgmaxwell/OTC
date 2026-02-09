<template>
  <div class="list_page">
 
 
 
       <div class="top_wrapper">
      <div class="search_box">
	  


          
              <el-input
                placeholder="请输入姓名"
                @keyup.enter.native="search"
                v-model="params.fullName"
                style="width: 30%;"
              ></el-input>

              
            <el-select v-model="params.lx" placeholder="擅长领域" style="width: 30%;margin-left: 5%;" >
              <el-option
                v-for="item in dics.pzlx"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>




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
        
																
				

												
				
						  <el-table-column prop="fullName" label="专家名称"></el-table-column>
				
				
				
				
        		   <el-table-column prop="headerUrl" label="专家头像">
                <template slot-scope="scope">
                      <img style="    width: 30%;"  :src="scope.row.headerUrl" >
                </template>
               </el-table-column>

												
				
						  <el-table-column prop="dw" label="单位"></el-table-column>
				
				

												
				
				
						  <el-table-column prop="contact" label="联系方式"></el-table-column>
				
				

				

																																																																
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

import {UserZjPage , UserZjDelete} from "@a/system";



export default {
  name: "UserZj",
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
      this.search();
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
            totalArr.push(item.userId);
          });
          this.delData(totalArr);
        })
        .catch(() => {});
    },
    //获取列表
    async List() {
	  this.params.descs = "a.update_time";
        const   data  = await UserZjPage(this.params);
    
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
       await UserZjDelete(array);

        this.$message.success("删除成功");

        this.search();

    },
    //新增
    newEdit() {
      this.$router.push({
        name: "newUserZj"
      });
    },
    //编辑
    edit( row ) {
      this.$router.push({
        name: "newUserZj",
        query: {
          id: row.userId
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
          arr.push(row.userId);
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

