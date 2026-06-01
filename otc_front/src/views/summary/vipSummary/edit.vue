<template>
  <div class="payment_orders_page">
    <section class="orders_header">
      <div>
        <h1>支付订单列表</h1>
        <p>
          共 {{ total }} 笔支付订单，当前第 {{ params.current }} 页展示
          {{ list.length }} 笔，便于你按商户、状态和通道类型快速筛查。
        </p>
      </div>
    </section>

    <section class="summary_cards">
      <article class="summary_card">
        <span>订单总数</span>
        <strong>{{ total }}</strong>
        <p>列表按创建时间倒序展示，方便优先查看最新订单的支付状态和回调情况。</p>
      </article>
      <article class="summary_card">
        <span>最近订单号</span>
        <strong>{{ latestOrderNo }}</strong>
        <p>可直接对照本系统流水号和上游流水号，快速定位最新一笔订单。</p>
      </article>
      <article class="summary_card">
        <span>本页成功数</span>
        <strong>{{ pageSuccessCount }}</strong>
        <p>当前页已支付成功的订单数量会即时汇总，便于快速判断近期转化情况。</p>
      </article>
    </section>

    <section class="filter_panel">
      <el-form :model="params" label-position="top" class="filter_form">
        <el-form-item label="关键词">
          <el-input
            v-model.trim="params.keyword"
            clearable
            placeholder="输入订单号、商品名或商户号"
            @keyup.enter.native="search"
          />
        </el-form-item>
        <el-form-item label="商户">
          <el-select v-model="params.merchantNo" clearable placeholder="全部商户">
            <el-option label="全部商户" value="" />
            <el-option
              v-for="item in merchantOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="params.status" clearable placeholder="全部状态">
            <el-option
              v-for="item in orderStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="支付类型">
          <el-select v-model="params.paymentType" clearable placeholder="全部支付类型">
            <el-option
              v-for="item in paymentTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="通道类型">
          <el-select v-model="params.channelType" clearable placeholder="全部通道类型">
            <el-option
              v-for="item in channelTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="timeRange"
            type="datetimerange"
            clearable
            unlink-panels
            range-separator="至"
            start-placeholder="选择开始时间"
            end-placeholder="选择结束时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="handleTimeChange"
          />
        </el-form-item>
        <div class="filter_actions">
          <el-button type="success" icon="el-icon-search" :loading="loading" @click="search">
            查询
          </el-button>
          <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
        </div>
      </el-form>
    </section>

    <section class="orders_table_panel">
      <div class="table_title">
        <div>
          <h2>订单列表</h2>
          <p>统一查看订单状态、通道归属、金额差异、回调情况与时间轨迹，便于排查异常和核账。</p>
        </div>
        <span>第 {{ params.current }} / {{ pageCount }} 页</span>
      </div>

      <div class="table_wrap" v-loading="loading">
        <table class="orders_table">
          <thead>
            <tr>
              <th>本系统流水号</th>
              <th>上游流水号</th>
              <th>商品名称</th>
              <th>商户</th>
              <th>支付通道</th>
              <th>支付类型</th>
              <th>通道类型</th>
              <th>上游金额</th>
              <th>本系统金额</th>
              <th>当前状态</th>
              <th>回调状态</th>
              <th>补发状态</th>
              <th>反推次数</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in list" :key="row.systemOrderNo || row.id">
              <td>{{ row.systemOrderNo || "--" }}</td>
              <td>{{ row.upstreamOrderNo || "--" }}</td>
              <td class="strong_cell">{{ row.productName || "--" }}</td>
              <td>{{ formatMerchant(row) }}</td>
              <td>{{ formatPaymentChannel(row) }}</td>
              <td>{{ formatPaymentType(row) }}</td>
              <td>{{ formatChannelType(row) }}</td>
              <td>{{ formatAmount(row.upstreamAmount) }}</td>
              <td>{{ formatAmount(row.systemAmount) }}</td>
              <td>
                <span :class="['status_tag', getOrderStatus(row).type]">
                  {{ getOrderStatus(row).label }}
                </span>
              </td>
              <td>
                <span :class="['status_tag', isCallbackSent(row) ? 'success' : 'warning']">
                  {{ isCallbackSent(row) ? "已回调" : "未回调" }}
                </span>
              </td>
              <td>
                <span :class="['status_tag', isManualResend(row) ? 'primary' : 'default']">
                  {{ isManualResend(row) ? "手动补发" : "系统默认" }}
                </span>
              </td>
              <td>{{ getCallbackRetryCount(row) }}</td>
            </tr>
            <tr v-if="!loading && list.length === 0">
              <td class="empty_cell" colspan="13">暂无订单数据</td>
            </tr>
          </tbody>
        </table>
      </div>

      <el-pagination
        class="orders_pagination"
        background
        :current-page="params.current"
        :page-sizes="[10, 20, 30]"
        :page-size="params.size"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="sizeChange"
        @current-change="changePage"
      />
    </section>
  </div>
