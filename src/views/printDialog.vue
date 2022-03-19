<template>
  <div class="printDialogWrapper">
    <div class="printDialogContent">
      <el-dialog
        title="打印预览"
        :visible.sync="dialogTableVisible"
        :before-close="isClose"
        :close-on-click-modal="noShowing"
        class="dialogStyle"
      >
        <printCanvas id="printContent" :modelInfo="this.modelInfo"></printCanvas>
        <div class="bottomButton">
          <el-button
            type="primary"
            icon="el-icon-printer"
            v-print="'#printContent'"
            >确认打印</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import printCanvas from "../views/printCanvas.vue";
export default {
  components: {
    printCanvas,
  },
  // 页面创建时...
  created() {},
  data() {
    return {
      dialogTableVisible: true,
      visible: false,
      noShowing: false,
      //   遍历父传子对象数组
      modelInfo: [],
      // 条形码样式
      barcode_option: {
        displayValue: false,
        // width: "2px",
        height: 30,
      },
    };
  },
  props: ["print_review_info"],
  mounted() {
    for (const item of this.print_review_info) {
      this.modelInfo = item;
    }
  },
  //   状态是否可见
  methods: {
    //   子传父组件
    isClose() {
      this.$emit("childVisible", this.visible);
    },
  },
};
</script>

<style scoped>
.printWrapper {
  width: 7cm;
  height: 100%;
  border: 1px solid black;
}
.printDialogContent >>> .bottomButton {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
}
.infoSetting {
  display: flex;
  margin-top: 15px;
}
.inputStyle {
  outline: none;
}
.printWrapper >>> .vue-barcode-element {
  width: 120px;
  height: 25px;
}
@page{
  margin: 0;
  padding: 0;
}
</style>