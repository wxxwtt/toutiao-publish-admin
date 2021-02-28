<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
      </div>
      <el-table :data="Articles" stripe style="width: 100%" class="articles" v-loading="loading">
        <el-table-column label="序号" width="auto" type="index" :index="indexMethod">
        </el-table-column>
        <el-table-column prop="title" label="标题" width="180">
        </el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数" width="180">
        </el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数">
        </el-table-column>
        <el-table-column prop="comment_status" label="评论状态">
          <template slot-scope="scope">
            {{ scope.row.comment_status ? '正常' : '关闭' }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.comment_status" active-color="#13ce66" inactive-color="#ff4949" :disabled="scope.row.loading" @change="onChange(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="total" :page-size="this.pageSize" :current-page="page" @current-change="onPageChange">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticles, updataArticleCommentStatus } from '@/api/article'

export default {
  // 组件的 name 最好起名为两个单词，尽量少用一个单词
  // 为什么？为了避免和原生的 html 标签冲突
  name: 'CommentIndex',
  components: {},
  props: {},
  data () {
    return {
      total: 0,
      page: 1,
      pageSize: 10,
      Articles: [],
      loading: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticles()
  },
  methods: {
    onPageChange (page) {
      this.page = page
      this.loadArticles(page)
    },
    loadArticles (page = 1) {
      this.loading = true
      getArticles({
        page,
        per_page: this.pageSize,
        response_type: 'comment'
      }).then(res => {
        this.loading = false
        const { results, total_count: total } = res.data.data
        this.Articles = results.map(item => ({ ...item, loading: false }))
        this.total = total
      })
    },
    onChange (article) {
      article.loading = true
      updataArticleCommentStatus(article.id, article.comment_status).then(res => {
        article.loading = false
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      })
    },
    indexMethod (index) {
      return (this.page - 1) * this.pageSize + index + 1
    }
  }
}
</script>

<style scoped lang="less">
.articles {
  margin-bottom: 30px;
}
</style>
