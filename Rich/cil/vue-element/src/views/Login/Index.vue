<template>
  <div class="login-wrap">
    <!-- 头部 -->
    <div class="login-head wid1200">
      <div class="head-logo">
        <img src="../../assets/image/logo.png" alt="" />
      </div>
      <div class="head-login">
        <el-button size="primary" type="primary">登录</el-button>
      </div>
    </div>

    <!-- banner部分 -->
    <div class="login-banner">
      <div class="system-box">
        <div class="system wid1200">
          系统公告
          <span class="system-ico"></span>
          <span class="system-text">平台更新维护通知</span>
          <em class="system-new">new</em> <span class="system-ico"></span>
          <span class="system-text">平台更新维护通知</span>
          <h2>查看更多 ></h2>
        </div>
      </div>
    </div>

    <!-- 平台服务 -->
    <div class="service wid1200">
      <div class="top">
        <span class="topC">平台服务</span>
        <img src="../../assets/image/line.jpg" alt="" />
        <span class="topE">PLATFORM SERVICES</span>
      </div>
      <div class="list">
        <ul>
          <li>
            <img src="../../assets/image/service1.png" alt="" />
            <div class="list-title">
              优惠形式多样
            </div>
            <div class="list-info">
              提供多种形式的优惠券：如电子 优惠券、纸质优惠券、活动优惠
              券等满足商户多种需求
            </div>
          </li>
          <li>
            <img src="../../assets/image/service2.png" alt="" />
            <div class="list-title">
              支持在线打印
            </div>
            <div class="list-info">
              物业端可根据需求在线打印小票 样式或优惠券样式的优惠券
            </div>
          </li>
          <li>
            <img src="../../assets/image/service3.png" alt="" />
            <div class="list-title">
              数据私有化
            </div>
            <div class="list-info">
              平台数据私有化，资金和信息更 加安全
            </div>
          </li>
          <li>
            <img src="../../assets/image/service4.png" alt="" />
            <div class="list-title">
              服务持续更新
            </div>
            <div class="list-info">
              后续将持续上新广告模块，报表 模块，会员积分模块等，致力于
              构建商业综合体管理平台
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 用户案例 -->
    <div class="example wid1200">
      <div class="top">
        <span class="topC">用户案例</span>
        <img src="../../assets/image/line.jpg" alt="" />
        <span class="topE">USer case</span>
      </div>
      <div>
        <img src="../../assets/image/example.jpg" alt="" />
      </div>
      <div class="example-list">
        <ul>
          <li>
            <div class="list-title">99000</div>
            <div class="list-info">累计使用优惠券数量</div>
          </li>
          <li>
            <div class="list-title">200</div>
            <div class="list-info">服务全国省市区域</div>
          </li>
          <li>
            <div class="list-title">8888</div>
            <div class="list-info">服务全国停车场数量</div>
          </li>
          <li>
            <div class="list-title">89632</div>
            <div class="list-info">服务全国商户数量</div>
          </li>
        </ul>
      </div>
    </div>

    <div class="partner wid1200">
      <div class="top">
        <span class="topC">合作伙伴</span>
        <img src="../../assets/image/line.jpg" alt="" />
        <span class="topE">Cooperative partner</span>
      </div>
      <div class="partner-list">
        <ul>
          <li>
            <div class="list-img">
              <img src="../../assets/image/partner1.jpg" alt="" />
            </div>
            <div class="list-p">
              富士智能客户：碧桂园
            </div>
          </li>
          <li>
            <div class="list-img">
              <img src="../../assets/image/partner2.jpg" alt="" />
            </div>
            <div class="list-p">
              富士智能客户：宜家家居
            </div>
          </li>
          <li>
            <div class="list-img">
              <img src="../../assets/image/partner3.jpg" alt="" />
            </div>
            <div class="list-p">
              富士智能客户：龙湖地产
            </div>
          </li>
          <li>
            <div class="list-img">
              <img src="../../assets/image/partner4.jpg" alt="" />
            </div>
            <div class="list-p">
              富士智能客户：绿城集团
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 底部 -->
    <div class="footer">
      <div class="footer-box wid1200">
        <div class="hot">
          全国统一客服热线：400-700-4008 总机：0755－86020909
          传真：0755－86020900
        </div>
        <div class="copy">
          Copyright © 2018-2020 富士智能版权所有
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  components: {}
}
</script>

<style lang="less">
  .login-wrap {
    background: #fff;
    .login-head {
      width: 1200px;
      height: 80px;
      line-height: 80px;
      .head-logo {
        padding-top: 17px;
      }
      .head-login {
        float: right;
        margin-top: -98px;
      }
    }
    .login-banner {
      background: url("../../assets/image/banner.jpg") #000 top center;
      height: 600px;
      background-size: contain;
      position: relative;
      .system-box {
        height: 75px;
        line-height: 75px;
        position: relative;
        top: 524px;
        background: rgba(0, 0, 0, 0.3);
        font-size: 18px;
        color: #fff;
        .system {
          // overflow: hidden;
        }
        .system-ico {
          width: 8px;
          height: 8px;
          background: #62b3ff;
          margin-left: 40px;
          margin-right: 15px;
          display: inline-block;
        }
        .system-text {
          font-size: 16px;
        }
        .system-new {
          font-size: 16px;
          border-radius: 8px;
          font-style: normal;
          padding: 0px 5px 3px;
          background: #ff626d;
          margin-left: 10px;
        }
        h2 {
          float: right;
          margin-top: -15px;
          cursor: pointer;
        }
      }
    }
    .list {
      margin-top: 105px;
      margin-bottom: 50px;
      ul {
        display: flex;
      }
      li {
        flex: 1;
        text-align: center;
        .list-title {
          font-size: 24px;
          color: #62b3ff;
          margin-top: 70px;
          margin-bottom: 30px;
        }
        .list-info {
          font-size: 14px;
          width: 188px;
          margin: 0 auto;
          line-height: 22px;
        }
      }
    }
    .example-list {
      ul {
        overflow: hidden;
        margin-bottom: 75px;
      }
      li {
        float: left;
        margin-right: 75px;
        width: 235px;
        text-align: center;
        .list-title {
          font-size: 40px;
          color: #77bdff;
          margin-bottom: 30px;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .partner-list {
      margin-bottom: 80px;
      ul {
        padding-left: 10px;
        padding-top: 90px;
        overflow: hidden;
        li {
          width: 280px;
          float: left;
          margin-right: 20px;
          .list-img {
            width: 280px;
            height: 200px;
            border-radius: 15px;
            padding-top: 20px;
            box-shadow: hsl(208, 19%, 85%) 0px 0px 29px;
            text-align: center;
          }
          .list-p {
            margin-top: 13px;
            text-align: center;
            font-size: 16px;
          }
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
    .footer {
      background: #04024f;
      height: 150px;
      text-align: center;
      color: #fff;
      .hot {
        padding-top: 40px;
        padding-bottom: 20px;
        border-bottom: 1px solid #8281a7;
      }
      .copy {
        margin-top: 20px;
      }
    }
  }
  .wid1200 {
    width: 1200px;
    margin: 0 auto;
  }
  .top {
    text-align: center;
    span {
      display: block;
      text-align: center;
    }
    .topC {
      font-size: 40px;
      padding-top: 50px;
      padding-bottom: 18px;
    }
    .topE {
      font-size: 18px;
      padding-top: 10px;
    }
  }
</style>
