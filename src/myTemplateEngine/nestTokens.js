/*
  折叠 tokens 
    数组嵌套时，需要将 # / 之间的 tokens 放入 ['#', arr] 的第三项
*/

export default function nestTokens(tokens) {

  // 折叠后数组
  const nestedTokens = [];
  // 辅助栈
  const sections = [];
  /*
    收集器数组 !!! （js引用类型）
      初始指向nestedTokens、在循环会改变指向（栈顶元素）
      遇到 #，新建 ['#', arr] 的第三项，收集器指向新建的数组
      遇到 /，出栈，收集器数组指向栈顶元素（上一层的）
  */
  let collector = nestedTokens;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    switch (token[0]) {
      case '#':
        // 收集  token 
        collector.push(token);
        // 入栈
        sections.push(token);
        // 新建第三项
        token[2] = [];
        // 改变 collector 指向
        collector = token[2];
        break;

      case '/':
        //  出栈 collector 指向的数组，收集完毕
        sections.pop();
        // 改变 collector 指向，栈中还有元素，指向上一层，没有，则指向 nestedTokens
        collector = sections.length > 0 ? sections[sections.length - 1][2] : nestedTokens;
        break;

      default:
        collector.push(token);
        break;
    }
  }

  return nestedTokens;

}