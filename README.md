# 外语学习助手开发
![view](./view.gif)

## 项目介绍: 移动端的构建,开发跨平台的移动端应用.
- 主要使用ionic移动式开发框架,开发能同时在android和ios上使用的移动端的app,一套代码跨平台使用.
- 主要实现个性化背单词, 英文新闻推送, 英语视频学习, 消息通知等功能.

## 技术框架:
ionic + Spring




## denpency：
1.ionic



## 后端模拟数据工具
[mock](http://mockjs.com/)

-----------------------------------------------
## 安装$cordovaToast,实现Toast功能
[Toast-PhoneGap-Plugin](http://ngcordova.com/docs/plugins/toast/)

[github](https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin#2-screenshots)

installation usage:
```
cordova plugin add https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin.git
```
[参考资料](http://devdactic.com/pull-to-refresh-ionic/)

## 安装videogular 实现视频播放功能
[Videogular](http://www.videogular.com/)


## 音频解决方案:
[cordova-plugin-media](https://github.com/apache/cordova-plugin-media)
[Ionic - Cordova Media](https://www.tutorialspoint.com/ionic/ionic_media.htm)
[ionic Media](http://arielfaur.github.io/ionic-audio/)
[tutorail](https://www.thepolyglotdeveloper.com/2014/11/playing-audio-android-ios-ionicframework-app/)
Usage

#### Install dependencies:Cordova media plugin

```ionic plugin add cordova-plugin-media
or
cordova plugin add cordova-plugin-media

```

#### Install this module using bower

```bower install ionic-audio```
------------------------------------


### 运行方式：
```
$ ionic serve
```

备注：
上传代码需要对应的后台(使用java框架spring搭建)才能运行，如果使用NodejsServer(express搭建)模拟后台，需要更改控制器controller.js对应相关代码才能运行。
