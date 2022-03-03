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
                @click="drawer = true"
                >打印预览</el-button
              >
            </el-tooltip>
          </div>
        </div>
      </el-main>
      <el-footer :style="footer_style"><Footer /></el-footer>
    </el-container>
    <div class="drawerWrapper">
      <el-dialog
        class="dialogStyle"
        title="标签打印"
        :visible.sync="drawer"
        :with-header="false"
        :close-on-click-modal="false"
      >
        <el-card class="printCard">
          
          <el-card class="barView">
            <div class="barcode_wrapper" id="barcode_wrapper">
              <div class="barcode_left">
                <div class="barcodeSame">
                  <div class="barcodeContent">
                    <div class="barcodeDiscription">
                      PO:{{ this.infoList.workOrderCode }}
                    </div>
                    <barcode
                      :value="this.infoList.workOrderCode"
                      :displayValue="false"
                      :height="50"
                    />
                  </div>
                </div>
                <div class="barcodeSame anotherStyle">
                  <div class="barcodeContent">
                    <div class="barcodeDiscription">
                      MPN:{{ this.infoList.label }}
                    </div>
                    <barcode
                      :value="this.infoList.Label"
                      :displayValue="false"
                      :height="50"
                    />
                  </div>
                </div>
                <div class="barcodeSame anotherStyle">
                  <div class="barcodeContent">
                    <div class="barcodeDiscription">
                      M.LOT:{{ this.infoList.batchCode }}
                    </div>
                    <barcode
                      :value="this.infoList.BatchCode"
                      :displayValue="false"
                      :height="50"
                    />
                  </div>
                </div>
              </div>
              <div>
                <div class="barcodeSame">
                  <div class="barcodeContent">
                    <div class="barcodeDiscription">
                      M.LOT:{{ this.infoList.nowQty }}
                    </div>
                    <barcode
                      :value="this.infoList.NowQty"
                      :displayValue="false"
                      :height="50"
                    />
                  </div>
                </div>
                <div class="qrcode_style">
                  <qrcode :value="this.infoListGroup" />
                </div>
              </div>
            </div>
          </el-card>
          <h3>***可修改以下参数***</h3>
          <div class="settingPanel">
            <div class="gridContent">
              <p :class="{ pubFontSty: pubFontSty }">当前数量:</p>
              <input v-model="this.infoList.nowQty" />
            </div>
            <div class="gridContent" v-if="this.showTable">
              <p :class="{ pubFontSty: pubFontSty }">标准数量:</p>
              <input v-model="this.infoList.standardQty" />
            </div>
            <div class="gridContent" v-if="(inputShow = false)">
              <p :class="{ pubFontSty: pubFontSty }">Qty:</p>
              <input type="text" />
            </div>
          </div>
        </el-card>
        <div class="printButton">
          <el-button
            type="primary"
            icon="el-icon-printer"
            v-print="'#barcode_wrapper'"
            >打印</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
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
      showButton: false,
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
      // 条形码转换
      infoList: [
        {
          workOrderCode: "",
          batchCode: "",
          customerOrderCode: "",
          label: "",
          nowQty: "",
          standardQty: "",
          customerProductModel: "",
        },
      ],
      // 数据组合
      infoListGroup: "",
      // 遍历获取的数组对象
      bar: "",
      // 遍历数组接收对象
      print_review_info: [{}],
      getBarCode_info: [{}],
      // 剧中样式
      isAlign: true,
    };
  },
  methods: {
    //   mian container auto fixed
    getViewInfo() {
      const screenHeight = this.$getViewSize().height - 160 + "px";
      this.screenHeight = screenHeight;
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
              // 条形码转换
              this.infoList.workOrderCode = item.WorkOrderCode;
              // 条形码转换
              this.infoList.batchCode = item.BatchCode;
              // 条形码转换
              this.infoList.customerOrderCode = item.CustomerOrderCode;
              // 条形码转换
              this.infoList.label = item.Label;
              // 条形码转换
              this.infoList.nowQty = item.NowQty;
              // 条形码转换
              this.infoList.standardQty = item.StandardQty;
              // 条形码转换
              this.infoList.customerProductModel = item.customerProductModel;

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
              if (item.Label == "") {
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
  height: 45px!important;
  border-radius: 0px;
  text-align: center;
}
.search_wrapper .el-button {
  border-radius: 0px!important;
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
  height: 500px;
}
/* 动态居中样式 */
.isAlign {
  align-items: center;
}
.el-table {
  width: 1450px!important;
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
.vue-print {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}
@page {
  margin-top: 1mm;
  margin-bottom: 1mm;
}
.vuePrintStyle {
  width: 8cm;
  height: 4.5cm;
}
.barcode_style {
  height: 30px;
  line-height: 30px;
}
.print_area {
  width: 12cm!important;
  flex-direction: column;
}
.barcode_item {
  line-height: 30px;
}
.font_style {
  font-size: 14px;
  text-align: left;
}
.printButton {
  width: 100%;
  height: 40px!important;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
.printCard {
  height: 550px;
}
.barView {
  width: 100%;
  height: 400px;
}
.settingPanel {
  margin-top: 20px;
  width: 100%;
  height: 200px!important;
  display: flex;
  justify-content: flex-start;
  overflow: hidden;
}
.pubFontSty {
  font-size: 15px;
  font-weight: 500;
}
.gridContent {
  display: flex;
  margin-left: 10px;
  margin-top: -70px;
  height: 175px!important;
  align-items: center;
}
.gridContent input {
  width: 150px;
  height: 25px;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 700;
  font-family: "Microsoft soft";
}
.barcode_wrapper {
  width: 7cm;
  height: 4.5cm;
  display: flex;
}
.barcode_left {
  display: flex;
  flex-direction: column;
}
.barcodeContent {
  display: flex;
  flex-direction: column;
}
.barcodeSame {
  height: 80px;
}
.anotherStyle {
  margin-top: 10px;
}
.barcodeDiscription {
  font-size: 20px;
  margin-left: 10px;
}
.qrcode_style {
  margin-left: 10px;
  margin-top: 20px;
}
</style>