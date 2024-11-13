
let oldArrayProtoMethods = Array.prototype

export let ArrayMethods = Object.create(oldArrayProtoMethods)

let methods = ['push', 'pop', 'shift', 'unshift', 'splice']

methods.forEach(method => {
    let original = oldArrayProtoMethods[method]
    ArrayMethods[method] = function () {
        // console.log('ArrayMethods', this, arguments)
        let result = original.apply(this, arguments)
        let ob = this.__ob__

        const args = [...arguments]
        let inserted = []
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args
                break
            case 'splice':
                inserted = args.slice(2)
        }
        if (inserted) ob.observeArray(inserted)

        // ob && ob.dep.notify()
        return result
    }
})