<template>

  <div class="list_page">



 <div class="top_wrapper">
      <div class="search_box" style="width: 100%;">
         
     
        <el-button type="primary" icon="el-icon-plus" @click="newEdit()">
          添加
        </el-button>
      </div>
 </div>


	
	<div class="table_wrapper">
      <el-table ref="multipleTable" :data="list" border height="100%" 
          row-key="id"
          :tree-props="{ children: 'children' }">
        
																
				
						  <el-table-column prop="label" label="名称"></el-table-column>
						
				
						  <!-- <el-table-column prop="picUrl" label="图片">
                <template slot-scope="scope">
                      <img style="    width: 30%;"  :src="scope.row.picUrl" >
                </template>
               </el-table-column>
												 -->
				
						  <el-table-column prop="px" label="排序"></el-table-column>
				
																								
        <el-table-column label="操作"  width="280">
          <template slot-scope="scope">
		   <el-button size="mini" @click="edit(scope.row)">查看</el-button>
		   <el-button  size="mini" type="primary"  @click="edit(scope.row)" >编辑</el-button>
           <el-button size="mini" type="danger" @click="Delete( scope.row)" >删除</el-button >
          </template>
        </el-table-column>
      </el-table>
    </div>
    

  </div>
</template>

<script>

import {SysBreedTree , SysBreedDelete} from "@a/system";



export default {
  name: "SysBreed",
  components: {},
  data() {
    return {
      id: "",
      params: {
        pzlx:'3'
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
   handleClick(tab, event) {
      this.search();
   },
    //搜索
    search() {
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
        const   data  = await SysBreedTree(this.params);
    
        this.list = data;
      
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
       await SysBreedDelete(array);

        this.$message.success("删除成功");

        this.search();

    },
    //新增
    newEdit() {
      this.$router.push({
        name: "newSysBreed",
        query: {
          pzlx: this.params.pzlx
        }
      });
    },
    //编辑
    edit( row ) {
      this.$router.push({
        name: "newSysBreed",
        query: {
          id: row.id,
          pzlx: this.params.pzlx
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
    if(this.$route.query.pzlx){
        this.params.pzlx = this.$route.query.pzlx;
    }
        

    this.search();
  }
};
</script>

<style scoped>
>>> .el-tabs__content{
  position: static;
}
>>> .tab_wrap .operate_btn{
  position: absolute;
  right: 20px;
  top: 10px;
}
</style>