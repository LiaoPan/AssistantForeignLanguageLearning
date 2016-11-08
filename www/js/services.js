var base1 = 'http://127.0.0.1:8888/'
var base = 'http://124.16.71.190:8080/wordnet/'
angular.module('app.services', [])

.factory('BlankFactory', [function() {

}])

.service('BlankService', [function() {

}])


.factory('Loader', ['$ionicLoading', '$timeout',
    function($ionicLoading, $timeout) {

        var LOADERAPI = {

            showLoading: function(text) {
                text = text || 'Loading...';
                $ionicLoading.show({
                    template: text
                });
            },

            hideLoading: function() {
                $ionicLoading.hide();
            },

            toggleLoadingWithMessage: function(text, timeout) {
                var self = this;

                self.showLoading(text);

                $timeout(function() {
                    self.hideLoading();
                }, timeout || 3000);
            }

        };
        return LOADERAPI;
    }
])

// localStorage factory
// 提供与HTML5 localStorage API交互的API.
.factory('LSFactory', [function() {

    var LSAPI = {

        clear: function() {
            return localStorage.clear();
        },

        get: function(key) {
            return JSON.parse(localStorage.getItem(key));
        },

        set: function(key, data) {
            return localStorage.setItem(key, JSON.stringify(data));
        },

        delete: function(key) {
            return localStorage.removeItem(key);
        },

        getAll: function() {
            var books = [];
            var items = Object.keys(localStorage);

            for (var i = 0; i < items.length; i++) {
                if (items[i] !== 'user' || items[i] != 'token') {
                    books.push(JSON.parse(localStorage[items[i]]));
                }
            }

            return books;
        }

    };

    return LSAPI;

}])

// Authentication factory
.factory('AuthFactory', ['LSFactory', function(LSFactory) {

    var userKey = 'user';
    var tokenKey = 'token';

    var AuthAPI = {

        isLoggedIn: function() {
            return this.getUser() === null ? false : true;
        },

        getUser: function() {
            return LSFactory.get(userKey);
        },

        setUser: function(user) {
            return LSFactory.set(userKey, user);
        },

        getToken: function() {
            return LSFactory.get(tokenKey);
        },

        setToken: function(token) {
            return LSFactory.set(tokenKey, token);
        },

        deleteAuth: function() {
            LSFactory.delete(userKey);
            LSFactory.delete(tokenKey);
        }

    };

    return AuthAPI;

}])

.factory('TokenInterceptor', ['$q', 'AuthFactory', function($q, AuthFactory) {

    return {
        request: function(config) {
            config.headers = config.headers || {};
            var token = AuthFactory.getToken();
            var user = AuthFactory.getUser();

            if (token && user) {
                config.headers['X-Access-Token'] = token.token;
                config.headers['X-Key'] = user.email;
                config.headers['Content-Type'] = "application/json";
            }
            return config || $q.when(config);
        },

        response: function(response) {
            return response || $q.when(response);
        }
    };

}])

// 用户的基本操作[login,logout]
.factory('UserFactory', ['$http','AuthFactory', function($http,AuthFactory){
    var link = base +"authenticate";
    var UserAPI = {

    }

    return UserAPI;

}])


// 单词页面获取单词
.factory('GetWords', ['$http', 'LSFactory',function($http,LSFactory) {
    var link = base + "words";

    var GetWordsAPI = {
        getWords: function() {
            $http.get(link).success(function (response) {
            	response.Words;
            	console.log(response.Words);
            	LSFactory.delete("Words")  //有bug

            	LSFactory.set("Words",response.Words)
            })

        }
    };

    return GetWordsAPI;
}])

// 单词页面--toggle
.factory('ShowWords', ['GetWords', 'LSFactory',function(GetWords,LSFactory) {

    var ShowWordsAPI = {
        showWords: function(index) {
        	var Words = LSFactory.get("Words")
        	console.log("SHow:::"+Words[index].word);
        	var paraphrase_zh = Words[index].paraphrase_zh
        	var paraphrase_en = Words[index].paraphrase_en
        	var sample_sentence1 = Words[index].sample_sentence1
        	var sample_sentence2 =Words[index].sample_sentence2
        	var word = Words[index].word;
        	var phonetic_uk = Words[index].phonetic_uk;
        	var phonetic_usa  = Words[index].phonetic_usa;
        	var wordid = Words[index].id;

        	var Items = [];
          
        	// 中文释义
        	Items.push(paraphrase_zh);
        	// 英文释义
        	Items.push(paraphrase_en);
        	// 例句
        	Items.push(sample_sentence1)
        	// 用法例句
        	Items.push(sample_sentence2);
        	//word
        	Items.push(word)
        	//英式音标
        	Items.push(phonetic_uk)
        	//美式音标
        	Items.push(phonetic_usa)
        	//单词id
        	Items.push(wordid)

            console.log("service::Items::000::"+Items);
            	return Items;
            }
            
        }
    

    return ShowWordsAPI;

}])


// 单词页面--按钮easy --normal -- hard
.factory('WordBtn', ['$http', '$timeout', function($http, $timeout) {
    var link = base + "wordcomment";
    var WordBtnAPI = {

        wordBtn: function(comment, currentWordid, userid) {
            // @ comment :easy || normal || hard .
            ////para1：单词难度 para2：当前单词id para3:用户名.
            console.log("评价" + comment);
            console.log("word id" + currentWordid);
            console.log("userid:" + userid);

            var level = comment;
            // 需要发送的用户数据
            postWordData = {
                userid: userid,
                wordid: currentWordid,
                difficulty: comment //学生觉得的单词难度级别
            }


            req = {
                method: 'POST',
                url: link,
                headers: { 'Content-Type': 'application/json;charset=UTF-8' },
                params: postWordData,
            }


            $http(req).then(function(res) {
                console.log("res status:" + res.data.status);
            }, function errorCallback(res) {
                console.log("网络超时！！");
                // 问题在于 传输失败了如何重传
                $timeout(function() {
                    $http(req).then(function(res) {
                        console.log("res status:" + res.data.status);
                    })
                }, 3000)



            })
        }
    }
    return WordBtnAPI;
}])

// 单词index
.factory("WordIndex",function () {
    var index = 0;//word id
    var WordIndexAPI = {
        setWordIndex: function (wordindex) {
            return index = wordindex + 1;
        },
        getWordIndex: function () {
            return index;
        }

    }
    return WordIndexAPI
})



//获取视频信息
.factory('GetVideo',['$http',function ($http) {
    var link = base + "video";
    var videoinfo = [];
    var VideoTypeAPI = {
        getVideos: function (videotype) {
            console.log("进入video type");

            postVideoData = {
                url: videotype
            }
            req = {
                method: 'POST',
                url: link,
                headers: { 'Content-Type': 'application/json;charset=UTF-8' },
                params: postVideoData
            }
            
           return  $http(req);

        }
        
    }
    return VideoTypeAPI;
}])


// video maindir controller 传递信息给video list controller 
// 以此来判断读取哪一类视频信息
.factory('VideoReq',function () {
    var video_req = "NULL";

    var VideoReqAPI = {
        setVideoReqData: function (videoreq) {
            console.log("Test node:"+videoreq);
           return video_req = videoreq; 
               
        },
        getVideoReqData: function () {
            return video_req;
        }
    }

    return VideoReqAPI;
           
})


