<template>
  <div class="list_page">
    <div class="cardbox">
      <div class="summary_controls">
        <el-radio-group v-model="timeFilter" size="small" @change="loadTotals">
          <el-radio-button label="today">当日</el-radio-button>
          <el-radio-button label="week">本周</el-radio-button>
          <el-radio-button label="month">本月</el-radio-button>
        </el-radio-group>
      </div>
      <div class="summary_cards">
        <el-card class="summary_card">
          <div slot="header" class="clearfix">
            <span>充值总金额</span>
          </div>
          <div class="summary_amount">¥ {{ formatCurrency(inTotal) }}</div>
        </el-card>
        <el-card class="summary_card">
          <div slot="header" class="clearfix">
            <span>买单金额</span>
          </div>
          <div class="summary_amount">¥ {{ formatCurrency(outTotal) }}</div>
        </el-card>
        <el-card class="summary_card">
          <div slot="header" class="clearfix">
            <span>卖单金额</span>
          </div>
          <div class="summary_amount">¥ {{ formatCurrency(outTotal) }}</div>
        </el-card>
      </div>
    </div>
    <div class="top_wrapper">
      <div class="search_box">
        <el-input placeholder="商户名称" v-model="params.transNumber" style="width: 30%; " @keyup.enter.native="search">
        </el-input>
        <el-button type="primary" icon="el-icon-search" @click="search">
          搜索
        </el-button>
        <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
      </div>
    </div>
    <div class="table_wrapper" style="height: calc(100% - 300px);">
      <el-table ref="multipleTable" :data="list" border height="100%" stripe style="width: 100%;">
        <el-table-column prop="fromNickName" label="商户名称"></el-table-column>
        <el-table-column prop="fromCodeName" label="充值金额"></el-table-column>
        <!-- <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope.row)">查看</el-button>
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
import { TransferRecordPage } from "@a/summary";
import dayjs from "dayjs";
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
      money: 0,
      timeFilter: "today",
      inTotal: 0,
      outTotal: 0
    };
  },
  methods: {
    formatCurrency(value) {
      if (typeof value !== "number") return "0.00";
      return value.toFixed(2);
    },
    getRangeByFilter() {
      const now = dayjs();
      if (this.timeFilter === "today") {
        return {
          startTime: now.startOf("day").format("YYYY-MM-DD HH:mm:ss"),
          endTime: now.endOf("day").format("YYYY-MM-DD HH:mm:ss")
        };
      }
      if (this.timeFilter === "week") {
        const d = now.day();
        const offset = (d + 6) % 7;
        const start = now.startOf("day").subtract(offset, "day");
        const end = start.add(6, "day").endOf("day");
        return {
          startTime: start.format("YYYY-MM-DD HH:mm:ss"),
          endTime: end.format("YYYY-MM-DD HH:mm:ss")
        };
      }
      return {
        startTime: now.startOf("month").format("YYYY-MM-DD HH:mm:ss"),
        endTime: now.endOf("month").format("YYYY-MM-DD HH:mm:ss")
      };
    },
    sumByDirection(records, dir) {
      const key = dir === "in" ? "代收" : "代付";
      return (records || [])
        .filter(r => ((r.zdlxName || "") + "").indexOf(key) !== -1)
        .reduce((s, r) => s + (Number(r.money) || 0), 0);
    },
    async loadTotals() {
      const range = this.getRangeByFilter();
      const p = {
        size: 1000,
        current: 1,
        startTime: range.startTime,
        endTime: range.endTime,
        descs: "a.update_time"
      };
      try {
        const data = await TransferRecordPage(p);
        const recs = (data && data.page && data.page.records) || [];
        this.inTotal = this.sumByDirection(recs, "in");
        this.outTotal = this.sumByDirection(recs, "out");
      } catch (e) {
        this.inTotal = 0;
        this.outTotal = 0;
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

    //编辑
    edit(row) {
      this.$router.push({
        name: "shopSummaryEdit",
        query: {
          id: row.id
        }
      });
    }
  },
  mounted() {
    this.search();
    this.loadTotals();
  }
};
</script>
<style scoped>
.summary_controls {
  margin-bottom: 12px;
}

.summary_cards {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.summary_card {
  flex: 1;
}

.summary_amount {
  font-size: 22px;
  font-weight: 700;
  color: var(--primary);
}
</style>
