<template>
  <div class="edit_page">
    <div class="top_box">
      <div class="title">
        查看信息
      </div>
      <div>
        <el-button @click="backTo()">返回</el-button>
      </div>
    </div>
    <div class="edit_content">
      <div class="list_page">
        <div class="top_wrapper">
          <div class="search_box">
            <el-input placeholder="收款账号" v-model="params.transNumber" style="width: 30%; " @keyup.enter.native="search">
            </el-input>
            <el-button type="primary" icon="el-icon-search" @click="search">
              搜索
            </el-button>
            <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
          </div>
        </div>
        <div class="table_wrapper" style="height: calc(100% - 300px);">
          <el-table ref="multipleTable" :data="list" border height="100%" stripe style="width: 100%">
            <el-table-column prop="fromNickName" label="收款账号"></el-table-column>
            <el-table-column prop="fromCodeName" label="收款金额"></el-table-column>
            <el-table-column prop="transNumber" label="出款金额"></el-table-column>
            <el-table-column prop="zdlxName" label="已付金额"></el-table-column>
            <el-table-column prop="money" label="余额">
              <template slot-scope="scope">
                {{ formatCurrency(scope.row.money) }}
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination background @size-change="sizeChange" @current-change="changePage" :current-page="params.current"
          :page-sizes="[10, 20, 30]" :page-size="params.size" layout="total, sizes, prev, pager, next, jumper"
          :total="total"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { TransferRecordPage } from "@a/summary";
export default {
  name: "TransferRecord",
  components: {},
  data() {
    return {
      params: {
        size: 10,
        current: 1,
        startTime: null,
        endTime: null
      },
      total: 0,
      list: [], //表格数据
      money: 0
    };
  },
  methods: {
    formatCurrency(value) {
      if (typeof value !== "number") return "0.00";
      return value.toFixed(2);
    },
    //搜索
    search() {
      this.params.current = 1;
      this.List();
    },
    //重置
    reset() {
      this.params = {};
      this.search();
    },
    //获取列表
    async List() {
      this.params.descs = "a.update_time";
      const data = await TransferRecordPage(this.params);
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
    //返回
    backTo() {
      this.$router.push({
        name: "AdminSummary"
      });
    }
  },
  mounted() {
    this.search();
  }
};
</script>
