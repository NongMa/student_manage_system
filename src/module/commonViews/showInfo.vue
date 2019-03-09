<template>
    <div class="adminDet">
        <div class="adminDetContent">
            <p style="font-size: 14px;"><span>账户名：s</span>{{getName}}</p>
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
        background-color: #f3f3f3;
        padding: 30px 15px;
        box-shadow: 0 0 5px #888;
        position: absolute;
        top: 60px;
        right: 2.5rem;
        z-index: 99999;
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
