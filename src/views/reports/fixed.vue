<template>
    <!-- <div>死库</div> -->
    <div class="main">
        <div class="frist">
            <div>
                <p>销售死库费用 :
                    <el-button @click="export01Excel">下载模板
                    </el-button>
                </p>
<<<<<<< HEAD
                <el-upload class="upload-demo" drag :action='action' :headers='headers'  :onError="uploadError" :on-success="uploadSuccess">
=======
                <el-upload class="upload-demo" drag :action="url" :onError="uploadError" :on-success="uploadSuccess">
>>>>>>> 04c2762be2252c51698fbecc2287267f831f0554
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或
                        <em>点击上传</em>
                    </div>
                </el-upload>
            </div>
            <div>
                <p>开发死库费用 :
                    <el-button @click="export02Excel">下载模板
                    </el-button>
                </p>
                <el-upload class="upload-demo" drag :action="url" multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或
                        <em>点击上传</em>
                    </div>
                </el-upload>
            </div>
        </div>
        <div class="frist">
            <div>
                <p>美工死库费用 :
                    <el-button @click="export03Excel">下载模板
                    </el-button>
                </p>
                <el-upload class="upload-demo" drag :action="url" multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或
                        <em>点击上传</em>
                    </div>
                </el-upload>
            </div>
            <div>
                <p>采购死库费用 :
                    <el-button @click="export04Excel">下载模板
                    </el-button>
                </p>
                <el-upload class="upload-demo" drag :action="url" multiple>
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
<<<<<<< HEAD
import { uploadFile, getHeaders } from "../../api/api";
import FileSaver from "file-saver";                           
=======
import FileSaver from "file-saver";
>>>>>>> 04c2762be2252c51698fbecc2287267f831f0554
import XLSX from "xlsx";
import { getToken } from "@/utils/auth";

export default {
  data() {
    return {
<<<<<<< HEAD
      action: '',
      headers: ''
    }
=======
      url:
        "http://192.168.0.134:8089/v1/upload/sales-dead-fee" +
        "?" +
        "token=" +
        getToken(),
      data01: [["plat", "suffix", "diefeeZn", "ClearanceDate"]],
      data02: [
        ["SalerName", "SalerName2", "TimeGroup", "Amount", "devClearnTime"]
      ],
      data03: [["id", "Possess", "TimeGroup", "PossessClearnTime"]],
      data04: [["purchaser", "amount", "createdDate"]]
    };
>>>>>>> 04c2762be2252c51698fbecc2287267f831f0554
  },
  methods: {
    uploadSuccess(response, file, fileList) {
      console.log(response);
    },
    uploadError(err, file, fileList) {
<<<<<<< HEAD
      console.log(file);
=======
      console.log(err);
>>>>>>> 04c2762be2252c51698fbecc2287267f831f0554
    },
    export01Excel() {
      /* convert state to workbook */
      const ws = XLSX.utils.aoa_to_sheet(this.data01);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Y_saleofflineclearn");
      /* generate file and send to client */
      XLSX.writeFile(wb, "Y_saleofflineclearn.xlsx");
    },
    export02Excel() {
      /* convert state to workbook */
      const ws = XLSX.utils.aoa_to_sheet(this.data02);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Y_devOfflineClearn");
      /* generate file and send to client */
      XLSX.writeFile(wb, "Y_devOfflineClearn.xlsx");
    },
    export03Excel() {
      /* convert state to workbook */
      const ws = XLSX.utils.aoa_to_sheet(this.data03);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Y_PossessOfflineClearn");
      /* generate file and send to client */
      XLSX.writeFile(wb, "Y_PossessOfflineClearn.xlsx");
    },
    export04Excel() {
      /* convert state to workbook */
      const ws = XLSX.utils.aoa_to_sheet(this.data04);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Y_purOfflineClearn");
      /* generate file and send to client */
      XLSX.writeFile(wb, "Y_purOfflineClearn.xlsx");
    }
  },
  mounted() {
    this.action = uploadFile()
    this.headers = getHeaders()
  }
}
</script>

<style scoped lang="scss">
.main {
  .frist {
    float: left;
    margin-left: 100px;
  }
}
</style>