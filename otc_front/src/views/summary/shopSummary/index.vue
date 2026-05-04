<template>
  <div class="list_page">
    <div class="cardbox">
      <div class="summary_controls">
        <el-radio-group v-model="timeFilter" size="small" @change="loadTotals">
          <el-radio-button v-for="item in timeFilterOptions" :key="item.value" :label="item.value">
            {{ item.label }}
          </el-radio-button>
        </el-radio-group>
        <el-date-picker size="small" style="width: 400px; margin-left: 10px;" @change="loadTotals" v-model="datetime"
          type="datetimerange" :picker-options="pickerOptions" value-format="yyyy-MM-dd HH:mm:ss" range-separator="-"
          start-placeholder="开始日期" end-placeholder="结束日期" align="right" :default-time="['00:00:00', '23:59:59']" />
      </div>
      <div class="summary_cards">
        <el-card class="summary_card">
          <div slot="header" class="clearfix">
            <span>总金额</span>
          </div>
          <div class="summary_amount">¥ {{ res?.amount || 0 }}</div>
        </el-card>
        <el-card class="summary_card">
          <div slot="header" class="clearfix">
            <span>充值金额</span>
          </div>
          <div class="summary_amount">¥ {{ res?.rechargeAmount || 0 }}</div>
        </el-card>
        <el-card class="summary_card">
          <div slot="header" class="clearfix">
            <span>转账金额</span>
          </div>
          <div class="summary_amount">¥ {{ res?.transferAmount || 0 }}</div>
        </el-card>
        <!-- <el-card class="summary_card">
          <div slot="header" class="clearfix">
            <span>买单金额</span>
          </div>
          <div class="summary_amount">¥ {{ res?.amountBuy || 0 }}</div>
        </el-card>
        <el-card class="summary_card">
          <div slot="header" class="clearfix">
            <span>卖单金额</span>
          </div>
          <div class="summary_amount">¥ {{ res?.amountSell || 0 }}</div>
        </el-card> -->
      </div>
    </div>
    <div class="top_wrapper">
      <!-- <div class="search_box">
        <el-input placeholder="商户名称" v-model="params.transNumber" style="width: 30%; " @keyup.enter.native="search">
        </el-input>
        <el-button type="primary" icon="el-icon-search" @click="search">
          搜索
        </el-button>
        <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
      </div> -->
    </div>
    <div class="table_wrapper" style="height: calc(100% - 300px);">
      <el-table ref="multipleTable" :data="res?.dataList || []" border height="100%" stripe style="width: 100%;">
        <el-table-column prop="nickName" label="商户名称"></el-table-column>
        <el-table-column prop="amount" label="总金额"></el-table-column>
        <el-table-column prop="rechargeAmount" label="充值金额"></el-table-column>
        <el-table-column prop="transferAmount" label="转账金额"></el-table-column>
        <!-- <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope.row)">查看</el-button>
          </template>
</el-table-column> -->
      </el-table>
    </div>
    <!-- <el-pagination background @size-change="sizeChange" @current-change="changePage" :current-page="params.current"
      :page-sizes="[10, 20, 30]" :page-size="params.size" layout="total, sizes, prev, pager, next, jumper"
      :total="total"></el-pagination> -->
  </div>
</template>

<script>
import { TransferRecordPage, statistical_count } from "@a/summary";
import { timeFilterOptions } from "@/utils/enum";
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
      timeFilter: "thisMonth",
      timeFilterOptions: timeFilterOptions,
      datetime: [],
      res: {},
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
    };
  },
  methods: {
    async loadTotals() {
      const params = {
        queryUserKind: "3", // 1平台，2码商，3商户
        timeType: this.timeFilter // today,thisWeek,lastWeek,lastMonth,thisMonth
        // "userId": ''   //  用户Id  this.userInfo.userId
      };
      if (this.datetime.length > 0) {
        params.startTime = this.datetime[0];
        params.endTime = this.datetime[1];
      }
      statistical_count(params).then(res => {
        this.res = res || {};
      });
    },
    //搜索
    search() {
      this.params.current = 1;
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
