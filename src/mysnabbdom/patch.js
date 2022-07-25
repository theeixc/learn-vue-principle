import vnode from './vnode'
import createElement from './createElement'
import patchVnode from './patchVnode'

export default function patch(oldVnode, newVnode) {
  // 1. 判断 oldVnode 是否为虚拟 dom（第一次上树时）
  if (!oldVnode.sel) {
    // 真实 dom 需要包装为 虚拟 dom
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode);
  }
  // 2. 判断是old、new 是不是同一个节点（源码中调 sameVnode  判断）
  if (oldVnode.sel === newVnode.sel && oldVnode.key === newVnode.key) {
    patchVnode(oldVnode, newVnode);
  } else {
    let newVnodeElm = createElement(newVnode);
    // 1. 使用 before、 插入 oldVnode.elm 的前面，然后删除 oldVnode.elm 
    oldVnode.elm.before(newVnodeElm);
    // // 删除老节点
    oldVnode.elm.remove();

    // 2. 使用 replaceWith
    // oldVnode.elm.replaceWith(newVnodeElm);

    // 3. 使用 insertAdjacentElement
    // oldVnode.elm.insertAdjacentElement("beforebegin", newVnodeElm);
    // oldVnode.elm.remove();
  }
}