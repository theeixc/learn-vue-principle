import h from './mysnabbdom/h'
import patch from './mysnabbdom/patch'

// console.log(h);

// console.log(h("div", {}, h("span", {}, 123)));

const container = document.getElementById("container");
const btn = document.getElementById("btn");

// 新增
const vnode1 = h("ul", {}, [
  h("li", { key: "A" }, "A"),
  h("li", { key: "B" }, "B"),
  h("li", { key: "C" }, "C"),
])
const vnode2 = h("ul", {}, [
  h("li", { key: "A" }, "A1"),
  h("li", { key: "B" }, "B1"),
  h("li", { key: "C" }, "C"),
  h("li", { key: "D" }, "D"),
  h("li", { key: "E" }, "E"),
])



// 删除
const vnode3 = h("ul", {}, [
  h("li", { key: "A" }, "A"),
  h("li", { key: "B" }, "B1"),
  h("li", { key: "C" }, "C"),
  h("li", { key: "D" }, "D"),
])
const vnode4 = h("ul", {}, [
  h("li", { key: "A" }, "A"),
  h("li", { key: "B" }, "B1"),
  h("li", { key: "D" }, "D"),
])


// 多删除情况
const vnode5 = h("ul", {}, [
  h("li", { key: "A" }, "A"),
  h("li", { key: "B" }, "B1"),
  h("li", { key: "C" }, "C"),
  h("li", { key: "D" }, "D"),
  h("li", { key: "E" }, "E"),
])
const vnode6 = h("ul", {}, [
  h("li", { key: "A" }, "A"),
  h("li", { key: "B" }, "B1"),
  h("li", { key: "D" }, "D"),
])

// 复杂情况1（命中4）
const vnode7 = h("ul", {}, [
  h("li", { key: "A" }, "A"),
  h("li", { key: "B" }, "B1"),
  h("li", { key: "C" }, "C"),
  h("li", { key: "D" }, "D"),
  h("li", { key: "E" }, "E"),
])
const vnode8 = h("ul", {}, [
  h("li", { key: "E" }, "E"),
  h("li", { key: "C" }, "C"),
  h("li", { key: "M" }, "M"),
])

// 复杂情况2（命中3）
const vnode9 = h("ul", {}, [
  h("li", { key: "A" }, "A"),
  h("li", { key: "B" }, "B1"),
  h("li", { key: "C" }, "C"),
  h("li", { key: "D" }, "D"),
  h("li", { key: "E" }, "E"),
])
const vnode10 = h("ul", {}, [
  h("li", { key: "E" }, "E"),
  h("li", { key: "D" }, "D"),
  h("li", { key: "C" }, "C"),
  h("li", { key: "B" }, "B1"),
  h("li", { key: "A" }, "A"),
])


const vnode11 = h("ul", {}, [
  h("li", { key: "A" }, "A"),
  h("li", { key: "B" }, "B1"),
  h("li", { key: "C" }, "C"),
])

const vnode12 = h("ul", {}, [
  h("li", { key: "Q" }, "Q"),
  h("li", { key: "A" }, "A"),
  h("li", { key: "B" }, "B1"),
  h("li", { key: "C" }, "C"),
])

patch(container, vnode1);
btn.onclick = function () {
  patch(vnode1, vnode2);
}

/* patch(container, vnode3);
btn.onclick = function () {
  patch(vnode3, vnode4);
} */

/* patch(container, vnode5);
btn.onclick = function () {
  patch(vnode5, vnode6);
} */

/* patch(container, vnode7);
btn.onclick = function () {
  patch(vnode7, vnode8);
} */

/* patch(container, vnode9);
btn.onclick = function () {
  patch(vnode9, vnode10);
} */

/* patch(container, vnode11);
btn.onclick = function () {
  patch(vnode11, vnode12);
} */