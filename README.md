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
  - Dep 类：**依赖的管理者**。每个observer实例身上都有一个 dep 实例，负责收集依赖（收集 watcher ）
    1. `depend` 让属性的 dep 记住 watcher（dep 会通知 watcher ）、`notify` 通知 watcher 更新
  - watcher类：**依赖，或者说订阅者**。分为三种（渲染 watcher、计算属性 watcher、侦听器 watcher），此类未手写完全（只实现了 侦听器 watcher）
    1. `addDep` 让 watcher 记住 dep（组件销毁时，需要清空 dep + 计算属性需要使用）、
    2. 自身有 `update` 方法，通知组件更新视图。
  
## study-templateEngin 分支
- 借助 [mustache](https://github.com/janl/mustache.js) 学习模板引擎（将数据转化为视图），👉[跳转至分支](https://github.com/theeixc/learn-vue-principle/tree/study-templateEngin)
- `TemplateEngine.render()`接收两个参数`templateStr`、`data`，内部调用`parseTemplateToTokens` 和`renderTemplate`
- `parseTemplateToTokens` 将`templateStr` 转化为 tokens
  1. 内部调用`Scanner`类，用于扫描字符串，内部`scanUtil`方法获取文本，`scan`方法略过 `{{ && }}`
  2. 数组需要单独处理
  3. 调用`nestTokens`方法折叠 tokens（方法很巧妙，使用了栈结构 + js引用类型）
- `renderTemplate`使用生成的tokens 和 传入的data，获取 domStr
  1. 实现`lookup`函数，获取data中的属性值，**处理`{{a.b.c}`，即`['name': 'a.b.c']`此类情况**
  2. 数组单独处理，`parseArray` 和 `renderTemplate`循环调用

## study-ast 分支
- 学习如何将模板字符串变为抽象语法树 ast，👉[跳转至分支](https://github.com/theeixc/learn-vue-principle/tree/study-ast)
- 思想：使用指针 + 栈
  * 遍历字符串，书写正则匹配标签的开始、标签内的属性、标签之间的文字、标签的结束等
  * 两个辅助栈（源码只使用了一个），一个用于保存标签（标识单个标签的开始和结束），一个用于保存结果
    1. 遇到开始标签，字符栈入栈、内容栈放入新对象（其中包括`tag`、`childre`、`attrs`等）
    2. 遇到结束标签，字符栈出栈、内容栈出栈、且将出栈元素推入内容栈顶的 `children` 属性中
