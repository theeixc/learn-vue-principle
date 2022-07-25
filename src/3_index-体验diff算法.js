import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";


// patch 函数
const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule
])

// 节点
const container = document.getElementById("container");
const btn = document.getElementById("btn1");
// 虚拟节点
const vnode1 = h("ul", [
  h("li", { key: 1 }, 1),
  h("li", { key: 2 }, 2),
  h("li", { key: 3 }, 3),
  h("li", { key: 4 }, 4),
])
// 虚拟节点上树
patch(container, vnode1)


const vnode2 = h("ul", h("section", [
  h("li", { key: 1 }, 1),
  h("li", { key: 2 }, 2),
  h("li", { key: 3 }, 3),
  h("li", { key: 4 }, 4),
]))

btn.onclick = function () {
  patch(vnode1, vnode2)
}

/*
  演示 diff 算法，其特点
    1. 最小量更新，并不是销毁重建。其中 key 的作用很关键
      key 是虚拟 dom 的位置标识，它会告诉diff算法，更改前后是否为同个节点，可以极大的提升效率
    2. 只有同一个虚拟节点，才会进行精细化的比较，否则删除旧低的，插入新的。
      如何定义是同个节点：<b>选择器相同且 key 相同</b>
    3. 只进行同层比较，不会进行跨层比较，即使同一堆虚拟节点，但是跨层了，也是删除旧的，插入新的
      eg：div 下 4 个 span，点击 btn 后，在 div 下又套了一层 section，但还是原来的 4 个 span
*/
