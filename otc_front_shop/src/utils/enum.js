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


export const enum_withdrawType = {
  bank: "1",
  alipay: "2",
  wechat: "3",
  usdt: "4",
  digitalRmb: "5"
}
export const optWithdrawType = [
  {
    value: enum_withdrawType.bank,
    label: "银行卡"
  },
  {
    value: enum_withdrawType.alipay,
    label: "支付宝"
  },
  {
    value: enum_withdrawType.wechat,
    label: "微信"
  },
  {
    value: enum_withdrawType.usdt,
    label: "USDT"
  },
  {
    value: enum_withdrawType.digitalRmb,
    label: "数字人民币"
  }
];
