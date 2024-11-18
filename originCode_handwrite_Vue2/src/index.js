import { initGlobApi } from "./global-api/index"
import { initMixin } from "./init"
import { lifecycleMixin } from "./lifecycle"
import { renderMixin } from "./vnode/index"

function Vue(options) {
    // console.log('Vue', options)
    // init
    this.init(options)
}

initMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

// Vue.Mixin, Vue.component......
initGlobApi(Vue)

export default Vue