<template>
  <div class="main">
    <el-carousel :interval="4000" type="card" class="banner" :height="imgHeight+'px'">
      <el-carousel-item v-for="item in imgUrls" :key="item.id" class="banner-list">
        <img ref="imgHeight" :src="item.url" :alt="item.title">
      </el-carousel-item>
    </el-carousel>
    <el-row>
        <el-col>
            <el-upload
                class="upload-demo"
                drag
                :action="uploadAction"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">请上传你的作业，可选择word格式文档</div>
            </el-upload>
        </el-col>
    </el-row>
  </div>
</template>
<script>
import imgurl1 from "@/assets/testImg01.jpg"
import imgurl2 from "@/assets/testImg02.jpg"
import imgurl3 from "@/assets/testImg03.jpg"
import { HOST } from "@/api/config"
export default {
  data() {
    return {
      imgHeight: '',
      imgUrls: [
        {
          url: imgurl1,
          title: "测试图1"
        },
        {
          url: imgurl2,
          title: "测试图2"
        },
        {
          url: imgurl3,
          title: "测试图3"
        }
      ],
      uploadAction: HOST + '/file/uploadFile.do'
    }
  },
  methods: {
    imgLoad () {
      this.$nextTick(()=>{
          this.imgHeight = this.$refs.imgHeight[0].height
      })
    },
    UploadLesson () {
      
       
      let param = {
        id: this.$store.getters.pid,
        file: ''
      }
      uploadLesson (param).then( res => {
        console.log(res.data)
      })
    }
  },
  mounted () {
    this.imgLoad()
    window.addEventListener('resize',()=>{
        this.imgHeight = this.$refs.imgHeight[0].height
        this.imgLoad()
    },false)
  }
};
</script>
<style lang="scss" scoped>
.main {
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
  .banner {
    margin-top: 30px;
    .banner-list {
      img {
        width: 100%;
        height: auto;
      }
    }  
  }
}
</style>

