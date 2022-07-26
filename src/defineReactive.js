import Dep from './Dep';
import observe from './observe' //  defineReactive 需要监测属性，当进入下一层时，再次调用 observe

// 定义响应式：defineReactive，给属性设置 setter/getter
export default function defineReactive(data, key, val = data[key]) {
  const dep = new Dep();

  // console.log("我是defineReactive", key);
  /*
    对子元素也进行 observe，形成递归
    1. observe(obj) --> new Observer --> defineReactive ==> 到达下层，再次 observe
  */
  // 对子元素（对象|属性）也进行 observe
  let childOb = observe(val);

  Object.defineProperty(data, key, {
    // 可遍历 
    enumerable: true,
    // 可配置
    configurable: true,
    get() {
      console.log("获取属性值", key);
      // 判断是否处于依赖收集阶段：看有没有 Dep.target
      if (Dep.target) {
        dep.depend();
        // 继续检查子元素
        if (childOb) {
          childOb.dep.depend();
        }
      }
      return val;
    },
    set(newVal) {
      console.log("设置属性值", key);
      if (newVal === val) return;
      val = newVal;
      // 还要 obeserve 新值（防止直接赋值对象）
      childOb = observe(newVal);

      // 触发 dep 的 notify
      dep.notify();
    }
  })
}