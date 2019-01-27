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
//设置根目录
Vue.http.options.root = 'http://www.liulongbin.top:3005'
Vue.http.options.emulateJSON = true;

//引入vuex
import Vuex from 'vuex'
Vue.use(Vuex)
var car = JSON.parse(localStorage.getItem("car") || '[]')
var store = new Vuex.Store({
    state: {
        car: car
    },
    mutations: {
        addToCar(state, goodinfo) {
            var flag = false
            state.car.some(item => {
                if (item.id === goodinfo.id) {
                    item.num += parseInt(goodinfo.num)
                    flag = true
                    return true
                }
            })
            if (!flag) {
                state.car.push(goodinfo)
            }
            localStorage.setItem("car", JSON.stringify(state.car))
        },
        getgoodcountnum(state, goodinfo) {
            state.car.some(item => {
                if (item.id === goodinfo.id) {
                    item.num = parseInt(goodinfo.num)
                    return true
                }
            })
            localStorage.setItem("car", JSON.stringify(state.car))
        },
        removegood(state, id) {
            state.car.some((item, i) => {
                if (item.id == id) {
                    state.car.splice(i, 1)
                    return true
                }
            })
            localStorage.setItem("car", JSON.stringify(state.car))
        },
        updateSelected(state, goodinfo) {
            state.car.some(item => {
                if (item.id == goodinfo.id) {
                    item.selected = goodinfo.selected
                    return true
                }
            })
            localStorage.setItem("car", JSON.stringify(state.car))
        }
    },
    getters: {
        getAllnum(state) {
            var c = 0;
            state.car.forEach(item => {
                c += item.num
            })
            return c
        },
        getInitCount(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.num
            })
            return o
        },
        getGoodNum(state) {
            var o = {
                count: 0,
                price: 0
            }
            state.car.forEach(item => {
                if (item.selected == true) {
                    o.count += item.num
                    o.price += item.price * item.num
                }
            })
            return o
        },
        getSelected(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.selected
            })
            return o
        }
    }
})


//设置时间全局过滤器
import moment from 'moment'
Vue.filter('dateFormat', function (dateStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(dateStr).format(pattern)
})



//引入Mint中Hearder组件
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
// import 'mint-ui/lib/style.css'
// Vue.component(Header.name, Header)

// //引入Mint中的swipe组件
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)

// //引入mint中的button组件
// Vue.component(Button.name, Button)

// //引入MInt中懒加载组件
// Vue.use(Lazyload)

//加载全部Mint组件
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

//设置vue-preview
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

//引入mui的css样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'


//创建vm实例
var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router,
    store
})