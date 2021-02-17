<template>
  <el-container class="layout-container">
    <el-aside
      class="aside"
      width="auto"
    >
      <app-aside :collapse="isCollapse"/>
    </el-aside>
    <el-container>
      <el-header class="header">
        <app-header :collapse="isCollapse" @handleCollapse="handleCollapse"/>
      </el-header>
      <el-main class="main">
        <!-- 子路由出口 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from './components/aside'
import AppHeader from './components/header'
export default {
  name: 'LayoutIndex',
  components: {
    AppAside,
    AppHeader
  },
  props: {},
  data () {
    return {
      isCollapse: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    handleCollapse () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style scoped lang="less">
.layout-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.aside {
  background-color: #d3dce6;
  height: 100%;
}

.header {
  background-color: #b3c0d1;
}

.main {
  background-color: #e9eef3;
}
</style>
