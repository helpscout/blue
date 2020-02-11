// https://github.com/angus-c/just/blob/master/packages/function-debounce/index.js
/* istanbul ignore next */
export default function debounce(fn, wait, callFirst) {
  var timeout
  return function() {
    if (!wait) {
      return fn.apply(this, arguments)
    }

    var context = this
    var args = arguments
    var callNow = callFirst && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(function() {
      timeout = null
      if (!callNow) {
        return fn.apply(context, args)
      }
    }, wait)

    if (callNow) {
      return fn.apply(this, arguments)
    }
  }
}
