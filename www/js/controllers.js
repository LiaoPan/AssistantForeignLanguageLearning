angular.module('app.controllers', [])


//News List
.controller('page2Ctrl', ['$scope', '$stateParams', '$http','$cordovaToast',
    // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $http,$cordovaToast) {


        $scope.doRefresh = function() {

            $http.get('http://127.0.0.1:8888/News')

            .success(function(response) {
                // body...
                $scope.News = response.News;

            })

            .finally(function() {
                //stop the ion-refresher from spinning.
                $scope.$broadcast('scroll.refreshComplete');
                //add toast infomation.
                $cordovaToast.showShortBottom("刷新完成");

            })
        }

    }
])

//Video List
.controller('page3Ctrl', ['$scope', '$stateParams','$http','$cordovaToast',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams,$http,$cordovaToast) {
        $scope.doRefresh = function () {

            $http.get('http://127.0.0.1:8888/Video')
            .success(function (response) {
                $scope.Video = response.Video;
                console.log($scope.Video);
            })
            .finally(function () {
                //stop the ion-refresher from spinning.
                    $scope.$broadcast('scroll.refreshComplete');
                    //add toast infomation. 必须在安卓手机上才可以显示.
                    $cordovaToast.showShortBottom("刷新完成");
            })
        }

    }
])


//Article List
.controller('page4Ctrl', ['$scope', '$stateParams', '$http','$cordovaToast',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams,$http,$cordovaToast) {
        $scope.doRefresh = function() {

            $http.get('http://127.0.0.1:8888/Article')

            .success(function(response) {
                // body...
                $scope.Article = response.Article;
                console.log(response.Article);
            })

            .finally(function() {
                //stop the ion-refresher from spinning.
                $scope.$broadcast('scroll.refreshComplete');
                //add toast infomation.
                $cordovaToast.showShortBottom("刷新完成");
            })
        }

    }
])

//视频具体
.controller('vedio_titleCtrl', ['$scope', '$stateParams','$ionicSlideBoxDelegate','$http','$sce',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams,$ionicSlideBoxDelegate,$http,$sce) {

        //实现视频页面里嵌套评论和详情页面
        $scope.slideIndex = 0;
        console.log($scope.slideIndex);
        $scope.slideChanged = function (index) {
            $scope.slideIndex = index;
            console.log("slide change");

            if ($scope.slideIndex == 0) {
                console.log("slide 1");
            }else if ($scope.slideIndex == 1) {
                console.log("slide 2");
            }
        };

        $scope.activeSlide = function (index) {
            console.log("here "+index);
            $ionicSlideBoxDelegate.slide(index);
        };

    //获取服务器视频内容
    $http.get('http://127.0.0.1:8888/Video')
            .success(function(res) {
                $scope.Video = res.Video[$stateParams.id - 1];
                console.log($stateParams.id);
                console.log($scope.Video);
            })
            .error(function(err) {
                console.log("Could not get json information about Video!");
            })

    //处理视频url的不信任源问题
    $scope.trustSrc = function (src) {
        return $sce.trustAsResourceUrl(src);
    }

    }
])

.controller('changePasswordCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])


//Login
.controller('loginCtrl', ['$scope','$state', '$stateParams','$ionicPopup','$timeout','$ionicLoading','$ionicSideMenuDelegate',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope,$state, $stateParams,$ionicPopup,$timeout,$ionicLoading,$ionicSideMenuDelegate) {
        
        $scope.disableDragMenu = function () {
            $ionicSideMenuDelegate.canDragContent(false);
        }

        $scope.data = {};
        $scope.response = "no";

        $scope.login = function() {
             //setup the loader
            $ionicLoading.show({
                content:'登录中...',
                animation:'fade-in',
                showBackdrop:true,
                maxWidth:200,
                showDelay:0
            });

            console.log("Login user: " + $scope.data.username + "  password: "+ $scope.data.password);
            $scope.response = "ok";//表示验证登陆成功。

            switch($scope.response) {
                //login success and setup a timeout to clear loader.
                case 'ok':$timeout(function () {
                        $ionicLoading.hide();
                        //等待登陆是否成功的信息.
                    },1000);
                $state.go('tabsController.page2');
                break;
                

                //alert对话框，登陆失败时弹出。
                case 'no': 
                    $state.go('login')
                    $timeout(function () {
                        $ionicLoading.hide();
                        //等待登陆是否成功的信息.
                    },1000).then(function () {
                        alertPopup = $ionicPopup.alert({
                            title:'密码或者用户名错误！',
                            // template:'请重新输入用户名密码',
                            subTitle:'请重新输入用户名密码'
                        });
                        alertPopup.then(function () {
                            console.log("登陆失败，请重试！");
                        });
                    })

                    

                    $timeout(function () {
                        alertPopup.close();
                    },3000);//3秒后关闭。

                break;
                
            }
            
        }

        
           
          
    
        

    }
])

//News content  通知具体内容
.controller('news_ContentCtrl', ['$scope', '$stateParams', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $http) {
        $http.get('http://127.0.0.1:8888/News')
            .success(function(res) {
                $scope.News = res.News[$stateParams.id - 1];
                console.log($stateParams.id);
                console.log($scope.News);
            })
            .error(function(err) {
                console.log("Could not get json information about News!");
            })


    }
])

.controller('page9Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

//文章具体内容
.controller('article_contentCtrl', ['$scope', '$stateParams','$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $http) {
    	    $http.get('http://127.0.0.1:8888/Article')
    	        .success(function(res) {
    	            $scope.Article = res.Article[$stateParams.id - 1];
    	            console.log($stateParams.id);
    	            console.log($scope.Article);
    	        })
    	        .error(function(err) {
    	            console.log("Could not get json information about News!");
    	        })
    	}


])

//单词页面
.controller('page_wordCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {
        //从服务器获取单词/中文释义/英文释义/用法例句
        //coding
        var Items = [];
        Items.push('中文释义 您好!');
        Items.push('英文释义 Hello!');
        Items.push('用法例句 Alide Hello!');

        var names = ['中文释义','英文释义','用法例句'];
        $scope.groups = [];
        for(var i = 0;i < 3;i++){
            $scope.groups[i] = {
                name:names[i],
                items:Items[i],
                show:false
            };
            console.log($scope.groups[i]);
        }

        /*
           * if given group is the selected group, deselect it
           * else, select the given group
           */
          $scope.toggleGroup = function(group) {
            group.show = !group.show;
          };
          $scope.isGroupShown = function(group) {
            return group.show;
          };



    }
])

.controller('logoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('vedio_commentCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('vedio_detailsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

//
.controller('forgetPasswordCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }

])