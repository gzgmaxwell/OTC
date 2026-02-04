<template>
  <div class="list_page">
 
 
       <div class="top_wrapper">
      <div class="search_box">
	  
       
          <el-input placeholder="订单编号" v-model="params.transNumber" style="width: 30%; " @keyup.enter.native="search"></el-input>


          <el-select filterable v-model='params.fromId'  placeholder='请选择付款人' style="width: 30%; margin-left: 10px;" >
                    <el-option v-for='user in users' :key='user.userId' :label='user.nickName+"-"+user.phoneNum' :value='user.userId'></el-option>
          </el-select>

          <el-select filterable v-model='params.purposeId'  placeholder='请选择收款人' style="width: 30%; margin-left: 10px;" >
                    <el-option v-for='user in users' :key='user.userId' :label='user.nickName+"-"+user.phoneNum' :value='user.userId'></el-option>
          </el-select>

           <el-date-picker
          style="width: 50%; margin-left: 10px;"
           @change="selectTime"
              v-model="value2"
              type="datetimerange"
              :picker-options="pickerOptions"
               value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right">
            </el-date-picker>

            
     


        <el-button type="primary" icon="el-icon-search" @click="search">
          搜索
        </el-button>
        <el-button icon="el-icon-refresh" @click="reset">重置</el-button>

      </div>
    </div>
	
	
	<div class="table_wrapper">
      <el-table ref="multipleTable" :data="list" border height="100%" 
      stripe
      style="width: 100%"
      :show-summary="true"
      :summary-method="getSummaries"
      >
        
																
														  <el-table-column prop="fromNickName" label="付款人昵称"></el-table-column>
								

												
														  <!-- <el-table-column prop="address" label="钱包地址"></el-table-column> -->
														  <el-table-column prop="transNumber" label="订单编号"></el-table-column>
														  <el-table-column prop="zdlxName" label="类型"></el-table-column>
								

												
														  <el-table-column prop="purposeNickName" label="收款人昵称"></el-table-column>
								
								

												
														  <el-table-column prop="money" label="金额">
                                 <template slot-scope="scope" >
                                  {{ formatCurrency(scope.row.money) }}
                                </template>
                              </el-table-column>
								

						  <el-table-column prop="updateTime" label="更新时间" width="160"></el-table-column>
																																																
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
		   <el-button size="mini" @click="edit(scope.row)">查看</el-button>
           <!-- <el-button size="mini" type="danger" @click="Delete( scope.row)" >删除</el-button > -->
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

import {TransferRecordPage , TransferRecordDelete} from "@a/transaction";
import {  nextTick } from 'vue'

import { UserList} from "@a/system";



export default {
  name: "TransferRecord",
  components: {},
  data() {
    return {
        value2:"",
      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      id: "",
      users:[],
      params: {
        size: 10,
        current: 1,
        startTime: null,
        endTime: null,
      },
      total: 0,
      list: [], //表格数据
      money: 0,
      selectedList: [], //批量删除的数组
      select: "",
      isShow: false,
      showOperate: false,
      fileList: []
    };
  },
  created() {},
  methods: {
    getSummaries ({ columns, data }) {

                // 如果没有数据，返回空数组或默认值
            if (!data || data.length === 0) {
               return ["总计", "", "", "",   "¥",  "",""]
 
            }

            const sums = []
            columns.forEach((column, index) => {
              if (index === 0) {
                sums[index] = '总计'
                return
              }
              
              const values = data.map(item => Number(item[column.property]))
              
              if (!values.every(isNaN)) {
                if (column.property === 'money') {
                  const sum =  this.money;

                  if (column.property === 'money') {
                    sums[index] = '¥' + sum.toFixed(2)
                  } else {
                    sums[index] = sum
                  }
                } else {
                  sums[index] = ''
                }
              } else {
                sums[index] = ''
              }
            })
            
  return sums
    },
    formatCurrency(value){
      if (typeof value !== 'number') return '0.00'
      return value.toFixed(2)
    },
    selectTime(val){
      console.error(val);
    if(val){
       this.params.startTime = val[0];
       this.params.endTime = val[1];
        
    }else{
      
    }
},
    async getCodeUser() {
      var param ={};
      const  data = await UserList(param);
  
        this.users = data;
   
    },
    //搜索
    search() {
	this.params.current = 1;
      //列表查询和搜索
      this.List();
    },
    //重置
    reset() {
      this.params = {};
      this.value2="";
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
            totalArr.push(item.id);
          });
          this.delData(totalArr);
        })
        .catch(() => {});
    },
    //获取列表
    async List() {
	  this.params.descs = "a.update_time";
        const   data  = await TransferRecordPage(this.params);
       
        this.total = data.page.total;
        this.list = data.page.records;
        this.money = data.money;
        // 数据加载完成后，强制更新表格以确保合计行正确显示
         this.$nextTick(() => {
        this.$refs.multipleTable && this.$refs.multipleTable.doLayout();
      });
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
       await TransferRecordDelete(array);

        this.$message.success("删除成功");

        this.search();

    },
    //新增
    newEdit() {
      this.$router.push({
        name: "newTransferRecord"
      });
    },
    //编辑
    edit( row ) {
      this.$router.push({
        name: "newTransferRecord",
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
    this.getCodeUser();
  }
};
</script>
