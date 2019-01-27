<template>
  <div class="gooddesc-container">
    <h2>{{goodcontent.title}}</h2>
    <hr>
    <div class="good-content" v-html="goodcontent.content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      goodcontent: []
    };
  },
  created() {
    this.getGoodContent();
  },
  methods: {
    getGoodContent() {
      this.$http.get("api/goods/getdesc/" + this.id).then(res => {
        if (res.body.status === 0) {
          this.goodcontent = res.body.message[0];
        }
      });
    }
  }
};
</script>

<style lang="scss">
.gooddesc-container {
    padding: 4px;
    h2{
        font-size: 14px;
        color: #226aff;
        margin: 15px 0;
        text-align: center;
    }
  .good-content {
    .gomeImgLoad {
      width: 100%;
    }
  }
}
</style>
