<template>
  <div class="main">
    <div class="imgWrap">
       <img :src="imgUrl" alt="下载页面">
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="上传日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="文件名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="type"
        label="文件类型">
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">下载</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>
<script>
import imgurl from "@/assets/testImg04.jpg"
import { getTeacherFileList, uploadFile } from "@/api/api"
import { HOST } from '@/api/config.js'
export default {
  data() {
    return {
      imgUrl: imgurl,
      tableData: []    
    }
  },
  mounted () {
    this.getFileList()
  },
  methods: {
    getFileList () {
      const params = {
        token: this.$store.getters.token
      }
      getTeacherFileList(params).then(res=>{
        console.log(res.data.data)
        const list = res.data.data
        if (list.length > 0) {
          list.map(value=>{
            let obj = {
              date: new Date(value.adddate).toLocaleDateString(),
              name: value.fWoUrl,
              type: value.t2,
              id: value.t1
            }
            this.tableData.push(obj)
          })
        }
      })
    },
    handleClick (param) {
      const params = {
        t1: param.id
      }
      uploadFile(params).then(res=>{
        console.log(res.data.data)
        let data = res.data.data.replace(/^\\\\$/g,'/')
        this.download(param.name,data)
        this.$message({
            type: 'success',
            message: '下载完成',
            duration: 1000
        })
      })
    },
    download (param,data) {
        if (!data) {
            return
        }
        let url = HOST+'/'+data
        console.log(url)
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.target = '_blank'
        link.setAttribute('download', param)
        document.body.appendChild(link)
        link.click()
    }
  }
};
</script>
<style lang="scss" scoped>
.main {
    .imgWrap {
      width: 160px;
      margin: 30px auto;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
  }
</style>

