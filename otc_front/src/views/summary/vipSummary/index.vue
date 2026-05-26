<template>
  <div class="admin_summary_page">
    <div class="summary_header">
      <div>
        <h2>订单统计</h2>
        <p>展示当前账号可见商户树的成功类收款数据。</p>
      </div>
      <div class="summary_actions">
        <el-button icon="el-icon-refresh" :loading="statisticsLoading" @click="refreshStatistics">
          刷新统计
        </el-button>
        <el-button type="primary" @click="viewDetails">查看详情</el-button>
      </div>
    </div>

    <div class="stat_card_list" v-loading="statisticsLoading">
      <div v-for="item in statisticCards" :key="item.key" class="stat_card">
        <div class="stat_title">{{ item.label }}</div>
        <div class="stat_amount">{{ formatMoney(item.amount) }}</div>
        <div class="stat_count">{{ formatCount(item.count) }} 笔成功类订单</div>
      </div>
    </div>

    <div class="detail_panel">
      <div class="table_header">
        <div>
          <h3>树状收款明细</h3>
          <p>按“商户 - 自有通道 - 提供者 - 下级商户”展开。</p>
        </div>
      </div>

      <el-table ref="paymentTable" v-loading="tableLoading" :data="paymentTree" row-key="rowKey"
        :tree-props="{ children: 'children' }" height="100%" style="width: 100%;">
        <el-table-column prop="name" label="收款节点" min-width="230">
          <template slot-scope="scope">
            <span class="node_name">{{ scope.row.name || "--" }}</span>
            <span v-if="scope.row.nodeTypeName" :class="['node_tag', scope.row.nodeType]">
              {{ scope.row.nodeTypeName }}
            </span>
          </template>
        </el-table-column>
        <el-table-column v-for="item in statisticCards" :key="item.key" :label="item.label" min-width="130">
          <template slot-scope="scope">
            <div class="table_amount">{{ formatMoney(getPeriodValue(scope.row, item.key, 'amount')) }}</div>
            <div class="table_count">{{ formatCount(getPeriodValue(scope.row, item.key, 'count')) }} 笔</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { merchantStatistics } from "@a/summary";

const PERIODS = [
  { key: "oneHour", label: "一小时内" },
  { key: "today", label: "今天" },
  { key: "thisWeek", label: "本周" },
  { key: "lastWeek", label: "上周" },
  { key: "thisMonth", label: "本月" },
  { key: "lastMonth", label: "上月" },
  { key: "lastThreeMonth", label: "最近三个月" }
];

const PERIOD_ALIASES = {
  oneHour: ["oneHour", "lastHour", "hour"],
  today: ["today", "day"],
  thisWeek: ["thisWeek", "week"],
  lastWeek: ["lastWeek"],
  thisMonth: ["thisMonth", "month"],
  lastMonth: ["lastMonth"],
  lastThreeMonth: ["lastThreeMonth", "lastThreeMonths", "threeMonth", "threeMonths"]
};

