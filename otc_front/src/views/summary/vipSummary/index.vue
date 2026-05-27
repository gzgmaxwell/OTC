<template>
  <div class="vip_summary_page">
    <div class="summary_header">
      <div>
        <div class="summary_eyebrow">PAY888 OPEN API DEMO</div>
        <h2>{{ pageTitle }}</h2>
        <p>{{ pageDescription }}</p>
      </div>
      <span class="tree_badge">TREE</span>
    </div>

    <div class="stat_card_list" v-loading="loading">
      <div v-for="item in summaryCards" :key="item.key" class="stat_card">
        <div class="stat_title">{{ item.label }}</div>
        <div class="stat_amount">{{ formatMoney(item.successSystemAmount) }}</div>
        <div class="stat_count">{{ formatCount(item.successCount) }} 笔成功类订单</div>
      </div>
    </div>

    <div class="detail_panel">
      <div class="table_header">
        <div>
          <h3>树状收款明细</h3>
          <p>按“商户 - 自有通道 - 支付通道提供者 - 下级商户”展开。</p>
        </div>
      </div>

      <div class="table_wrap">
        <el-table
          ref="paymentTable"
          v-loading="loading"
          :data="paymentTree"
          row-key="id"
          :default-expand-all="true"
          :tree-props="{ children: 'children' }"
          border
          stripe
          height="100%"
          style="width: 100%;"
        >
          <el-table-column prop="name" label="收款节点" min-width="320">
            <template slot-scope="scope">
              <div class="node">
                <span v-if="isBranchNode(scope.row)" class="toggle_spacer"></span>
                <span v-else class="toggle_spacer toggle_spacer_leaf"></span>
                <div class="node_main">
                  <div class="node_title">
                    <span>{{ scope.row.name || "--" }}</span>
                    <span :class="['node_tag', scope.row.nodeType]">{{ scope.row.nodeTypeName }}</span>
                  </div>
                  <div class="node_meta">
                    {{ scope.row.merchantNo ? `商户号：${scope.row.merchantNo}` : scope.row.id }}
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-for="period in periods"
            :key="period.key"
            :label="period.label"
            min-width="130"
          >
            <template slot-scope="scope">
              <div class="metric">
                <strong>{{ formatMoney(getPeriodValue(scope.row.values, period.key).successSystemAmount) }}</strong>
                <span>{{ formatCount(getPeriodValue(scope.row.values, period.key).successCount) }} 笔</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { merchantStatistics } from "@a/summary";

const NODE_TYPE_NAME = {
  merchant: "商户",
  channel: "自有通道",
  provider: "支付通道提供者"
};

const USE_MOCK_DATA = true;

