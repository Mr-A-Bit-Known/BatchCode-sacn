<template>
  <div class="outPutDiscriptionWrapper">
    <el-card class="box-card">
      <div class="input_wrapper">
          <el-input placeholder="请输入对应的组装批查询..." :style="input_style" v-model="input"></el-input>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <el-table></el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    this.input_style = [
      {
        width: 600 + "px",
      },
    ];
    return {
        input: ""
    };
  },
};
</script>

<style scoped>
.outPutDiscriptionWrapper .box-card >>> .el-input__inner {
  height: 35px !important;
  border-radius: 0px;
  text-align: center;
}
.outPutDiscriptionWrapper .box-card >>> .el-button {
  border-radius: 0px;
  height: 35px;
  padding: 8px;
}
.input_wrapper {
  display: flex;
  justify-content: center;
}
</style>