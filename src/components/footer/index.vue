<template>
  <div>
    <p>{{msg}}</p>
  </div>
</template>
<script>
export default {
  name: 'common-footer',
  data () {
    return {
      msg: 'copyright 2019 by NongMa'
    }
  }
}
</script>
<style lang="scss" scoped>
  p {
    margin: 15px 0;
  }
</style>
