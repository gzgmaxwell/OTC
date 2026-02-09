import dayjs from "dayjs";

// 过滤数组数据显示(根据id显示名称)
export function filterVal(value, list, key = "value", label = "label") {
  const target = list.find(item => item[key] === value);
  if (target) {
    return target[label];
  }
  return value;
}

// 过滤日期显示
export function filterDate(d, format = "YYYY-MM-DD") {
  if (!d) return d;
  return dayjs(new Date(d)).format(format);
}
