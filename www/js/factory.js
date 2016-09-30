// var base = 'http://127.0.0.1:8888'
// angular.module('app.factory', [])


// .factory('Loader', ['$ionicLoading', '$timeout', 
// 	function($ionicLoading, $timeout) {

//     var LOADERAPI = {

//         showLoading: function(text) {
//             text = text || 'Loading...';
//             $ionicLoading.show({
//                 template: text
//             });
//         },

//         hideLoading: function() {
//             $ionicLoading.hide();
//         },

//         toggleLoadingWithMessage: function(text, timeout) {
//             var self = this;

//             self.showLoading(text);

//             $timeout(function() {
//                 self.hideLoading();
//             }, timeout || 3000);
//         }

//     };
//     return LOADERAPI;
// }])

// // localStorage factory
// // 提供与HTML5 localStorage API交互的API.
// .factory('LSFactory', [function() {

//     var LSAPI = {

//         clear: function() {
//             return localStorage.clear();
//         },

//         get: function(key) {
//             return JSON.parse(localStorage.getItem(key));
//         },

//         set: function(key, data) {
//             return localStorage.setItem(key, JSON.stringify(data));
//         },

//         delete: function(key) {
//             return localStorage.removeItem(key);
//         },

//         getAll: function() {
//             var books = [];
//             var items = Object.keys(localStorage);

//             for (var i = 0; i < items.length; i++) {
//                 if (items[i] !== 'user' || items[i] != 'token') {
//                     books.push(JSON.parse(localStorage[items[i]]));
//                 }
//             }

//             return books;
//         }

//     };

//     return LSAPI;

// }])

// // Authentication factory
// .factory('AuthFactory', ['LSFactory', function(LSFactory) {

//     var userKey = 'user';
//     var tokenKey = 'token';

//     var AuthAPI = {

//         isLoggedIn: function() {
//             return this.getUser() === null ? false : true;
//         },

//         getUser: function() {
//             return LSFactory.get(userKey);
//         },

//         setUser: function(user) {
//             return LSFactory.set(userKey, user);
//         },

//         getToken: function() {
//             return LSFactory.get(tokenKey);
//         },

//         setToken: function(token) {
//             return LSFactory.set(tokenKey, token);
//         },

//         deleteAuth: function() {
//             LSFactory.delete(userKey);
//             LSFactory.delete(tokenKey);
//         }

//     };

//     return AuthAPI;

// }])

// .factory('TokenInterceptor', ['$q', 'AuthFactory', function($q, AuthFactory) {

//     return {
//         request: function(config) {
//             config.headers = config.headers || {};
//             var token = AuthFactory.getToken();
//             var user = AuthFactory.getUser();

//             if (token && user) {
//                 config.headers['X-Access-Token'] = token.token;
//                 config.headers['X-Key'] = user.email;
//                 config.headers['Content-Type'] = "application/json";
//             }
//             return config || $q.when(config);
//         },

//         response: function(response) {
//             return response || $q.when(response);
//         }
//     };

// }])


// .factory('getWords',['$http',function ($http) {
//     var GetWordsAPI ={
//         getWords:function () {
//                 $http.get(link)
//                     .success(function(response) {
                        
//                         $scope.Words = response.Words
//                         $scope.currentWord = response.Words[0].word
//                         console.log("获取的第一个单词:"+response.Words[0].word);
//                         console.log("获取的第二个单词:"+response.Words[1].word);
//                         console.log("单词数目："+response.Words.length);

//                         return response.Words;
//                     })
//                     .error(function(err) {
//                         console.log("Could not get json information about words!");
//                     })

//         }
//     }
// }])

// //因为只能在网页上正常发音，所以弃用！
// // .factory('iflySpeech',[function () {

// //        var SpeechAPI = {
// //         // @vcn 合成发音人
// //         play: function (content,vcn) {

// //             /**
// //                  * 初始化Session对象
// //                  */
// //                  var session = new IFlyTtsSession({
// //                                                  'url' : 'http://webapi.openspeech.cn/',             
// //                                                  'interval' : '30000', 
// //                                                  'disconnect_hint' : 'disconnect',
// //                                                  'sub' : 'tts'
// //                                 });
// //                var audio = null;
// //               /***********************************************************以下签名过程需根据实际应用信息填入***************************************************/
            
// //               var appid = "57e0c8e4";                              //应用APPID，在open.voicecloud.cn上申请即可获得
// //               var timestamp = new Date().getTime();                      //当前时间戳，例new Date().toLocaleTimeString()
// //               var expires = 60000;                          //签名失效时间，单位:ms，例60000   
// //               //!!!为避免secretkey泄露，签名函数调用代码建议在服务器上完成
// //               var signature = $.md5(appid + '&' + timestamp + '&' + expires + '&' + "3a42df575a481570");        
// //              /************************************************************以上签名过程需根据实际应用信息填入**************************************************/
             
// //             var params = { "params" : "aue = speex-wb;7, ent = intp65, spd = 50, vol = 50, tte = utf8,vcn="+vcn+" ,caller.appid=" + appid + ",timestamp=" + timestamp + ",expires=" + expires, "signature" : signature, "gat" : "mp3"}; 
// //             session.start(params, content, function (err, obj)
// //                 {
// //                 if(err) {
// //                   alert("语音合成发生错误，错误代码 ：" + err);
// //                 } else {
// //                     if(audio != null)
// //                 {
// //                     audio.pause();
// //                 }
// //                 audio = new Audio();
// //                 audio.src = '';
// //                 audio.play();
// //                 audio.src = "http://webapi.openspeech.cn/" + obj.audio_url;
// //                 audio.play();
// //                 }
// //               });
// //         }
// //        }


// //        return SpeechAPI;
// // }])
