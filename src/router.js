import VueRouter from 'vue-router';

//引入tabbar组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MenberContainer from './components/tabbar/MenberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import Newslist from './components/newslist/Newslist.vue'
import Newsinfo from './components/newslist/Newsinfo.vue'

var router = new VueRouter({
    routes: [
        {path:'/',redirect:'/home'},
        {path:'/home',component:HomeContainer},
        {path:'/member',component:MenberContainer},
        {path:'/shopcar',component:ShopcarContainer},
        {path:'/search',component:SearchContainer},
        {path:'/home/newslist',component:Newslist},
        {path:'/home/newsinfo/:id',component:Newsinfo}
    ],
    linkActiveClass:'mui-active'
});

export default router