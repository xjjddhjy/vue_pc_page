<template>
  <div id="app">
    <!-- 模板标签 -->
    <!-- 做一个判断 判断公共组件是否需要加载 -->
    <div v-if="$route.meta.index === 1">
      <Header></Header>
      <MenuList></MenuList>
      <router-view></router-view>
    </div>
    <router-view v-if="$route.meta.index === 0"></router-view>
  </div>
  
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// 引用菜单组件
import MenuList from "@/components/common/MenuList";
import Header from "@/components/common/Header";
export default {
  name: "App",
  components: {
    // 加载你要的组件出来
    Header,
    MenuList,
  },

};
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
