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
        <div
          class="printWrapper"
          id="printContent"
          v-for="item in this.print_review_info"
          :key="item.index"
        >
          <barcode :value="item.BatchCode" />
          <barcode :value="item.WorkOrderCode" />
        </div>
        <div class="infoSetting">
          <input type="text" v-model="this.modelInfo.BatchCode" />
        </div>
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
export default {
  created() {
    for (const item of this.print_review_info) {
      this.modelInfo = item;
    }
  },
  data() {
    return {
      dialogTableVisible: true,
      visible: false,
      noShowing: false,
      //   遍历父传子对象数组
      modelInfo: [],
    };
  },
  props: ["print_review_info"],
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
  width: 100%;
  height: 100%;
  border: 1px solid black;
}
.printDialogContent >>> .bottomButton {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
}
</style>