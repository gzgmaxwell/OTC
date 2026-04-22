<template>
  <div class="list_page">
    <div class="top_wrapper">
      <div class="search_box">
        <el-input placeholder="商户ID" v-model="params.userId" style="width: 30%; " @keyup.enter.native="search" />
        <el-input placeholder="商户账号" v-model="params.merchantUserName" style="width: 30%;margin-left: 10px; "
          @keyup.enter.native="search" />
        <el-input placeholder="系统订单号" v-model="params.transNumber" style="width: 30%;margin-left: 10px; "
          @keyup.enter.native="search" />
        <el-input placeholder="商户会员名" v-model="params.nickName" style="width: 30%;margin-left: 10px; "
          @keyup.enter.native="search" />
        <!-- <el-input placeholder="提现时间" v-model="params.createTime" style="width: 30%;margin-left: 10px; "
          @keyup.enter.native="search" /> -->
        <el-select v-model="params.orderModel" style="width: 30%;margin-left: 5px;" placeholder="下单模式">
          <el-option v-for="(item, index) in optOrderModel" :key="index" :label="item.label"
            :value="item.value"></el-option>
        </el-select>
        <el-input placeholder="订单状态" v-model="params.orderStatus" style="width: 30%;margin-left: 10px; "
          @keyup.enter.native="search" />
        <el-input placeholder="提现模式" v-model="params.withdrawType" style="width: 30%;margin-left: 10px; "
          @keyup.enter.native="search" />
        <el-date-picker style="width: 50%; margin-left: 10px;" @change="selectTime" v-model="value2"
          type="datetimerange" :picker-options="pickerOptions" value-format="yyyy-MM-dd HH:mm:ss" range-separator="-"
          start-placeholder="开始日期" end-placeholder="结束日期" align="right" />

        <el-button type="primary" icon="el-icon-search" @click="search">
          搜索
        </el-button>
        <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
      </div>
    </div>

    <div class="table_wrapper">
      <el-table ref="multipleTable" :data="list" border height="100%" stripe style="width: 100%">
        <el-table-column prop="id" label="商户订单号"></el-table-column>
        <el-table-column prop="merchantUserName" label="商户账号"></el-table-column>
        <el-table-column prop="userId" label="商户ID"></el-table-column>
        <el-table-column prop="transNumber" label="系统订单号"></el-table-column>
        <el-table-column prop="withdrawType" label="提现类型"></el-table-column>
        <el-table-column prop="nickName" label="商户会员名"></el-table-column>
        <el-table-column prop="money" label="提款金额"></el-table-column>
        <el-table-column prop="sucessCommitAmount" label="已成功金额"></el-table-column>
        <el-table-column prop="balance" label="交易后余额"></el-table-column>
        <el-table-column prop="address" label="提款人钱包"></el-table-column>
        <el-table-column prop="createTime" label="提现时间"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间"></el-table-column>
        <el-table-column prop="createTime" label="完成时间"></el-table-column>
        <el-table-column prop="orderStatus" label="订单状态"></el-table-column>
        <el-table-column label="下单模式">
          <template slot-scope="scope">
            {{ compcChecked(scope.row.orderModel) }}
          </template>
        </el-table-column>
        <el-table-column prop="payTotalMoney" label="下分总金额"></el-table-column>
        <el-table-column prop="remarks" label="商户备注"></el-table-column>
        <!-- <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope.row)">查看</el-button>
            <el-button size="mini" type="danger" @click="Delete(scope.row)">删除</el-button>
          </template>
</el-table-column> -->
      </el-table>
    </div>
    <el-pagination background @size-change="sizeChange" @current-change="changePage" :current-page="params.current"
      :page-sizes="[10, 20, 30]" :page-size="params.size" layout="total, sizes, prev, pager, next, jumper"
      :total="total"></el-pagination>
  </div>
</template>

<script>
import { TransferRecordDelete, xiafen_list, } from "@a/merchant";
import { optOrderModel } from "@/utils/enum";

export default {
  name: "TransferRecord",
  components: {},
  data() {
    return {
      optOrderModel: optOrderModel,
      value2: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      id: "",
      params: {
        size: 10,
        current: 1,
        startTime: null,
        endTime: null
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
  computed: {
    compcChecked() {
      return (val) => optOrderModel.find(item => item.value === val)?.label;
    },
  },
  methods: {
    selectTime(val) {
      if (val) {
        this.params.startTime = val[0];
        this.params.endTime = val[1];
      }
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
      this.value2 = "";
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
        .catch(() => { });
    },
    //获取列表
    async List() {
      this.params.descs = "a.update_time";
      const data = await xiafen_list(this.params);
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
    edit(row) {
      this.$router.push({
        name: "newTransferRecord",
        query: {
          id: row.id
        }
      });
    },
    //删除
    Delete(row) {
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
        .catch(() => { });
    }
  },
  mounted() {
    this.search();
  }
};
</script>
