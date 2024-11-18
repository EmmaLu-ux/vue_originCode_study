import { mergeOptions } from "../utils/index.js"

export function initGlobApi(Vue) {
    // Vue.options = {created: [a, b, c], watch: [a, b]}
    Vue.options = {}
    Vue.Mixin = function (mixin) {
        mergeOptions(this.options, mixin)
    }
}