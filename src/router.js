import VueRouter from 'vue-router';

//引入tabbar组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MenberContainer from './components/tabbar/MenberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import Newslist from './components/newslist/Newslist.vue'
import Newsinfo from './components/newslist/Newsinfo.vue'
import Photolist from './components/photos/Photolist.vue'
import photoinfo from './components/photos/Photoinfo.vue'
import goodslist from './components/goods/Goodslist.vue'
import goodinfo from './components/goods/Goodinfo.vue'

var router = new VueRouter({
    routes: [
        {path:'/',redirect:'/home'},
        {path:'/home',component:HomeContainer},
        {path:'/member',component:MenberContainer},
        {path:'/shopcar',component:ShopcarContainer},
        {path:'/search',component:SearchContainer},
        {path:'/home/newslist',component:Newslist},
        {path:'/home/newsinfo/:id',component:Newsinfo},
        {path:'/home/photoinfo',component:Photolist},
        {path:'/home/photoinfo/:id',component:photoinfo},
        {path:'/home/goodslist',component:goodslist},
        {path:'/home/goodsinfo/:id',component:goodinfo,name:'gi'}
    ],
    linkActiveClass:'mui-active'
});

export default router