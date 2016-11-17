angular.module('app.controllers', [])


//News List
.controller('page2Ctrl', ['$scope', '$stateParams', '$http','$cordovaToast','AuthFactory','$state','GetWords','LoadAllVideoInfo',
    // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $http,$cordovaToast,AuthFactory,$state,GetWords,LoadAllVideoInfo) {

        
        if(!AuthFactory.isLoggedIn()){
          $state.go('login');
        }
        GetWords.getWords() //尽早的得到单词表
        LoadAllVideoInfo.LoadAllVideoInfo();//尽早得到video info
        $scope.data.username = AuthFactory.getUser();
        $scope.doRefresh = function() {

            $http.get('http://124.16.71.5:1234/wordnet/notation')

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
        $scope.doRefresh();

    }
])

//Video Main List 罗列出视频主目录
.controller('VideoMainDirCtrl', ['$scope', '$stateParams','$cordovaToast','VideoReq','AuthFactory','$state','LoadAllVideoInfo',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams,$cordovaToast,VideoReq,AuthFactory,$state,LoadAllVideoInfo) {
        if(!AuthFactory.isLoggedIn()){
          $state.go('login');
        }
        $scope.doRefresh = function () {

                $scope.VideoType = ["经济金融","人文艺术","时事热点","学科科普"];
                console.log($scope.Video);
                //stop the ion-refresher from spinning.
                $scope.$broadcast('scroll.refreshComplete');
                //add toast infomation. 必须在安卓手机上才可以显示.
                $cordovaToast.showShortBottom("刷新完成");
                
            }
        
        $scope.emitEco = function () {
            console.log("金融");
            // $scope.Video = LoadAllVideoInfo.GetVideoInfo("economy and finance");
            // console.log("post info to subvideo list~"+$scope.videoreq);
           //传递请求参数给Video List Controller.
          var videoreq =  "economy and finance";
          VideoReq.setVideoReqData(videoreq);

        }
        $scope.emitEve = function () {
           console.log("时事");
           var videoreq =  "current events";
            VideoReq.setVideoReqData(videoreq);
        }
        $scope.emitArt = function () {
           console.log("艺术");
           var videoreq =  "humanities and arts";
            VideoReq.setVideoReqData(videoreq);
        }
        $scope.emitSci = function () {
           console.log("学科");
           var videoreq =  "science popularization";
            VideoReq.setVideoReqData(videoreq);
        }
   

    }
])

//video 学科科普次目录
// .controller('VideoSecMainDirCtrl', ['$scope', '$stateParams','VideoReq',

//  function($scope, $stateParams,VideoReq){
//     $scope.VideoType = [
//             {type:'mathematics',content:"数学"},
//             {type:'material science',content:"材料"},
//             {type:'biology',content:"生物"},
//             {type:'physics',content:"物理"},
//             {type:'chemisty',content:"化学"},
//             {type:'computer',content:"计算机"}
//     ]

//     // console.log($scope.VideoType);
//     // ["数学","材料","生物","物理","化学","计算机"];

//       //     1      biology
//       //     2      chemisty
//       //     3      computer
//       //     4      material science
//       //     5      mathematics
//       //     6      physics
//     $scope.emit = function (videoreq) {
//             console.log("Test emit：："+videoreq);
//            //传递请求参数给Video List Controller.
//           var videoreq =  "science popularization/"+videoreq;
//           VideoReq.setVideoReqData(videoreq);
//         }


// }])

//Video List  罗列出视频列表
.controller('page3Ctrl', ['$scope', '$stateParams','$http','$cordovaToast','GetVideo','VideoReq','LoadAllVideoInfo',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams,$http,$cordovaToast,GetVideo,VideoReq,LoadAllVideoInfo) {

        $scope.doRefresh = function () {

            // $http.get('http://124.16.71.5:1234/wordnet/video')
            // .success(function (response) {
            //     $scope.Video = response.Video;
            //     console.log($scope.Video);
            // })
            // .finally(function () {
            //     //stop the ion-refresher from spinning.
            //         $scope.$broadcast('scroll.refreshComplete');
            //         //add toast infomation. 必须在安卓手机上才可以显示.
            //         // $cordovaToast.showShortBottom("刷新完成");
            // })
            var videoreq = VideoReq.getVideoReqData();
            console.log("看这里::"+videoreq);
            $scope.Video = LoadAllVideoInfo.GetVideoInfo(videoreq);
            console.log("videoInfolength:"+$scope.Video.length);
                 for(var i =0 ;i<$scope.Video.length;i++){
                        $scope.Video[i].id = i;
                 }

            // GetVideo.getVideos(videoreq).then(function (res) {
            //      console.log("获取视频信息成功！");
            //      // console.log(res.data.Video);
            //      $scope.Video = res.data.Video;
            //      console.log("videoInfolength:"+$scope.Video.length);
            //      for(var i =0 ;i<$scope.Video.length;i++){
            //             $scope.Video[i].id = i;
            //      }
            //  })

            $scope.$broadcast('scroll.refreshComplete');
            //add toast infomation. 必须在安卓手机上才可以显示.
            // $cordovaToast.showShortBottom("刷新完成");
        }

        $scope.doRefresh();

    }
])


