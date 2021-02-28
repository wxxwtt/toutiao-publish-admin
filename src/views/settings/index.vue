<template>
  <div class="setting-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">个人设置</el-breadcrumb-item>
          <el-breadcrumb-item>修改用户资料</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
      </div>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="编号">
              {{ user.id }}
            </el-form-item>
            <el-form-item label="手机">
              {{ user.mobile }}
            </el-form-item>
             <el-form-item label="邮箱">
            <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item label="媒体名称">
            <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍">
              <el-input type="textarea" v-model="user.intro"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-image style="width: 200px; height: 200px" :src="user.photo" :fit="fit"></el-image>
          <p>点击修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
export default {
  name: 'SettingIndex',
  components: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      user: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUser()
  },
  mounted () {},
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    loadUser () {
      getUserInfo().then(res => {
        this.user = res.data.data
      })
    }
  }
}
</script>
<style lang='less' scoped>
</style>
