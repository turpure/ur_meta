<template>
  <div class='main'>
    <div class="upload">
      <p>Fyndiqz产品上传 :</p>
      <el-upload class='upload-demo' drag :action='action' :headers='headers' :onError='uploadError' :on-success='uploadSuccess'>
        <i class='el-icon-upload'></i>
        <div class='el-upload__text'>将文件拖到此处，或
          <em>点击上传</em>
        </div>
      </el-upload>
    </div>
    <div class='response'>
      <highlight-code lang="json" :code='code' v-show='show'>
      </highlight-code>
    </div>
  </div>
</template>

<script>
import { fyndiqz, getHeaders } from '../../api/api'

export default {
  data() {
    return {
      headers: {},
      action: '',
      code: '',
      show: false
    }
  },
  methods: {
    uploadSuccess(response, file, fileList) {
      const code = response.data
      this.code = JSON.stringify(code, null, 4)
      this.show = true
    },
    uploadError(err, file, fileList) {
      this.code = err
    }
  },
  mounted() {
    this.headers = getHeaders()
    this.action = fyndiqz()
  }
}
</script>

<style scoped lang='scss'>
.main {
  .upload {
    display: inline-block;
    margin-left: 10rem;
  }
}
.response {
  margin-top: 3.5rem;
  display: inline-block;
  margin-left: 50rem;
  width: 70rem;
  height: 50rem;
}

.hljs {
  max-height: 50rem;
}
</style>