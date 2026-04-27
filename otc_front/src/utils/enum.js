export const optConfigType = [
  {
    value: "1",
    label: "系统配置"
  },
  {
    value: "2",
    label: "平台活动"
  },
  {
    value: "3",
    label: "开关"
  }
];
export const timeFilterOptions = [
  { value: "today", label: "当日" },
  { value: "yesterday", label: "昨日" },
  { value: "beforeThreeDays", label: "近三日" },
  { value: "thisWeek", label: "本周" },
  { value: "lastWeek", label: "上一周" },
  { value: "lastMonth", label: "上一月" },
  { value: "thisMonth", label: "本月" }
]



export const optRateType = [
  {
    value: "001",
    label: "手续费"
  },
  {
    value: "002",
    label: "佣金"
  },
];

export const optRateSwitch = [
  {
    value: 1,
    label: "开启"
  },
  {
    value: 0,
    label: "关闭"
  },
];

export const optConfigCode = [
  {
    value: "fee_commission",
    label: "佣金费率"
  },
  {
    value: "fee_handling",
    label: "手续费费率编码"
  },
];

export const optPlateform = [
  {
    value: "IOS",
    label: "IOS"
  },
  {
    value: "Android",
    label: "Android"
  },
];

export const blackUserReason_enum = {
  limit: 0,
  freeze: 1,
}
export const blackUserReasonOpt = [
  { value: blackUserReason_enum.limit, label: "限时封禁" },
  { value: blackUserReason_enum.freeze, label: "永久封禁" },
]
export const authOpt = [
  { value: "1", label: "买币" },
  { value: "2", label: "卖币" },
  { value: "3", label: "转账" }
]

export const optPayType = [
  { value: "1", label: "买币" },
  { value: "2", label: "卖币" },
  { value: "3", label: "转账" }
]

export const optCominPayType = [
  {
    value: "1",
    label: "支付宝"
  },
  {
    value: "2",
    label: "微信"
  },
  {
    value: "3",
    label: "银行卡"
  }
];

export const optWithdrawType = [
  {
    value: "1",
    label: "银行卡"
  },
  {
    value: "2",
    label: "支付宝"
  },
  {
    value: "3",
    label: "微信"
  },
  {
    value: "4",
    label: "USDT"
  },
  {
    value: "5",
    label: "数字人民币"
  }
];

export const optOrderModel = [
  {
    value: "1",
    label: "商户后台买币"
  },
  {
    value: "2",
    label: "APP扫码下单"
  },
  {
    value: "3",
    label: "嵌入式下单"
  },
  {
    value: "4",
    label: "[挂单]收银台"
  },
  {
    value: "5",
    label: "[下单]收银台(自选)"
  },
  {
    value: "5",
    label: "[下单]收银台(固额)"
  }
];

export const enum_orderStatus = {
  checking: "0",
  paying: "1",
  success: "3",
  fail: "2"
}
export const optOrderStatus = [
  {
    value: enum_orderStatus.checking,
    label: "待审核"
  },
  {
    value: enum_orderStatus.paying,
    label: "打款中"
  },
  {
    value: enum_orderStatus.success,
    label: "已完成"
  },
  {
    value: enum_orderStatus.fail,
    label: "已拒绝"
  },
];


export const enum_accountType = {
  GD: "1",
  USDT: "2",
  TRX: "3",
  ACCU: "4",
  KUANG: "5",
}
export const optAccountType = [
  {
    value: enum_accountType.GD,
    label: "FCB币"
  },
  {
    value: enum_accountType.USDT,
    label: "泰达币"
  },
  {
    value: enum_accountType.TRX,
    label: "波场"
  },
  {
    value: enum_accountType.ACUU,
    label: "积分"
  },
  {
    value: enum_accountType.KUANG,
    label: "矿工币"
  }
];

export const enum_OperationType = {
  add: "0",
  sub: "1",
}
export const optOperationType = [
  {
    value: enum_OperationType.add,
    label: "手动加款"
  },
  {
    value: enum_OperationType.sub,
    label: "手动扣款"
  }
];

export const enum_order_buy = {
  pending: "1", // 1：待付款
  paid: "2", // 2：已付款
  released: "3", // 3：已放行
  cancelled: "4", // 4：已取消
  payTimeout: "5" // 5：付款超时
}
export const optOrderBuy = [
  {
    value: enum_order_buy.pending,
    label: "待付款"
  },
  {
    value: enum_order_buy.paid,
    label: "已付款"
  },
  {
    value: enum_order_buy.released,
    label: "已放行"
  },
  {
    value: enum_order_buy.cancelled,
    label: "已取消"
  },
  {
    value: enum_order_buy.payTimeout,
    label: "付款超时"
  }
];

export const enum_order_sell = {
  PendingOrder: "1", // 1：挂单中
  Trading: "2", // 2：交易中
  Completed: "3", // 3：交易完成
  Cancelled: "4", // 4：已取消
}
export const optOrderSell = [
  {
    value: enum_order_sell.PendingOrder,
    label: "挂单中"
  },
  {
    value: enum_order_sell.Trading,
    label: "交易中"
  },
  {
    value: enum_order_sell.Completed,
    label: "交易完成"
  },
  {
    value: enum_order_sell.Cancelled,
    label: "已取消"
  },
];