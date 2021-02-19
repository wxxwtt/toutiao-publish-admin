<template>
  <div class="header-container">
    <div>
      <i :class="{'el-icon-s-fold': !collapse, 'el-icon-s-unfold': collapse}"
       @click="handleCollapse"></i>
      <span>头条管理系统</span>
    </div>
    <el-dropdown>
      <div class="avatar-wrap">
        <img class="avatar" :src="user.photo" alt="">
        <span>{{ user.name }}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>设置</el-dropdown-item>
        <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
export default {
  name: 'AppHeader',
  components: {},
  props: {
    collapse: {
      type: Boolean
    }
  },
  data () {
    return {
      user: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserInfo()
  },
  mounted () {},
  methods: {
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        if (data.message === 'OK') {
          this.user = data.data
        }
      } catch (error) {
      }
    },
    handleCollapse () {
      this.$emit('handleCollapse')
    },
    logout () {
      this.$confirm('确定退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        localStorage.removeItem('user')
        this.$router.replace({ name: 'login' })
      }).catch(() => {
      })
    }

  }
}
</script>

<style scoped lang="less">
.header-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  .avatar-wrap {
    display: flex;
    align-items: center;
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
</style>
