<template>
  <div class="content">
    <h3 class="form-h3">在线答题</h3>
    <el-form ref="answer" :model="answer">
      <h4 v-if="answer.selectList.length>0" class="form-h4">单选题：</h4>
      <el-form-item
        class="select-item"
        v-for="(item,index) in answer.selectList"
        :key="item.id"
        :label="++index+'、'+item.content"
        label-position="right"
        :prop="item.selectResult"
         >
        <el-radio-group v-model="item.selectResult"  style="width: 100%;text-align: left;">
            <el-radio 
            v-for="(item1) in item.options"
            :key="item1.id"
            :label="item1" >{{item1}}</el-radio>
        </el-radio-group>    
      </el-form-item>
      <h4 v-if="answer.singerList.length>0" class="form-h4">简答题：</h4>
      <el-form-item
        class="singer-item"
        v-for="(item,index) in answer.singerList"
        :key="index"
        :label="++index+'、'+item.content"
        label-position="top"
        :prop="item.contentResult" >
        <el-input type="textarea" v-model="item.contentResult"></el-input>
      </el-form-item>
      <el-form-item v-if="answer.selectList.length>0 && answer.singerList.length>0">
        <el-button style="width: 150px" type="primary" @click="submitForm('answer')">提交</el-button>
      </el-form-item>
    </el-form>
    <div v-if="answer.selectList.length===0 || answer.singerList.length===0">
      <img :src="imgUrl" alt="暂无题目">
      <h4>暂无题目</h4>    
      </div>
  </div> 
</template>

<script>
import imgUrl from '@/assets/testImg03.png'
import StudentHeader from './header.vue'
import CommonFooter from '@/components/footer/index.vue'
import { studentGetQuestion, studentPostQuestion, getNewMsg } from '@/api/api'
function autoSort(a, b){
  return Math.random() >= 0.5 ? 1 : -1
}
export default {
  name: 'index',
  data () {
    return {
      answer: {
        selectList: [],
        singerList: []
      },
      imgUrl: imgUrl,
      rules: {   
        singer: [
          { required: true, message: '请输入答案', trigger: 'change' }
        ],
      }    
    }
  },
  beforeRouterEnter (to,from,next) {
    next(vm => {
      console.log(to.name)
    })  
  },
  mounted () {
    this.getAllQuestion()
    
    if(!this.$store.state.haveOpened ) {
       this.getNewMsg()   
    }
  },
  components: {
    StudentHeader,
    CommonFooter
  },
  methods: {
    getNewMsg () {
      const params = {
        token: this.$store.getters.token
      }
      getNewMsg(params).then(res=>{
        console.log(res)
        if (res.data.data === 'Y') {
          this.$store.state.haveMessage = true
          this.open()
        } 
        this.$store.state.haveOpened = true
      })
    },
    getAllQuestion () {
      let para = {
        token: this.$store.getters.token,
        pId: this.$store.getters.pid
      }
      studentGetQuestion(para).then(res => {
        let data = res.data.data
        let selectData = data[0]
        let sigerDate = data[1]
        console.log(selectData,sigerDate)
        selectData.map((value,index)=>{
          let obj = {
            content: value.eExer,
            selectResult: '',
            options: value.list.sort(autoSort)
          }
          this.answer.selectList.push(obj)
        })
        sigerDate.map((value,index)=>{
          let obj = {
            content: value.eExer,
            contentResult: '',
          }
          this.answer.singerList.push(obj)
        })
        console.log(this.answer.selectList, this.answer.singerList)
      
      })
    },
    postAllQuestion () {
      let list = []
      this.answer.selectList.map((value)=>{
        let obj = {
          eId: this.$store.getters.pid,
          eExer: value.content,
          eAnsw: value.selectResult
        }
        list.push(obj)
      })
      this.answer.singerList.map((value)=>{
        let obj = {
          eId: this.$store.getters.pid,
          eExer: value.content,
          eAnsw: value.contentResult
        }
        list.push(obj)
      })
      let para = {
        token: this.$store.getters.token,
        type: this.$store.getters.type,
        list: list
      }
      console.log(para)
      studentPostQuestion(para).then(res => {  
        this.answer.selectList.map((value)=>{
          value.selectResult = ''
        })
        this.answer.singerList.map((value)=>{
          value.contentResult = ''
        })
        this.$message({
          message: "提交成功",
          type: "success"
        })
      })
    },
    submitForm(formName) {
        let valid = true
        this.answer.selectList.map((value)=>{
          if(value.selectResult == '') {
            valid = false
          }
        })
        this.answer.singerList.map((value)=>{
          if(value.contentResult == '') {
            valid = false
          }
        })
        if (valid) {
          this.postAllQuestion()
        } else {
          this.$message({
            message: "请回答所有问题",
            type: "error"
          });
        }
    },
    open() {
      const h = this.$createElement;
      this.$notify({
        type: 'info',
        title: '消息提醒',
        message: h('span', '你有新的消息，请前往消息中心查看详情'),
        offset: 60
      });
      this.$store.state.haveMessage = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .content {
      .form-h3 {
        font-size: 30px;
        margin: 30px 0 30px;
      }
      .form-h4 {
        text-align: left;
        margin: 10px 0;
      }
    }
</style>
