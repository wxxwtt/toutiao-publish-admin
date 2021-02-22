<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>发布文章</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
      </div>
      <el-form ref="article" :model="article" label-width="40px">
        <el-form-item label="标题">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-tiptap
            v-model="article.content"
            :extensions="extensions"
            lang="zh"
            height="400"
            placeholder="请输入文章内容"></el-tiptap>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="article.channel_id" placeholder="请选择频道">
            <el-option
             v-for="item in channels"
             :label="item.name"
             :value="item.id"
             :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPublish(false)" :disabled="loading">发表</el-button>
          <el-button @click="onPublish(true)" :disabled="loading">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getChannels, getArticleById } from '@/api/article'
import { publishArticle, updateArticle } from '@/api/publish'
import {
  // ElementTiptapPlugin,
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  Image,
  Fullscreen
} from 'element-tiptap'
export default {
  name: 'PublishIndex',
  components: {
    'el-tiptap': ElementTiptap
  },
  props: {},
  data () {
    return {
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // render command-button in bubble menu.
        new Underline({ bubble: true, menubar: false }), // render command-button in bubble menu but not in menubar.
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new Image(),
        new Fullscreen()
      ],
      channels: [],
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: { // 文章封面
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: [] // 封面图片的地址
        },
        channel_id: null
      },
      draft: false, // 是否存为草稿
      articleId: this.$route.query.articleId,
      loading: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
    if (this.articleId) {
      this.loadArticles()
    }
  },
  mounted () {},
  methods: {

    loadChannels () {
      getChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    onPublish (draft) {
      const { articleId } = this.article
      this.loading = true
      if (articleId) {
        updateArticle(this.article, draft).then(res => {
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
          this.loading = false
          this.$router.push({ name: 'article' })
        }).catch(() => {
          this.loading = false
        })
      } else {
        publishArticle(this.article, draft).then(res => {
          this.$message({
            message: '发布成功',
            type: 'success'
          })
          this.loading = false
          this.$router.push({ name: 'article' })
        }).catch(() => {
          this.loading = false
        })
      }
    },
    loadArticles () {
      getArticleById(this.articleId).then(res => {
        this.article = res.data.data
      })
    }
  }
}
</script>

<style scoped lang="less"></style>
