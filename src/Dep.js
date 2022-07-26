/*
  Dep 类，负责收集依赖
    在 getter 中收集依赖（watcher）
    在 setter 中触发回调（通知 watcher 更新）

    每个属性都有一个 Dep 实例（一个属性可能在很多地方用到）
*/


export default class Dep {
  constructor() {
    console.log("Dep 的构造函数");
    // 使用数组存储自己的订阅者（Watcher 的实例）
    this.subs = [];
  }

  // 添加订阅
  addSub(sub) {
    this.subs.push(sub);
  }

  // watcher 和 dep 关联（让属性的 dep 记住 watcher ）
  depend() {
    // 这个 Dep.target 就是当前触发了 getter 的 watcher
    if (Dep.target) {
      console.log("我执行了 this.addSub", Dep.target);
      // this.addSub(Dep.target);
      Dep.target.addDep(this); // 这里是源码的逻辑，因为要 dep 记住 watcher（更新的时候，触发） 还要 watcher 记住 dep（销毁的时候删除 + 计算属性要使用）
    }
  }

  // 通知 watcher 去更新（执行 watcher 的 update 方法）
  notify() {
    console.log("我通知了 wathers ");

    // 浅克隆一份
    const subs = this.subs.slice();
    for (let i = 0; i < subs.length; i++) {
      subs[i].update();
    }
  }
}