import parse from './parse'

let templateStr = `
  <div>
    <h2 class="aa bb cc" id="h2" data-n="12">你好</h2>
    <ul>
      <li>A</li>
      <li>B</li>
      <li>C</li>
    </ul>
  </div>
`

let result = parse(templateStr);
console.log(result);