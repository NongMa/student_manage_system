<template>
  <el-row class="header">
    <el-col :span="23">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">上传作业</el-menu-item>
        <el-menu-item index="2">在线答题</el-menu-item>
        <el-menu-item index="3">下载资料</el-menu-item>
        <el-menu-item index="4">消息查询</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="1" class="adminBox">
       <img :src="adminImg" @click="toogleAdminDet">
    </el-col>
    <div class="adminDet" v-show="showAdmin">
        <div class="adminDetContent">
            <div>{{name}}</div>
            <div>身份:{{idState}}</div>
            <el-button type="primary" size="mini"  @click="loginOut">退出登录</el-button>
        </div>
    </div>
  </el-row>
</template>
<script>
import admin from '@/assets/admin.png'
export default {
  data () {
    return {
      adminImg: admin,
      activeIndex: '1',
      activeIndex2: '1',
      isStudent: true,
      showAdmin: false,
      name: '黄小琥'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    toogleAdminDet () {
      this.showAdmin = !this.showAdmin
    },
    loginOut () {
      this.$store.dispatch('FedLogOut').then(() => {
        this.$router.push({ path: '/' })
      })
    }
  },
  computed: {
    idState () {
      return this.isStudent ? '学生' : '老师'
    }
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
