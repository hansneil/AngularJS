/*
 * 创建视图
 * 表达式、过滤器和指令
 */

/*
 * 1.模板：基于HTML文件，但3个附加组件扩展了HTML的功能
 *   表达式：类似javascript的代码段，可在作用域上下文求值
 *          可放置在文本或者属性的值中 {{expression}}表示
 *   过滤器：过滤器变换“被放置在网页上的数据”的外观
 *   指令：新的HTML元素的名称
 *        HTML中元素属性的名称
 *        ----添加和修改HTML元素的行为来为AngularJS应用程序提供[数据绑定 | 事件处理 | 其他支持]
 *   --------------------------------------------------------------
 *   示例：<div>
 *          <input ng-model="msg">-----------------指令
 *          {{msg | uppercase}}-------------------表达式 + 过滤器
 *        </div>
 */

/*
 * 2.表达式
 *   表示来自作用域数据最简单的方法，angularJS把该表达式编译成HTML元素
 *   表达式是绑定到数据模型的
 *      好处：表达式可以使用作用域定义的属性名称和函数
 *           表达式绑定到作用域内，相互更新
 *      与javascript不同之处：
 *           [1] 属性求值：属性名针对作用域模型求值，而不是全局js命名空间
 *           [2] 更宽容：表达式遇到未定义或空变量类型不抛出异常
 *           [3] 无流控制： 不允许条件语句或循环
 *   ----------------------------------------------------------------、
 *   注意：将“定义指令值的字符串”视为表达式
 *        由于angularJS模板表达式可以访问作用域，因此可以对作用域进行更改
 *        <span ng-click='msg="clicked"'></span>
 */

/*
angular.module('myApp', []).
controller('myController', function($scope){
    $scope.first = 'Thorin';
    $scope.last = 'Oakenshield';
    $scope.newFirst = 'Gandalf';
    $scope.newLast = 'Greyhame';
    $scope.combine = function(fName, lName){
        return fName + ' ' + lName;
    };
    $scope.setName = function(fName, lName){
        $scope.first = fName;
        $scope.last = lName;
    };
});*/

/*
 * 3.过滤器
 *   一种提供器，挂接到表达式解析器并修改表达式的结果
 *   {{expression | filter}} -----------------------实现过滤器
 *   {{expression | filter | filter}}---------------多个过滤器链接在一起
 *   {{expression | filter:parameter1:parameter2}}--以参数形式为过滤器提供参数
 *
 *   通过依赖注入添加过滤器：过滤器提供器的名称是过滤器名称+Filter
 *   内置过滤器：格式化字符串、对象和数组
 *   currency | filter:exp:compare | json | limitTo:limit | lowercase | uppercase
 *   number[:fraction] | orderBy:exp:reverse | date[:format]
 */

/*
angular.module('myApp', []).
controller('myController', function($scope){
    $scope.JSONObj = {title: 'myTitle'};
    $scope.word = 'Supercalifragilisticexpialidocious';
    $scope.days=['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
});
*/

/*
 * 4.过滤器实现排序和过滤
 *   从数组利用ng-repeat指令建立的动态元素进行排序或者过滤
 */

/*
 * 5.自定义过滤器
 *   AngularJS提供了filter()方法创建一个过滤器提供器，并注册到依赖注入的服务器中
 *   filter('myFilter', function(){
 *      return function(input, param1, param2){
 *          return << modified input >>;
 *      }
 *   })
 */