import { defineReactive } from "./defineReactive.js"
import { def } from "./utils.js"
import { arrayMethods } from './array.js'
import { observe } from "./observe.js"
import Dep from "./Dep.js"

export default class Observer {
    constructor(value) {
        this.dep = new Dep()
        // NOTE: 值是这次new的实例
        def(value, '__ob__', this, false)
        // console.log('我是Observer构造器', value)
        if (Array.isArray(value)) {
            Object.setPrototypeOf(value, arrayMethods) // 将value数组原型指向 arrayMethods
            this.observeArray(value)
        } else {
            this.walk(value)
        }
    }

    walk(value) {
        for (let key in value) {
            defineReactive(value, key)
        }
    }
    observeArray(arr) {
        for (let i = 0, m = arr.length; i < m; i++) {
            observe(arr[i])
        }
    }
}