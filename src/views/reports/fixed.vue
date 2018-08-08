<template>
    <!-- <div>死库</div> -->
    <div class="main">
        <div class="frist">
            <div>
                <p>销售死库费用 :
                    <el-button @click="export01Excel">下载模板
                    </el-button>
                </p>
                <el-upload class="upload-demo" drag action="/v1/upload/sales-dead-fee" :headers='header' :onError="uploadError" :on-success="uploadSuccess">
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
                <p>美工死库费用 :
                    <el-button @click="export03Excel">下载模板
                    </el-button>
                </p>
                <el-upload class="upload-demo" drag action="http://192.168.0.134:8089/v1/upload/sales-dead-fee" multiple>
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
import { getSalesdeadfee } from "../../api/profit";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      header: {
        //Accept: "application/json",
        token: state => state.user.token
      },
      data01: [["plat", "suffix", "diefeeZn", "ClearanceDate"]],
      data02: [
        ["SalerName", "SalerName2", "TimeGroup", "Amount", "devClearnTime"]
      ],
      data03: [["id", "Possess", "TimeGroup", "PossessClearnTime"]],
      data04: [["purchaser", "amount", "createdDate"]]
    };
  },
  methods: {
    uploadSuccess(response, file, fileList) {
      console.log(response);
      console.log(file);
    },
    uploadError(err, file, fileList) {
      console.log(file);
      console.log(header);
    },
    // beforeAvatarUpload(file) {
    //   const extension = file.name.split(".")[1] === "xlsx";
    //   if (!extension) {
    //     alert("上传模板只能是xlsx格式！");
    //   }
    //   let formData = new FormData();
    //   formData.append("file", file);
    //   console.log(file);
    //   console.log(formData);
    //   let config = {
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded"
    //     }
    //   };
    //   debugger;
    //   getSalesdeadfee({ formdata: file }, config).then(response => {
    //     if (response.code == 200) {
    //       alert("上传成功");
    //     } else {
    //       alert("上传失败");
    //     }
    //     return false;
    //   });
    // },
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