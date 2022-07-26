/*
  数组不能监测：封装原生数组的7个方法
  [
    push
    pop
    shift
    unshift
    splice
    sort
    reverse
  ]
*/

import { def } from "./utils";

// 需要封装的 7 个方法
const methods = ["push", "pop", "shift", "unshift", "splice", "sort", "reverse"]

// 数组的原型对象
const prototype = Array.prototype;

// 以数组的原型对象，再创建一个新对象
const arrayMethods = Object.create(prototype);

methods.forEach(methodName => {
  // 获取原来的方法
  const origin = prototype[methodName];
  /*
    1. 在 arrayMethods 对象上，定义新的方法
    2. 数组中的 push | unshift | splice 可以向数组中插入新值，新值也需要被 observe
  */

  def(arrayMethods, methodName, function () {
    // console.log("新的方法");
    // 取出 __ob__ 对象（Observer 对象）
    const ob = this.__ob__;
    // 把插入的新值变为 observe 的
    let inserted = [];

    const args = [...arguments];
    switch (methodName) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        // splice 的格式是 splice(下标, 数量, 拆入的新值)
        inserted = args.slice(2);
        break;
    }

    // 插入的新项，也变为 observe 的
    if (inserted) {
      ob.walkArray(inserted);
    }
    // console.log("arrayMethods", methodName);

    // 触发 notify
    ob.dep.notify();
    // pop splice 有返回值
    const result = origin.apply(this, arguments);

    return result;
  }, false)
})

// 暴露重写的原型对象
export { arrayMethods }