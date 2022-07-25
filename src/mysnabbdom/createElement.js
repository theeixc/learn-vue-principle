// 根据 vnode 创建真实 dom 并返回（存在递归，插入操作放到 patch 中）

export default function createElement(vnode) {

  const { sel, text, children } = vnode;
  // 创建真实 dom
  let dom = document.createElement(sel);
  // 判断文本还是数组（低配版，两项不能同时存在）
  if (text && (children === undefined || children.length === 0)) {
    // 内部是文字
    dom.innerText = vnode.text;
  } else if (Array.isArray(children) && children.length > 0) {
    // 内部是子节点，需要递归创建
    for (let i = 0; i < children.length; i++) {
      let ch = createElement(children[i]);
      // 添加到上层节点中
      dom.append(ch);
    }
  }

  // 补充 elm 属性
  vnode.elm = dom;

  // 返回真实的 dom
  return dom;
}