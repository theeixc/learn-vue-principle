/*
  Scanner 类：
    扫描字符串，用于生成 tokens

*/

export default class Scanner {
  constructor(templateStr) {
    // console.log(templateStr);
    this.templateStr = templateStr;
    // 指针
    this.pos = 0;
    // 指针未扫描的内容（包括pos的内容）
    this.tail = templateStr;
  }

  // 扫描，即略过 {{ 和 }}
  scan(tag) {
    if (this.tail.startsWith(tag)) {
      this.pos += tag.length;
      this.tail = this.templateStr.slice(this.pos);
    }
  }

  // 扫描，直到遇到 {{ 或 }} （遇到后，返回收集前面的文字）
  scanUtil(stopTag) {

    // 需要返回收集的文字，所以需要记录 pos 值
    const pos_backup = this.pos;

    // this.tail 以 stopTag 开头时（可以使用 indexOf != 0 | startsWith ） 
    while (!this.eos() && !this.tail.startsWith(stopTag)) {
      this.pos++;
      this.tail = this.templateStr.slice(this.pos);
    }

    // 获取前面的文字
    let words = this.templateStr.slice(pos_backup, this.pos);
    return words;
  }

  // 判断是否遍历结束
  eos() {
    return this.pos >= this.templateStr.length;
  }
}