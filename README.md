# learn-vue-principle
- **本仓库用于学习 vue 的原理**。
## study-diff 分支
- 借助 [snabbdom](https://github.com/snabbdom/snabbdom) 学习diff 算法，👉[跳转至分支](https://github.com/theeixc/learn-vue-principle/tree/study-diff)
  - `vnode` 用于生成虚拟 dom、`createElement` 用于生成真实 dom 并返回、`patch` 函数用于打补丁（新老vnode 的比较） + 上树
  - 先判断`sanmeVnode`，不同直接拆毁重建 dom。相同则需要精细化比较 `patchVnode`
  - `patchVnode` 在新老vnode都有 children 时，调用 `updateChildren`
    1. 四种命中规则：新前旧前、新后旧后、新后旧前、新前旧后
    2. 都不命中时，就需要循环查找（源码中用map/{}）

## study-reactive 分支
- 学习数据响应式原理，👉[跳转至分支](https://github.com/theeixc/learn-vue-principle/tree/study-reactive)
  - `observe`、`observer`、`defineReactive` 三者联合实现对象的响应式处理，其中 observe 为递归入口、observer 类把对象变为响应式（设置 getter | setter）、defineReactive 定义响应式（`Object.defineProperty方法`）
  - Dep 类：每个属性都有一个 dep 实例，负责收集依赖（收集 watcher ）
    1. `depend` 让属性的 dep 记住 watcher（dep 会通知 watcher ）、`notify` 通知 watcher 更新
  - watcher类：分为三种（渲染 watcher、计算属性 watcher、侦听器 watcher），此类未手写完全（只实现了 侦听器 watcher）
    1. `addDep` 让 watcher 记住 dep（组件销毁时，需要清空 dep + 计算属性需要使用）
  
