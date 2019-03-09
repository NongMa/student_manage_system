<template>
  <div>
    <student-header></student-header>
    <router-view></router-view>
    <common-footer></common-footer>
  </div>
</template>

<script>
import StudentHeader from "./header.vue";
import CommonFooter from "@/components/footer/index.vue";
export default {
  name: "index",
  data() {
    return {
      msg: "sss",
    };
  },
  components: {
    StudentHeader,
    CommonFooter
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  min-height: calc(100vh - 130px);
}
</style>
