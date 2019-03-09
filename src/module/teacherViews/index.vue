<template>
  <div>
    <teacher-header></teacher-header>
    <router-view></router-view>
    <common-footer></common-footer>
  </div>
</template>

<script>
import TeacherHeader from './header.vue'
import CommonFooter from '@/components/footer/index.vue'
export default {
  name: 'index',
  data () {
    return {
      msg: 'sss'
    }
  },
  components: {
    TeacherHeader,
    CommonFooter
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
