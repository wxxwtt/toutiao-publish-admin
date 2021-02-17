<template>
  <div class="login-container">
    <!--
      el-form 表单组件
      每个表单项都必须使用 el-form-item 组件包裹
     -->

    <div class="login-form-wrap">
      <div class="login-head">
        <div class="logo">头条管理系统</div>
      </div>
      <el-form class="login-form" ref="loginForm" :model="user" :rules="rules">
        <el-form-item prop="mobile">
          <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="onLogin" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '13911111111', // 手机号
        code: '246810', // 验证码,
        agree: false
      },
      loading: false, // 加载中的状态
      checked: false, // 是否同意协议的选中状态
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的号码格式', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式', trigger: 'blur' }
        ],
        agree: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('请同意用户协议'))
              } else {
                callback()
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    onLogin () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loginHandle()
        } else {
          return false
        }
      })
    },
    async loginHandle () {
      const user = this.user
      this.loading = true
      try {
        const { data } = await login(user)
        this.loading = false

        if (data.message === 'OK') {
          this.$message({
            showClose: true,
            message: '登录成功',
            type: 'success'
          })
          localStorage.setItem('user', JSON.stringify(data.data))
          this.$router.push({ name: 'home' })
        } else {
          this.$message({
            showClose: true,
            message: data.message,
            type: 'error'
          })
        }
      } catch (error) {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1674954548,2642715660&fm=26&gp=0.jpg")
    no-repeat;
  background-size: cover;
  .login-form-wrap {
    min-width: 300px;
    padding: 10px 50px 10px;
    background-color: #fff;
    .login-head {
      display: flex;
      justify-content: center;
      .logo {
        // width: 200px;
        // height: 57px;
        // // background: url("./logo_index.png") no-repeat;
        // background-size: contain;
        text-align: center;
        line-height: 60px;
        font-weight: 700;
      }
    }
    .login-form {
      .login-btn {
        width: 100%;
      }
    }
  }
}
</style>
