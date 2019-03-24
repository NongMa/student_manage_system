<template>
	<section class="content">
		<!--工具条-->

		<!--列表-->
		<el-table :data="messageLists" highlight-current-row style="width: 100%;">
			<el-table-column type="index" width="60" label="序号">
			</el-table-column>
			<el-table-column prop="title" label="消息标题" width="180" sortable>
			</el-table-column>
			<el-table-column prop="content" label="题目内容" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>


		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;text-align: right;padding-top:20px;">
      <el-button type="primary" @click="handleAdd">新增消息</el-button>
		</el-col>

		<!--编辑界面-->
		<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="消息标题" prop="title">
					<el-input type="textarea" v-model="editForm.title"></el-input>
				</el-form-item>
        <el-form-item label="消息内容" prop="content">
					<el-input type="textarea" v-model="editForm.content"></el-input>
				</el-form-item>  
			</el-form>
      
			<div slot="footer" class="dialog-footer">
			 <el-button @click.native="dialogFormVisible=false">取消</el-button>
			  <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">提交</el-button>
        <el-button v-else type="primary" @click="updateData">修改</el-button>
				<!-- <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button> -->
			</div>
		</el-dialog>
	</section>
</template>

<script>
import util from "@/common/js/util";
//import NProgress from 'nprogress'
import { getMessageList, removeMessage, editMessage, addMessage } from "@/api/api";

export default {
  data() {
    return {
      dialogStatus: "",
      isShowType: true,
      textMap: {
        update: "编辑消息 ",
        create: "发布消息"
      },
      dialogFormVisible: false,
      filters: {
        name: ""
      },
      messageLists: [],
      total: 0,
      page: 1,
     // listLoading: false,v-loading="listLoading"
      sels: [], //列表选中列

      //editFormVisible: false, //编辑界面是否显示
      //editLoading: false,
      editFormRules: {
        title: [{ required: true, message: "请输入消息标题", trigger: "blur" }],
        content: [{ required: true, message: "请输入消息内容", trigger: "blur" }]
      },
      //编辑界面数据
      editForm: {
        id: "0",
        title: '',
        content: "",    
      },
      addFormVisible: false, //新增界面是否显示
      //addLoading: false,
      addFormRules: {
        title: [{ required: true, message: "请输入消息标题", trigger: "blur" }],
        content: [{ required: true, message: "请输入消息内容", trigger: "blur" }]
      }
    };
  },
  computed: {
    isSelect () {
      return this.editForm.type
    }
  },
  methods: {

    //获取用户列表
    getMessageList () {
      let para = {
        token: this.$store.getters.token,
      };
      //this.listLoading = true;
      //NProgress.start();
      getMessageList(para).then(res => {
        let data = res.data.data
        console.log(data)
        data.map((value,index)=>{
          let obj = {
            title: data[index].t1,
            content: data[index].mMess,
            id: data[index].t2
          }
          this.messageLists.push(obj)
        })
        console.log(this.messageLists)
        //this.listLoading = false;
        //NProgress.done();
      })
    },
    //删除
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          //this.listLoading = true;
          //NProgress.start();
          let para = { t2: row.id }
          removeMessage(para).then(res => {
            //this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.messageLists = []
            this.getMessageList()
          })
        })
        .catch(() => {});
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editForm = Object.assign({}, row);
      this.dialogStatus = "update"
      this.dialogFormVisible = true
      //this.editFormVisible = true;
      
    },
    //显示新增界面
    handleAdd: function() {
      this.dialogStatus = "create"
      //this.addFormVisible = true;
      this.dialogFormVisible = true
      this.editForm = {
        id: "0",
        name: "",
        sex: -1,
        age: 0,
        birth: "",
        addr: ""
			}
    },
    //编辑
    updateData:function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {})
            .then(() => {
              //this.editLoading = true;
              //NProgress.start();
              let data = Object.assign({}, this.editForm)
              let reqData = {
                mMess: data.content,
                t2:  data.id,
                t1: data.title
              }
              editMessage(reqData).then(res => {      
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.dialogFormVisible = false; 
                this.messageLists = []
                this.getMessageList()
                this.$refs["editForm"].resetFields();  
                          
              });
            })
            .catch(e => {
              // 打印一下错误
              console.log(e);
            });
        }
      });
    },
    //新增
    createData: function() {

      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {})
            .then(() => {
              //this.editLoading = true;
              //NProgress.start();
              this.editForm.id = (parseInt(Math.random() * 100)).toString() // mock a id
              let data = Object.assign({}, this.editForm)
              let reqData = {
                mId: this.$store.getters.pid,
                mMess: data.content,
                mPur:  this.$store.getters.ppur,
                t1: data.title
              }
              addMessage(reqData).then(res => {
                //this.addLoading = false;
                //NProgress.done();
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.$refs["editForm"].resetFields();
                this.dialogFormVisible = false;
                //this.addFormVisible = false;
                this.messageLists = []
                this.getMessageList()
              });
            })
            .catch(e => {
              // 打印一下错误
              console.log(e);
            });
        }
      });
    }
  },
  mounted() {
    this.getMessageList()
  }
};
</script>

<style scoped>

</style>