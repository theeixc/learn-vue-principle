import Scanner from './Scanner'
import nestTokens from './nestTokens'

/*
  将模板字符串变为 tokens 数组
  我买了 {{name}} 手机，花了 {{price}} 钱，好亏
    变为
  [
    ["text", '我买了 '],
    ["name", name],
    ["text", ' 手机，花了 '],
    ["name", price],
  ]
*/
export default function parseTemplateToTokens(templateStr) {

  const tokens = [];

  // 扫描类
  let scan = new Scanner(templateStr);

  // 扫描结束的条件
  let word;
  while (!scan.eos()) {
    // 获取 {{ 之间的文字（ {{ 之前一定是文本 ）
    word = scan.scanUtil("{{");
    if (word !== "") {

      // 删除换行
      // 删除 <> 之外的空格

      /* word = word.replace(/\n/g, "");
      let pat = /<[^\/].+?\s+?.+?>/;
      console.log(word.match(pat), pat.test(word));
      if (pat.test(word)) {
        let res = word.match(pat);
        word = word.slice(res.index);
      } else {
        word = word.replace(/\s+/g, "");
      } */

      // 删除换行和空格的逻辑可有可无
      tokens.push(['text', word]);
    }
    // 跳过 {{
    scan.scan("{{");

    // 获取 }} 之前的文字
    word = scan.scanUtil("}}");
    if (word !== '') {

      // 数组嵌套
      if (word[0] === '#') {
        tokens.push(['#', word.slice(1)]);
      } else if (word[0] === '/') {
        tokens.push(['/', word.slice(1)]);
      } else {
        tokens.push(['name', word]);
      }
    }

    // 跳过 }}
    scan.scan("}}")
  }

  console.log(tokens);
  return nestTokens(tokens);
}