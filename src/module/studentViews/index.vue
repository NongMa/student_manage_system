<template>
  <div>
    <student-header @showCollapse="getCollapse"></student-header>
    <div :class="isCollapse ?'main main-collapse': 'main'">
      <router-view></router-view>
      <common-footer></common-footer>
    </div>  
  </div>
</template>

<script>
import StudentHeader from "./header.vue";
import CommonFooter from "@/components/footer/index.vue";
export default {
  name: "index",
  data() {
    return {
      isCollapse: false,
    };
  },
  components: {
    StudentHeader,
    CommonFooter
  },
  methods: {
    getCollapse (value) {
      this.isCollapse = value
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   .main-collapse {
     padding-left: 84px;
   }
</style>
