export const HOOKS = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed'
]

// 策略模式
let starts = {}
starts.data = function (parent, child) { // 合并data

}
starts.created = function (parent, child) { // 合并created

}
starts.computed = function (parent, child) { // 合并computed

}
starts.watch = function (parent, child) { // 合并watch

}
starts.methods = function (parent, child) { // 合并methods

}
starts.mounted = function (parent, child) { // 合并mounted

}

HOOKS.forEach(hook => {
    starts[hook] = mergeHook
})

function mergeHook(parentV, childV) {

}

export function mergeOptions(parent, child) {
    console.log(1, parent, child)
    const options = {}

    for (let key in parent) {
        mergeField(key)
    }
    for (let key in child) {
        mergeField(key)
    }
    function mergeField(key) {
        if (starts[key]) {
            options[key] = starts[key](parent[key], child[key])
        } else {
            options[key] = child[key]
        }
    }
}