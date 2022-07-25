import patchVnode from './patchVnode'
import createElement from './createElement'

export default function updateChildren(parentElm, oldCh, newCh) {
  console.log(oldCh, newCh);
  // 旧前、旧后
  let oldStart = 0, oldEnd = oldCh.length - 1;
  // 新前、新后
  let newStart = 0, newEnd = newCh.length - 1;
  // 旧前节点、旧后节点
  let oldStartVnode = oldCh[oldStart], oldEndVnode = oldCh[oldEnd];
  // 新前节点、新后节点
  let newStartVnode = newCh[newStart], newEndVnode = newCh[newEnd];

  let keyMap;

  while (oldStart <= oldEnd && newStart <= newEnd) {
    //  首先判断是否处理过
    if (oldStartVnode === null) {
      oldStartVnode = oldCh[++oldStart];
    } else if (oldEndVnode === null) {
      oldEndVnode === oldCh[--oldEnd];
    } else if (newStartVnode === null) {
      newStartVnode = newCh[++newStart];
    } else if (newEndVnode === null) {
      newEndVnode = newCh[--newEnd];
    }
    else if (isSameVnode(newStartVnode, oldStartVnode)) {
      // 1. 判断新前与旧前
      console.log("@1");
      patchVnode(oldStartVnode, newStartVnode); // patchVnode 更新节点

      oldStartVnode = oldCh[++oldStart];
      newStartVnode = newCh[++newStart];
    } else if (isSameVnode(newEndVnode, oldEndVnode)) {
      // 2. 判断新后与旧后
      console.log("@2");
      patchVnode(oldEndVnode, newEndVnode)

      oldEndVnode = oldCh[--oldEnd];
      newEndVnode = newCh[--newEnd];
    } else if (isSameVnode(newEndVnode, oldStartVnode)) {
      // 3. 新后与旧前
      console.log("@3");
      patchVnode(oldStartVnode, newEndVnode);
      // 把新后指向的节点（新后和旧前是相同节点）插入到旧后的后面
      oldEndVnode.elm.after(oldStartVnode.elm);

      oldStartVnode = oldCh[++oldStart];
      newEndVnode = newCh[--newEnd];
    } else if (isSameVnode(newStartVnode, oldEndVnode)) {
      // 4. 新前与旧后
      console.log("@4");
      patchVnode(oldEndVnode, newStartVnode);
      // 把新前指向的节点（新前和旧后是相同节点）插入到旧前的前面
      oldStartVnode.elm.before(oldEndVnode.elm);

      oldEndVnode = oldCh[--oldEnd];
      newStartVnode = newCh[++newStart];
    }
    else {
      console.log("keyMap");
      // 都不命中，则需要循环查找（源码中使用了 keymap 保存旧节点和下标的映射）
      if (!keyMap) {
        // 第一次进入，保存映射
        keyMap = {};
        for (let i = 0; i < oldCh.length; i++) {
          const { key } = oldCh[i];
          if (key !== undefined) keyMap[key] = i;
        }
      }
      // 在旧节点中寻找 新前
      const idxInOld = keyMap[newStartVnode.key];
      if (idxInOld === undefined) {
        // 没找到，表示全新的项
        let dom = createElement(newStartVnode);
        // 插入旧前的前面，并移动新前
        oldStartVnode.elm.before(dom);
      } else {
        // 找到了，表示需要移动
        const nodeNeedMove = oldCh[idxInOld];
        patchVnode(nodeNeedMove, newStartVnode);
        // 把 指向的节点插入 旧前的前面
        oldStartVnode.elm.before(nodeNeedMove.elm);
        // parentElm.insertBefore(nodeNeedMove.elm, oldStartVnode.elm);
        // 置为 undefined，表示已经处理过
        oldCh[idxInOld] = undefined;
      }

      newStartVnode = newCh[++newStart];
    }
  }

  // 删除旧前 === 旧后之间的节点
  while (oldStart <= oldEnd) {
    // undefine 的节点直接略过
    if (oldStartVnode !== undefined) {
      oldStartVnode.elm.remove();
    }
    oldStartVnode = oldCh[++oldStart];
  }

  // 新增新前 === 新后之间的节点
  while (newStart <= newEnd) {
    //  创建新节点
    let dom = createElement(newStartVnode);
    // 新增的节点，可能插入在最前面也可能插入最后面
    if (oldStart > oldEnd) {
      parentElm.prepend(dom);
    } else {
      parentElm.append(dom);
    }
    // parentElm.insertBefore(dom, oldCh[oldStart].elm);
    newStartVnode = newCh[++newStart];
  }

}


// 判断是否为相同节点
function isSameVnode(a, b) {
  return a.sel === b.sel && a.key === b.key;
}