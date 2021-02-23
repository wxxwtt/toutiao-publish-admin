<template>
  <div class="image-container">
     <el-card class="box-card">
        <div slot="header" class="clearfix">
          <!-- 面包屑路径导航 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
            <el-breadcrumb-item>素材管理</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- /面包屑路径导航 -->
        </div>
        <el-radio-group class="classification" v-model="collect" @change="onChange" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <!-- 素材列表 -->
      <el-row :gutter="20">
        <el-col
          :xs="12" :sm="6" :md="6" :lg="4"
          v-for="image in images" :key="image.id">
          <el-image
            style="height: 100px"
            :src="image.url"
            fit="cover"
          ></el-image>
        </el-col>
      </el-row>
      <!-- /素材列表 -->
     </el-card>
  </div>
</template>

<script>
import { getImages } from '@/api/images'
export default {
  name: 'ImageIndex',
  components: {},
  props: {},
  data () {
    return {
      collect: false,
      images: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadImages()
  },
  mounted () {},
  methods: {
    onChange (val) {
      console.log(val)
    },
    loadImages () {
      getImages().then(res => {
        this.images = res.data.data.results
        console.log(res)
      })
    }
  }
}
</script>

<style scoped lang="less">
.classification {
  padding-bottom: 20px;
}
.el-col {
  margin-bottom: 20px;
}
</style>
