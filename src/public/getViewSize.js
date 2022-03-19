import Vue from "vue";
// Global width & height auto achieveible
Vue.prototype.$getViewSize = function() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, // width
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // height
    }
}