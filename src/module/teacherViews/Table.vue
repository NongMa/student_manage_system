<template>
	<section class="content">
		<!--工具条-->

		<!--列表-->
		<el-table :data="questionLists" highlight-current-row style="width: 100%;">
			<el-table-column type="index" width="60" label="序号">
			</el-table-column>
			<el-table-column prop="type" label="题目类型" width="180" sortable>
			</el-table-column>
			<el-table-column prop="content" label="题目内容" sortable>
			</el-table-column>
			<el-table-column prop="score" label="分数" width="125" sortable>
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
      <el-button type="primary" @click="handleAdd">新增内容</el-button>
		</el-col>

		<!--编辑界面-->
		<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="题目内容">
					<el-input type="textarea" v-model="editForm.content"></el-input>
				</el-form-item>
        <el-form-item label="分数">
					<el-input size="small" type="number" min="1" max="15" placeholder="请输入分数,区间1-15分，格式是数字" v-model="editForm.score"></el-input>
				</el-form-item>
				<el-form-item label="题目类型" v-show="isShowType" >
					<el-radio-group v-model="editForm.type">
						<el-radio class="radio" :label="1">选择题</el-radio>
						<el-radio class="radio" :label="0">简答题</el-radio>
					</el-radio-group>
				</el-form-item>
        <el-form-item label="正确选项" v-show="editForm.type">
					<el-input size="small" style="margin-bottom: 5px" type="text" v-model="editForm.right"></el-input>
				</el-form-item>
				<el-form-item label="其它选项" v-show="editForm.type">   
          <el-input size="small" style="margin-bottom: 5px" type="text" v-model="editForm.aswB"></el-input>
          <el-input size="small" style="margin-bottom: 5px" type="text" v-model="editForm.aswC"></el-input>
          <el-input size="small" style="margin-bottom: 5px" type="text" v-model="editForm.aswD"></el-input>
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
import { getQuestionList, removeQuestion, editQuestion, addQuestion } from "@/api/api";

export default {
  data() {
    return {
      dialogStatus: "",
      isShowType: true,
      textMap: {
        update: "编辑题目",
        create: "发布题目"
      },
      dialogFormVisible: false,
      filters: {
        name: ""
      },
      questionLists: [],
      total: 0,
      page: 1,
     // listLoading: false,v-loading="listLoading"
      sels: [], //列表选中列

      //editFormVisible: false, //编辑界面是否显示
      //editLoading: false,
      editFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      //编辑界面数据
      editForm: {
        id: "0",
        content: "",
        score: '',
        type: 0,
        right: '',       
        aswB: '',
        aswC: '',
        aswD: ''      
      },
      addFormVisible: false, //新增界面是否显示
      //addLoading: false,
      addFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      }
    };
  },
  computed: {
    isSelect () {
      return this.editForm.type
    }
  },
  methods: {
    //性别显示转换
    formatSex: function(row, column) {
      return row.sex == 1 ? "男" : row.sex == 0 ? "女" : "未知";
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getUsers();
    },
    //获取用户列表
    getQuestionList () {
      let para = {
        eId: this.$store.getters.pid,
      };
      //this.listLoading = true;
      //NProgress.start();
      getQuestionList(para).then(res => {
        let data = res.data.data
        let newArray = [];
        console.log(res.data)
        data.map((value,index)=>{
          let obj = {
            type: value.t4 == 1 ? '单选题':'简答题',
            content: value.eExer,
            score: value.eFrac,
            right: value.eAnsw,
            aswB: value.t1,
            aswC: value.t2,
            aswD: value.t3,
            autoColumn: value.autoColumn
          }
          this.questionLists.push(obj)
        })
        console.log(this.questionLists)
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
          let para = { autoColumn: row.autoColumn }
          removeQuestion(para).then(res => {
            //this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.questionLists = []
            this.getQuestionList()
          })
        })
        .catch(() => {});
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editForm = Object.assign({}, row);
      this.dialogStatus = "update"
      this.dialogFormVisible = true
      this.isShowType = false
      if (row.type === '简答题') {
        this.editForm.type = 0
      } else {
        this.editForm.type = 1
      }
      //this.editFormVisible = true;
      
    },
    //显示新增界面
    handleAdd: function() {
      this.dialogStatus = "create"
      this.isShowType = true
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
                eExer: data.content,
                eAnsw: data.right,
                eFrac: data.score,
                t1: data.aswB,
                t2: data.aswC,
                t3: data.aswD,
                t4: data.type,
                autoColumn: data.autoColumn
              }
              editQuestion(reqData).then(res => {      
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.dialogFormVisible = false; 
                this.questionLists = []
                this.getQuestionList()
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
                token: this.$store.getters.token,
                type: this.$store.getters.type,
                list: [{
                  eId: this.$store.getters.pid,
                  eExer: data.content,
                  eAnsw: data.right,
                  eFrac: data.score,
                  t1: data.aswB,
                  t2: data.aswC,
                  t3: data.aswD,
                  t4: data.type
                }]
              }
              console.log(reqData)
              addQuestion(reqData).then(res => {
                //this.addLoading = false;
                //NProgress.done();
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.$refs["editForm"].resetFields();
                this.dialogFormVisible = false;
                //this.addFormVisible = false;
                this.questionLists = []
                this.getQuestionList()
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
    this.getQuestionList();
  }
};
</script>

<style scoped>

</style>