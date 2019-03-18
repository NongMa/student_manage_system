<template>
  <div class="main">
    <div class="imgWrap">
      <img ref="imgHeight" :src="imgUrl" alt="图片介绍">
    </div>
    <el-row>
        <el-col>
            <el-upload
                class="upload-demo"
                drag
                ref="upload"
                :action="uploadAction"
                :data="uploadParams"
                :on-preview="handlePreview"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">请发布你的作业，可选择word格式文档</div>
            </el-upload>
      
        </el-col>
    </el-row>
  </div>
</template>
<script>
import imgurl from "@/assets/testImg01.jpg"
import { HOST } from "@/api/config"
export default {
  data() {
    return {
      imgUrl: imgurl,
      uploadAction: HOST + '/file/uploadFile.do'
    }
  },
  computed: {
     uploadParams () {
       return {
         id: this.$store.getters.pid,
         pPur: this.$store.getters.ppur 
       }
     }
  },
  methods: {
    handlePreview (file) {
      console.log(file)
    },
  //文件上传成功的钩子函数
    handleSuccess(res, file) {
        this.$message({
            type: 'info',
            message: '上传成功',
            duration: 6000
        })
        if (file.response.success) {
            this.editor.picture = file.response.message; //将返回的文件储存路径赋值picture字段
        }
    },
    //删除文件之前的钩子函数
    handleRemove(file, fileList) {
        this.$message({
            type: 'info',
            message: '已删除',
            duration: 6000
        })
    }
  },
  mounted () {

  }
};
</script>
<style lang="scss" scoped>
  .main {
    .imgWrap {
      width: 400px;
      margin: 10px auto;
      overflow: hidden;
      img {
        max-width: 100%;
      }
    }
  }
</style>

