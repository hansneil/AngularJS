/*
 * 实现Angular服务
 * AngularJS服务是单例对象，使用毅力啊注入机制来定义和注册
 */

/*
 * 1.内置服务
 *   $animate | $cacheFactory | $compile | $cookies | $document[$window]
 *   $http | $interval[$timeout] | $locale | $location | $resource
 *   $rootElement $rootScope | $route | $sce | $templateCache
 */

/*
 * 1.1 使用$http服务发送HTTP的get和put请求
 *     使用该服务，可以直接和web服务器交互
 *     使用方式：
 *     1. $http.delete(url, [config])
 *        $http.get(url, [config])
 *        $http.head(url, [config])
 *        $http.json(url, [config])
 *        $http.post(url, [config])
 *        $http.put(url, [config])
 *     2. $http(config)
 *     -------------------------------------------------------------------
 *     利用$http对象调用请求方法时，会返回success()和error()
 *     这两个对象分别接受一个回调函数，在成功或者失败时调用，
 *     接受以下参数：data -- 响应数据
 *                 status -- 响应状态
 *                 header -- 响应头
 *                 config -- 请求配置
 */

/*----------------------node_server.js---------------------------------*/
/*
var express = require('express'),
    bodyParser = require('body-parser'),
    app = express();
app.use('/', express.static('./static')).
    use('/images', express.static('./images')).
    use('/lib', express.static('./lib'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json()); // 如果要解析body中的json数据，必须包含这个中间件
var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
var serviceDays = days.slice(0);
app.get('/reset/days', function(req, res){
    serviceDays = days.slice(0);
    res.json(serviceDays);
});
app.post('/remove/day', function(req, res){
    if (serviceDays.length > 2) {
        serviceDays.splice(serviceDays.indexOf(req.body.day), 1);
        res.json(serviceDays);
    } else {
        res.json(400, {msg: 'You must leave 2 days'})
    }
});
app.listen(80);*/
/*----------------------node_server.js end------------------------------*/

/*------------------------service_http.js--------------------------------*/
/*angular.module('myApp', []).
controller('myController', ['$scope', '$http',
    function($scope, $http){
        $scope.days = [];
        $scope.status = '';
        $scope.removeDay = function(deleteDay) {
            console.log(deleteDay);
            $http.post('/remove/day', {day: deleteDay}).
            success(function(data, status, headers, config){
                $scope.days = data;
            }).
            error(function(data, status, headers, config){
                $scope.status = data.msg;
            })
        };
        $scope.resetDays = function() {
            $scope.status = '';
            $http.get('/reset/days').
            success(function(data, status, headers, config){
                $scope.days = data;
            }).
            error(function(data, status, headers, config){
                $scope.days = data;
            })
        }
    }]);*/
/*------------------------service_http.js end-----------------------------*/

/*
 * 1.2 $cacheFactory服务
 *     提供一个非常方便的存储库暂存数据的键值对
 *     在创建服务时，可以指定一个capacity参数表示最大行数量
 *     将数据存入缓存，put 读取 get
 */

/*------------------------service_cache.js-------------------------------*/
/*var app = angular.module('myApp', []);
app.factory('MyCache', function($cacheFactory) {
    return $cacheFactory('myCache', {capacity:5});
});
app.controller('myController', ['$scope', 'MyCache',
    function($scope, cache) {
        cache.put('myValue', 55);
    }]);
app.controller('myController2', ['$scope', 'MyCache',
    function($scope, cache) {
        $scope.value = cache.get('myValue');
        console.log($scope.value);
    }]);*/
/*----------------------service_cache.js end-----------------------------*/

/*
 * 1.3 使用$cookieStore服务与浏览器cookie交互
 *     $cookie -- 利用句点访问法获取和改变字符串的cookie值
 *     $cookieStore -- 提供get() put() remove()来获取设置或删除cookie
 *
 *     使用须知：
 *          1. 需要angular-cookies.min.js
 *          2. 需要在创建Module时添加到依赖列表中
 *              angular.module('myApp', ['ngCookies']);
 *          3. 将$cookie或$cookieStore注入控制器
 *              ['$scope', '$cookieStore', function($scope, cookieStore)]
 */

/*------------------------service_cookies.js-------------------------------*/
/*var app = angular.module('myApp', ['ngCookies']);
app.controller('myController', ['$scope', '$cookieStore',
    function($scope, cookieStore){
        $scope.favCookie = '';
        $scope.myFavCookie = '';
        $scope.setCookie = function() {
            if ($scope.favCookie === 'None') {
                cookieStore.remove('myAppCookie');
            } else {
                cookieStore.put('myAppCookie', {flavor: $scope.favCookie});
            }
            $scope.myFavCookie = cookieStore.get('myAppCookie');
        };
    }]);*/
/*------------------------service_cookies.js end----------------------------*/

/*
 * 1.4 使用$animate服务
 *     $animate服务提供动画检测挂钩，在执行enter,leave,move操作以及addClass, removeClass
 *     操作时，可以使用它们。
 *     两种方式：1.使用CSS类名 2.$animate服务
 *
 *     支持动画的指令：
 *     [使用$animate]
 *     ng-repeat: enter/leave/move
 *     ng-view/ng-include/ng-switch/ng-if: enter/leave
 *     ng-class/ng-show/ng-hide: addClass/removeClass
 *
 *     在CSS中实现动画
 *     需要在要以该方式显示的元素中包含ng-class指令
 *     在播放动画期间自动添加删除的指令
 *     ng-animate | ng-animate-active
 *     shrink-move shrink-move-active
 *     shrink-leave shrink-leave-active
 *     shrink-enter shrink-enter-active
 *     shrink-add shrink-add-active
 *     shrink-remove shrink-remove-active
 *
 *     用法：
 *          1. 需要angular-animate.min.js
 *          2. app = angular.module('myApp', ['ngAnimate'])
 *          3. app.animation(class, function)
 */