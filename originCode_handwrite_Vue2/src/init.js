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
        if (vm.$options.el) {
            vm.$mount(vm.$options.el)
        }
    }
    Vue.prototype.$mount = function (el) {
        // console.log('el', el)
        el = document.querySelector(el)

        let vm = this
        let options = vm.$options

        if (!options.render) {
            let template = options.template
            if (!template && el) {
                // 获取html
                el = el.outerHTML
                console.log('el.outerHTML', el)

                // html -> ast语法树
                let ast = compileToFunction(el)

            }
            // if (template) {
            //     options.render = compileToFunction(template)
            // }
        } else {

        }
    }

}