const MOCK_RESPONSE = {
  code: 0,
  message: "成功",
  data: {
    merchantNo: "6448346",
    merchantName: "演示商户A",
    summary: "这是商户 演示商户A 以及自有通道、下级商户、支付通道提供者的收款统计。",
    periods: [
      { key: "lastHour", label: "一小时内" },
      { key: "today", label: "今天" },
      { key: "thisWeek", label: "本周" },
      { key: "lastWeek", label: "上周" },
      { key: "thisMonth", label: "本月" },
      { key: "lastMonth", label: "上月" },
      { key: "lastThreeMonths", label: "最近三个月" }
    ],
    total: [
      value("lastHour", "一小时内", 3, "188.00"),
      value("today", "今天", 18, "1288.00"),
      value("thisWeek", "本周", 73, "5896.00"),
      value("lastWeek", "上周", 121, "9530.00"),
      value("thisMonth", "本月", 389, "30520.00"),
      value("lastMonth", "上月", 420, "33880.00"),
      value("lastThreeMonths", "最近三个月", 1112, "90600.00")
    ],
    merchant: {
      id: "merchant:10001",
      name: "演示商户A",
      role: "商户",
      merchantNo: "6448346",
      level: 0,
      values: [
        value("lastHour", "一小时内", 2, "138.00"),
        value("today", "今天", 11, "808.00"),
        value("thisWeek", "本周", 45, "3650.00"),
        value("lastWeek", "上周", 78, "6120.00"),
        value("thisMonth", "本月", 240, "18800.00"),
        value("lastMonth", "上月", 260, "21000.00"),
        value("lastThreeMonths", "最近三个月", 690, "56000.00")
      ],
      selfChannel: {
        isSelfOwned: true,
        typeText: "自有通道",
        values: [
          value("lastHour", "一小时内", 1, "58.00"),
          value("today", "今天", 3, "168.00"),
          value("thisWeek", "本周", 12, "920.00"),
          value("lastWeek", "上周", 23, "1780.00"),
          value("thisMonth", "本月", 82, "6200.00"),
          value("lastMonth", "上月", 80, "6600.00"),
          value("lastThreeMonths", "最近三个月", 215, "17600.00")
        ]
      },
      paymentChannelProviders: [
        {
          id: "provider:20001",
          name: "通道提供者张三",
          role: "支付通道提供者",
          merchantNo: "6448346",
          level: 1,
          values: [
            value("lastHour", "一小时内", 1, "80.00"),
            value("today", "今天", 6, "480.00"),
            value("thisWeek", "本周", 25, "2090.00"),
            value("lastWeek", "上周", 43, "3440.00"),
            value("thisMonth", "本月", 128, "10200.00"),
            value("lastMonth", "上月", 140, "11200.00"),
            value("lastThreeMonths", "最近三个月", 380, "30800.00")
          ],
          children: []
        }
      ],
      children: [
        {
          id: "merchant:10002",
          name: "下级商户B",
          role: "商户",
          merchantNo: "7788990",
          level: 1,
          values: [
            value("lastHour", "一小时内", 1, "50.00"),
            value("today", "今天", 7, "480.00"),
            value("thisWeek", "本周", 28, "2246.00"),
            value("lastWeek", "上周", 43, "3410.00"),
            value("thisMonth", "本月", 149, "11720.00"),
            value("lastMonth", "上月", 160, "12880.00"),
            value("lastThreeMonths", "最近三个月", 422, "34600.00")
          ],
          selfChannel: {
            isSelfOwned: true,
            typeText: "自有通道",
            values: [
              value("lastHour", "一小时内", 1, "50.00"),
              value("today", "今天", 4, "260.00"),
              value("thisWeek", "本周", 15, "1200.00"),
              value("lastWeek", "上周", 21, "1680.00"),
              value("thisMonth", "本月", 80, "6200.00"),
              value("lastMonth", "上月", 90, "7200.00"),
              value("lastThreeMonths", "最近三个月", 240, "19600.00")
            ]
          },
          paymentChannelProviders: [
            {
              id: "provider:30001",
              name: "子商户通道提供者王五",
              role: "支付通道提供者",
              merchantNo: "7788990",
              level: 2,
              values: [
                value("lastHour", "一小时内", 0, "0.00"),
                value("today", "今天", 3, "220.00"),
                value("thisWeek", "本周", 13, "1046.00"),
                value("lastWeek", "上周", 22, "1730.00"),
                value("thisMonth", "本月", 69, "5520.00"),
                value("lastMonth", "上月", 70, "5680.00"),
                value("lastThreeMonths", "最近三个月", 182, "15000.00")
              ],
              children: []
            }
          ],
          children: []
        }
      ]
    }
  }
};

