<template>
  <div class="canvasWrapper">
    <canvas id="canvas">
      <!-- <el-table :data="this.printInfo" border style="width: 100%">
        <el-table-column prop="WorkOrderCode" label="工作令" width="180">
        </el-table-column>
        <el-table-column prop="BatchCode" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table> -->
    </canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      context: {},
      //   canvasHeight
      // canvasHeight: 400 + "px",
      // 打印数据
      printInfo: [],
    };
  },
  props: ["modelInfo"],
  mounted() {
    const modelInfoObj = this.modelInfo;
    const printArray = [];
    for (const key in modelInfoObj) {
      printArray.push(modelInfoObj[key]);
    }
    this.printInfo = printArray;
    // 调用canvas
    this.draw();
    // windows大小调整时重新绘制canvas
    window.onresize = () => {
      this.draw();
    };
  },
  methods: {
    // 绘制canvas
    draw() {
      this.printInfo.forEach(el => {
        console.log(typeof(el),'123456');
      });
      // console.log("初始化canvas");
      const c = document.getElementById("canvas");
      const ctx = c.getContext("2d");
      const winW = window.innerWidth / 2;
      const winH = window.innerHeight / 2;
      c.windth = winW;
      c.height = winH;
      ctx.font = "20pt Calibri";
      ctx.fillStyle = "blue";
      ctx.fillText("WorkOrderCode", 10, 20);
    },
  },
};
</script>

<style scoped>
</style>