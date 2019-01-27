<template>
  <div class="goodinfo-container">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunboList="goodlistLunbo" :isfull="false"></swiper>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">{{goodlist.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="price">
            市场价：
            <span class="old">￥{{goodlist.market_price}}</span>
            销售价：
            <span class="now">￥{{goodlist.sell_price}}</span>
          </div>
          <div class="num">购买数量：
            <numBox @getSelectCount="getSelectCount" :max="goodlist.stock_quantity"></numBox>
          </div>
          <mt-button type="primary" size="small" plain>立即购买</mt-button>
          <mt-button type="danger" size="small" plain @click="addToShopCar">加入购物车</mt-button>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="goods-no">商品参数：{{goodlist.goods_no}}</div>
          <div class="stock-quantity">库存情况：{{goodlist.stock_quantity}}件</div>
          <div class="add-time">上架时间：{{goodlist.add_time | dateFormat}}</div>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" plain size="large" @click="gooddesc(id)">图文介绍</mt-button>
        <mt-button type="danger" plain size="large" @click="goodcomment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import swiper from "../subcomponents/swiper.vue";
import numBox from "./Goodinfo-numbox.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      goodlist: [],
      goodlistLunbo: [],
      ballFlag: false,
      selectCount: 1
    };
  },
  created() {
    this.getGoodinfo();
    this.getGoodinfoLunbo();
  },
  methods: {
    getGoodinfo() {
      this.$http.get("api/goods/getinfo/" + this.id).then(res => {
        if (res.body.status === 0) {
          this.goodlist = res.body.message[0];
        }
      });
    },
    getGoodinfoLunbo() {
      this.$http.get("api/getthumimages/" + this.id).then(res => {
        if (res.body.status === 0) {
          res.body.message.forEach(item => {
            item.img = item.src;
          });
          this.goodlistLunbo = res.body.message;
        }
      });
    },
    gooddesc(id) {
      this.$router.push({ name: "gooddesc", params: { id } });
    },
    goodcomment(id) {
      this.$router.push({ name: "goodcomment", params: { id } });
    },
    addToShopCar() {
      this.ballFlag = !this.ballFlag;
      var goodinfo = {
        id: this.id,
        num: this.selectCount,
        price: this.goodlist.sell_price,
        selected: true
      };
      this.$store.commit("addToCar", goodinfo);
    },
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetWidth;
      el.style.transition = "all .5s cubic-bezier(.4,-0.3,1,.68)";
      done();
    },
    afterEnter(el) {
      let ballPosition = this.$refs.ball.getBoundingClientRect();
      let badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();
      let x = badgePosition.left - ballPosition.left;
      let y = badgePosition.top - ballPosition.top;
      el.style.transform = `translate(${x}px,${y}px)`;
      this.ballFlag = !this.ballFlag;
    },
    getSelectCount(count) {
      this.selectCount = count;
    }
  },
  components: {
    swiper,
    numBox
  }
};
</script>

<style lang="scss" scoped>
.goodinfo-container {
  background-color: #eee;
  overflow: hidden;
  .mint-swipe {
    height: 200px;
    .mint-swipe-item {
      text-align: center;
      img {
        width: 60%;
      }
    }
  }
  .mui-card-content {
    color: #8f8f94;
    .price {
      .old {
        text-decoration: line-through;
        margin-right: 5px;
      }
      .now {
        color: red;
        font-size: 16px;
        font-weight: 700;
      }
    }
    .num {
      color: #8f8f94;
      margin: 10px 0;
    }
    .goods-no,
    .stock-quantity,
    .add-time {
      line-height: 30px;
    }
  }

  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }
  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #f00;
    position: absolute;
    z-index: 999;
    top: 390px;
    left: 150px;
  }
}
</style>
