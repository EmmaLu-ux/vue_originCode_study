let uid = 0;
export default class Dep {
    constructor() {
        console.log('我是Dep类')
        this.id = uid++
        this.subs = [] // NOTE:存储自己的订阅者 --- Watcher的实例
    }
    // 添加订阅
    addSub(sub) {
        this.subs.push(sub)
    }
    // 添加依赖
    addDepend() {
        Dep.target && this.addSub(Dep.target)
    }
    // 通知更新
    notify() {
        console.log('notify被调用了')

        const subs = this.subs.slice()
        // NOTE: 所有依赖于该状态的订阅者都需要被通知，以便它们可以更新自己的状态/视图
        for (let i = 0, m = subs.length; i < m; i++) {
            subs[i].update()
        }
    }
}