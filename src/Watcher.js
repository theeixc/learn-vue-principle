/*
  Dep 中收集的就是 watcher 实例
    它是一个中介。在 getter 中被 Dep 实例收集，在 setter 中被 Dep 实例通知，然后去通知组件
  
  watcher 分为三种。
    渲染 watcher (render watcher)
    计算属性 watcher (computed watcher)
    侦听器 watcher（user watcher）：这里的 watcher 逻辑只适合 侦听器
*/

import Dep from "./Dep";

export default class Watcher {
  // 监听那个对象、表达式 "a.b.c" 、cb回调
  constructor(target, expression, cb) {
    console.log("Watcher 的构造函数");
    this.target = target;
    this.getter = parsePath(expression);
    this.cb = cb;
    this.value = this.get();
  }

  // 更新视图方法
  update() {
    this.run();
  }

  get() {
    // 进入依赖收集阶段： 就是给 Dep.target 赋值（只有在模板编译时，{{name}}才会收集依赖）
    Dep.target = this;
    console.log("我赋值了 Dep.target", this);

    const obj = this.target;

    var value;
    try {
      value = this.getter(obj);
      console.log("!!", value);
    } finally {
      // 收集阶段结束 Dep.target 重置为空
      Dep.target = null;
    }
    return value;
  }

  addDep(dep) {
    dep.addSub(this);
  }

  // 调用回调
  run() {
    this.getAndInvoke(this.cb);
  }
  getAndInvoke(cb) {
    const value = this.get();
    if (value !== this.value || typeof value === "object") {
      const oldValue = this.value;
      cb.call(this.target, value, oldValue);
    }
  }
}

// 解析参数 形为 "a.b.c.d" 
function parsePath(str) {
  var segments = str.split(".");
  return (obj) => {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return;
      obj = obj[segments[i]];
    }
    return obj;
  }
}