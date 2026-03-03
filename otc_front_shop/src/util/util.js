let timercb = null;
let isProcessing = false; // 添加一个状态变量
export function debounceCallBack(fn, ms = 400) {
  return function () {
    if (timercb) {
      clearTimeout(timercb);
    }
    if (!isProcessing) {
      // 如果上一次操作已经完成，则执行下一次操作
      timercb = setTimeout(() => {
        isProcessing = true; // 将状态变量设置为正在处理
        fn.apply(this, arguments)
          .then(() => {
            // 在异步操作完成后将状态变量设置为已完成
            isProcessing = false;
          })
          .catch((error) => {
            isProcessing = false;
          });
      }, ms);
    }
  };
}