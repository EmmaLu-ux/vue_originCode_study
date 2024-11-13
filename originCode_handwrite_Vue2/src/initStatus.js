import { observe } from "./observe/index"

export function initStatus(vm) {
    let opts = vm.$options
    // console.log('initStatus-opts', opts)

    // 判断
    if (opts.props) {
        initProps(vm)
    }
    if (opts.data) {
        initData(vm)
    }
    if (opts.watch) {
        initWatch(vm)
    }
    if (opts.methods) {
        initMethods(vm)
    }
    if (opts.computed) {
        initComputed(vm)
    }
}

function initProps(vm) { }
function initData(vm) {
    // console.log('data init', vm)
    let data = vm.$options.data
    data = vm._data = typeof data === 'function' ? data.call(vm) : data // NOTE: 如果data是一个function，则data中的this是window。故data.call(vm)就是为了让this指向vm
    for (let key in data) {
        proxy(vm, "_data", key)
    }
    // 数据劫持
    observe(data)
}
function proxy(vm, source, key) {
    Object.defineProperty(vm, key, { // NOTE: 在vm上添加属性key。当用户通过vm.message的时候，会通过下面这个getter函数返回vm._data.message，从而做到了数据代理
        get() {
            return vm[source][key]
        },
        set(newVal) {
            vm[source][key] = newVal
        }
    })
}
function initWatch(vm) { }
function initMethods(vm) { }
function initComputed(vm) { }