<template>
	<view class="content">
    <view class="box">
      <view class="inner">
        nice
      </view>
    </view>
	</view>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {
      title: 'Hello',
    };
  },
  props: {
    box: {
      type: String,
      default: 'abc',
    },
  },
  onLoad() {},
  methods: {},
});
</script>

<style lang="less">
.box{
  width: 100px;
  height: 100px;
  background: red;
  .inner{
    width:50px;
    height: 50px;
    background: blue;
  }
}
</style>
