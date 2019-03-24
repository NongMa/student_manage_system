<template>
    <div class="adminDet">
        <div class="adminDetContent">
            <p style="font-size: 14px;"><span>账户名：</span>{{getName}}</p>
            <p style="font-size: 14px;"><span>身份：</span>{{idState}}</p>
            <el-button type="primary" size="mini"  @click="loginOut">退出登录</el-button>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      showAdmin: false
    }
  },
  methods: {
    loginOut () {
      this.$store.dispatch('FedLogOut').then(() => {
        location.reload()
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  computed: {
    idState () {
      return this.$store.getters.type === 'student' ? '学生' : '老师'
    },
    getName () {
      return this.$store.getters.name
    }
  }
}
</script>
<style lang="scss" scoped>
    .adminDet {
      position: absolute;
      top: 50px;
      right: 20px;
      padding: 20px 10px;
      margin: 5px 0;
      background-color: #fff;
      border: 1px solid #ebeef5;
      border-radius: 4px;
      -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      z-index: 9999;

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
</style>
