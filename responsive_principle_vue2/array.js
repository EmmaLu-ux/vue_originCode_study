import { def } from "./utils.js"

const arrayPrototype = Array.prototype

// NOTE: 以Array。prototype为原型创建arrayMethods对象
export const arrayMethods = Object.create(arrayPrototype)

const needChangeMethods = ['pop', 'push', 'shift', 'unshift', 'splice', 'sort', 'reverse']

needChangeMethods.forEach(methodName => {
    const original = arrayPrototype[methodName] // 保存一份原来的数组方法
    def(arrayMethods, methodName, function () {
        const result = original.apply(this, arguments) // NOTE: this为调用当前数组方法的实例（也就是你在数组上调用的方法的对象。），arguments为调用函数内传过来的参数
        // NOTE: arguments是一个类数组对象，没有数组的一些原型上的方法
        const args = [...arguments]
        console.log('args', args, this)
        const ob = this.__ob__
        // push/unshift/splice方法 需要添加的数据也需要被observe一下
        let inserted = []
        switch (methodName) {
            case 'push':
            case 'unshift':
                inserted = args
                break;
            case 'splice': // NOTE: splice(下标， 数量， 插入的新项)
                inserted = args.slice(2)
        }
        if (inserted) {
            ob.observeArray(inserted)
        }

        ob.dep.notify()

        console.log('result', result)
        return result
    }, false)
})