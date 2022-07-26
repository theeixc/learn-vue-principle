import observe from './observe'
import Watcher from './Watcher'

var obj = {
  a: {
    m: {
      n: 5
    }
  },
  b: 4,
  g: [1, 2, 3, 4]
}

observe(obj);

// obj.b = 10
// console.log(obj);
// obj.a.m = { n: 10 }
// console.log(obj);
// obj.g.push(5)
// console.log(obj.g);

// obj.g.splice(2, 1, 88, 99);
// obj.b = 10
// console.log(obj);
// obj.g.push(123);

new Watcher(obj, "a.m.n", (newVal, oldValue) => {
  console.log(`obj.a.m.n 从 ${oldValue}(oldVal) 变成了 ${newVal}(newVal)`)
})
obj.a.m.n = 10;
console.log(obj);