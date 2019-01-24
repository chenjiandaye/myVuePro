<template>
  <div class="goodslist-container">
    <div class="gooditem" v-for="item in goodslist" :key="item.id" @click="getDetail(item.id)">
      <img :src="item.img_url">
      <h2 class="title">{{item.title}}</h2>
      <div class="goodinfo">
        <p class="price">
          <span class="now">{{'￥'+item.sell_price}}</span>
          <span class="old">{{'￥'+item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>
    <mt-button type="danger" size="large" @click="addMore">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodslist: [],
      pageindex: 1
    };
  },
  created() {
    this.getGoodslist();
  },
  methods: {
    getGoodslist() {
      this.$http.get("api/getgoods?pageindex=" + this.pageindex).then(res => {
        if (res.body.status === 0) {
          //   console.log(res.body);
          //   this.goodslist = res.body.message;
          this.goodslist = this.goodslist.concat(res.body.message);
        }
      });
    },
    addMore() {
      this.pageindex++;
      this.getGoodslist();
    },
    getDetail(id) {
        this.$router.push({ name: 'gi', params: { id }})
    }
  }
};
</script>

<style lang="scss" scoped>
.goodslist-container {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;
  .gooditem {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 270px;
    p {
      margin: 0;
      padding: 5px;
    }
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }
    .goodinfo {
      background-color: #ddd;
      .now {
        font-size: 16px;
        font-weight: 700;
        color: red;
      }
      .old {
        font-size: 13px;
        text-decoration: line-through;
        margin-left: 15px;
      }
    }
    .sell {
      font-size: 13px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
