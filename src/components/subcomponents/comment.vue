<template>
  <div>
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入要BB的内容（做多吐槽120字）" maxlength="120" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item ,i) in comments" :key="i">
        <div class="cmt-title">第{{i+1}}楼 用户：{{item.user_name}} 发表时间：{{item.add_time | dateFormat}}</div>
        <div class="cmt-body">{{item.content === "undefined" ? "这个人很懒，嘛都没写" : item.content}}</div>
      </div>

      <mt-button type="danger" plain size="large" @click="addMore">加载更多</mt-button>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      pageindex: 1,
      comments: [],
      msg: ""
    };
  },
  created() {
    this.getcomments();
  },
  methods: {
    getcomments() {
      this.$http
        .get("api/getcomments/" + this.id + "?pageindex=" + this.pageindex)
        .then(res => {
          if (res.body.status === 0) {
            // this.comments=res.body.message
            this.comments = this.comments.concat(res.body.message);
          } else {
            Toast("获取新闻详情失败");
          }
        });
    },
    addMore() {
      this.pageindex++;
      this.getcomments();
    },
    postComment() {
      if (this.msg.trim().length === 0) {
        return Toast("请输入内容");
      }
      this.$http
        .post("api/postcomment/" + this.$route.params.id, {
          content: this.msg.trim()
        })
        .then(res => {
          if (res.body.status === 0) {
            Toast("添加评论成功");
            this.comments.unshift({
              user_name: "匿名用户",
              add_time: Date.now(),
              content: this.msg.trim()
            });
            this.msg = "";
          }
        });
    }
  },
  props: ["id"]
};
</script>

<style lang="scss" scoped>
h3 {
  font-size: 18px;
}
textarea {
  font-size: 14px;
  height: 85px;
  margin: 0;
}
.cmt-list {
  font-size: 13px;
  line-height: 30px;
  margin: 4px 0;
  .cmt-item {
    .cmt-title {
      background-color: #ccc;
    }
    .cmt-body {
      text-indent: 2em;
    }
  }
}
</style>
