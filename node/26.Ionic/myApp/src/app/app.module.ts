//根模块 告诉ionic如何组装应用

// 请求模块
import { HttpModule, JsonpModule } from '@angular/http';
//引入 angular 以及ionic的系统模块
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

//引入components模块

import { ComponentsModule } from '../components/components.module';

//引入根组件
import { MyApp } from './app.component';

//页面 自定义的组件
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { NewvodPage } from '../pages/newvod/newvod';
import { NewsPage } from '../pages/news/news';
import { PreviewPage } from '../pages/preview/preview';
import { TabsPage } from '../pages/tabs/tabs';

//ionic打包成app以后配置启动画面 以及导航条的服务  （不用管）
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConfigProvider } from '../providers/config/config';
import { HttpServicesProvider } from '../providers/http-services/http-services';

@NgModule({
  declarations: [ /*申明组件*/
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    NewvodPage,
    NewsPage,
    PreviewPage,
    TabsPage
  ],
  imports: [  /*引入的模块 依赖的模块*/
    BrowserModule,
    ComponentsModule,
    HttpModule,
    JsonpModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: 'true', //隐藏子页面 tabs
      backButtonText: '返回' //配置返回按钮
    })
  ],
  bootstrap: [IonicApp],/*启动的模块*/
  entryComponents: [/*配置不会在模板中使用的组件*/
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    NewvodPage,
    NewsPage,
    PreviewPage,
    TabsPage
  ],
  providers: [/*配置服务*/
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConfigProvider,
    HttpServicesProvider
  ]
})
export class AppModule {}
