Component({
  data: {
    isShow: true,
    selected: 0,
    color: '#7A7E83',
    selectedColor: '#252631',
    list: [
      {
        pagePath: '/pages/index/index',
        iconPath: '/image/home_icon.png',
        selectedIconPath: '/image/home_icon_HL.png',
        text: '首页',
      },
      {
        pagePath: '/pages/mine/mine',
        iconPath: '/image/mine_icon.png',
        selectedIconPath: '/image/mine_icon_HL.png',
        text: '我的',
      },
    ],
  },
  attached() {},
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      wx.switchTab({ url });
      this.setData({
        selected: data.index,
      });
    },
  },
});
