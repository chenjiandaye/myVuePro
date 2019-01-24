<template>
  <div>
    <!-- 顶部导航 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item',item.id===0?'mui-active':'']"
            v-for="item in cates"
            :key="item.id"
            @tap="getPhotoListById(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>

    <!-- 图片详情 -->
    <ul class="photolist">
      <router-link v-for="item in photos" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
        <img v-lazy="item.img_url">
        <div class="info">
          <div class="info-title">{{item.title}}</div>
          <div class="info-body">{{item.zhaiyao}}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";

export default {
  data() {
    return {
      cates: [],
      photos: []
    };
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  created() {
    this.getAllcates();
    this.getPhotoListById(0);
  },
  methods: {
    getAllcates() {
      this.$http.get("api/getimgcategory").then(res => {
        if (res.body.status === 0) {
          this.cates = res.body.message;
          this.cates.unshift({ title: "全部", id: 0 });
        }
      });
    },
    getPhotoListById(cateId) {
      this.$http.get("api/getimages/" + cateId).then(res => {
        if (res.body.status === 0) {
          this.photos = res.body.message;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y;
}
.photolist {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    background-color: #ccc;
    margin-bottom: 10px;
    text-align: center;
    box-shadow: 0 0 9px #999;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info {
      position: absolute;
      bottom: 0;
      color: #fff;
      text-align: left;
      background-color: rgba(0, 0, 0, .4);
      max-height: 85px;
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
}
</style>
