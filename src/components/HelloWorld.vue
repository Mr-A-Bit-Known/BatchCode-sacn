<template>
  <div class="homePageWrapper">
    <el-container>
      <el-header :style="header_style"></el-header>
      <el-main :style="{ height: screenHeight }">
        <div class="content_wrapper">
          <div class="search_wrapper">
            <el-input
              v-model="data_list.inputValue"
              ref="inputInfo"
              placeholder="请输入对应的组装批号..."
              @keyup.enter.native="scan"
              v-loading.fullscreen.lock="fullscreenLoading"
            ></el-input>
            <el-tooltip
              class="item"
              effect="dark"
              content="点我开始搜索"
              placement="right"
            >
              <el-button type="primary" icon="el-icon-search" @click="scan"
                >确定</el-button
              >
            </el-tooltip>
          </div>
        </div>
        <div class="print_review_wrapper">
          <div class="print_review">
            <el-card class="box-card" :class="{ isAlign: isAlign }">
              <div class="emptyWrapper">
                <el-empty v-if="showEmpty" class="emptyTable" />
              </div>
              <el-table
                v-if="tableShow"
                :data="print_review_info"
                style="width: 100%"
                border
              >
                <el-table-column
                  prop="WorkOrderCode"
                  label="工作令"
                  width="130px"
                />
                <el-table-column
                  prop="BatchCode"
                  label="组装批"
                  width="180px"
                />
                <el-table-column
                  prop="CustomerOrderCode"
                  label="客户订单号"
                  width="220px"
                />
                <el-table-column
                  prop="customerProductModel"
                  label="客户产品型号"
                  width="220px"
                />
                <el-table-column
                  prop="customerProductModel"
                  label="客户产品名称"
                  width="250px"
                />
                <el-table-column
                  v-if="showLabel"
                  prop="Label"
                  label="产品型号"
                  width="250px"
                />
                <el-table-column
                  prop="StandardQty"
                  label="标准数量"
                  v-if="this.showTable"
                />
                <el-table-column prop="NowQty" label="当前数量" />
              </el-table>
            </el-card>
          </div>
        </div>
        <div class="bottom_wrapper">
          <div class="bottom_content">
            <el-tooltip
              class="item"
              effect="dark"
              content="点我打印预览"
              placement="top"
            >
              <el-button
                type="primary"
                :disabled="this.showButton"
                icon="el-icon-printer"
                @click="showVisible"
                >打印预览</el-button
              >
            </el-tooltip>
          </div>
        </div>
      </el-main>
      <el-footer :style="footer_style"><Footer /></el-footer>
    </el-container>
    <PrintDialog
      v-if="isVisible"
      @childVisible="parentVisible"
      :print_review_info="this.print_review_info"
    />
  </div>
</template>

