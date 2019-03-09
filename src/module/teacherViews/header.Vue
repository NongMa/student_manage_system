<template>
  <el-row class="header">
    <el-col :span="23">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1"><router-link tag="li" :to="{path: '/table'}">发布题目</router-link></el-menu-item>
        <el-menu-item index="2">审查题目</el-menu-item>
        <el-menu-item index="3">下载资料</el-menu-item>
        <el-menu-item index="4">消息发布</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="1" class="adminBox">
       <img :src="adminImg" @click="toogleAdminDet">
    </el-col>
    <show-info v-show="showAdmin"></show-info>
  </el-row>
</template>
<script>
import admin from '@/assets/admin.png'
import ShowInfo from '../commonViews/showInfo.vue'
export default {
  name: 'teacher-header',
  data () {
    return {
      adminImg: admin,
      activeIndex: '1',
      activeIndex2: '1',
      isStudent: true,
      showAdmin: false
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    toogleAdminDet () {
      this.showAdmin = !this.showAdmin
    }
  },
  components: {
    ShowInfo
  }
}
</script>
<style lang="scss" scoped>
  .header {
    position: relative;
    height: 60px;
    padding: 0 4rem;
    background-color: #fff;
    .el-menu.el-menu--horizontal {
        border: none;
    }
    .adminBox {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      img {
        width: 100%;
        height: auto;
        padding: 5px;
      }
    }
    .adminDet {
        background-color: #f3f3f3;
        padding: 20px 10px;
        box-shadow: 0 0 5px #888;
        position: absolute;
        top: 60px;
        right: 2.5rem;
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
</style>
