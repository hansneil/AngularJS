/*
 * AngularJS应用程序最重要的方面之一：作用域
 * 功能：1.提供一个模型中表示的数据
 *      2.绑定应用程序的组件[模块，控制器，服务和模板]
 *      3.提供了绑定机制，当模型中数据变化时，DOM元素和其他代码也相应更新
 */

/*
 * 1.作用域：充当数据模型
 * ------------------------------------------------------------------
 * 1.1 根作用域和应用程序之间的关系
 *     根作用域  创建时间 -- 程序启动就创建了，将数据存储在应用层
 *              数据定义 -- 在run()运行阶段对数据初始化，可以通过$rootScope访问，也可以在模块组件中访问
 *              示例：
 *                  angular.module('myApp', [])
 *                  .run(function($rootScope) {
 *                      $rootScope.rootValue = 5;
 *                  })
 *                  .controller('myController', function($scope, $rootScope){
 *                      $scope.value = 10;
 *                      return $rootScope.rootValue - $scope.value;
 *                  })
 *
 * 1.2 作用域和控制器之间的关系
 *     控制器：通过Module对象上的controller()方法创建
 *            此时控制器被注册为模块中的提供器，但并没有创建该控制器的实例
 *            实例创建 -- 在ng-controller指令链接到AngularJS模板中时
 *            controller() -- 第一个参数：控制器名称
 *                            第二个参数：依赖数组
 *            示例：
 *                angular.module('myApp', []).
 *                value('start', 200).
 *                controller('Counter', ['$scope', 'start', function($scope, start){
 *                      ...
 *                }])
 *            当ng-controller链接时，特定于该控制器的新子作用域也被创建并通过上述注入的$scope服务来访问
 *            控制器的职责：初始化被创建并被添加到它作用域的状态
 *                        负责连接到该作用域内的任何业务逻辑
 *                        [对作用域的更新更改，操作作用域值，发出基于作用域状态的事件]
 */

/*
angular.module('myApp', []).$1
    value('start', 200).$1
    controller('Counter', ['$scope', 'start',
    function($scope, start){
        $scope.start = start;
        $scope.current = start;
        $scope.difference = 0;
        $scope.change = 1;
        /!*------------------------------业务逻辑-----------------------------*!/
        $scope.inc = function() {
            $scope.current += $scope.change;
            $scope.calcDiff();
        };
        $scope.dec = function() {
            $scope.current -= $scope.change;
            $scope.calcDiff();
        };
        $scope.calcDiff = function() {
            $scope.difference = $scope.current - $scope.start;
        };
        /!*--------------------------------------------------------------*!/
    }]);*/

/*
 * 1.3 作用域和模板之间的关系
 *     HTML元素使用ng-controller属性被定义为控制器
 *     在控制器的HTML元素及其子元素内部，该控制器的作用域可用于表达式和其他angularJS的功能
 *
 *     method 1：
 *       作用域中的值通过ng-model指令直接链接到<input><select><textarea>元素的值
 *       ng-model指令将元素的值链接到作用域的属性名中，当用户输入改变时，作用域的值自动更新
 *     method 2:
 *       使用{{expression}}来把作用域中的属性，函数添加到表达式中
 *       括号内的代码被求值，结果呈现在视图中
 *     method 3：
 *       在定义模板的angularJS指令时使用作用域属性和函数
 */

/*
angular.module('myApp', []).
controller('SimpleTemplate', function($scope) {
    $scope.valueA = 5;
    $scope.valueB = 7;
    $scope.valueC = 12;
    $scope.addValues = function(v1, v2) {
        var v = angular.$rootScope;
        $scope.valueC = Number(v1) + Number(v2);
    };
});
*/

/*
 * 1.4 作用域和后端服务器数据之间的关系
 *     几个规则：
 *            经由AngularJS服务来访问来自数据库或其他后端资源的数据
 *            确保从服务器读出的数据对作用域进行更新，再更新视图 [避免直接更新]
 *            把对数据库所做的更改反映到作用域 [可以双向更新]
 *
 * 1.5 作用域的生命周期
 *     帮助了解作用域和其他AngularJS组件的相互作用
 *     阶段：创建
 *              -- 根作用域：在应用程序启动时创建
 *              -- 子作用域：在ng-controller或ng-repeat指令时创建
 *              创建了一个digest循环，与浏览器事件循环互动
 *              负责将模型的更改反映到DOM，并且执行已经注册的件事函数
 *              $scope.$digest()，人为启动
 *          ---------------------------------------------------------------------
 *          监视器注册
 *              -- 为在模板中表示作用域的值注册监视器，用于自动将更改传播到DOM元素
 *              -- 利用$watch()在作用域上注册自己的监视函数，第一个参数"作用域属性名称"，第二个参数"回调函数"
 *              示例：
 *                  $scope.watchedItem = 'myItem';
 *                  $scope.counter = 0;
 *                  $scope.watch('name', function(newValue, oldValue){
 *                      ...
 *                  })
 *          ---------------------------------------------------------------------
 *          模型变化
 *              -- 发生在作用域的数据变化时，$apply()函数会更新模型，再通过$digest()函数更新DOM和监视器
 *          ---------------------------------------------------------------------
 *          变化观察
 *              -- 当$digest()执行时，会对所有用于更改的监视器求值，如果发生变化，则通过$watch监听器更新DOM
 *          ---------------------------------------------------------------------
 *          作用域销毁
 *              -- $destroy()从浏览器内存中删除作用域 停止$digest()调用并删除监视器
 */

/*
 * 2. 实现作用域层次结构
 *    基于ng-controller语句的位置自动创建的
 *    可以通过子作用域访问父作用域，但不能访问子作用域或兄弟作用域
 */

/*
 * 3. 发出和广播事件
 *    发出事件：$emit()方法，该方法沿着父作用域层次向下发送一个事件
 *         scope.$emit(name, [args, ...])
 *         args是传递给事件处理函数的多个参数
 *    广播事件：$broadcast()方法，把事件广播给下方的子作用域层次
 *         scope.$broadcast(name, [args, ...])
 *    处理发出和广播的事件，使用$on()方法
 *         scope.$on(name, listener)
 *         function listener(event, [args, ...]) {
 *              event.targetScope -- 发出或广播事件发出的作用域
 *              event.currentScope -- 当前正在处理该事件的作用域
 *              event.name -- 事件的名称
 *              event.stopPropagation() | preventDefault()
 *              event.defaultPrevented
 *         }
 */