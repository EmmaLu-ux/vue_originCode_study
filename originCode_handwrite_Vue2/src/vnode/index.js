export function renderMixin(Vue) {
    Vue.prototype._c = function () {  // 标签
        // 创建标签
        // console.log(9090, arguments)
        return createElement(...arguments)
    }
    Vue.prototype._v = function (text) {  // 文本
        return createText(text)
    }
    Vue.prototype._s = function (val) {  // 变量
        return val == null ? '' : (typeof val === 'object') ? JSON.stringify(val) : val
    }
    Vue.prototype._render = function () {
        let vm = this
        let render = vm.$options.render
        let vnode = render.call(this)
        // console.log('vnode', vnode)
        return vnode
    }
}


function createElement(tagName, data = {}, ...children) { // 创建元素
    return vnode(tagName, data, data?.key, children)
}

function createText(text) { // 创建文本
    return vnode(undefined, undefined, undefined, undefined, text)
}

function vnode(tagName, data, key, children, text) { // 创建虚拟对象
    return {
        tagName, data, key, children, text
    }
}
/**
 * vnode 节点
 * {
 *  tagName,
 *  attrs,
 *  text,
 *  children
 * }
 */