<script>
import PrintDialog from "../views/printDialog.vue";
export default {
  components: {
    PrintDialog,
  },
  created() {},
  data() {
    //   header
    (this.header_style = [
      {
        height: 120 + "px",
        padding: 0 + "px",
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
      //   loading
      fullscreenLoading: false,
      // 空状态
      showEmpty: true,
      // 表格状态
      tableShow: false,
      // 打印状态
      showPrint: false,
      // 表格内容是否存在判断
      showTable: true,
      // 打印按钮状态
      showButton: true,
      // label状态
      showLabel: true,
      //   input
      data_list: [
        {
          inputValue: "",
        },
      ],

      // 显示抽屉
      drawer: false,

      // 字体样式
      pubFontSty: true,

      // 数据组合
      infoListGroup: "",
      // 遍历获取的数组对象
      bar: "",
      // 遍历数组接收对象
      print_review_info: {},
      // 剧中样式
      isAlign: true,
      // 打印预览显示状态
      isVisible: false,
    };
  },
  methods: {
    //   mian container auto fixed
    getViewInfo() {
      const screenHeight = this.$getViewSize().height - 160 + "px";
      this.screenHeight = screenHeight;
    },
    // 是否显示遮罩层
    showVisible() {
      this.isVisible = true;
    },
    parentVisible(ishowing) {
      this.isVisible = ishowing;
    },
    //  scan
    scan() {
      // 判断输入内容是否为空
      if (
        this.data_list.inputValue != null &&
        !this.data_list.inputValue.match(/^[ ]*$/) &&
        this.data_list.inputValue != ""
      ) {
        this.fullscreenLoading = true;
        this.achieveBatchCodeInfo();
        // enter之后失去焦点
        this.$refs.inputInfo.blur();
      } else {
        // 控制弹出信息数量
        if (document.getElementsByClassName("el-message").length > 1) return;
        this.$message({
          message: `<strong><i>输入的组装批号不能为空...</i></strong>`,
          // html元素
          dangerouslyUseHTMLString: true,
          // 关闭按钮开启d
          showClose: true,
          // 问名字是否居中
          center: true,
          // 文字提示类型
          type: "error",
          // 显示时间
          duration: 2000,
        });
      }
    },
    // 获取batchcode信息
    achieveBatchCodeInfo() {
      this.data_list.inputValue = this.data_list.inputValue
        .trim()
        .toUpperCase();
      const params = new URLSearchParams({
        BatchCode: this.data_list.inputValue,
      });
      this.$axios
        .post("/api/searchInterface/batch_code_search", params)
        .then((res) => {
          // 动画消失
          this.fullscreenLoading = res.data.fullscreenLoading;
          // 判断查询完成后对应状态
          const status = res.data.code;
          // 查询完成后对应的展示数据
          const result = res.data.data;
          if (status == 200) {
            this.isAlign = false;
            if (document.getElementsByClassName("el-message").length > 1)
              return;
            this.tableShow = res.data.tableShow;
            this.showEmpty = res.data.showEmpty;
            this.showPrint = res.data.showPrint;
            for (const item of result) {
              this.bar = item.BatchCode;
              this.barList = item;
              if (item.StandardQty == null) {
                this.showTable = false;
                // 数据组合
                this.infoListGroup =
                  item.CustomerOrderCode +
                  "#" +
                  item.customerProductModel +
                  "#" +
                  item.NowQty;
              } else {
                this.showTable = true;
                this.infoListGroup =
                  item.CustomerOrderCode +
                  "#" +
                  item.customerProductModel +
                  "#" +
                  item.NowQty +
                  "#" +
                  item.StandardQty;
              }
              if (item.Label == null) {
                this.showLabel = false;
              } else {
                this.showLabel = true;
              }
            }
            this.$message({
              message: `<strong><i>"${this.bar}"查询成功...</i></strong>`,
              // html元素
              dangerouslyUseHTMLString: true,
              // 关闭按钮开启d
              showClose: true,
              // 问名字是否居中
              center: true,
              // 文字提示类型
              type: "success",
              // 显示时间
              duration: 2000,
            });
            this.print_review_info = result;
          } else if (status == 404) {
            this.isAlign = true;
            if (document.getElementsByClassName("el-message").length > 1)
              return;
            this.showEmpty = res.data.showEmpty;
            this.tableShow = res.data.tableShow;
            this.showPrint = res.data.showPrint;
            this.print_review_info = "";
            this.$message({
              message: `<strong><i>"${this.data_list.inputValue}"不存在...</i></strong>`,
              // html元素
              dangerouslyUseHTMLString: true,
              // 关闭按钮开启d
              showClose: true,
              // 问名字是否居中
              center: true,
              // 文字提示类型
              type: "error",
              // 显示时间
              duration: 2000,
            });
            this.data_list.inputValue = "";
          }
        });
    },
  },
  // 监听
  watch: {
    // 处理打印按钮何时能被使用
    showPrint: function (value) {
      if (value == true) {
        this.showButton = false;
      } else {
        this.showButton = true;
      }
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
.homePageWrapper {
  display: flex;
}
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
.content_wrapper {
  display: flex;
  justify-content: center;
}
.search_wrapper {
  margin-top: 50px;
  width: 800px;
  display: flex;
  justify-content: center;
}
/* 穿透样式 */
.search_wrapper >>> .el-input__inner {
  height: 45px !important;
  border-radius: 0px;
  text-align: center;
}
.search_wrapper .el-button {
  border-radius: 0px !important;
}
.print_review_wrapper {
  display: flex;
  justify-content: center;
}
.box-card {
  display: flex;
  justify-content: center;
  margin-top: 50px;
  width: 1600px;
  /* height: 500px; */
}
/* 动态居中样式 */
.isAlign {
  align-items: center;
}
.el-table {
  width: 100%;
}
.bottom_wrapper {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
.bottom_content {
  width: 1600px;
  display: flex;
  justify-content: flex-end;
}
</style>