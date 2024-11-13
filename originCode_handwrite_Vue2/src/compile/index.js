import { parseHTML } from "./parseAst"
export function compileToFunction(html) {
    // console.log(html)

    let ast = parseHTML(html)
    console.log('ast', ast)
}