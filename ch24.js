/*
 * 1.指令
 *   AngularJS模板标记和用于支持的javascript代码的组合
 *   模板标记：HTML属性，元素名称或者css类
 *   JS代码：定义了数据和HTML元素的行为
 *   分类：
 *       [1] 支持angularJS功能的指令
 *           执行初始化一个应用程序的一切功能
 *           ng-app | ng-cloak | ng-controller | ng-href | ng-include
 *           ng-list | ng-non-bindable | ng-open | ng-pluralize[通过count when配置]
 *           ng-readonly | ng-required | ng-select | ng-src | ng-srcset
 *           ng-transclude | ng-view | script
 *       [2] 扩展表单元素的指令
 *           a | ng-form[实现嵌套表单] | input | input.checkbox[ng-true/false-value] | input.email
 *           input.number[min max] | input.radio[value] | input.text | input.url
 *           select[ng-options] | ng-options | textarea
 *       [3] 把作用域绑定到页面元素的指令
 *           几种方式将数据绑定到视图
 *           值 -- 表单元素的值
 *           HTML -- 表示一个HTML元素的值
 *           属性 -- <a ng-href="/{{hash}}/index.html">{{hash}}</a>
 *           可见性 | 存在性
 *           ng-bind | ng-bind-html | ng-bind-template | ng-class | ng-class-even | ng-class-odd
 *                                      <li ng-repeat="item in items">
 *                                          <span ng-class-even="evenRowClass">{{item}}</span>
 *                                      </li>
 *           ng-disabled | ng-hide | ng-show | ng-if | ng-model[将textarea input select值绑定到作用域]
 *           ng-repeat | ng-init | ng-style | ng-switch | ng-value
 *       [4] 把网页事件绑定到控制器的指令
 *           ng-blur | ng-change | ng-checked | ng-click | ng-copy | ng-cut
 *           ng-dblclick | ng-focus | ng-keydown | ng-keypress | ng-keyup
 *           ng-mousedown | ng-mouseenter | ng-mouseleave | ng-mousemove | ng-mouseover | ng-mouseup
 *           ng-paste | ng-submit | ng-swipe-left | ng-swipe-right
 *           事件对象： $event
 */

/*
angular.module('myApp', []).
controller('myController', function($scope){
    $scope.cameras=[
        {make:'Canon', model:'70D', mp:20.2},
        {make:'Canon', model:'6D', mp:20},
        {make:'Nikon', model:'D7100', mp:24.1},
        {make:'Nikon', model:'D5200', mp:24.1}
    ];
    $scope.cameraObj = $scope.cameras[0];
    $scope.cameraName = 'Cannon';
    $scope.cbValue = '';
    $scope.someText = '';
});*/

/*
 * 2.创建自己的指令
 *   [1] 定义指令视图模板
 *   template属性
 *   可以在模板中指定一个根元素，如果使用transclude标志，则此元素必须包含ng-transclude
 *   directive('myDirective', function() {
 *       return {
 *          transclude: true,
 *          template: '<div ng-transclude></div>'
 *       }
 *   })
 *   templateUrl:指定angularJS模板的URL
 *   -----------------------------------------------------------------------------
 *   [2] 限制指令行为
 *   restrict属性：限制指令如何被应用
 *   A: 应用为一个属性名 E: 元素名 C: 类名
 *   示例：
 *   directive('myDirective', function(){
 *      return {
 *          restrict: 'AE',
 *          templateUrl: '/myDirective.html'
 *      }
 *   })
 *
 *   既实现为一个元素，又实现为一个属性
 *   <my-directive></my-directive>
 *   <div my-directive></div>
 *   -----------------------------------------------------------------------------
 *   [3] 更换模板元素
 *   replace属性
 *   directive('myDirective', function(){
 *      return {
 *          replace: true,
 *          template: '<div>directive</div>'
 *      }
 *   })
 *
 *   <div>
 *       <span my-directive></span>
 *   </div>
 *   编译后
 *   <div>
 *       <div>directive</div>
 *   </div>
 *   -----------------------------------------------------------------------------
 *   [4] 转置外部作用域
 *   transclude属性 true/false 指令的内部组件能否访问指令以外的作用域
 *   示例：
 *   angular.module('myApp', []).
 *   directive('myDirective', function(){
 *      return {
 *          transclude: true.
 *          scope: {},
 *          template: '<div ng-transclude>{{title}}</div>'
 *      };
 *   }).
 *   controller('myController', function($scope){
 *      $scope.title = 'myApplication';
 *   });
 *   -----------------------------------------------------------------------------
 *   [5] 配置指令的作用域
 *   为了使得指令内部的作用域和外部分离，scope属性
 *   隔离的作用域从外部作用域隔离指令作用域，防止指令访问外部作用域，也防止外部作用域的控制器改变指令作用域
 *   使用前缀属性名 -- 使句柄作用域内的变量在该指令的作用域内可用
 *   '@' -- 把局部作用域内的字符串绑定到DOM属性的值中，则可被指令作用域访问
 *   '=' -- 在局部作用域属性和指令作用域属性之间创建双向绑定
 *   '&' -- 把在句柄作用域的函数绑定到指令作用域
 *   -----------------------------------------------------------------------------
 *   [6] 操纵DOM的链接功能
 *   在自定义指令里面修改DOM，使用一个link()函数
 *   link(): function(scope, element, attributes, [controller])
 *   示例：
 *   directive('myDirective', function(){
 *      return {
 *          scope: {title: '='},
 *          require: '^otherDirective',
 *          link: function(scope, elem, attr, otherController){
 *              scope.title = 'new';
 *              elem.append('Linked');
 *              elem.on('destroy', hanlder);
 *              scope.$watch('title', function(newVal){});
 *          }
 *      }
 *   })
 *   ----------------------------------------------------------------------------
 *   [7] 添加一个控制器到指令
 *   controller属性：添加自定义控制器
 *   示例：
 *   directive('myDirective', function(){
 *      return {
 *          scope: {title: '='},
 *          controller: function($scope){
 *              $scope.title='new';
 *              $scope.myFunc = function();
 *          }
 *      }
 *   })
 *   也可以使用require选项，确保控制器对该指令可用
 *   require: '^myController' ---- 指示注入器服务在父上下文查找该控制器
 */
