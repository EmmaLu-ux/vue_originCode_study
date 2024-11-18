import { compileToFunction } from "./compile/index"
import { initStatus } from "./initStatus"
import { mountComponent } from "./lifecycle"

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

        vm.$el = el
        let options = vm.$options

        if (!options.render) {
            let template = options.template
            if (!template && el) {
                // 获取html
                el = el.outerHTML
                // console.log('el.outerHTML', el)

                // html -> ast语法树 -> 字符串 -> render()
                let render = compileToFunction(el)
                // console.log('render999', render)

                // 1. render => vnode
                options.render = render
                // 2. vnode -> realNode

                // 3. 放到页面上去
            }
        }
        // 挂载组件
        mountComponent(vm, el)
    }

}

