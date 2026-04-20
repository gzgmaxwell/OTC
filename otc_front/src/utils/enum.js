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

