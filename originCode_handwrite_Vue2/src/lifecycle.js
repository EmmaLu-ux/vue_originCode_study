import { patch } from "./vnode/patch"

export function mountComponent(vm, el) {
    vm._update(vm._render()) // NOTE: （1）vm._render：将render函数变成vnode （2）vm._update将vnode变成真实DOM并放到页面上
}

export function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
        // console.log('vnode-_update', vnode)
        let vm = this
        vm.$el = patch(vm.$el, vnode) // vnode -> realNode
    }
}