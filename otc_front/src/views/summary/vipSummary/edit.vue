<template>
  <div class="edit_page">
    <div class="top_box">
      <div class="title">查看信息</div>
      <div>
        <el-button @click="backTo">返回</el-button>
      </div>
    </div>
    <div class="edit_content">
      <div class="list_page">
        <div class="top_wrapper">
          <div class="search_box">
            <el-input
              placeholder="本系统流水号"
              v-model="params.systemOrderNo"
              style="width: 220px;"
              @keyup.enter.native="search"
            ></el-input>
            <el-input
              placeholder="上游流水号"
              v-model="params.upstreamOrderNo"
              style="width: 220px; margin-left: 10px;"
              @keyup.enter.native="search"
            ></el-input>
            <el-button type="primary" icon="el-icon-search" @click="search">
              搜索
            </el-button>
            <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
          </div>
        </div>
        <div class="table_wrapper payment_order_table">
          <el-table
            ref="multipleTable"
            :data="list"
            border
            height="100%"
            stripe
            style="width: 100%"
          >
            <el-table-column
              prop="systemOrderNo"
              label="本系统流水号"
              min-width="160"
            ></el-table-column>
            <el-table-column
              prop="upstreamOrderNo"
              label="上游流水号"
              min-width="170"
            ></el-table-column>
            <el-table-column
              prop="productName"
              label="商品名称"
              min-width="90"
            ></el-table-column>
            <el-table-column label="商户" min-width="190">
              <template slot-scope="scope">
                {{ formatMerchant(scope.row) }}
              </template>
            </el-table-column>
            <el-table-column
              prop="paymentChannelName"
              label="支付通道"
              min-width="140"
            ></el-table-column>
            <el-table-column label="支付类型" min-width="110">
              <template slot-scope="scope">
                {{ formatPaymentType(scope.row.paymentType) }}
              </template>
            </el-table-column>
            <el-table-column label="通道类型" min-width="100">
              <template slot-scope="scope">
                {{ formatChannelType(scope.row.channelType) }}
              </template>
            </el-table-column>
            <el-table-column label="上游金额" min-width="100" align="right">
              <template slot-scope="scope">
                {{ formatAmount(scope.row.upstreamAmount) }}
              </template>
            </el-table-column>
            <el-table-column label="本系统金额" min-width="110" align="right">
              <template slot-scope="scope">
                {{ formatAmount(scope.row.systemAmount) }}
              </template>
            </el-table-column>
            <el-table-column label="当前状态" min-width="90" align="center">
              <template slot-scope="scope">
                <span
                  :class="['status_tag', getOrderStatus(scope.row.status).type]"
                >
                  {{ getOrderStatus(scope.row.status).label }}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="回调状态" min-width="90" align="center">
              <template slot-scope="scope">
                <span
                  :class="[
                    'status_tag',
                    scope.row.isCallbackSent ? 'success' : 'warning'
                  ]"
                >
                  {{ scope.row.isCallbackSent ? "已回调" : "未回调" }}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="补发状态" min-width="90" align="center">
              <template slot-scope="scope">
                <span
                  :class="[
                    'status_tag',
                    scope.row.isManualResend ? 'primary' : 'default'
                  ]"
                >
                  {{ scope.row.isManualResend ? "手动补发" : "系统默认" }}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="callbackRetryCount"
              label="反推次数"
              min-width="90"
              align="center"
            ></el-table-column>
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
    </div>
  </div>
</template>

<script>
import { paymentOrdersList } from "@a/summary";

const PAYMENT_TYPE_MAP = {
  wxpay: "微信",
  wechat: "微信",
  alipay: "支付宝",
  bank: "银行卡",
  bankcard: "银行卡",
  "bank-card": "银行卡",
  unionpay: "银行卡"
};

const ORDER_STATUS_MAP = {
  0: { label: "待支付", type: "default" },
  1: { label: "支付中", type: "primary" },
  2: { label: "已过期", type: "default" },
  3: { label: "已完成", type: "success" },
  4: { label: "已失败", type: "danger" },
  5: { label: "已取消", type: "default" }
};

export default {
  name: "VipSummaryEdit",
  data() {
    return {
      params: {
        size: 10,
        current: 1
      },
      total: 0,
      list: []
    };
  },
  methods: {
    search() {
      this.params.current = 1;
      this.List();
    },
    reset() {
      this.params = {
        size: 10,
        current: 1
      };
      this.List();
    },
    async List() {
      const data = await paymentOrdersList(this.params);
      const page = this.pickPage(data);
      this.total = Number(page.total || page.records.length || 0);
      this.list = page.records;
      this.$nextTick(() => {
        this.$refs.multipleTable && this.$refs.multipleTable.doLayout();
      });
    },
    pickPage(data) {
      const payload = data && (data.data || data.result || data.page || data);

      if (Array.isArray(payload)) {
        return {
          total: payload.length,
          records: payload
        };
      }

      if (payload && Array.isArray(payload.records)) {
        return {
          total: payload.total,
          records: payload.records
        };
      }

      if (payload && payload.page && Array.isArray(payload.page.records)) {
        return {
          total: payload.page.total,
          records: payload.page.records
        };
      }

      if (payload && Array.isArray(payload.list)) {
        return {
          total: payload.total,
          records: payload.list
        };
      }

      return {
        total: 0,
        records: []
      };
    },
    sizeChange(val) {
      this.params.size = val;
      this.params.current = 1;
      this.List();
    },
    changePage(val) {
      this.params.current = val;
      this.List();
    },
    formatMerchant(row) {
      const name = row.merchantNickname || row.merchantName || "--";
      return row.merchantNo ? `${name} (${row.merchantNo})` : name;
    },
    formatPaymentType(value) {
      return PAYMENT_TYPE_MAP[value] || value || "--";
    },
    formatChannelType(value) {
      if (!value) return "--";
      return `${String(value).toUpperCase()} 通道`;
    },
    formatAmount(value) {
      const number = Number(value || 0);
      return `${number.toFixed(2)} 元`;
    },
    getOrderStatus(value) {
      return (
        ORDER_STATUS_MAP[value] || {
          label: value === undefined || value === null ? "--" : String(value),
          type: "default"
        }
      );
    },
    backTo() {
      this.$router.push({
        name: "VipSummary"
      });
    }
  },
  mounted() {
    this.search();
  }
};
</script>

<style scoped>
.payment_order_table {
  height: calc(100% - 110px);
}

.status_tag {
  display: inline-block;
  min-width: 50px;
  padding: 2px 8px;
  border-radius: 6px;
  background: #eef4fb;
  color: #0f2a4d;
  font-size: 12px;
  font-weight: 700;
  line-height: 18px;
}

.status_tag.success {
  background: #dcfae8;
  color: #00864f;
}

.status_tag.warning {
  background: #ffe8cc;
  color: #d84a00;
}

.status_tag.primary {
  background: #dbf2ff;
  color: #0079ad;
}

.status_tag.danger {
  background: #ffe1e1;
  color: #c62828;
}

.status_tag.default {
  background: #eef4fb;
  color: #0f2a4d;
}
</style>