</template>

<script>
import { paymentOrdersList } from "@a/summary";

const MERCHANT_OPTIONS = [
  { label: "pay888（3856625）", value: "3856625" },
  { label: "安仔供888pay（3208633）", value: "3208633" }
];

const ORDER_STATUS_OPTIONS = [
  { label: "全部状态", value: "" },
  { label: "待支付", value: 0 },
  { label: "支付成功", value: 1 },
  { label: "已过期", value: 2 },
  { label: "处理中", value: 3 },
  { label: "未知问题", value: 5 }
];

const PAYMENT_TYPE_OPTIONS = [
  { label: "全部支付类型", value: "" },
  { label: "支付宝", value: "alipay" },
  { label: "微信", value: "wechat" },
  { label: "支付宝转卡", value: "alipay_card" },
  { label: "银行卡转卡", value: "bank_card" }
];

const CHANNEL_TYPE_OPTIONS = [
  { label: "全部通道类型", value: "" },
  { label: "A 通道", value: "a" }
];

const STATUS_DISPLAY = {
  0: { label: "待支付", type: "default" },
  1: { label: "支付成功", type: "success" },
  2: { label: "已过期", type: "default" },
  3: { label: "处理中", type: "primary" },
  4: { label: "未知问题", type: "danger" },
  5: { label: "未知问题", type: "danger" }
};

const PAYMENT_TYPE_DISPLAY = {
  alipay: "支付宝",
  aliPay: "支付宝",
  wxpay: "微信",
  wechat: "微信",
  wx: "微信",
  alipay_card: "支付宝转卡",
  alipayCard: "支付宝转卡",
  bank_card: "银行卡转卡",
  bankCard: "银行卡转卡",
  bank: "银行卡转卡"
};

