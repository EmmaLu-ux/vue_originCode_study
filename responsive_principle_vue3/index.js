const bucket = new Set()
const isObject = function (data) {
    return typeof data === 'object' && typeof data !== null
}
const convert = target => isObject(target) ? reactive(target) : target
const hasOwnProperty = Object.prototype.hasOwnProperty
const hasOwn = (target, key) => hasOwnProperty.call(target, key)

const reactive = function (data) {
    if (!isObject(data)) return

    return new Proxy(data, {
        get(target, key, receiver) {
            console.log('get()函数', receiver)
            // return target[key]
            // NOTE: Reflect.get()是JS中的一个静态方法，用于从对象中获取属性值
            const result = Reflect.get(target, key, receiver)
            return convert(result)
        },
        set(target, key, val, receiver) {
            console.log('set()函数', receiver) // receiver是一个代理对象
            const oldVal = Reflect.get(target, key, receiver)
            let result = true
            if (oldVal !== val) {
                result = Reflect.set(target, key, val, receiver)
                console.log('set', key, val)
            }
            return result
        },
        deleteProperty(target, key) {
            const hadKey = hasOwn(target, key)
            const result = Reflect.deleteProperty(target, key)
            if (hadKey && result) {
                console.log('deleteProperty()', key)
            }
            return result
        }
    })
}

// const p = reactive({
//     a: {
//         b: {
//             c: 3
//         }
//     }
// })
// console.log('p', p.a.b.c)
// Code1
const p = reactive([
    21, 55, 6, 213
])
// Code2
p.push(12)
// Code3
console.log('p', p)
// console.log(p.name)
/**
 * Code1处走reactive函数，得到参数是一个对象，进入到new Proxy处，给这个p对象添加了get、set和deleteProperty方法
 * Code2处会先走reactive的get方法，target就是数组[21, 55, 6, 213]，key是"push"，receiver就是Code1走完后得到的代理对象（有getter、setter、deleteProperty方法），所以在get方法中，会返回数组原型中的push函数；然后再返回Code处，此时再次进入get方法，但是，此时的key是"length"，那么get方法就会返回这个target的长度 ==> 4.
 * 然后进入到set函数中去给这个数组添加元素：此时target还是数组[21, 55, 6, 213]，但key是4，receiver不变，得到的oldVal为undefined（因为target中没有4这个属性，也就是数组没有下标4），所以会给下标4添加值12，然后返回true
 * 添加成功之后，target是[21, 55, 6, 213, 12]，key是"length"，val是5，receiver中多了12，得到的oldVal为5，直接返回true
 * 最后打印出p
 * 
 */