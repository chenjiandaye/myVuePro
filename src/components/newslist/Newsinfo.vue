<template>
  <div class="newsinfo-container">
    <h3 class="title">{{newsinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间：{{newsinfo.add_time | dateFormat}}</span>
      <span>点击：{{newsinfo.click}}</span>
    </p>
    <hr>
    <div class="content" v-html="newsinfo.content"></div>

    <comment-box :id="this.id"></comment-box>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import comment from "../subcomponents/comment.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      newsinfo: []
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      this.$http.get("api/getnew/" + this.id).then(res => {
        if (res.body.status === 0) {
          Toast("获取新闻详情成功");
          console.log(res.body.message);
          this.newsinfo = res.body.message[0];
        } else {
          Toast("获取新闻详情失败");
        }
      });
    }
  },
  components: {
    "comment-box": comment
  }
};
</script>

<style lang="scss">
.newsinfo-container {
  padding: 0 4px;
  .title {
    text-align: center;
    font-size: 16px;
    color: red;
    margin: 15px 0;
  }
  .subtitle {
    font-size: 14px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>
