import Dep from "./Dep.js"
import { observe } from "./observe.js"
export const defineReactive = function (obj, key, val) {
    console.log('defineReactive', obj, key)
    const dep = new Dep()
    if (arguments.length == 2) {
        val = obj[key]
    }
    let childOb = observe(val)

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get() {
            console.log('你访问了' + key + '的属性')
            // NOTE: 在getter中收集依赖
            if (Dep.target) {
                dep.addDepend()
                if (childOb) {
                    childOb.dep.addDepend()
                }
            }
            return val
        },
        set(newValue) {
            console.log('你修改了' + key + '的属性, newValue为', newValue)
            if (val == newValue) return
            val = newValue
            childOb = observe(newValue)
            // NOTE: 在setter中触发依赖
            dep.notify() // 发布订阅模式
        }
    })
}