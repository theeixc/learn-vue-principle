// 工具类

// def 函数：定义属性（ __ob__ 应该是不可遍历的）
export function def(obj, key, value, enumerable) {
  Object.defineProperty(obj, key, {
    value,
    enumerable,
    writable: true,
    configurable: true
  })
}