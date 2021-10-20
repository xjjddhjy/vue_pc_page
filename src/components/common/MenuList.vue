<template>
  <!--左侧导航-->
  <aside class="lyear-layout-sidebar">
    <!-- logo -->
    <div id="logo" class="sidebar-header">
      <a href="index.html"
        ><img src="/static/images/logo-sidebar.png" title="LightYear" alt="LightYear"
      /></a>
    </div>
    <div class="lyear-layout-sidebar-scroll" v-scrollBar>
      <nav class="sidebar-main">
        <ul class="nav nav-drawer">
          <li class="nav-item active">
            <router-link to="/"><i class="mdi mdi-home"></i> 后台首页</router-link>
          </li>
          <li class="nav-item nav-item-has-subnav">
            <a href="javascript:void(0)"
              ><i class="mdi mdi-palette"></i> 管理员管理</a
            >
            <ul class="nav nav-subnav">
              <li>
                <router-link to="/adminlist">管理员列表</router-link>
              </li>
            </ul>
            <ul class="nav nav-subnav">
              <li>
                <router-link to="/adminadd">管理员新增</router-link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      <div class="sidebar-footer">
        <p class="copyright">
          Copyright &copy; 2019.
          <a target="_blank" href="http://lyear.itshubao.com">IT书包</a> All
          rights reserved.
        </p>
      </div>
    </div>
  </aside>
  <!--End 左侧导航-->
</template>

<script>
export default {
  name: "MenuList",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
