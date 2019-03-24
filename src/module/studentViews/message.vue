<template>
  <div class="content">
    <h2>消息列表</h2>
    <el-collapse @change="handleChange" style="text-align: left;" v-if="messagesList.length>0">
      <el-collapse-item v-for="item in messagesList"  :key="item.id" :title="item.title" :name="item.id">
        <div>{{item.content}}</div>
      </el-collapse-item>
    </el-collapse>
    <div v-if="messagesList.length===0">
      <img :src="imgUrl" alt="暂无消息">
      <h4>暂无消息</h4>    
      </div>
  </div>
</template>
<script>
import { getStudentMsgList, postMsgToTeacher } from '@/api/api'
import imgUrl from '@/assets/testImg03.png'
export default {
  data() {
    return {
      messagesList: [],
      imgUrl: imgUrl,
      isReaded: false
    }
  },
  methods: {
    handleChange () {
      if(!this.isReaded){
        this.postMsgToTeacher()
      } 
    },
    getStudentMsgList () {
      const params = {
        token: this.$store.getters.token
      }
      getStudentMsgList(params).then(res=>{
        const data = res.data.data
        console.log(data)
        data.map(value=>{
          var obj = {
            id: value.t2,
            title: value.t1,
            content: value.mMess
          }
          this.messagesList.push(obj)
        })
        
      })
    },
    postMsgToTeacher () {
      const params = {
        token: this.$store.getters.token
      }
      postMsgToTeacher(params).then(()=>{
         this.isReaded = true
      })
    }
  },
  mounted () {
    this.getStudentMsgList()
  }
};
</script>
<style lang="scss" scoped>
  .content {
    h2 {
      padding: 30px 40px;
    }
    
  }
</style>