//Article List
.controller('page4Ctrl', ['$scope', '$stateParams', '$http','$cordovaToast','AuthFactory',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName     
    function($scope, $stateParams,$http,$cordovaToast,AuthFactory) {

        if(!AuthFactory.isLoggedIn()){
              $state.go('login');
            }

        $scope.doRefresh = function() {
            var link = 'http://124.16.71.5:1234/wordnet/article'
            var link1 = 'http://127.0.0.1:8888/Article';
            $http.get(link)

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
        $scope.doRefresh();
    }
])

//视频具体
.controller('vedio_titleCtrl', ['$scope', '$stateParams','$ionicSlideBoxDelegate','$http','$sce','GetVideo','VideoReq','LogVideoTime','AuthFactory','LoadAllVideoInfo',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams,$ionicSlideBoxDelegate,$http,$sce,GetVideo,VideoReq,LogVideoTime,AuthFactory,LoadAllVideoInfo) {

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
    // $http.get('http://124.16.71.5:1234/wordnet/video')
    //         .success(function(res) {
    //             $scope.Video = res.Video[$stateParams.id - 1];
    //             console.log($stateParams.id);
    //             console.log($scope.Video);
    //         })
    //         .error(function(err) {
    //             console.log("Could not get json information about Video!");
    //         })

    // have the API in your controller you can add your video playlist and change between them
    
    

    

    var videoreq = VideoReq.getVideoReqData()
    console.log("Test node 3::"+videoreq);
    var res = LoadAllVideoInfo.GetVideoInfo(videoreq);

         console.log("获取视频信息成功！!!");
         // console.log(res.data.Video);
         console.log("Video ID:::"+$stateParams.id);
         $scope.Video = res[$stateParams.id];
         console.log("Video info ::"+res.length);
         console.log("video content:"+$scope.Video.id);
         console.log("Watch video is::"+$scope.Video.title);
         $scope.url = "http://124.16.71.5:1234/wordnet/video/"+videoreq+"/"+$scope.Video.title
         // $scope.url = "http://blogstatic.freemake.com/wp-content/uploads/2015/10/Jefferson-Airplane-White-Rabbit-.mp4"
         $scope.url_srt = "http://124.16.71.5:1234/wordnet/video/"+videoreq+"/"+$scope.Video.srt_en; 
        console.log("Video src::"+$scope.url);
        console.log("字幕文件::"+$scope.url_srt);
        // http://www.videogular.com/assets/subs/pale-blue-dot.vtt
         // videogular
         $scope.config = {
                    autoHide: false,
                    autoHideTime: 3000,
                    autoPlay: false,
                    loop: false,
                    preload: "auto",
                    transclude: true,
                    sources: [
                        {src: $sce.trustAsResourceUrl($scope.url), type: "video/mp4"}
                    ],
                    tracks: [
                        {
                            src: $sce.trustAsResourceUrl($scope.url_srt),
                            kind: "captions",
                            srclang: "en",
                            label: "English",
                            default: "default"
                        },
                        {
                            src: '',
                            kind: "captions",
                            srclang: "en",
                            label: "English",
                            default: ""
                        }

                    ],
                    theme: {
                        url:"lib/videogular-themes-default/videogular.css"
                    },
                    plugins: {
                        poster: "http://www.videogular.com/assets/images/videogular.png"
                    }
                };

    //Log video info logging.
    $scope.API = null;
    $scope.onPlayerReady = function ($API) {
        $scope.$API = $API;
        console.log("API____:"+$scope.$API.currentState);

        
    }
    $scope.videoid = $scope.Video.id;
    $scope.postonce = false; //只发一次log日志
    $scope.watchTime = function ($currentTime,$duration) {
        var currentTime = Math.round($currentTime);
        var duration = Math.round($duration);
        var ratio = currentTime/$duration;
        console.log("watchTIme____"+ratio);

        if(ratio>=0.8){ //定义看视频的完成度,当看完80%时,视为学习完这个视频.
            // console.log("timeleft------"+$scope.$API.timeLeft);
            // $scope.$API.play();
            // var watchedMin = Math.round(currentTime/60);
            // var watchedSec = currentTime-watchedMin;
            // var watchedtime = watchedMin+':'+watchedSec;
            // console.log("Watched:"+watchedtime);
            LogVideoTime.LogVideoTimeBtn(AuthFactory.getUser(),$scope.videoid,$scope.postonce);
            $scope.postonce = true;
        }
    }

    // GetVideo.getVideos(videoreq).then(function (res) {
    //      console.log("获取视频信息成功！!!");
    //      // console.log(res.data.Video);
    //      console.log("Video ID:::"+$stateParams.id);
    //      $scope.Video = res.data.Video[$stateParams.id];
    //      console.log("Video info ::"+res.data.Video.length);
    //      console.log("video content:"+$scope.Video.id);
    //      console.log("Watch video is::"+$scope.Video.title);
    //      $scope.url = "http://124.16.71.5:1234/wordnet/video/"+videoreq+"/"+$scope.Video.title
    //      // $scope.url = "http://blogstatic.freemake.com/wp-content/uploads/2015/10/Jefferson-Airplane-White-Rabbit-.mp4"
    //      $scope.url_srt = "http://124.16.71.5:1234/wordnet/video/"+videoreq+"/"+$scope.Video.srt_en; 
    //     console.log("Video src::"+$scope.url);
    //     console.log("字幕文件::"+$scope.url_srt);
    //     // http://www.videogular.com/assets/subs/pale-blue-dot.vtt
    //      // videogular
    //      $scope.config = {
    //                 autoHide: false,
    //                 autoHideTime: 3000,
    //                 autoPlay: false,
    //                 loop: false,
    //                 preload: "auto",
    //                 transclude: true,
    //                 sources: [
    //                     {src: $sce.trustAsResourceUrl($scope.url), type: "video/mp4"}
    //                 ],
    //                 tracks: [
    //                     {
    //                         src: $sce.trustAsResourceUrl($scope.url_srt),
    //                         kind: "captions",
    //                         srclang: "en",
    //                         label: "English",
    //                         default: "default"
    //                     },
    //                     {
    //                         src: '',
    //                         kind: "captions",
    //                         srclang: "en",
    //                         label: "English",
    //                         default: ""
    //                     }

    //                 ],
    //                 theme: {
    //                     url:"lib/videogular-themes-default/videogular.css"
    //                 },
    //                 plugins: {
    //                     poster: "http://www.videogular.com/assets/images/videogular.png"
    //                 }
    //             };

        
    //         // $scope.changeTrack = function () {
    //         //     $scope.config.tracks[0].default = null;
    //         //     $scope.config.tracks[1].default = "default";
    //         // };
          



    //  })

   


  // console.log(":::::::::Test video angular:::"+$scope.config.theme);

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


//Login  and Logout
.controller('loginCtrl', ['$rootScope','$scope','$state', '$stateParams','$ionicPopup','$timeout','$ionicLoading','$ionicSideMenuDelegate','$http','md5','AuthFactory','LSFactory','$ionicHistory','$ionicPlatform','$location',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($rootScope,$scope,$state, $stateParams,$ionicPopup,$timeout,$ionicLoading,$ionicSideMenuDelegate,$http,md5,AuthFactory,LSFactory,$ionicHistory,$ionicPlatform,$location) {
        $ionicPlatform.registerBackButtonAction(function() {
        if ($location.path() === "/login" || $location.path() === "login") {
            navigator.app.exitApp();
          }
          else {
            $ionicHistory.goBack();
            //navigator.app.goBack();
          }
        }, 100);
        // access server

        var link = 'http://124.16.71.5:1234/wordnet/authenticate';
        var link1 = 'http://127.0.0.1:8888/login'
        $scope.user = {}
        // $scope.username = "Ucas";
        // $scope.password = "1234566";
       

        // $scope.disableDragMenu = function () {
        //     $ionicSideMenuDelegate.canDragContent(false);
        // }
        

        $scope.data = {};
        $scope.response = "no";

       
        // 设置记住密码
        if(LSFactory.get("Remusername")){
               $scope.data.username = LSFactory.get("Remusername")
                $scope.data.password = LSFactory.get("Rempassword")
            }

        //当用户删除用户名,及时删除记住的密码
        $scope.$watch('data.username',function () {
            console.log("changed:"+$scope.data.username);
            if(LSFactory.get("Remusername")==$scope.data.username){
                console.log("Debug here");
                $scope.data.password = LSFactory.get("Rempassword")
            }else{
                $scope.data.password = "";
            }
        })

        $scope.login = function() {
             //setup the loader
            $ionicLoading.show({
                content:'登录中...',
                animation:'fade-in',
                showBackdrop:true,
                maxWidth:200,
                showDelay:0
            });

            
            // 登陆记住密码
            LSFactory.set("Remusername",$scope.data.username);
            LSFactory.set("Rempassword",$scope.data.password);    


             // 需要发送的用户数据
                 $scope.postUserData = {
                  id:$scope.data.username,
                  password:md5.createHash($scope.data.password || '')
                 }
                 console.log("用户名："+$scope.data.username);
                 console.log("密码："+$scope.data.password);
                 console.log("密码md5："+md5.createHash($scope.data.password || ''));

             $scope.req = {
                 method:'POST',
                 url:link,
                 headers:{'Content-Type': 'application/json;charset=UTF-8'},
                 params:$scope.postUserData,
                 timeout:6000
             }
              

                $http($scope.req).then(function (res){
                    $scope.response = res.data.status;
                    console.log("res status:"+res.status);
                    console.log("Result:"+$scope.response);
                    //表示验证登陆是否成功。
                    console.log("response:"+$scope.response);

                    switch($scope.response) {
                        //login success and setup a timeout to clear loader.
                        case 'true':$timeout(function () {
                                $ionicLoading.hide();
                                //等待登陆是否成功的信息.
                            },1000);

                        // 授权操作 
                        AuthFactory.setUser($scope.data.username);
                        AuthFactory.setToken({
                            token:res.data.token,
                            expires:res.data.expires
                        });
                        $rootScope.isAuthenticated = true;
                        $rootScope.username = $scope.data.username;
                        console.log("isAuthenticated:"+$rootScope.isAuthenticated);
                        console.log("User:"+AuthFactory.getUser($scope.data.username));
                        $state.go('tabsController.page2');
                        break;
                        

                        //alert对话框，登陆失败时弹出。
                        case 'false': 
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
                                $scope.data.password = "";
                            },3000);//3秒后关闭。

                        break;
                        
                    }
                },function errorCallback(res) {
                    console.log(res.data||'请求失败！');
                    console.log("网络状态"+res.status);
                    $timeout(function () {
                        $ionicLoading.hide();
                        //等待登陆是否成功的信息.
                    },100).then(function () {
                        alertPopup = $ionicPopup.alert({
                            title:'登陆失败！！',
                            // template:'请重新输入用户名密码',
                            subTitle:'请检查网络是否正常连接'
                        });
                        alertPopup.then(function () {
                            console.log("登陆失败，请重试！");
                        });
                    })

                    $timeout(function () {
                        alertPopup.close();
                        $state.go('login')
                        $scope.data.password = "";
                    },6000);//6秒后关闭。
                });   
        }

        $rootScope.logout = function () {
            AuthFactory.deleteAuth();
            $rootScope.isAuthenticated = false;
            console.log("log out~~ ");
            $state.go('login');
        }

        // disable side menu.
        $ionicSideMenuDelegate.canDragContent(false);
    
          
    
        

    }
])

//News content  通知具体内容
.controller('news_ContentCtrl', ['$scope', '$stateParams', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $http) {

        

        $http.get('http://124.16.71.5:1234/wordnet/notation')
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
        var link1 = 'http://127.0.0.1:8888/Article';
        var link = 'http://124.16.71.5:1234/wordnet/article'
    	    $http.get(link)
    	        .success(function(res) {
    	            $scope.Article = res.Article[$stateParams.id - 1];
    	            console.log($stateParams.id);
    	            console.log($scope.Article);
    	        })
    	        .error(function(err) {
    	            console.log("Could not get json information about Article!");
    	        })
    	}


])

