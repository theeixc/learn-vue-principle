import parseTemplateToTokens from './myTemplateEngine/parseTemplateToTokens'
import renderTemplate from './myTemplateEngine/renderTemplate'

// 全局添加 TemplateEngine 对象
window.TemplateEngine = {
  render(templateStr, data) {
    // console.log("render execute!");

    // parseTemplateToTokens 把模板字符串变为 tokens 数组
    let tokens = parseTemplateToTokens(templateStr);

    // renderTemplate 把 tokens 数组变为 domStr（带数据）
    let domStr = renderTemplate(tokens, data);

    // console.log(domStr);

    return domStr;
  },
}