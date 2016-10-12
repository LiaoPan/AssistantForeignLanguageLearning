angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider,$httpProvider) {
  
  //CORS
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  
  //place ionic tabs at the bottom of the screen.
  $ionicConfigProvider.tabs.position('bottom');

  // setup the token interceptor
  $httpProvider.interceptors.push('TokenInterceptor');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.page2', {
    url: '/tab_News',
    views: {
      'tab1': {
        templateUrl: 'templates/page2.html',
        controller: 'page2Ctrl'
      }
    }
  })

//视频主目录 list
  .state('tabsController.videotype', {
    url: '/tab_listen',
    views: {
      'tab2': {
        templateUrl: 'templates/video_maindir.html',
        controller: 'VideoMainDirCtrl'
      }
    }
  })

//视频次目录 list
  .state('tabsController.videotypesec', {
    url: '/tab_listensecdir',
    views: {
      'tab2': {
        templateUrl: 'templates/video_secmaindir.html',
        controller: 'VideoSecMainDirCtrl'
      }
    }
  })


//视频 详细的list 
  .state('tabsController.page3', {
    url: '/tab_listenlist',
    views: {
      'tab2': {
        templateUrl: 'templates/page3.html',
        controller: 'page3Ctrl'
      }
    }
  })

  .state('tabsController.page4', {
    url: '/tab_learn',
    views: {
      'tab3': {
        templateUrl: 'templates/page4.html',
        controller: 'page4Ctrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

// 视频详情页面(具体视频)
  .state('tabsController.vedio_title', {
    url: '/vedio_content/{id}',
    views: {
      'tab2': {
        templateUrl: 'templates/vedio_title.html',
        controller: 'vedio_titleCtrl'
      }
    }
  })






  .state('changePassword', {
    url: '/changePassword',
    templateUrl: 'templates/changePassword.html',
    controller: 'changePasswordCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('tabsController.news_content', {
    url: '/news_content/:id',
    views: {
      'tab1': {
        templateUrl: 'templates/news_Content.html',
        controller: 'news_ContentCtrl'
      }
    }
  })

  .state('page9', {
    url: '/vedio_history',
    templateUrl: 'templates/vedio_history.html',
    controller: 'page9Ctrl'
  })

  .state('tabsController.article_content', {
    url: '/article_content/:id',
    views: {
      'tab3': {
        templateUrl: 'templates/article_content.html',
        controller: 'article_contentCtrl'
      }
    }
  })

// 单词页面
  .state('tabsController.page_word', {
    url: '/page_word',
    views: {
      'tab5': {
        templateUrl: 'templates/page_word.html',
        controller: 'page_wordCtrl'
      }
    }
  })

  .state('logo', {
    url: '/page_start',
    templateUrl: 'templates/logo.html',
    controller: 'logoCtrl'
  })

  .state('forgetPassword',{
    url:'/forgetPassword',
    templateUrl:'templates/forgetPassword.html',
    controller:'forgetPasswordCtrl'
  })

$urlRouterProvider.otherwise('/login')

  

});