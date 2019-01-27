<template>
  <div class="shopcar-container">
    <div class="good-list">
      <!-- 购物车详情 -->
      <div class="mui-card" v-for="(item,i) in carList" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch
              v-model="$store.getters.getSelected[item.id]"
              @change="getGoodSelected(item.id,$store.getters.getSelected[item.id])"
            ></mt-switch>
            <img :src="item.thumb_path">
            <div class="goodinfo">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">￥{{item.sell_price}}</span>
                <numbox :initCount="$store.getters.getInitCount[item.id]" :goodsid="item.id"></numbox>
                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 结算区域 -->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner jiesuan">
            <div class="left">
              <p>总计（不含运费）</p>
              <p>已勾选商品
                <span class="red">{{$store.getters.getGoodNum.count}}</span>件，总价
                <span class="red">￥{{$store.getters.getGoodNum.price}}</span>
              </p>
            </div>
            <mt-button type="danger">去结算</mt-button>
          </div>
        </div>
      </div>

      <p>{{$store.getters.getSelected}}</p>
    </div>
  </div>
</template>
<script>
import numbox from "../subcomponents/Shopcar-numbox.vue";
export default {
  data() {
    return {
      car: JSON.parse(localStorage.getItem("car")),
      carList: []
    };
  },
  created() {
    this.getShopCarList();
  },
  methods: {
    getShopCarList() {
      //   var ids = "";
      //   this.car.forEach(item => {
      //     ids += item.id + ",";
      //   });
      //   ids = ids.substr(0, ids.length - 1);
      var idsArr = [];
      if (this.car === null || this.car.length <= 0) return;
      this.car.forEach(item => idsArr.push(item.id));
      var ids = idsArr.join(",");
      this.$http.get("api/goods/getshopcarlist/" + ids).then(res => {
        if (res.body.status === 0) {
          this.carList = res.body.message;
        }
      });
    },
    remove(id, index) {
      // console.log(id,index)
      // console.log(this.carList)
      this.carList.splice(index, 1);
      this.$store.commit("removegood", id);
    },
    getGoodSelected(id, val) {
      this.$store.commit("updateSelected", { id, selected: val });
    }
  },
  components: {
    numbox
  }
};
</script>
<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .good-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
      img {
        width: 60px;
        height: 60px;
      }
      .goodinfo {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        h1 {
          font-size: 13px;
        }
        p {
          margin: 0;
          .price {
            color: #f00;
            font-weight: 700;
          }
        }
      }
    }
  }
  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: red;
      font-size: 16px;
      font-weight: 700;
    }
  }
}
</style>