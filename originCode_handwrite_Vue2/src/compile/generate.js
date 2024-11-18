
/**
 * render(){  _c： 解析标签
 *  return _c('div', {id: 'app'}, _v('hell' + _c(msg)), _c(......))
 * }
 * 
 * attrs: [
    {
        "name": "id",
        "value": "app"
    },
    {
        "name": "style",
        "value": "color: red; font-size: 20px;"
    }
]
 */

const defaultTagRe = /\{\{((?:.|\r?\n)+?)\}\}/g

function genProps(attrs) {
    let str = ''
    for (let i = 0; i < attrs.length; i++) {
        let attr = attrs[i]
        if (attr.name === 'style') {
            let obj = {}
            // console.log('attr.value.split', attr.value.split(';'))
            attr.value.split(';').forEach(item => {
                // console.log('item.split', item.split(':'))
                let [key, val] = item.split(':')
                obj[key] = val
            })
            attr.value = obj
            // console.log('attr.value', attr)
        }
        str += `${attr.name}: ${JSON.stringify(attr.value)},`
    }
    // console.log('str.slice(0, -1)', str.slice(0, -1))
    return `{${str.slice(0, -1)}}`
}
function gen(node) {
    if (node.type === 1) { // 元素
        return generate(node)
    } else { // 文本  （1）纯文本   （2）插值表达式
        let text = node.text
        if (!defaultTagRe.test(text)) { // 纯文本   test()返回一个boolean值
            return `_v(${JSON.stringify(text)})`
        }
        // {{}}、{{message}}、hello {{message}}, {{message}} 你好
        let tokens = [], match
        let lastIndex = defaultTagRe.lastIndex = 0 // NOTE: lastIndex用于指示正则表达式在字符串中搜索的起始位置
        while (match = defaultTagRe.exec(text)) { // exec()返回匹配的结果
            // console.log('match', match)
            let index = match.index
            if (index > lastIndex) {
                tokens.push(JSON.stringify(text.slice(lastIndex, index)))
            }
            tokens.push(`_s(${match[1].trim()})`)
            lastIndex = index + match[0].length
        }
        if (lastIndex < text.length) {
            tokens.push(JSON.stringify(text.slice(lastIndex)))
        }
        return `_v(${tokens.join('+')})`
    }
}
function genChildren(el) {
    let children = el.children
    if (children) {
        return children.map(child => gen(child)).join(',')
    }
}

export function generate(el) {
    // console.log('el', el)
    let children = genChildren(el)
    let code = `_c('${el.tagName}', ${el.attrs.length ? `${genProps(el.attrs)}` : 'null'}, ${children ? `${children}` : 'null'})`
    // console.log('code', code)
    return code
}
