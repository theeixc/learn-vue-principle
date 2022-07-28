/*
  让 tokens 数组变为 dom 字符串
  源码中使用的是 Writer 类
*/
import lookup from './lookup'

export default function renderTemplate(tokens, data) {

  // 结果字符串
  let domStr = "";
  // console.log(tokens, data);

  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];

    // 查看类型
    if (token[0] === 'text') {
      domStr += token[1];
    } else if (token[0] === 'name') {
      // 处理 {{a.b.c}} 类情况
      domStr += lookup(data, token[1]);
    } else if (token[0] === '#') {
      // 处理数组
      domStr += parseArray(token, data)
    }
  }

  return domStr;
}


// 处理 # ，即存在子项（源码中还要处理 # 后接 ）
function parseArray(token, data) {
  // console.log(token, data);
  let str = ""
  // 数组有多少项，就遍历生成多少个子项
  let dataArr = lookup(data, token[1]);
  for (let i = 0; i < dataArr.length; i++) {
    /*
      数组分为简单数组和对象数组
        简单数组：需要识别 . 属性
        对象数组：传入对象即可
      方法1：判断 typeof dataArr[i] === 'object' ? dataArr[i] : { ".": dataArr[i] }
      方法2：展开运算符 { ".": dataArr[i], ...dataArr[i] }
    */
    str += renderTemplate(token[2], { ...dataArr[i], ".": dataArr[i] });
  }

  return str;
} 