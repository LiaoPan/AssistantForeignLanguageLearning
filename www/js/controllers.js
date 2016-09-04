angular.module('app.controllers', [])


//News
.controller('page2Ctrl', ['$scope', '$stateParams', '$http',
    // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $http) {


        $scope.doRefresh = function() {

            $http.get('http://127.0.0.1:8888/News')

            .success(function(response) {
                // body...
                $scope.News = response.News;

            })

            .finally(function() {
                //stop the ion-refresher from spinning.
                $scope.$broadcast('scroll.refreshComplete');
            })
        }

    }
])

.controller('page3Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])


//Article
.controller('page4Ctrl', ['$scope', '$stateParams', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams,$http) {
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
            })
        }

    }
])

.controller('vedio_titleCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('signupCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('loginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

//News content  
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

.controller('page11Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('logoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])
