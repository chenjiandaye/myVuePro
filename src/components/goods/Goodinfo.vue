<template>
  <div class="goodinfo-container">
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
            <div class="mui-numbox" data-numbox-min="1">
              <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
              <input class="mui-numbox-input" type="number" value="1">
              <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
            </div>
          </div>
          <mt-button type="primary" size="small">立即购买</mt-button>
          <mt-button type="danger" size="small">加入购物车</mt-button>
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
        <mt-button type="primary" plain size="large">图文介绍</mt-button>
        <mt-button type="danger" plain size="large">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import swiper from "../subcomponents/swiper.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      goodlist: [],
      goodlistLunbo: []
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
    }
  },
  components: {
    swiper
  }
};
</script>

<style lang="scss" scoped>
.goodinfo-container {
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
      .mui-numbox-input {
        color: #000;
      }
    }
    .goods-no,
    .stock-quantity,
    .add-time {
      line-height: 30px;
    }
  }
}
</style>
