// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import '../src/assets/style.css'
import printTemplate from '../src/components/printTemplate'
import printService from 'vue-ueditor-wrap'

Vue.config.productionTip = false
Vue.component('Vue-print', printTemplate);
Vue.component('vue-ueditor-wrap', printService);


Vue.use(ElementUI)
Vue.prototype.$axios = axios
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


// Global width & height auto achieveible
Vue.prototype.$getViewSize = function() {
        return {
            width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, // width
            height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // height
        }
    }
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})