<template>
  <div class="main">
    <el-carousel :interval="4000" type="card" height="200px" class="banner">
      <el-carousel-item v-for="item in imgUrls" :key="item.id" class="banner-list">
        <img :src="item.url" :alt="item.title">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import imgurl1 from "@/assets/testImg01.jpg"
import imgurl2 from "@/assets/testImg02.jpg"
import imgurl3 from "@/assets/testImg03.jpg"
export default {
  data() {
    return {
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
      ]
    };
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
      }
    }  
  }
}
</style>

