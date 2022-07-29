import parseAttrs from './parseAttrs'
// 解析函数

export default function parse(templateStr) {
  // console.log(templateStr);
  // 遍历指针
  let idx = 0;
  // 剩余字符串
  let rest = templateStr;
  // 匹配正则，标签的开始
  let startReg = /^\<([a-z]+?[1-6]?)(\s+?[^\<]+)?\>/;
  // 匹配正则，标签的结束
  let endReg = /^\<\/([a-z]+?[1-6]?)\>/;
  // 匹配正则，开始和结束标签之间的文字（其他情况暂未考虑）
  let wordReg = /^\<([a-z]+?[1-6]?)>(.+)?(\<\/\1\>)/;
  // 准备两个栈：一个进出标签、一个存储对应的内容。
  let tagStack = [], contentStack = [];
  // 内部初始化， 以免循环 pop 出 undefined
  contentStack.push({ tag: "root", children: [] });
  while (idx < templateStr.length) {
    rest = templateStr.slice(idx);

    // 匹配 <div> 标签开头
    if (startReg.test(rest)) {
      // 获取 匹配项、开始标签、属性字符串
      let [match, starTag, attrsString] = rest.match(startReg);
      console.log("@", match, starTag, attrsString);

      tagStack.push(starTag);
      contentStack.push({ "tag": starTag, children: [], attrs: parseAttrs(attrsString) });

      // 匹配文字
      if (wordReg.test(rest)) {
        let content = rest.match(wordReg)[2];
        // 改变 contentStack 栈顶元素
        contentStack[contentStack.length - 1].children.push({ "text": content, "type": 3 });
        // console.log("文字", content, tagStack, contentStack);
      }

      // idx 移动 match 匹配项的长度
      idx += match.length;
      console.log(tagStack, contentStack);

      // 匹配 </div> 标签结尾
    } else if (endReg.test(rest)) {
      let endTag = rest.match(endReg)[1];
      // console.log("结尾", endTag);
      let tag = tagStack.pop();
      if (tag !== endTag) throw new Error("开始于结束标签不相同")

      // contentStack 弹栈
      let arr = contentStack.pop();
      // 改变栈顶元素的 children 属性
      contentStack[contentStack.length - 1].children.push(arr);

      // idx 移动tag.length + 3位， </>
      idx += endTag.length + 3;
      console.log(tagStack, contentStack);
    } else idx++;

  }

  return contentStack.pop().children[0];
}