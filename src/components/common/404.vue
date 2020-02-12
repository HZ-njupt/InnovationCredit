<template>
  <div class="site-wrapper site-page--not-found">
      <div class="site-content__wrapper">
          <div class="site-content">
              <h2 class="not-found-title">404</h2>
              <p class="not-found-desc">抱歉！您访问的页面<em>失联啦</em></p>
              <el-button @click="$router.go(-1)">返回上一页</el-button>
              <el-button type="primary" class="not-found-btn-gohome">返回主页</el-button>
          </div>
      </div>
  </div>
</template>

<script lang='scss'>
export default {
  .site-wrapper.site-page--not-found{
      position: absolute;
  }
}
</script>