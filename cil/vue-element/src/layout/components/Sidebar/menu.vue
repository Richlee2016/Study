<template>
  <el-menu class="slide-menu">
    <el-submenu v-for="(item,i) in menu" :index="i+''" :key="i">
        <template slot="title"><i class="el-icon-message"></i>{{item.meta.title}}</template>
        <el-menu-item-group>
            <el-menu-item
            v-for="(child,j) in item.children"
            :index="`${i}-${j}`"
            :key="j">
            <router-link :to="`${item.path}/${child.path}`">{{child.meta.title}}</router-link>
          </el-menu-item>
        </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: 'slide-logo',
  props: {
    menu: {
      type: Array,
      default () {
        return []
      }
    }
  },
  created () {
    console.log(this.menu)
  }
}
</script>

<style lang="less">
</style>
