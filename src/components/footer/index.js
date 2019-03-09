import CommonFooterComponent from './index.vue'

const CommonFooter={
  install:function(Vue){
    Vue.component('CommonFooter',CommonFooterComponent)
  }  //'XHeader'这就是后面可以使用的组件的名字，install是默认的一个方法
};

export default CommonFooter
