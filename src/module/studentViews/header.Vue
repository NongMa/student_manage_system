<template>
  <div class="header-wrap">
    <div class="header">
      <el-menu
        :default-active="$route.path ==''? '1' : $route.path"
        model="vertical"
        :collapse="isCollapse"
        class="el-menu-vertical-demo"
        @select="handleSelect"
        :router="true"
        :show-timeout="100"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
      >
        <el-menu-item class="el-menu-item" index="/answer">
          <i class="el-icon-document"></i>
          <span slot="title">在线答题</span>
        </el-menu-item>
        <el-menu-item class="el-menu-item" index="/upload">
          <i class="el-icon-upload2"></i>
          <span slot="title">上传作业</span>
        </el-menu-item>
        <el-menu-item class="el-menu-item" index="/download">
          <i class="el-icon-download"></i>
          <span slot="title">下载资料</span>
        </el-menu-item>
        <el-menu-item class="el-menu-item" index="/message">
          <i class="el-icon-message"></i>
          <span slot="title">消息中心</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="adminBox">
      <el-radio-group
        :class="isCollapse ? 'collapse collapse-close' : 'collapse'"
        v-model="isCollapse"
      >
        <el-button
          circle
          type="primary"
          :icon="isCollapse ?'el-icon-arrow-right':'el-icon-arrow-left'"
          @click="toggleCollapse"
        ></el-button>
      </el-radio-group>
      <div class="adminContent" @click="toogleAdminDet">
        <img :src="adminImg">
        <i class="el-icon-caret-bottom"></i>
      </div>
    </div>
    <show-info v-show="showAdmin"></show-info>
  </div>
</template>
<script>
import admin from "@/assets/account.gif";
import ShowInfo from "../commonViews/showInfo.vue";
export default {
  name: "student-header",
  data() {
    return {
      adminImg: admin,
      activeIndex: "0",
      isStudent: true,
      showAdmin: false,
      isCollapse: false
    };
  },
  methods: {
    handleSelect(index) {
      this.activeIndex = index;
    },
    toogleAdminDet() {
      this.showAdmin = !this.showAdmin;
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
      this.$emit("showCollapse", this.isCollapse);
    }
  },
  mounted() {},
  components: {
    ShowInfo
  }
};
</script>
<style lang="scss" scoped>
.header-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  .header {
    position: fixed;
    top: 0;
    z-index: 999;
    height: 100%;
    .el-menu-vertical-demo {
      height: 100%;
      z-index: 99;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 180px;
    }
  }
  .adminBox {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    background-color: #fff;
    box-shadow: 0 0 8px #888;
    width: 100%;
    height: 50px;
    text-align: left;
    cursor: pointer;
    .collapse {
      position: absolute;
      left: 200px;
      top: 0;
      margin-bottom: 20px;
      transition: left 0.6s;
    }
    .collapse-close {
      left: 84px;
    }
    .adminContent {
      position: absolute;
      right: 20px;
      top: 0;
      img {
        width: 40px;
        height: 40px;
        border-radius: 5px;
      }
    }
  }
}
</style>
