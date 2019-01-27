<template>
  <div class="mui-numbox" data-numbox-min="1" style="height:25px;">
    <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
    <input
      class="mui-numbox-input"
      type="number"
      :value="initCount"
      ref="numbox"
      @change="goodsinfonum"
      readonly
    >
    <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";
export default {
  mounted() {
    mui(".mui-numbox").numbox();
  },
  methods: {
    goodsinfonum() {
      // console.log(this.$refs.numbox.value,this.goodsid)
      this.$store.commit("getgoodcountnum", { num: this.$refs.numbox.value, id: this.goodsid });
    }
  },
  props: ["initCount", "goodsid"]
};
</script>

<style lang="scss" scoped>
.mui-numbox-input {
  color: #000;
}
</style>
