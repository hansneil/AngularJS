/*
 * AngularJS模块和依赖注入
 * 依赖：很多服务器端语言的共同概念，但在angularJS出现后才广泛实现
 * 依赖注入：保持整洁有组织的形式，更容易访问其他模块的功能
 */

/*
 * Angular模块：一种容器，起到隔离的作用
 * 本身没功能，但包含其他提供功能的对象的实力，可以通过这些对象构建模块
 * AngularJS建立在模块的原理上，其提供的功能大部分内置在ng的模块中
 */

/*
 * 实现AngularJS模块：配置阶段和运行阶段
 * 1.创建module对象，使用angular.module()方法，创建一个实例，把它注册到注入器服务
 *   返回一个Module对象实例，可以用它实现提供器的功能
 *   angular.module(name, [requires], [configFn]);
 *      -- name: 被注册在注入器服务中的名称
 *      -- requires: 供模块使用的模块名数组
 *      -- configFn 在模块配置阶段调用的函数
 *   示例：
 *      var myModule = angular.module('myModule', ['$window', '$http'], function(){
 *          $provide.value('myValue', 'Some Value')
 *      })
 *      依赖$window和$http服务，还定义一个配置函数，增加了一个名为value的值提供器
 *      -----------------------------------------------------------------
 *      如果不指定requires参数，就不会创建module对象，而是返回实例
 *      var myModule2 = angular.module('myModule', [])------------覆盖定义，因为定义了requires
 *      var myModule3 = angular.module('myModule')----------------返回上面创建的实例
 *
 *  2.使用配置块，进入配置阶段，[[任何提供器都被注册到依赖注入器]]
 *    config(function([injectable, ...]));--应该仅把配置和提供器放置在配置块中
 *    var myModule = angular.module('myModule', []).
 *      config(function($provide, $filterProvider){
 *          $provide.value('startTime', new Date());---------------------- 将值提供器，过滤器提供器
 *          $filterProvider.register('myFilter', function(){})------------ 注册到注入器服务
 *      })
 *    --------------------------------------------------------注册提供器到注入器服务
 *
 *  3.使用运行块，进入运行阶段，可以实现实例化模块所需的任何代码
 *    这里不能实现任何提供器代码，因为模块已经配置完成并注册到依赖注入器中
 *    run(function([injectable, ...]))
 *    injectable参数只应该是注册器的实例[因为已经注册完成，无法实现提供器代码]
 *    例如： myModule.run(function(startTime){
 *              startTime.setTime(...)
 *          })
 *
 *  4.把提供器添加到AngularJS模块 [代替config()来使用]
 *    Module提供辅助的方法，用提供器替代config()方法
 *    两种类型的提供器对象添加到模块中：
 *    1.专门的AngularJS对象提供器
 *      animation(name, animationFactory)
 *      controller(name, controllerFactory)
 *      filter(name, filterFactory)
 *      directive(name, directiveFactory)
 *      -------------------------------------因为这些提供器方法，在angularJS中有相应的animation等对象定义
 *
 *    2.服务提供器：作为一个服务来提供功能
 *      value(name, object) object被分配给name 在注入器中name和object有直接关系
 *      constant(name, object) 与value类似，但在应用其他提供器之前先应用该提供器
 *      factory(name, factoryFunc)构建一个将通过注入器来提供的对象
 *      service(name, serviceFactory) | provider(name, serviceFactory)
 */

/*
 * 实现依赖注入
 * 一旦定义了一个模块和相应的提供器，就可以将该模块作为其他模块，控制器或者angularJS对象的依赖
 * 如果对象依赖于提供器，需要设置$inject属性值
 * 但这个方式过于笨拙，angularJS提供了更优雅的方式来注入依赖
 * [providerA, providerB, ......, function(providerA, providerB, ...)]
 */

/*
var myMode = angular.module('myMod', []);
myMod.value('modMsg', 'Hello from  my module');
myMod.controller('controllerB', ['$scope', 'modMsg',
    function($scope, modMsg){
        $scope.message = modMsg;
    }]);
var myApp = angular.module('myApp', ['myMod']);
myApp.value('appMsg', 'Hello from my app');
myApp.controller('controllerA', ['$scope', 'appMsg',
    function($scope, appMsg){
        $scope.message = appMsg;
    }]);*/
var express = require('express'),
    app = express();
app.use('/', express.static("./static")).
use('/images', express.static("./images")).
use('/lib', express.static('./lib'));
app.listen(80);