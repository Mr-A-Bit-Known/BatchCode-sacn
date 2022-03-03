import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const routes = [{
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
}, ]

const router = new Router({
    // 去除#
    mode: 'history',
    routes
})

export default router