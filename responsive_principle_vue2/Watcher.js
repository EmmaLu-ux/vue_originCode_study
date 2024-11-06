import Dep from "./Dep.js"

let uid = 0
export default class Watcher {
    /**
     * Creates an instance of Watcher.
     * @param {Object} target - 数据对象
     * @param {string} expression - 表达式；根据target和expression就可以获取Watcher依赖的数据
     * @param {Function} callback - 执行的回调函数；依赖变化时触发的回调.
     */
    constructor(target, expression, callback) {
        console.log('我是Watcher类')
        this.id = uid++
        this.target = target
        this.getter = parsePath(expression)
        this.callback = callback
        this.value = this.get() // 订阅数据
    }
    // 进入依赖收集阶段
    get() {
        Dep.target = this // NOTE: 把这个实例给了Dep.target，这样Dep.addDepend()方法才能把当前的Watcher实例添加到Dep.subs数组中
        let value
        const obj = this.target
        try {
            value = this.getter(obj) // NOTE: 执行到getter的时候，实例化Watcher还没有完成！！！
        } catch (error) {
            console.log(error)
        } finally {
            Dep.target = null
        }
        return value
    }
    update() {
        this.run()
    }
    run() {
        this.getAndInvoke(this.callback)
    }
    getAndInvoke(cb) {
        const value = this.get()
        if (value !== this.value || typeof value == 'object') {
            const oldValue = this.value
            this.value = value
            cb.call(this.target, value, oldValue) // 调用cb函数，传入新值和旧值，this为this.target
        }
    }

}
function parsePath(str) {
    let segments = str.split('.')

    return obj => {
        for (let i = 0; i < segments.length; i++) {
            obj = obj[segments[i]]
        }
        return obj
    }
}