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
              <el-button type="primary"
                :loading="saveLoading"
                @click="onUpdataUser">保存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
         <div @click="onAvatarClick">
            <el-image style="width: 200px; height: 200px" :src="user.photo" fit="cover"></el-image>
              <p>点击修改头像</p>
            <input ref="image" @change="onImageChange" type="file" id="image" hidden>
         </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getUserInfo, updataInfo, updataAvator } from '@/api/user'
import globalBus from '@/utils/global-bus'

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
      user: {},
      saveLoading: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUser()
  },
  mounted () {},
  methods: {
    onUpdataUser () {
      this.saveLoading = true
      updataInfo(this.user).then(res => {
        this.saveLoading = false
        globalBus.$emit('updataUser', this.user)

        this.$message({
          message: '修改成功',
          type: 'success'
        })
      })
    },
    loadUser () {
      getUserInfo().then(res => {
        this.user = res.data.data
      })
    },
    onAvatarClick () {
      this.$refs.image.click()
      // console.log(this.$refs.image)
    },
    onImageChange () {
      const file = this.$refs.image.files[0]
      const fd = new FormData()
      fd.append('photo', file)
      updataAvator(fd).then(res => {
        this.user.photo = res.data.data.photo
        globalBus.$emit('updataUser', this.user)
      })
    }
  }
}
</script>
<style lang='less' scoped>
</style>
