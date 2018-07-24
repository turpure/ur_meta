<template>
    <!-- <div>运营</div> -->
    <div class="main">
        <div>运营</div>
        <div class="frist">
            <div>
                <p>销售运营杂费 :
                    <el-button @click="export01Excel">下载
                    </el-button>
                </p>
                <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或
                        <em>点击上传</em>
                    </div>
                </el-upload>
            </div>
            <div>
                <p>开发运营杂费 :
                    <el-button @click="export02Excel">下载
                    </el-button>
                </p>
                <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
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
                    <el-button @click="export03Excel">下载
                    </el-button>
                </p>
                <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或
                        <em>点击上传</em>
                    </div>
                </el-upload>
            </div>
            <div>
                <p>采购运营杂费 :
                    <el-button @click="export04Excel">下载
                    </el-button>
                </p>
                <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
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
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
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
      XLSX.utils.book_append_sheet(wb, ws, "Y_saleOpeFee");
      /* generate file and send to client */
      XLSX.writeFile(wb, "Y_saleOpeFee.xlsx");
    },
    export02Excel() {
      /* convert state to workbook */
      const ws = XLSX.utils.aoa_to_sheet(this.data02);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Y_devOperateFee");
      /* generate file and send to client */
      XLSX.writeFile(wb, "Y_devOperateFee.xlsx");
    },
    export03Excel() {
      /* convert state to workbook */
      const ws = XLSX.utils.aoa_to_sheet(this.data03);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Y_PossessOperateFee");
      /* generate file and send to client */
      XLSX.writeFile(wb, "Y_PossessOperateFee.xlsx");
    },
    export04Excel() {
      /* convert state to workbook */
      const ws = XLSX.utils.aoa_to_sheet(this.data04);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Y_purOperateFee");
      /* generate file and send to client */
      XLSX.writeFile(wb, "Y_purOperateFee.xlsx");
    }
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