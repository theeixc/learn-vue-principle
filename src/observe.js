import Observer from './Observer'

// observe 开始监测

export default function obeserve(value) {
  // 非对象直接返回
  if (typeof value !== 'object') return;
  var ob;
  // __ob__ 判断对象是否已被观测
  if (typeof value.__ob__ !== "undefined") {
    ob = value.__ob__;
  } else {
    ob = new Observer(value);
  }
}