export default {
  name: "VipSummaryEdit",
  data() {
    return {
      loading: false,
      timeRange: [],
      params: this.defaultParams(),
      total: 0,
      list: [],
      merchantOptions: MERCHANT_OPTIONS,
      orderStatusOptions: ORDER_STATUS_OPTIONS,
      paymentTypeOptions: PAYMENT_TYPE_OPTIONS,
      channelTypeOptions: CHANNEL_TYPE_OPTIONS
    };
  },
  computed: {
    latestOrderNo() {
      const first = this.list[0] || {};
      return first.systemOrderNo || "--";
    },
    pageSuccessCount() {
      return this.list.filter(row => Number(row.status) === 1 || row.statusText === "支付成功")
        .length;
    },
    pageCount() {
      return Math.max(Math.ceil(this.total / this.params.size), 1);
    }
  },
  methods: {
    defaultParams() {
      return {
        current: 1,
        size: 20,
        keyword: "",
        merchantNo: "",
        status: "",
        paymentType: "",
        channelType: "",
        createdAtFrom: "",
        createdAtTo: "",
        descs: "created_at"
      };
    },
    search() {
      this.params.current = 1;
      this.loadList();
    },
    reset() {
      this.timeRange = [];
      this.params = this.defaultParams();
      this.loadList();
    },
    handleTimeChange(value) {
      this.params.createdAtFrom = value && value[0] ? value[0] : "";
      this.params.createdAtTo = value && value[1] ? value[1] : "";
    },
    async loadList() {
      this.loading = true;
      try {
        const res = await paymentOrdersList(this.buildQuery());
        const data = this.normalizeResponse(res);
        this.total = data.total;
        this.params.current = data.current;
        this.params.size = data.size;
        this.list = data.items;
      } finally {
        this.loading = false;
      }
    },
    buildQuery() {
      const query = {};
      Object.keys(this.params).forEach(key => {
        const value = this.params[key];
        if (value !== "" && value !== null && value !== undefined) {
          query[key] = value;
        }
      });
      query.page = this.params.current;
      query.pageSize = this.params.size;
      return query;
    },
    normalizeResponse(res) {
      const data = res && res.data ? res.data : res || {};
      const items = data.items || data.records || data.list || [];
      return {
        total: Number(data.total || 0),
        current: Number(data.current || data.page || this.params.current || 1),
        size: Number(data.size || data.pageSize || this.params.size || 20),
        items: Array.isArray(items) ? items : []
      };
    },
    sizeChange(size) {
      this.params.size = size;
      this.params.current = 1;
      this.loadList();
    },
    changePage(page) {
      this.params.current = page;
      this.loadList();
    },
    formatMerchant(row) {
      if (row.entryMerchant && row.entryMerchant.displayName) {
        return row.entryMerchant.displayName;
      }
      const name = row.merchantNickname || row.merchantName || row.merchant || "--";
      const no = row.merchantNo || row.entryMerchantNo;
      return no ? `${name}（${no}）` : name;
    },
    formatPaymentChannel(row) {
      if (row.paymentChannel && row.paymentChannel.displayName) {
        return row.paymentChannel.displayName;
      }
      return row.paymentChannelName || row.channelName || "--";
    },
    formatPaymentType(row) {
      return row.paymentTypeText || PAYMENT_TYPE_DISPLAY[row.paymentType] || row.paymentType || "--";
    },
    formatChannelType(row) {
      if (row.channelTypeText) return row.channelTypeText;
      if (!row.channelType) return "--";
      return `${String(row.channelType).toUpperCase()} 通道`;
    },
    formatAmount(value) {
      const number = Number(value || 0);
      return `${number.toFixed(2)} 元`;
    },
    getOrderStatus(row) {
      if (row.statusText) {
        const match = Object.values(STATUS_DISPLAY).find(item => item.label === row.statusText);
        return match || { label: row.statusText, type: "default" };
      }
      return (
        STATUS_DISPLAY[row.status] || {
          label: row.status === undefined || row.status === null ? "--" : String(row.status),
          type: "default"
        }
      );
    },
    isCallbackSent(row) {
      if (row.callback && row.callback.isCallbackSent !== undefined) {
        return row.callback.isCallbackSent;
      }
      return Boolean(row.isCallbackSent);
    },
    isManualResend(row) {
      if (row.callback && row.callback.isManualResend !== undefined) {
        return row.callback.isManualResend;
      }
      return Boolean(row.isManualResend);
    },
    getCallbackRetryCount(row) {
      if (row.callback && row.callback.callbackRetryCount !== undefined) {
        return row.callback.callbackRetryCount;
      }
      return row.callbackRetryCount || 0;
    }
  },
  mounted() {
    this.loadList();
  }
};
</script>

<style scoped>
.payment_orders_page {
  height: 100%;
  padding: 18px 20px 28px;
  background: #eef3f9;
  color: #082348;
  overflow-y: auto;
}

.orders_header {
  margin-bottom: 22px;
}

.orders_header h1 {
  margin: 0;
  font-size: 34px;
  line-height: 1;
  font-weight: 800;
  color: #17365d;
}

.orders_header p {
  margin: 8px 0 0;
  font-size: 14px;
  color: #17365d;
}

.summary_cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 22px;
}

.summary_card,
.filter_panel,
.orders_table_panel {
  border-radius: 6px;
  background: #fff;
}

.summary_card {
  min-height: 206px;
  padding: 28px;
}

.summary_card span {
  display: block;
  margin-bottom: 26px;
  font-size: 14px;
  font-weight: 700;
}

.summary_card strong {
  display: block;
  min-height: 43px;
  margin-bottom: 18px;
  font-size: 30px;
  line-height: 1.2;
  font-weight: 800;
  color: #243b5a;
  word-break: break-all;
}

