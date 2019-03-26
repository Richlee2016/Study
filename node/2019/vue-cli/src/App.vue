<template>
    <div id="app">
        <img src="./assets/logo.png">
      <span class="good">3212321321</span>
      <div class="box"></div>
      <img :src="png" alt="">
    </div>
  </template>
  
  <script>
  import png from './assets/logo.png'
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
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .good{
    display: block;
    width: 200px;
    transition: 3s ease-in-out;
  }
  .box{
    width: 300px;
    height: 300px;
    background: url('./assets/logo.png') no-repeat center;
  }
  </style>
  