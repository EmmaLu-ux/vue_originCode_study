import { observe } from "./observe.js"
import Watcher from "./Watcher.js"

var obj = {
    a: {
        m: {
            n: 5
        }
    },
    b: 12,
    c: [33, 75, 123, 89, 5]
}

observe(obj)

new Watcher(obj, 'a.m.n', (val, oldVal) => {
    console.log('---', val, oldVal)
})
obj.a.m.n = 76
// obj.c.push(99, 100)
// obj.c.splice(2, 1, [12, 23])
console.log('obj', obj)