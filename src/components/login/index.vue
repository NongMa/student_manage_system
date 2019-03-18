<template>
  <div class="login">
    <el-form class="loginform" ref="loginForm" :model="loginForm" :rules="loginRules" autoComplete="on" >
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item>
            <span><font color="#0084FF" size="6">{{loginOrRegister}}页面</font></span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" v-if="!haveAdmin">
         <el-col :span="24">
           <el-form-item>
            <el-select class="typeSelect" size="small" v-model="loginForm.typeValue" placeholder="请选择账户类型">
                <el-option
                  v-for="item in types"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  size="small" >
                </el-option>
              </el-select>
            </el-form-item>
         </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item prop="username">
            <el-input placeholder="请输入用户名" suffix-icon="el-icon-aliadmin" v-model="loginForm.username" size="small"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" v-if="!haveAdmin">
          <el-col :span="24">
            <el-form-item prop="college">
              <el-select class="typeSelect" size="small" v-model="loginForm.college" placeholder="请选择学院">
                <el-option
                  v-for="item in colleges"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  size="small" >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
      </el-row>
      <el-row type="flex" v-if="!haveAdmin" justify="center">
        <el-col :span="24">
          <el-form-item prop="sclass">
            <el-input placeholder="请输入班级" suffix-icon="el-icon-aliadmin" v-model="loginForm.sclass" size="small"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
         <el-col :span="24">
          <el-form-item prop="password">
            <el-input placeholder="请输入密码" suffix-icon="el-icon-alipassword" :type="pwdType" @keyup.enter.native="submit" v-model="loginForm.password" size="small"></el-input>
          </el-form-item>
          </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item>
            <el-button style="width: 100%" type="primary" :loading="loading" @click.native.prevent="submit">{{loginOrRegister}}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          {{haveOrNo}}账号：<span class="loginOrRegister" @click="changeLogin">请{{registerLogin}}</span>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import bgImg from '@/assets/bg.png'
export default {
  name: 'login',
  data () {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 2) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validateClass = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('班级不能为空'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      types: [
        {
          value: 'student',
          label: '学生'
        },
        {
          value: 'teacher',
          label: '老师'
        }
      ],
      colleges: [
        {
          value: '理学院',
          label: '理学院'
        },
        {
          value: '工学院',
          label: '工学院'
        }
      ],
      loginForm: {
        username: '',
        password: '',
        college: '',
        sclass: '',
        typeValue: 'student'
      },
      pwdType: 'password',
      loading: false,
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }],
        college: [{ required: true, trigger: 'change', message: '请选择学院' }],
        sclass: [{ required: true, trigger: 'blur', validator: validateClass }]
      },
      login: '登录',
      regist: '注册',
      haveAdmin: true
    }
  },
  computed: {
    haveOrNo: function () {
      return this.haveAdmin ? '没有' : '有'
    },
    loginOrRegister: function () {
      return this.haveAdmin ? this.login : this.regist
    },
    registerLogin: function () {
      return this.haveAdmin ? this.regist : this.login
    }
  },
  methods: {
    submit: function () {
      if (this.haveAdmin) {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('Login', this.loginForm).then(() => {
              this.loading = false
              if (this.$store.getters.type === 'student') {
                this.$router.push({ path: '/student' })
              } else if (this.$router.push({ path: '/teacher' })) {
                this.$router.push({ path: '/student' })
              }
            }).catch(() => {
              this.loading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('Register', this.loginForm).then(() => {
              this.loading = false
              this.haveAdmin = !this.haveAdmin
              if (this.$store.getters.type === 'student') {
                this.$router.push({ path: '/student' })
              } else if (this.$router.push({ path: '/teacher' })) {
                this.$router.push({ path: '/student' })
              }
            }).catch(() => {
              this.loading = false
            })
          }
        })
      }
    },
    changeLogin: function () {
      this.haveAdmin = !this.haveAdmin
      this.loginForm.username = ''
      this.loginForm.password = ''
      this.loginForm.college = ''
      this.loginForm.sclass = ''
      this.loading = false
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>
  .login {
    position: relative;
    width: 100vw;
    height: 100vh;
    background-image: url('~@/assets/bg.png');
    background-size: cover;
    .loginform {
        width: 250px;
        height: auto;
        padding: 30px 20px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        -webkit-transform: translateY(-50%,-50%);
        background-color: #fff;
        border-radius: 15px;
        box-shadow: 0 0 10px #e3e3e3;
    }
    .loginOrRegister {
        color: #888;
        cursor: pointer;
    }
    .typeSelect {
      width: 100%;
    }
  }
</style>
