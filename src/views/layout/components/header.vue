<template>
  <div class="header-container">
    <div>
      <i :class="{'el-icon-s-fold': !collapse, 'el-icon-s-unfold': collapse}"
       @click="handleCollapse"></i>
      <span>江苏传智播客科技教育有限公司</span>
    </div>
    <el-dropdown>
      <div class="avatar-wrap">
        <img class="avatar" :src="user.photo" alt="">
        <span>{{ user.name }}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>设置</el-dropdown-item>
        <el-dropdown-item>退出</el-dropdown-item>
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
