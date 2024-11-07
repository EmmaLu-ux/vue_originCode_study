import babel from '@rollup/plugin-babel'
import serve from 'rollup-plugin-serve'

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/vue.js',
        format: 'umd',
        name: 'Vue',
        sourcemap: true, // 将转化前的代码喝转化后的代码进行映射
    },
    plugins: [
        babel({
            exclude: 'node_modules/**'
        }),
        serve({
            port: 3000,
            openPage: '/index.html',
            contentBase: '', // 当前目录。这意味着，当你通过开发服务器访问文件时，服务器会从当前目录提供文件。
        })
    ]
}