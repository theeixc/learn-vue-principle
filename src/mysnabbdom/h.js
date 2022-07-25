import vnode from './vnode'

/*
  手写一个低配版本的 h 函数
    源码中 h 函数有多种调用形式
    手写版只允许以下几种情况：
      h("div", {}, '文本')
      h("div", {}, [])
      h("div", {}, h())
*/
export default function h(sel, data, c) {
  if (arguments.length !== 3) throw new Error("手写低配版必须传入三个参数")
  if (typeof c === 'string' || typeof c === 'number') {
    // c 参数为文本
    return vnode(sel, data, [], c, undefined);
  } else if (Array.isArray(c)) {
    // c 是数组
    let children = [];
    for (let i = 0; i < c.length; i++) {
      // h() 执行后返回的是对象，且必须有 sel 属性
      if (!(typeof c[i] === 'object' && c[i].hasOwnProperty('sel'))) throw new Error("数组中参数不正确");
      children.push(c[i]);
    }
    return vnode(sel, data, children, undefined, undefined);
  } else if (typeof c === 'object' && c.hasOwnProperty('sel')) {
    // c 为 h() 调用后返回的对象，那么 children 中就只有一个孩子
    let children = [c];
    return vnode(sel, data, children);
  }
  else {
    throw new Error("传入的第三个参数类型错误");
  }
}