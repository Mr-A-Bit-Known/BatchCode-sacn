<template>
  <div class="productorWrapper">
    <el-container>
      <el-header :style="header_style"><Header /></el-header>
      <el-main :style="{ height: screenHeight }"><outPutDiscription /></el-main>
      <el-footer :style="footer_style"><Footer /></el-footer>
    </el-container>
  </div>
</template>

<script>
import outPutDiscription from "../views/outPutDiscription.vue";
export default {
  components: {
    outPutDiscription,
  },
  data() {
    //   header
    (this.header_style = [
      {
        height: 60 + "px",
        padding: 0 + "px",
        lineHeight: 60 + "px",
      },
    ]),
      // footer
      (this.footer_style = [
        {
          height: 40 + "px",
          padding: 0 + "px",
          lineHeight: 40 + "px",
        },
      ]);
    return {
      // main height
      screenHeight: "",
      // arr_str
      arr_str: "",
      // arr_str_01
      arr_str_01: "",
    };
  },
  methods: {
    //   mian container auto fixed
    getViewInfo() {
      // header_height
      for (const item of this.header_style) {
        const arr = item.height;
        const arrs = arr.split("");
        const arrs_01 = [];
        for (let i = 0; i < arrs.length - 2; i++) {
          arrs_01.push(arrs[i]);
          const arr_str = arrs_01.join("");
          this.arr_str = arr_str;
        }
      }
      // footer_height
      for (const item of this.footer_style) {
        const arr = item.height;
        const arrs = arr.split("");
        const arrs_01 = [];
        for (let i = 0; i < arrs.length - 2; i++) {
          arrs_01.push(arrs[i]);
          const arr_str = arrs_01.join("");
          this.arr_str_01 = arr_str;
        }
      }
      // JS 加法运算
      const header_footer_sum = Number(this.arr_str) + Number(this.arr_str_01);
      const screenHeight =
        this.$getViewSize().height - header_footer_sum + "px";
      this.screenHeight = screenHeight;
    },
  },
  mounted() {
    this.getViewInfo();
    window.addEventListener("resize", this.getViewInfo);
  },
  destoryed() {
    window.removeEventListener("resize", this.getViewInfo, false);
  },
};
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
</style>