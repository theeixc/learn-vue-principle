import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";


console.log(h);
// h 函数用于生成虚拟 DOM
let vnode1 = h("a", { props: { href: 'https://www.baidu.com', target: "_blank" } }, '去百度')
console.log(vnode1);
/*
  sel: 选择器
  data： props
  elm：真实 dom
  key：标识
  text：文本节点
  children：孩子节点
*/

// patch 函数用于比较 + 虚拟DOM放入页面
const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule
])
console.log(patch);

// 获取容器，将虚拟节点放入页面
const container = document.getElementById("container");
// patch(container, vnode1)

// h 函数可以嵌套使用

let vnode2 = h("ul", [
  h("li", "1"),
  h("li", "2"),
  h("li", "3"),
  h("li", [h("span", "4-1"), h("span", "4-2")])
])

patch(container, vnode2)