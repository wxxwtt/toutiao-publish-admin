<template>
  <div class="image-list-container">
    <div class="head-btn">
      <el-radio-group class="classification" v-model="collect" @change="onChange" size="small">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button v-if="showAction" type="primary" size="small" @click="uplaodHandle">上传素材</el-button>
    </div>
    <!-- 素材列表 -->
    <el-row :gutter="20">
      <el-col :xs="12" :sm="6" :md="6" :lg="4" v-for="(image, index) in images" :key="image.id">
        <el-image
          style="height: 100px"
          :src="image.url"
          fit="cover"
          @click="isSelectedIndex = index"
        >
        </el-image>
        <div class="collect" v-if="showAction">
          <el-button type="primary" :icon="image.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'" circle size="mini" :loading="image.loading" @click="onCollect(image)"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" circle :loading="image.loading" @click="onDeleteImage(image)"></el-button>
        </div>
        <!-- 选中图标 -->
        <i class="el-icon-check" v-if="isShowSelected && isSelectedIndex === index"></i>
      </el-col>
    </el-row>
    <el-pagination background layout="prev, pager, next" :total="total" :page-size="10" :current-page="page" @current-change="onPageChange">
    </el-pagination>

    <el-dialog append-to-body title="上传素材" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-upload class="upload-demo" drag action="" :http-request="uploadImages">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>

      </el-upload>
    </el-dialog>

  </div>
</template>

<script>
import { getImages, collectImage, deleteImage, uploadImage } from '@/api/images'
export default {
  name: 'ImageList',
  components: {},
  props: {
    showAction: { // 是否显示 收藏 删除 上传按钮
      type: Boolean,
      default: true
    },
    isShowSelected: { // 是否选中的样式
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      collect: false,
      images: [], // 图片列表
      page: 1,
      pageSize: 10,
      total: 0, // 总条数
      dialogVisible: false,
      isSelectedIndex: null
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadImages()
  },
  mounted () { },
  methods: {
    onChange () {
      this.page = 1
      this.loadImages()
    },
    loadImages () {
      getImages({
        page: this.page,
        per_page: this.pageSize,
        collect: this.collect
      }).then(res => {
        this.images = res.data.data.results.map(item => ({ ...item, loading: false }))
        this.total = res.data.data.total_count
      })
    },
    onPageChange (page) {
      this.page = page
      this.loadImages()
    },
    onCollect (img) {
      img.loading = true
      collectImage(img.id, !img.is_collected).then(res => {
        img.is_collected = res.data.data.collect
        img.loading = false
      })
    },
    onDeleteImage (img) {
      deleteImage(img.id).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.loadImages()
      })
    },
    uplaodHandle () {
      this.dialogVisible = true
    },
    handleClose (done) {
      done()
    },
    uploadImages (data) {
      const file = data.file
      const fd = new FormData()
      fd.append('image', file)
      uploadImage(fd).then(res => {
        this.dialogVisible = false
        this.$message({
          message: '上传成功',
          type: 'success'
        })
        this.page = 1
        this.loadImages()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-col {
  margin-bottom: 20px;
  position: relative;
}
.collect {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  height: 40px;
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 0;
  .el-button--mini.is-circle {
    padding: unset;
    width: 30px;
    height: 30px;
    i {
      font-size: 20px;
    }
  }
  .el-button--mini {
    font-size: 20px;
  }
}
.head-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
}

/deep/ .el-dialog__body {
  text-align: center;
}
.el-image {
  width: 100%;
}
.el-icon-check {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 60px;
  color: #409EFF;
}
</style>
