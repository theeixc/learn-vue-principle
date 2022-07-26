import { def } from './utils'
import defineReactive from './defineReactive'
import { arrayMethods } from './array'
import obeserve from './observe';
import Dep from './Dep';
/*
  Observer 类（对象上加 ob ）
  作用： 把对象变为响应的数据（设置 setter | getter）
*/
export default class Observer {
  constructor(value) {
    // 每个 Observer 实例身上都有一个 Dep 实例
    this.dep = new Dep();

    // console.log("Observer", value);
    // 把value.__ob__ 属性定义为 new 出的 Observer 实例（并设置为不可枚举）
    def(value, "__ob__", this, false);

    // 封装了数组的原型对象，所以此处需要判断，为数组，则将原型对象指向封装后的对象
    if (Array.isArray(value)) {
      Object.setPrototypeOf(value, arrayMethods)
      this.walkArray(value);
    } else {
      this.walk(value);
    }
  }

  // 遍历对象的每个属性，设置 setter/getter
  walk(value) {
    var keys = Object.keys(value);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(value, keys[i]);
    }
  }

  // 遍历数组的每个属性（数组中可能也是数组）
  walkArray(arr) {
    for (let i = 0; i < arr.length; i++) {
      obeserve(arr[i]);
    }
  }
}