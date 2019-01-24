<template>
  <div class="photo-container">
    <h3>{{photoinfo.title}}</h3>
    <div class="subtitle">
      <span>发表时间：{{photoinfo.add_time |dateFormat}}</span>
      <span>点击次数：{{photoinfo.click}}</span>
    </div>
    <hr>
    <!-- 图片缩略图区域 -->
    <div class="suoluetu">
      <img
        class="preview-img"
        v-for="(item, index) in list"
        :src="item.src"
        height="100"
        @click="$preview.open(index, list)"
        :key="item.src"
      >
    </div>
    <!-- 内容区域 -->
    <div class="photo-content" v-html="photoinfo.content"></div>

    <!-- 评论区域 -->
    <cmt-box :id="id"></cmt-box>
  </div>
</template>

<script>
import cmt from "../subcomponents/comment.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,
      photoinfo: {},
      list:[]
    };
  },
  created() {
    this.getPhotoInfo();
    this.getthum();
  },
  methods: {
    getPhotoInfo() {
      this.$http.get("api/getimageInfo/" + this.id).then(res => {
        if (res.body.status === 0) {
          this.photoinfo = res.body.message[0];
        }
      })
    },
    getthum(){
        this.$http.get('api/getthumimages/'+this.id).then(res=>{
            if(res.body.status===0){
                res.body.message.forEach(item=>{
                    item.w=600;
                    item.h=400;
                });
                this.list=res.body.message;
            }
        })
    }
  },
  components: {
    "cmt-box": cmt
  }
}
</script>

<style lang="scss" scoped>
.photo-container {
  padding: 4px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    color: #999;
    font-size: 13px;
    line-height: 25px;
    display: flex;
    justify-content: space-between;
  }
  .photo-content {
    font-size: 13px;
    line-height: 30px;
  }
  .suoluetu{
      img{
          margin: 10px;
          box-shadow: 0 0 9px #999;
      }
  }
}
</style>
