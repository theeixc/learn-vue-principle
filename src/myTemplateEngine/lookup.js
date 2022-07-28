/*
  获取对象中的属性值（防止出现 "a.b.c" 的情况了）
    1. obj[key1]
    2. obj.a.b.c  

    data = {name: 'andy', a: {b: {c: 123}}}
    ==> tokens 中存在 ['name', 'a.b.c']
    如果使用 data[key] 无法获取 dat.a.b.c
    假设形如 {{a.b.c}}
*/

export default function lookup(dataObj, keyStr) {
  if (keyStr !== '.' && keyStr.includes(".")) {
    /*
      切分 a.b.c ==> [a, b, c]
      但是不能是 . 本身（简单数组传入的 keyStr 就是 .）
    */
    let keys = keyStr.split(".");
    for (let i = 0; i < keys.length; i++) {
      // 循环赋值
      dataObj = dataObj[keys[i]];
    }

    return dataObj;
  }

  // 没有 . 直接返回属性值
  return dataObj[keyStr];
}