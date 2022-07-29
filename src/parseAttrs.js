
export default function parseAttrs(attrsString) {
  let arrs = [];
  if (attrsString === undefined) return arrs;

  // 找 key=vale 形式的数据
  let pat = /([a-z0-9_-]+)="([\w+?\s*?]+)"/gi;
  let result = attrsString.match(pat);
  // console.log("#", result);
  if (result === null) return arrs;
  for (let i = 0; i < result.length; i++) {
    let [key, value] = result[i].split("=");
    // console.log("#", key, value);
    // 删除首尾空格 + 删除前后的引号
    value = value.trim()
    value = value.slice(1, value.length - 1);
    if (value.includes(" ")) {
      let values = value.split(" ");
      arrs.push({ name: key, value: values })
    } else arrs.push({ name: key, value: value });
  }

  return arrs;
}