export default {
  name: "VipSummary",
  data() {
    return {
      loading: false,
      periods: [],
      totals: [],
      merchantRoot: null
    };
  },
  computed: {
    pageTitle() {
      return this.merchantRoot
        ? `${this.merchantRoot.name || this.merchantRoot.merchantNo} 收款统计`
        : "商户收款统计";
    },
    pageDescription() {
      return this.merchantRoot && this.merchantRoot.summary
        ? this.merchantRoot.summary
        : "展示当前账号可见商户树的成功类收款数据。";
    },
    summaryCards() {
      return this.periods.map(period => ({
        ...period,
        ...this.getPeriodValue(this.totals, period.key)
      }));
    },
    paymentTree() {
      return this.merchantRoot ? [this.buildMerchantNode(this.merchantRoot)] : [];
    }
  },
  methods: {
    async loadStatistics() {
      this.loading = true;
      try {
        const data = USE_MOCK_DATA
          ? await this.loadMockStatistics()
          : await this.loadRemoteStatistics();
        this.applyStatistics(data);
      } finally {
        this.loading = false;
      }
    },
    async loadMockStatistics() {
      return MOCK_RESPONSE.data;
    },
    async loadRemoteStatistics() {
      const res = await merchantStatistics({});
      return (res && res.data) || res || {};
    },
    applyStatistics(data) {
      this.periods = Array.isArray(data.periods) ? data.periods : [];
      this.totals = Array.isArray(data.total) ? data.total : [];
      this.merchantRoot = data.merchant || null;
      this.$nextTick(() => {
        this.$refs.paymentTable && this.$refs.paymentTable.doLayout();
      });
    },
    buildMerchantNode(merchant) {
      const children = [];

      children.push({
        id: `${merchant.id}:self`,
        name: `${merchant.name || merchant.merchantNo} 自有通道`,
        nodeType: "channel",
        nodeTypeName: NODE_TYPE_NAME.channel,
        merchantNo: merchant.merchantNo,
        values: this.getChannelValues(merchant.selfChannel)
      });

      (merchant.paymentChannelProviders || []).forEach(provider => {
        children.push(this.buildProviderNode(provider));
      });

      (merchant.children || []).forEach(child => {
        children.push(this.buildMerchantNode(child));
      });

      return {
        id: merchant.id,
        name: merchant.name || merchant.merchantNo,
        nodeType: "merchant",
        nodeTypeName: NODE_TYPE_NAME.merchant,
        merchantNo: merchant.merchantNo,
        values: merchant.values || [],
        children
      };
    },
    buildProviderNode(provider) {
      return {
        id: provider.id,
        name: provider.name || provider.id,
        nodeType: "provider",
        nodeTypeName: NODE_TYPE_NAME.provider,
        merchantNo: provider.merchantNo,
        values: provider.values || [],
        children: Array.isArray(provider.children)
          ? provider.children.map(child => this.buildProviderNode(child))
          : []
      };
    },
    getChannelValues(channel) {
      if (channel && Array.isArray(channel.values)) {
        return channel.values;
      }
      return this.createEmptyValues();
    },
    createEmptyValues() {
      return this.periods.map(period => ({
        periodKey: period.key,
        periodLabel: period.label,
        successCount: 0,
        successSystemAmount: "0.00"
      }));
    },
    getPeriodValue(values, periodKey) {
      if (!Array.isArray(values)) {
        return {
          successCount: 0,
          successSystemAmount: "0.00"
        };
      }

      return (
        values.find(item => item.periodKey === periodKey) || {
          successCount: 0,
          successSystemAmount: "0.00"
        }
      );
    },
    formatMoney(value) {
      return Number(value || 0).toFixed(2);
    },
    formatCount(value) {
      return Number(value || 0);
    },
    isBranchNode(row) {
      return Array.isArray(row.children) && row.children.length > 0;
    },
    switchToRemoteData() {
      this.loading = true;
      return this.loadRemoteStatistics()
        .then(data => {
          this.applyStatistics(data);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  mounted() {
    this.loadStatistics();
  }
};

function value(periodKey, periodLabel, successCount, successSystemAmount) {
  return {
    periodKey,
    periodLabel,
    successCount,
    successSystemAmount
  };
}
</script>

<style scoped>
.vip_summary_page {
  height: 100%;
  padding: 18px;
  background: #f3f7fb;
  color: #18345a;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.summary_header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.summary_eyebrow {
  margin-bottom: 8px;
  color: #587294;
  font-size: 12px;
  font-weight: 800;
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

.tree_badge {
  display: inline-block;
  align-self: flex-start;
  padding: 3px 8px;
  border-radius: 5px;
  background: #dbf2ff;
  color: #0079ad;
  font-size: 12px;
  font-weight: 800;
}

.stat_card_list {
  display: grid;
  grid-template-columns: repeat(7, minmax(120px, 1fr));
  gap: 12px;
  margin-bottom: 12px;
}

.stat_card {
  min-height: 116px;
  padding: 18px 20px;
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
  color: #0066ff;
}

.stat_count {
  margin-top: 4px;
  font-size: 12px;
  color: #395779;
}

.detail_panel {
  flex: 1;
  min-height: 0;
  padding: 28px;
  border-radius: 6px;
  background: #fff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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

.table_wrap {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  display: flex;
}

.table_wrap :deep(.el-table) {
  width: 100%;
  height: 100%;
}

.table_wrap :deep(.el-table__body-wrapper) {
  overflow: auto;
}

.node {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  min-height: 28px;
}

.toggle_spacer {
  width: 18px;
  flex: 0 0 auto;
}

.toggle_spacer_leaf {
  opacity: 0;
}

.node_main {
  display: grid;
  gap: 4px;
  min-width: 0;
}

.node_title {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
  font-weight: 800;
  word-break: break-word;
}

.node_meta {
  font-size: 12px;
  line-height: 1.4;
  color: #587294;
}

.node_tag {
  display: inline-block;
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

.metric {
  display: grid;
  gap: 4px;
}

.metric strong {
  font-size: 15px;
  color: #0f2a4d;
}

.metric span {
  font-size: 12px;
  color: #395779;
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
