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
import '../src/public/getViewSize'

import Directives from '../src/directives/index'
Vue.use(Directives)

import Footer from '../src/views/Footer'
import Header from '../src/views/Header'

Vue.use(print);
Vue.config.productionTip = false;


Vue.use(ElementUI);
Vue.component("barcode", VueBarcode);
Vue.component("qrcode", QrcodeVue);
Vue.component('Footer', Footer);
Vue.component('Header', Header);

Vue.prototype.$axios = axios;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';



/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})