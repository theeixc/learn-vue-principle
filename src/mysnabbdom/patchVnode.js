import updateChildren from './updateChildren'

export default function patchVnode(oldVnode, newVnode) {
  // console.log("指向同个节点");
  // 1. 判断 newVnode 和 oldVnode 是否为同个对象
  if (newVnode === oldVnode) return;

  // 2. 判断 newVnode 是否为文本
  if (newVnode.text !== undefined && (newVnode.children === undefined || newVnode.children.length === 0)) {
    // console.log("newVnode 有text，没有 children");
    // 2.1 继续判断 newVnode.text 和 oldVnode.text 是否相同，不相同直接赋值 text 即可
    if (newVnode.text !== oldVnode.text) oldVnode.elm.innerText = newVnode.text;
  } else {
    // console.log("newVnode 没有text，有 children");
    // 3. 已知 newVnode 有 children，判断 oldVnode 有无 children
    if (oldVnode.children !== undefined && oldVnode.children.length > 0) {
      // 3.1 oldVnode 有 children，调用 updateChildren 更新
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children);
    } else {
      // 3.2 oldVnode 中是文本节点（需要删除文本，然后把 newVnode 的 children 上树）
      oldVnode.elm.innerText = "";
      for (let i = 0; i < newVnode.children.length; i++) {
        let dom = createElement(newVnode.children[i]);
        oldVnode.elm.append(dom);
      }
    }
  }
}