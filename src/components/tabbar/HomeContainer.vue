<template>
  <div>
    <!-- 轮播图 -->
    <swiper :lunboList="lunboList" :isfull="true"></swiper>

    <!-- 九宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../images/menu1.png">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photoinfo">
          <img src="../../images/menu2.png">

          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist">
          <img src="../../images/menu3.png">

          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu4.png">

          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu5.png">

          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu6.png">

          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import swiper from "../subcomponents/swiper.vue";
export default {
  data() {
    return {
      lunboList: []
    };
  },
  created() {
    this.getLunBoTu();
  },
  methods: {
    getLunBoTu() {
      this.$http
        .get("http://www.liulongbin.top:3005/api/getlunbo")
        .then(res => {
          console.log(res.body.message);
          if (res.body.status === 0) {
            Toast("加载轮播图成功");
            this.lunboList = res.body.message;
          } else {
            Toast("加载轮播图失败");
          }
        });
    }
  },
  components: {
    swiper
  }
};
</script>
<style lang = "scss" scoped>
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: none;
  .mui-table-view-cell {
    border: none;
    img {
      width: 60px;
      height: 60px;
    }
    .mui-media-body {
      font-size: 13px;
    }
  }
}
</style>