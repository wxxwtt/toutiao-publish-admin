<template>
  <div class="upload-image-container" @click="dialogVisible = !dialogVisible">
    <img width="200" :src="value" alt="" v-if="value">
    <el-dialog append-to-body title="选择封面" :visible.sync="dialogVisible" width="80%" :before-close="handleClose">

      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="素材库" name="first">
          <!-- /素材列表 -->
          <image-list ref="image-list" :show-action="false" is-show-selected/>
        </el-tab-pane>

        <el-tab-pane label="上传图片" name="second">

          <input type="file" hidden ref="image" @change="fileChange">
          <div class="image-content" @click="fileClick" v-if="!imageUrl">
            选择图片
          </div>
          <img width="200" ref="preview" alt="">
        </el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="uploadConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { uploadImage } from '@/api/publish'
import ImageList from '@/views/components/image-list'

export default {
  name: 'UploadImage',
  components: {
    ImageList
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      dialogVisible: false,
      activeName: 'first',
      imageUrl: this.value
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    handleClick (tab, event) {
    },
    handleClose (done) {
      done()
    },
    fileClick () {
      this.$refs.image.click()
    },
    fileChange () {
      const file = this.$refs.image.files[0]
      this.$refs.preview.src = window.URL.createObjectURL(file)
    },
    uploadConfirm () {
      if (this.activeName === 'first') {
        const imageList = this.$refs['image-list'].images
        const isSelectedIndex = this.$refs['image-list'].isSelectedIndex
        this.$emit('input', imageList[isSelectedIndex].url)
        this.dialogVisible = false
      } else if (this.activeName === 'second') {
        const file = this.$refs.image.files[0]
        const fd = new FormData()
        fd.append('image', file)
        uploadImage(fd).then(res => {
          this.$emit('input', res.data.data.url)
          this.dialogVisible = false
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.upload-image-container,
.image-content {
  width: 200px;
  height: 200px;
  border: 1px dashed #999;
  text-align: center;
  line-height: 200px;
}

</style>