.summary_card p {
  margin: 0;
  font-size: 14px;
  line-height: 1.8;
  color: #09264c;
}

.filter_panel {
  margin-bottom: 30px;
  padding: 26px 28px 28px;
}

.filter_form {
  display: grid;
  grid-template-columns: repeat(4, minmax(180px, 1fr));
  column-gap: 14px;
  row-gap: 14px;
  align-items: end;
}

.filter_form /deep/ .el-form-item {
  margin-bottom: 0;
}

.filter_form /deep/ .el-form-item__label {
  padding-bottom: 6px;
  color: #082348;
  font-weight: 700;
  line-height: 1.2;
}

.filter_form /deep/ .el-input__inner {
  height: 33px;
  border-color: #c7d5e8;
  border-radius: 5px;
  color: #18345a;
}

.filter_form /deep/ .el-select,
.filter_form /deep/ .el-date-editor {
  width: 100%;
}

.filter_form /deep/ .el-range-editor.el-input__inner {
  height: 33px;
  padding: 0 10px;
}

.filter_form /deep/ .el-date-editor .el-range__icon,
.filter_form /deep/ .el-date-editor .el-range__close-icon {
  line-height: 25px;
}

.filter_form /deep/ .el-date-editor .el-range-separator {
  width: 24px;
  line-height: 25px;
  color: #667b96;
}

.filter_actions {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 2px;
}

.filter_actions /deep/ .el-button {
  height: 32px;
  padding: 8px 13px;
  border-radius: 6px;
}

.filter_actions /deep/ .el-button--success {
  background: #10b981;
  border-color: #10b981;
}

.orders_table_panel {
  padding: 28px 34px 20px;
}

.table_title {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 18px;
  margin-bottom: 12px;
}

.table_title h2 {
  margin: 0;
  font-size: 28px;
  line-height: 1.2;
  font-weight: 800;
  color: #17365d;
}

.table_title p {
  margin: 4px 0 0;
  color: #09264c;
}

.table_title span {
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
}

.table_wrap {
  width: 100%;
  height: calc(100vh - 565px);
  min-height: 300px;
  overflow: auto;
  border-bottom: 1px solid #d8e2ef;
}

.orders_table {
  width: 100%;
  min-width: 1320px;
  border-collapse: collapse;
  background: #fff;
  color: #09264c;
}

.orders_table th,
.orders_table td {
  padding: 12px 14px;
  border-bottom: 1px solid #d8e2ef;
  text-align: left;
  white-space: nowrap;
  font-size: 14px;
}

.orders_table th {
  position: sticky;
  top: 0;
  z-index: 2;
  background: #fff;
  font-weight: 800;
  color: #0c294f;
}

.orders_table td {
  height: 49px;
}

.strong_cell {
  font-weight: 800;
}

.status_tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 52px;
  height: 22px;
  padding: 0 8px;
  border-radius: 6px;
  background: #eef3f8;
  color: #0e2c4d;
  font-size: 12px;
  font-weight: 800;
  line-height: 22px;
}

.status_tag.success {
  background: #dcfce7;
  color: #047857;
}

.status_tag.warning {
  background: #ffedd5;
  color: #ea580c;
}

.status_tag.primary {
  background: #dbeafe;
  color: #1d4ed8;
}

.status_tag.danger {
  background: #fee2e2;
  color: #b91c1c;
}

.status_tag.default {
  background: #eef3f8;
  color: #0e2c4d;
}

.empty_cell {
  height: 120px;
  text-align: center !important;
  color: #6b7f99;
}

.orders_pagination {
  display: flex;
  justify-content: center;
  padding-top: 10px;
}

@media (max-width: 1200px) {
  .summary_cards {
    grid-template-columns: 1fr;
  }

  .filter_form {
    grid-template-columns: repeat(2, minmax(180px, 1fr));
  }
}

@media (max-width: 720px) {
  .payment_orders_page {
    padding: 12px;
  }

  .filter_form {
    grid-template-columns: 1fr;
  }

  .table_title {
    display: block;
  }
}
</style>
