<template>
  <div class="header-wrap">
    <el-row class="header">
      <el-col :span="23">
        <el-menu
          :default-active="$route.path"
          class="el-menu-demo"
          mode="horizontal"
          :router="true"
          @select="handleSelect"
        >
          <el-menu-item index="/answer">在线答题</el-menu-item>
          <el-menu-item index="/upload">上传作业</el-menu-item>
          <el-menu-item index="/download">下载资料</el-menu-item>
          <el-menu-item index="/message">消息中心</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="1" class="adminBox">
        <img :src="adminImg" @click="toogleAdminDet">
      </el-col>
      <show-info v-show="showAdmin"></show-info>
    </el-row>
  </div>
</template>
<script>
import admin from "@/assets/admin.png";
import ShowInfo from "../commonViews/showInfo.vue";
export default {
  name: "student-header",
  data() {
    return {
      adminImg: admin,
      activeIndex: "1",
      isStudent: true,
      showAdmin: false
    };
  },
  methods: {
    handleSelect(index) {
      this.activeIndex = index;
    },
    toogleAdminDet() {
      this.showAdmin = !this.showAdmin;
    }
  },
  mounted() {},
  components: {
    ShowInfo
  }
}
</script>
<style lang="scss" scoped>
.header-wrap {
  background-color: #fff;
  box-shadow: 0 0 8px #888;
  height: 60px;
  .header {
    position: relative;
    height: 60px;
    width: 80%;
    margin: 0 auto;
    background-color: #fff;
    .el-menu.el-menu--horizontal {
      border: none;
    }
    .adminBox {
      height: 100%;
      // display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      img {
        width: 40px;
        height: 40px;
      }
    }
    .adminDet {
      background-color: #f3f3f3;
      padding: 20px 10px;
      box-shadow: 0 0 5px #888;
      position: absolute;
      top: 60px;
      right: 1.2rem;
      .adminDetContent {
        div {
          text-align: left;
          margin-bottom: 10px;
          &:last-child {
            margin-bottom: 30px;
          }
        }
      }
    }
  }
}
</style>
