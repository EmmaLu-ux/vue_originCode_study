import { ArrayMethods } from "./arr"

export function observe(data) {
    // console.log('observe', data)
    if (typeof data !== 'object' || data == null) return

    let ob
    if (typeof data.__ob__ !== 'undefined') ob = data.__ob__
    else ob = new Observer(data)

    return ob
}

class Observer {
    constructor(data) {
        def(data, '__ob__', this, false)

        if (Array.isArray(data)) {
            // console.log('data is array', data)
            Object.setPrototypeOf(data, ArrayMethods)
            this.observeArray(data)
        } else {
            this.walk(data)
        }
    }
    walk(data) {
        let keys = Object.keys(data) // NOTE: Object.keys()只返回对象的自有属性，不包括原型链上的属性
        for (let i = 0; i < keys.length; i++) {
            defineReactive(data, keys[i])
        }
        // for (let key in data) { // NOTE: for...in会遍历对象及其原型链上的所有可枚举属性
        //     defineReactive(data, key)
        // }
    }
    observeArray(data) {
        for (let i = 0; i < data.length; i++) {
            observe(data[i])
        }
    }
}

function defineReactive(obj, key, val) {
    if (arguments.length == 2) val = obj[key]

    let childOb = observe(val)

    Object.defineProperty(obj, key, {
        get() {
            // console.log('getter', obj, key)
            return val
        },
        set(newValue) {
            // console.log('setter', newValue, val)
            if (newValue == val) return
            val = newValue
            childOb = observe(newValue)
        }
    })
}

function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        configurable: true
    })
}