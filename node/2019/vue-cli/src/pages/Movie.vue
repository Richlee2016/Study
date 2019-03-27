<template>
    <div id="home">
        <img src="../assets/logo.png">
      <span class="good">32123211</span>
      <div class="box"></div>
      <img :src="png" alt="">
      <div>这是电影网站</div>
    </div>
  </template>
  
  <script>
  import png from '../assets/logo.png'
  export default {
    name: 'App',
    data () {
      return {
        png: png
      }
    }
  }
  </script>
  <style lang="less">
  .good{
    display: block;
    width: 200px;
    transition: 3s ease-in-out;
  }
  .box{
    width: 300px;
    height: 300px;
    background: url('../assets/logo.png') no-repeat center;
  }
  </style>
  