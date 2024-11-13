import { compileToFunction } from "./compile/index"
import { initStatus } from "./initStatus"

export function initMixin(Vue) {
    Vue.prototype.init = function (options) {
        // console.log('init', options)
        let vm = this
        vm.$options = options

        // 初始化状态
        initStatus(vm)

        // 渲染模板
    }

}

