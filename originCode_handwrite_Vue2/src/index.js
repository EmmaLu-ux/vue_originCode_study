import { initMixin } from "./init"

function Vue(options) {
    // console.log('Vue', options)
    // init
    this.init(options)
}

initMixin(Vue)

export default Vue