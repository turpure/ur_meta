<template>
    <!-- <div>运营</div> -->
    <div class="main">
        <div class="frist">
            <div>
                <p>销售运营杂费 :
                    <el-button @click="export01Excel">下载模板
                    </el-button>
                </p>
                <el-upload class="upload-demo" drag :action="action" :headers='headers' multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或
                        <em>点击上传</em>
                    </div>
                </el-upload>
            </div>
            <div>
                <p>开发运营杂费 :
                    <el-button @click="export02Excel">下载模板
                    </el-button>
                </p>
                <el-upload class="upload-demo" drag :action="action" :headers='headers' multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或
                        <em>点击上传</em>
                    </div>
                </el-upload>
            </div>
        </div>
        <div class="frist">
            <div>
                <p>美工运营杂费 :
                    <el-button @click="export03Excel">下载模板
                    </el-button>
                </p>
                <el-upload class="upload-demo" drag :action="action" :headers='headers' multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或
                        <em>点击上传</em>
                    </div>
                </el-upload>
            </div>
            <div>
                <p>采购运营杂费 :
                    <el-button @click="export04Excel">下载模板
                    </el-button>
                </p>
                <el-upload class="upload-demo" drag :action="action" :headers='headers' multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或
                        <em>点击上传</em>
                    </div>
                </el-upload>
            </div>
        </div>
    </div>
</template>

<script>
import { uploadFile, getHeaders } from "../../api/api";
import FileSaver from "file-saver";
import XLSX from "xlsx";

export default {
  data() {
    return {
      action: "",
      headers: {},
      data01: [["plat", "suffix", "saleOpeFeeZn", "saleOpeTime"]],
      data02: [
        ["SalerName", "SalerName2", "TimeGroup", "Amount", "devOperateTime"]
      ],
      data03: [["id", "TimeGroup", "Amount", "PossessOperateTime"]],
      data04: [["purchaser", "amount", "createdDate"]]
    };
  },
  methods: {
    export01Excel() {
      /* convert state to workbook */
      const ws = XLSX.utils.aoa_to_sheet(this.data01);
      const wb = XLSX.utils.book_new();
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      let hour = date.getHours();
      let minute = date.getMinutes();
      let second = date.getSeconds();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
      }
      if (minute >= 0 && minute <= 9) {
        minute = "0" + minute;
      }
      if (second >= 0 && second <= 9) {
        second = "0" + second;
      }
      let filename =
        "Y_saleOpeFee" + year + month + strDate + hour + minute + second;
      XLSX.utils.book_append_sheet(wb, ws, "Y_saleOpeFee");
      /* generate file and send to client */
      XLSX.writeFile(wb, filename + ".xlsx");
    },
    export02Excel() {
      /* convert state to workbook */
      const ws = XLSX.utils.aoa_to_sheet(this.data02);
      const wb = XLSX.utils.book_new();
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      let hour = date.getHours();
      let minute = date.getMinutes();
      let second = date.getSeconds();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
      }
      if (minute >= 0 && minute <= 9) {
        minute = "0" + minute;
      }
      if (second >= 0 && second <= 9) {
        second = "0" + second;
      }
      let filename =
        "Y_devOperateFee" + year + month + strDate + hour + minute + second;
      XLSX.utils.book_append_sheet(wb, ws, "Y_devOperateFee");
      /* generate file and send to client */
      XLSX.writeFile(wb, filename + ".xlsx");
    },
    export03Excel() {
      /* convert state to workbook */
      const ws = XLSX.utils.aoa_to_sheet(this.data03);
      const wb = XLSX.utils.book_new();
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      let hour = date.getHours();
      let minute = date.getMinutes();
      let second = date.getSeconds();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
      }
      if (minute >= 0 && minute <= 9) {
        minute = "0" + minute;
      }
      if (second >= 0 && second <= 9) {
        second = "0" + second;
      }
      let filename =
        "Y_PossessOperateFee" + year + month + strDate + hour + minute + second;
      XLSX.utils.book_append_sheet(wb, ws, "Y_PossessOperateFee");
      /* generate file and send to client */
      XLSX.writeFile(wb, filename + ".xlsx");
    },
    export04Excel() {
      /* convert state to workbook */
      const ws = XLSX.utils.aoa_to_sheet(this.data04);
      const wb = XLSX.utils.book_new();
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      let hour = date.getHours();
      let minute = date.getMinutes();
      let second = date.getSeconds();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
      }
      if (minute >= 0 && minute <= 9) {
        minute = "0" + minute;
      }
      if (second >= 0 && second <= 9) {
        second = "0" + second;
      }
      let filename =
        "Y_purOperateFee" + year + month + strDate + hour + minute + second;
      XLSX.utils.book_append_sheet(wb, ws, "Y_purOperateFee");
      /* generate file and send to client */
      XLSX.writeFile(wb, filename + ".xlsx");
    }
  },
  mounted() {
    this.action = uploadFile();
    this.headers = getHeaders();
  }
};
</script>

<style scoped lang="scss">
.main {
  .frist {
    float: left;
    margin-left: 100px;
  }
}
</style>