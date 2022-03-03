// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import '../src/assets/style.css'
import print from 'vue-print-nb'
import VueBarcode from "vue-barcode"
import QrcodeVue from 'qrcode.vue'

import Footer from '../src/views/Footer'

Vue.use(print);
Vue.config.productionTip = false;


Vue.use(ElementUI);
Vue.component("barcode", VueBarcode);
Vue.component("qrcode", QrcodeVue);
Vue.component('Footer', Footer);
Vue.prototype.$axios = axios;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


// Global width & height auto achieveible
Vue.prototype.$getViewSize = function() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, // width
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // height
    }
}

// 条形码样式

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})