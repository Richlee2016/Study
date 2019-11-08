<template>
  <el-container class="app-wrapper">
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">
            <VLogo />
            <VMenu :menu="NavBar" />
        </el-aside>
        <el-main>
            <app-main></app-main>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
import { AppMain, Logo as VLogo, Menu as VMenu } from './components'
import { mapGetters } from 'vuex'

export default {
  name: 'Layout',
  components: {
    AppMain,
    VLogo,
    VMenu
  },
  computed: {
    ...mapGetters(['NavBar'])
  }
}
</script>

<style lang="less"></style>