export default {
  name: "AdminSummary",
  data() {
    return {
      statisticsLoading: false,
      tableLoading: false,
      statistics: {},
      paymentTree: []
    };
  },
  computed: {
    statisticCards() {
      return PERIODS.map(item => ({
        ...item,
        amount: this.getPeriodValue(this.statistics, item.key, "amount"),
        count: this.getPeriodValue(this.statistics, item.key, "count")
      }));
    }
  },
  methods: {
    async refreshStatistics() {
      this.loadStatistics()
    },
    async loadStatistics() {
      this.statisticsLoading = true;
      try {
        const data = await merchantStatistics({});
        this.statistics = this.pickPayload(data);
      } finally {
        this.statisticsLoading = false;
      }
    },
    viewDetails() {
      this.$router.push({
        name: "VipSummaryEdit",
        query: {
          source: "adminSummary"
        }
      });
    },
    pickPayload(data) {
      if (!data) return {};
      return data.data || data.result || data.records || data;
    },
    pickList(data) {
      const payload = this.pickPayload(data);
      if (Array.isArray(payload)) return payload;
      if (Array.isArray(payload.records)) return payload.records;
      if (Array.isArray(payload.list)) return payload.list;
      if (Array.isArray(payload.dataList)) return payload.dataList;
      if (payload.page && Array.isArray(payload.page.records)) return payload.page.records;
      if (Array.isArray(data && data.page && data.page.records)) return data.page.records;
      return [];
    },
    normalizeRows(rows, parentKey = "") {
      return rows.map((row, index) => {
        const rowKey = row.id || row.userId || row.merchantNo || row.channelType || `${parentKey}${index}`;
        const children = row.children || row.childList || row.list || row.dataList || [];
        return {
          ...row,
          rowKey: `${parentKey}${rowKey}`,
          name: row.name || row.nickName || row.merchantName || row.channelName || row.providerName || row.userName,
          nodeTypeName: this.getNodeTypeName(row),
          nodeType: this.getNodeType(row),
          children: children.length ? this.normalizeRows(children, `${parentKey}${rowKey}-`) : undefined
        };
      });
    },
    getNodeType(row) {
      const type = row.nodeType || row.type || row.userKind || row.queryUserKind;
      if (type === 1 || type === "1" || type === "merchant") return "merchant";
      if (type === 2 || type === "2" || type === "channel") return "channel";
      if (type === 3 || type === "3" || type === "provider") return "provider";
      return row.channelType ? "channel" : "";
    },
    getNodeTypeName(row) {
      return row.nodeTypeName || row.typeName || row.userKindName || row.channelTypeName || row.roleName || "";
    },
    getPeriodValue(row, key, valueType) {
      const aliases = PERIOD_ALIASES[key] || [key];
      const suffixes = valueType === "amount" ? ["Amount", "Money", "Total", ""] : ["Count", "Num", "Number", "OrderCount"];

      for (const alias of aliases) {
        const periodValue = row && row[alias];
        if (periodValue && typeof periodValue === "object") {
          const nested = this.pickNestedValue(periodValue, valueType);
          if (nested !== undefined) return nested;
        }

        for (const suffix of suffixes) {
          const prop = `${alias}${suffix}`;
          if (row && row[prop] !== undefined) return row[prop];
        }
      }

      return 0;
    },
    pickNestedValue(value, valueType) {
      const props = valueType === "amount"
        ? ["amount", "money", "total", "successAmount"]
        : ["count", "num", "number", "orderCount", "successCount"];
      for (const prop of props) {
        if (value[prop] !== undefined) return value[prop];
      }
      return undefined;
    },
    formatMoney(value) {
      const number = Number(value || 0);
      return number.toFixed(2);
    },
    formatCount(value) {
      return Number(value || 0);
    }
  },
  mounted() {
    this.refreshStatistics();
  }
};
</script>

<style scoped>
.admin_summary_page {
  min-height: 100%;
  padding: 22px;
  background: #f3f7fb;
  color: #18345a;
}

.summary_header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
}

.summary_header h2,
.table_header h3 {
  margin: 0;
  font-weight: 800;
  color: #18345a;
}

.summary_header h2 {
  font-size: 34px;
  line-height: 1.2;
}

.summary_header p,
.table_header p {
  margin: 8px 0 0;
  color: #46617f;
}

.summary_actions {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  white-space: nowrap;
}

.stat_card_list {
  display: grid;
  grid-template-columns: repeat(7, minmax(120px, 1fr));
  gap: 12px;
  margin-bottom: 12px;
}

.stat_card {
  min-height: 108px;
  padding: 38px 28px 18px;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 1px 0 rgba(24, 52, 90, 0.04);
}

.stat_title {
  margin-bottom: 6px;
  font-size: 14px;
  color: #2f4a6c;
}

.stat_amount {
  font-size: 22px;
  line-height: 1.1;
  font-weight: 800;
  color: #00b887;
}

.stat_count,
.table_count {
  margin-top: 4px;
  font-size: 12px;
  color: #395779;
}

.detail_panel {
  height: calc(100vh - 292px);
  min-height: 420px;
  padding: 28px;
  border-radius: 6px;
  background: #fff;
}

.table_header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 12px;
}

.table_header h3 {
  font-size: 28px;
}

.node_name,
.table_amount {
  font-weight: 700;
  color: #0f2a4d;
}

.node_tag {
  display: inline-block;
  margin-left: 6px;
  padding: 2px 7px;
  border-radius: 5px;
  background: #eef4fb;
  color: #31506f;
  font-size: 12px;
  font-weight: 700;
}

.node_tag.merchant {
  background: #dcfae8;
  color: #00864f;
}

.node_tag.channel {
  background: #eef4fb;
  color: #31506f;
}

.node_tag.provider {
  background: #dbf2ff;
  color: #0079ad;
}

@media (max-width: 1400px) {
  .stat_card_list {
    grid-template-columns: repeat(4, minmax(160px, 1fr));
  }
}

@media (max-width: 900px) {
  .summary_header {
    flex-direction: column;
  }

  .stat_card_list {
    grid-template-columns: repeat(2, minmax(140px, 1fr));
  }

  .detail_panel {
    padding: 18px;
  }
}
</style>
