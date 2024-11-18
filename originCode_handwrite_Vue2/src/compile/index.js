import { generate } from "./generate"
import { parseHTML } from "./parseAst"
export function compileToFunction(html) {
    // console.log(html)

    let ast = parseHTML(html)
    // console.log('ast', ast)
    // NOTE: 变成render()： ast语法树变成字符串 -> 字符串变成函数
    // ast语法树变成字符串
    let code = generate(ast) // _c _v _s
    // console.log('code', code)
    // 字符串 -> 函数
    let render = new Function(`with(this){return ${code}}`) // NOTE: with()用于扩展作用域链，使得在 with 块内可以直接访问对象的属性，而不需要每次都指定对象名。
    // console.log('render', render)
    return render
}