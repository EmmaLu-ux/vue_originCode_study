const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-z]*` // 标签名称
const qnameCapture = `((?:${ncname}\\:)?${ncname})` // <span:xx>
const startTagOpen = new RegExp(`^<${qnameCapture}`) // 标签开头的正则，捕获的内容是标签名
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`) // 匹配标签结尾的</div>
const attribute = /^\s*([^\s”’<>\/=]+)(?:\s*(=)\s*(?:”([^”]*)”+|’([^’]*)’+|([^\s”’=<>`]+)))?/ // {id: app}
const startTagClose = /^\s*(\/?)>/ // 匹配标签结束的 >
const defaultTagRe = /\{\{((?:.|\r?\n)+?)\}\}/g

// <div id="app">123 {{message}} <h1>qwe</h1> </div>
function createASTElement(tagName, attrs) {
    return {
        tagName,
        attrs,
        children: [],
        type: 1,
        parent: null
    }
}
let root, createParent // 根元素, 当前元素的父元素
let stack = [] // 数据结构   栈
// 遍历
function start(tag, attrs) {
    let element = createASTElement(tag, attrs)
    // console.log('开始标签', element)
    if (!root) {
        root = element
    }
    createParent = element
    stack.push(element)
}
// 获取文本
function charts(text) {
    // console.log('文本', text)
    text = text.replace(/s/g, '')
    if (text) {
        createParent.children.push({
            type: 3,
            text
        })
    }
}
function end(tag) {
    let element = stack.pop()
    // console.log('结束标签', element)
    createParent = stack[stack.length - 1]
    if (createParent) { // 元素的闭合
        element.parent = createParent.tagName
        createParent.children.push(element)
    }
}
export function parseHTML(html) {
    while (html) {
        let textEnd = html.indexOf('<')
        if (textEnd === 0) { // <div>或者是</div>
            // 开始标签
            const startTagMatch = parseStartTag()
            if (startTagMatch) {
                // console.log('startTagMatch', startTagMatch)
                start(startTagMatch.tagName, startTagMatch.attrs)
                continue
            }
            // 结束标签
            let endTagMatch = html.match(endTag)
            if (endTagMatch) {
                // console.log('endTagMatch', endTagMatch)
                advance(endTagMatch[0].length)
                end(endTagMatch[0])
                // console.log('123456789', html)
                continue
            }
        }
        // 文本
        let text
        if (textEnd > 0) {
            // console.log('textEnd', textEnd)
            text = html.slice(0, textEnd)
            // console.log('text', text)
            charts(text)
        }
        if (text) {
            advance(text.length)
            // console.log('结束标签', html)
        }
        // break
    }

    function parseStartTag() {
        const start = html.match(startTagOpen)
        // console.log('start', start)
        if (start) {
            let match = {
                tagName: start[1],
                attrs: [],
            }

            advance(start[0].length) // 删除开始标签

            // 属性
            let attr, end
            while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
                // console.log('attr', attr)
                match.attrs.push({ name: attr[1], value: attr[5] || attr[4] || attr[3] })
                advance(attr[0].length)
                // break
            }

            if (end) {
                // console.log('end', end)
                advance(end[0].length)
                // console.log('html去掉开始标签及其属性的剩下部分：', html)
                return match
            }
        }
    }
    function advance(n) {
        html = html.substring(n)
        // console.log(html)
    }

    return root
}