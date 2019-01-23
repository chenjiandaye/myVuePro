//引入vue包
import Vue from 'vue';

//引入App
import app from './App.vue'

//引入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router.js'

//引入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)


//引入Mint中Hearder组件
import { Header, Swipe, SwipeItem } from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.component(Header.name, Header)

//引入Mint中的swipe组件
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

//引入mui的css样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'


//创建vm实例
var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router
})