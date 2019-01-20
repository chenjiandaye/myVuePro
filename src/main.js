//引入vue包
import Vue from 'vue';

//引入App
import app from './App.vue'

//引入Mint中Hearder组件
import { Header } from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.component(Header.name, Header)

//引入mui的css样式
import './lib/mui/css/mui.min.css'


//创建vm实例
var vm = new Vue({
    el: '#app',
    render: c => c(app)
})