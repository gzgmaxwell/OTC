<template>
  <div class="list_page">
    <div class="top_wrapper">
      <div class="search_box">
        <el-input placeholder="商户名称" style="width: 30%;" v-model="params.merchantUserName"
          @keyup.enter.native="search" />
        <el-button type="primary" icon="el-icon-search" @click="search">
          搜索
        </el-button>
        <el-button size="mini" type="primary" @click="edit()">提现申请</el-button>
        <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
      </div>
    </div>

    <div class="table_wrapper">
      <el-table ref="multipleTable" :data="list" border height="100%">
        <el-table-column prop="merchantUserName" label="商户名称"></el-table-column>
        <el-table-column prop="merchantUserId" label="商户ID"></el-table-column>
        <el-table-column prop="accountAddress" label="账户"></el-table-column>
        <el-table-column prop="money" label="金额"></el-table-column>
        <el-table-column prop="cashName" label="币种名称"></el-table-column>
        <el-table-column label="提现类型">
          <template slot-scope="scope">
            {{ compType(scope.row?.type) }}
          </template>
        </el-table-column>
        <el-table-column prop="transDes" label="交易描述"></el-table-column>
        <el-table-column prop="account" label="提现账号"></el-table-column>
        <el-table-column prop="info" label="提现信息"></el-table-column>
        <el-table-column prop="quantity" label="货币数量"></el-table-column>
        <el-table-column prop="exchangeRate" label="汇率"></el-table-column>
        <!-- <el-table-column label="操作" width="210">
          <template slot-scope="scope">
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
import { withdrawOrder_list } from "@a/transaction";
import { optWithdrawType } from "@/utils/enum";

export default {
  name: "UserRealAuth",
  components: {},
  data() {
    return {
      params: {
        size: 10,
        current: 1
      },
      total: 0,
      list: [], //表格数据
    };
  },
  computed: {
    compType() {
      return (val) => optWithdrawType.find(item => item.value === val)?.label;
    },
  },
  methods: {
    //搜索
    search() {
      this.params.current = 1;
      this.List();
    },
    //重置
    reset() {
      this.params = {};
    },
    //获取列表
    async List() {
      this.params.descs = "a.update_time";
      const userId = JSON.parse(localStorage.getItem("UserInfo")).userId
      // this.params.merchantUserId = userId;
      const data = await withdrawOrder_list(this.params);
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
    //编辑
    edit() {
      this.$router.push({
        name: "WithdrawalRequestEdit"
      });
    }
  },
  mounted() {
    this.search();
  }
};
</script>
