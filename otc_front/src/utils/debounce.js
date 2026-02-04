/**
 *降频函数
 *这个 debounce 函数在给定的时间间隔内只允许你提供的回调函数执行一次，以此降低它的执行频率。
 *调用 debounce(function() {}, 250)
 * @param {*} func回调函数
 * @param {*} wait等待时间,推荐250
 * @param {*}
 * @returns
 */
const debounce = (func, wait) => {
  let timeout

  return function () {
    const args = arguments

    clearTimeout(timeout)

    timeout = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}

export default debounce