//单词页面
.controller('page_wordCtrl', ['$scope', '$stateParams','$http','GetWords','ShowWords','WordBtn','LSFactory', 'WordIndex','GetPronounce','AuthFactory','$cordovaMedia','$ionicPlatform',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams,$http,GetWords,ShowWords,WordBtn,LSFactory,WordIndex,GetPronounce,AuthFactory,$cordovaMedia,$ionicPlatform) {
        //从服务器获取单词/中文释义/英文释义/用法例句
       // var index = 0;
       // GetWords.getWords()
       if(!AuthFactory.isLoggedIn()){
          $state.go('login');
        }
        $scope.transformWord = function (index) {
            
            Items = ShowWords.showWords(index)
            console.log("ITem word::"+Items[4]);//word
            console.log("ITem word::"+Items[5]);//英式音标
            console.log("ITem word::"+Items[6]);//美式音标
            $scope.word = Items[4];
            $scope.phonetic_uk = Items[5];
            $scope.phonetic_usa = Items[6];
            $scope.wordid = Items[7];

            console.log("Items:::"+Items);
                var names = ['中文释义','英文释义','例句','用法例句'];
                $scope.groups = [];
                for(var i = 0;i < 4;i++){
                    $scope.groups[i] = {
                        name:names[i],
                        items:Items[i],
                        show:false
                    };
            
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

    }
       index = WordIndex.getWordIndex()
       $scope.transformWord(index)
       $scope.currentWord = $scope.word;
       console.log("Currennt Speak word:::"+$scope.currentWord+"__Index:"+index);

        $scope.reader_GB = function () {

            index = WordIndex.getWordIndex()
            $scope.currentWord = $scope.word;
            console.log("Currennt Speak word:::"+$scope.currentWord+"Index"+index);
            $scope.speechText = $scope.currentWord;
            console.log($scope.speechText);
            var wordurl = GetPronounce.getEnPron($scope.speechText);

                $ionicPlatform.ready(function () {
                    media = $cordovaMedia.newMedia(wordurl);
                    media.play();
                    // $scope.speechText = ''
                    });
             
            //     window.TTS.speak({
            //     text: $scope.speechText,
            //     locale: 'en-GB',
            //     rate: 1.5
            // }, function () {
            //     // Do Something after success
            // }, function (reason) {
            //     // Handle the error case
            // });
                
                
            
           
        }
        $scope.reader_US = function () {
            index = WordIndex.getWordIndex()
            $scope.currentWord = $scope.word;
            console.log("Currennt Speak word:::"+$scope.currentWord+"Index"+index);
            $scope.speechText = $scope.currentWord;
            console.log($scope.speechText);
            var wordurl = GetPronounce.getAmPron($scope.speechText);
            $ionicPlatform.ready(function () {
                media = $cordovaMedia.newMedia(wordurl);
                media.play(); 
                // $scope.speechText = ''
                    });

          
            // window.TTS.speak({
            //            text: $scope.speechText,
            //            locale: 'en-US',
            //            rate: 1.5
            //        }, function () {
            //            // Do Something after success
            //        }, function (reason) {
            //            // Handle the error case
            //        });


        }


        //Inter


        // button log
        $scope.btn_easy = function () {
            //切换为下一个单词
            index = WordIndex.getWordIndex()
            console.log("index btn::"+index);
            $scope.transformWord(index)
            WordIndex.setWordIndex(index)
            console.log("easy");
           WordBtn.wordBtn("easy",$scope.wordid,AuthFactory.getUser())//para1：单词难度 para2：当前单词id para3:用户名.
            
        }

        $scope.btn_normal = function () {
            index = WordIndex.getWordIndex()
            console.log("index btn::"+index);
            $scope.transformWord(index)
            WordIndex.setWordIndex(index)
            console.log("normal");
            WordBtn.wordBtn("normal",$scope.wordid,AuthFactory.getUser())
        }

        $scope.btn_hard = function () {
            index = WordIndex.getWordIndex()
            console.log("index btn::"+index);
            $scope.transformWord(index)
            WordIndex.setWordIndex(index)
            console.log("difficult");
            WordBtn.wordBtn("difficult",$scope.wordid,AuthFactory.getUser())
        }

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