angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

  //place ionic tabs at the bottom of the screen.
  $ionicConfigProvider.tabs.position('bottom');

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

  .state('tabsController.page3', {
    url: '/tab_listen',
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

  .state('tabsController.vedio_title', {
    url: '/vedio_content',
    views: {
      'tab2': {
        templateUrl: 'templates/vedio_title.html',
        controller: 'vedio_titleCtrl'
      }
    }
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
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
    url: '/article_content',
    views: {
      'tab3': {
        templateUrl: 'templates/article_content.html',
        controller: 'article_contentCtrl'
      }
    }
  })

  .state('tabsController.page11', {
    url: '/page_word',
    views: {
      'tab5': {
        templateUrl: 'templates/page_word.html',
        controller: 'page11Ctrl'
      }
    }
  })

  .state('logo', {
    url: '/page_start',
    templateUrl: 'templates/logo.html',
    controller: 'logoCtrl'
  })

$urlRouterProvider.otherwise('/page1/page_word')

  

});