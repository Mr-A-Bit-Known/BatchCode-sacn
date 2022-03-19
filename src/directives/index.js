import copy from '../public/copy'
// 自定义组件命令
const directives = {
    copy,
    // longpress
}
export default {
    install(Vue) {
        Object.keys(directives).forEach((key) => {
            Vue.directive(key, directives[key])
        })
    }
}