export function patch(oldEl, newEl) {
    // console.log('patch', oldEl, newEl)
    // 创建新DOM
    let el = createEl(newEl)
    // console.log('el', el)
    // 替换 获取父节点 -> 插入 -> 删除
    let parentEL = oldEl.parentNode
    // console.log(102, parentEL)
    parentEL.insertBefore(el, oldEl.nextSibling)// 将新创建的el插入到oldEl的后面，nextsibling：下一个兄弟节点
    parentEL.removeChild(oldEl)
    return el
}

function createEl(vnode) {
    let { tagName, children, key, data, text } = vnode // key: 属性
    if (typeof tagName === 'string') {
        vnode.el = document.createElement(tagName)
        if (children.length > 0) {
            children.forEach(child => {
                vnode.el.appendChild(createEl(child))
            })
        }
    } else {
        vnode.el = document.createTextNode(text)
    }
    return vnode.el
}