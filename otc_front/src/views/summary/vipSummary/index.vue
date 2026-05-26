<template>
  <div class="admin_summary_page">
    <div class="summary_header">
      <div>
        <div class="summary_eyebrow">COLLECTION STATISTICS</div>
        <h2>订单统计</h2>
        <p>展示当前账号可见商户树的成功类收款数据。</p>
      </div>
      <div class="summary_actions">
        <el-button icon="el-icon-refresh" :loading="statisticsLoading" @click="loadStatistics">
          刷新统计
        </el-button>
        <el-button type="primary" @click="viewDetails">查看详情</el-button>
      </div>
    </div>

    <div class="stat_card_list" v-loading="statisticsLoading">
      <div v-for="item in statisticCards" :key="item.key" class="stat_card">
        <div class="stat_title">{{ item.label }}</div>
        <div class="stat_amount">
          {{ formatMoney(item.successSystemAmount) }}
        </div>
        <div class="stat_count">
          {{ formatCount(item.successCount) }} 笔成功类订单
        </div>
      </div>
    </div>

    <div class="detail_panel">
      <div class="table_header">
        <div>
          <h3>树状收款明细</h3>
          <p>按“商户 - 自有通道 - 提供者 - 下级商户”展开。</p>
        </div>
        <span class="tree_badge">TREE</span>
      </div>

      <el-table ref="paymentTable" v-loading="statisticsLoading" :data="paymentTree" row-key="id" default-expand-all
        :tree-props="{ children: 'children' }" height="100%" style="width: 100%;">
        <el-table-column prop="name" label="收款节点" min-width="260">
          <template slot-scope="scope">
            <span class="node_name">{{ scope.row.name || "--" }}</span>
            <span :class="['node_tag', scope.row.nodeType]">
              {{ scope.row.nodeTypeName }}
            </span>
          </template>
        </el-table-column>
        <el-table-column v-for="period in periods" :key="period.key" :label="period.label" min-width="130">
          <template slot-scope="scope">
            <div class="table_amount">
              {{
                formatMoney(
                  getPeriodValue(scope.row.values, period.key)
                    .successSystemAmount
                )
              }}
            </div>
            <div class="table_count">
              {{
                formatCount(
                  getPeriodValue(scope.row.values, period.key).successCount
                )
              }}
              笔
            </div>
          </template>
        </el-table-column>
      </el-table>
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

export default {
  name: "VipSummary",
  data() {
    return {
      statisticsLoading: false,
      periods: [],
      totals: [],
      rows: []
    };
  },
  computed: {
    statisticCards() {
      return this.periods.map(period => ({
        ...period,
        ...this.getPeriodValue(this.totals, period.key)
      }));
    },
    paymentTree() {
      return this.buildPaymentTree(this.rows);
    }
  },
  methods: {
    async loadStatistics() {
      this.statisticsLoading = true;
      try {
        const res = await merchantStatistics({});
        const data = res && res.periods ? res : res && res.data ? res.data : {};
        this.periods = Array.isArray(data.periods) ? data.periods : [];
        this.totals = Array.isArray(data.total) ? data.total : [];
        this.rows = Array.isArray(data.rows) ? data.rows : [];
        this.$nextTick(() => {
          this.$refs.paymentTable && this.$refs.paymentTable.doLayout();
        });
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
    buildPaymentTree(rows) {
      const merchants = rows.filter(row => row.scopeType === "merchant");
      const providers = rows.filter(row => row.scopeType === "provider");
      const merchantMap = {};
      const roots = [];

      merchants.forEach(row => {
        merchantMap[row.id] = {
          ...row,
          nodeType: "merchant",
          nodeTypeName: NODE_TYPE_NAME.merchant,
          ownValues: row.values || [],
          values: this.createEmptyValues(),
          children: []
        };
      });

      merchants.forEach(row => {
        const node = merchantMap[row.id];
        const parent = merchantMap[row.parentId];
        if (parent) {
          parent.children.push(node);
        } else {
          roots.push(node);
        }
      });

      providers.forEach(row => {
        const parent = merchantMap[row.parentId];
        if (!parent) return;
        parent.children.push({
          ...row,
          nodeType: "provider",
          nodeTypeName: NODE_TYPE_NAME.provider,
          values: row.values || []
        });
      });

      roots.forEach(root => {
        this.fillMerchantNode(root);
      });

      return roots;
    },
    fillMerchantNode(node) {
      const merchantChildren = node.children.filter(
        child => child.nodeType === "merchant"
      );
      const providerChildren = node.children.filter(
        child => child.nodeType === "provider"
      );
      const ownChannelNode = {
        id: `${node.id}:own-channel`,
        name: `${node.name} 自有通道`,
        nodeType: "channel",
        nodeTypeName: NODE_TYPE_NAME.channel,
        values: node.ownValues
      };

      merchantChildren.forEach(child => {
        this.fillMerchantNode(child);
      });

      node.values = this.sumValues([
        node.ownValues,
        ...merchantChildren.map(child => child.values),
        ...providerChildren.map(child => child.values)
      ]);
      node.children = [
        ownChannelNode,
        ...merchantChildren,
        ...providerChildren
      ];
      delete node.ownValues;
    },
    createEmptyValues() {
      return this.periods.map(period => ({
        periodKey: period.key,
        successCount: 0,
        successSystemAmount: "0.00"
      }));
    },
    sumValues(valueGroups) {
      return this.periods.map(period => {
        const total = valueGroups.reduce(
          (acc, values) => {
            const value = this.getPeriodValue(values, period.key);
            return {
              successCount: acc.successCount + Number(value.successCount || 0),
              successSystemAmount:
                acc.successSystemAmount + Number(value.successSystemAmount || 0)
            };
          },
          {
            successCount: 0,
            successSystemAmount: 0
          }
        );

        return {
          periodKey: period.key,
          successCount: total.successCount,
          successSystemAmount: total.successSystemAmount.toFixed(2)
        };
      });
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
      const number = Number(value || 0);
      return number.toFixed(2);
    },
    formatCount(value) {
      return Number(value || 0);
    }
  },
  mounted() {
    this.loadStatistics();
  }
};
</script>

<style scoped>
.admin_summary_page {
  min-height: 100%;
  padding: 18px;
  background: #f3f7fb;
  color: #18345a;
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
  min-height: 116px;
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
  height: calc(100vh - 310px);
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

.tree_badge {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 5px;
  background: #dbf2ff;
  color: #0079ad;
  font-size: 12px;
  font-weight: 800;
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
