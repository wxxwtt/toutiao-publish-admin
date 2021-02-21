<template>
  <div class="article-container">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
      </div>
      <!-- 数据筛选表单 -->
      <el-form ref="form" label-width="40px" size="mini">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channel_id" placeholder="请选择频道">
            <el-option label="全部" :value="null"></el-option>
            <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="rangeDate"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="loading" type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- /数据筛选表单 -->
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        根据筛选条件共查询到 {{ total }} 条结果：
      </div>
      <!-- 数据列表 -->
      <el-table
        v-loading="loading"
        :data="articles"
        stripe
        style="width: 100%"
        class="list-table"
        size="mini"
      >
        <el-table-column
          label="序号"
          type="index"
          :index="indexMethod"
          width="80">
        </el-table-column>
        <el-table-column
          prop="date"
          label="封面"
          width="80">
          <template slot-scope="scope">
            <el-image
             style="width: 80px;height: 80px;"
             :src="scope.row.cover.images[0]"
             fit="cover"
             lazy >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="180">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
              <el-tag :type="articleStatus[scope.row.status].type">
                {{ articleStatus[scope.row.status].text }}
              </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="delArticle(scope.row.id)"
              ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- /数据列表 -->

      <!-- 列表分页 -->
      <el-pagination
        layout="prev, pager, next"
        background
        :total="total"
        :page-size="per_page"
        :disabled="loading"
        :current-page.sync="page"
        @current-change="pageChange">
      </el-pagination>
      <!-- /列表分页 -->
    </el-card>
  </div>
</template>

<script>
import { getArticles, getChannels, delArticlesById } from '@/api/article'
export default {
  name: 'ArticleIndex',
  components: {},
  props: {},
  data () {
    return {
      articles: [], // 文章列表,
      articleStatus: [
        { status: 0, text: '草稿', type: 'info' }, // 0
        { status: 1, text: '待审核', type: '' }, // 1
        { status: 2, text: '审核通过', type: 'success' }, // 2
        { status: 3, text: '审核失败', type: 'warning' }, // 3
        { status: 4, text: '已删除', type: 'danger' } // 4
      ],
      total: 0, // 总条数,
      page: 1,
      per_page: 10, // 每页条数,
      status: null, // 状态
      channels: [],
      channel_id: null, // 频道id
      loading: false, // 加载状态
      rangeDate: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticles()
    this.loadChannels()
  },
  mounted () {},
  methods: {
    onSubmit () {
      this.loadArticles(1)
    },
    loadArticles (page = 1) {
      this.loading = true
      getArticles({
        page,
        per_page: this.per_page,
        status: this.status,
        channel_id: this.channel_id,
        begin_pubdate: this.rangeDate && this.rangeDate[0],
        end_pubdate: this.rangeDate && this.rangeDate[1]
      }).then(res => {
        this.loading = false
        this.articles = res.data.data.results
        this.total = res.data.data.total_count
      }).catch(error => {
        this.loading = false
        console.log(error)
      })
    },
    pageChange (page) {
      this.loadArticles(page)
    },
    loadChannels () {
      getChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    delArticle (articleId) {
      this.$confirm('确定删除该文章吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delArticlesById(articleId.toString()).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.loadArticles(this.page)
        })
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // })
      })
    },
    indexMethod (index) {
      return (this.page - 1) * this.per_page + index + 1
    }

  }
}
</script>

<style scoped lang="less">
.filter-card {
  margin-bottom: 30px;
}

.list-table {
  margin-bottom: 20px;
}
.el-icon-picture {
  font-size: 80px;
}
</style>
