/*
 * AngularJS
 * 建立在JQuery的一个轻量级版本上的JavaScript库
 * AngularJS提供JavaScript和JQuery的最好功能，并强制实施结构化的模型-视图-控制器框架[MVC]
 *
 * 对Node.js来说，AngularJS时一个完美的客户端库
 * 模型：使用javascript的对象
 *
 * 作为一个MVC框架，将业务逻辑代码[C] 与 视图模型 分离
 * 选择AngularJS的原因：
 *    1.AngularJS框架[em]强制正确实现MVC[/em]，并且很容易实现
 *    2.AngularJS HTML模板的[em]声明风格[/em]，使得[HTML的意图更直观][HTML更容易维护]
 *    3.AngularJS的[em]模型部分是基本的Javascript对象[/em]，很容易操作、访问和执行
 *    4.AngularJS使用声明的方式，通过将[em]HTML的声明与其背后的javascript功能直接联系来扩展HTML的功能[/em]
 *    5.AngularJS提供了非常灵活和简单的[em]过滤器接口[/em]，使得当数据从模型传递到视图时可以轻松格式化数据
 *    6.AngularJS应用程序倾向于使用传统javascript程序所使用代码的一小部分。
 *    7.AngularJS比传统的方法所需的文档对象[DOM]模型操作少了很多，并指导你把操作放在应用程序中正确的位置
 *    8.AngularJS提供一些内置服务，并能够用结构化和可重用的方式实现自己的服务
 *    9.AngularJS框架中清晰地把职责分离，使得调试更加容易
 */

/*
 * 1.AngularJS组件
 *      1.1 模块
 *      代表一个应用程序组件，提供了命名空间[可基于模型的名称来引用指令、范围和其他组件]
 *
 *      1.2 作用域和数据模型
 *      引入作用域(scope)的概念：用来在视图上填充数据的一个javascript表示，特点[普通的javascript对象]
 *
 *      1.3 具有模板和指令的视图
 *      指令：[1]要被添加到一个[[[HTML模板]]]的额外属性、元素和CSS类
 *           [2]扩展了DOM一般行为的javascript代码
 *           优点：HTML模板通过指令指出了预期的逻辑
 *                内置的angularJS指令实现了大多数必要的DOM操作
 *                利用这些指令可以实现将作用域中的数据绑定到视图中
 *                [还可以创建自己的angularJS指令：实现必要的自定义功能]
 *      1.4 表达式
 *      实现在HTML模板中添加表达式的能力，AngularJS对其求值，再把结果添加到网页，表达式链接到作用域，获得相应的值
 *      当模式改变时，表达式的值也会改变
 *
 *      1.5 控制器
 *      AngularJS通过控制器完成MVC框架
 *      控制器 -- 建立初始值或状态的作用域 -- 为作用域添加行为扩大了作用域
 *      可以通过指令将控制器添加到HTML元素中，然后在后台把他们实现为javascript代码
 *
 *      1.6 数据绑定
 *      AngularJS最好的特性之一：内置的数据绑定
 *      数据绑定：将模型的数据与网页显示的内容链接的过程，AngularJS提供了一个非常整洁的接口实现这一特性
 *      在AngularJS中，数据绑定是一个双向过程，当网页上的数据改变时模型被更新，在数据在模型中被改变时网页也自动更新
 *      [这个方式实现一个宗旨：模型始终是向用户呈现数据的唯一来源，视图只是模型的一个投影]
 *
 *      1.7 服务
 *      AngularJS环境中的工作主力，是为Web应用程序提供功能的单例对象??
 *      [web应用程序的一个共同任务：执行对web服务器的ajax请求：
 *          angularJS提供http服务，包含用来访问web服务器的所有功能]
 *
 *      服务功能：与上下文或状态是完全独立的，很容易被一个应用程序的组件使用
 *              很多内置的服务组件用于基本的用途[HTTP请求/日志记录/分析/动画]
 *
 *      1.8 依赖注入
 *      一个代码组建定义了对其他组件的依赖关系，常见用法：使用服务
 *      [需要通过HTTP请求访问Web服务器的模块，就可以把http服务注入该模块，这样模块中的代码可以使用http功能]
 *
 *      1.9 职责分离
 *      最重要的原则：职责分离，angularJS提供一个非常结构化的框架
 *      实现时需要遵循的规则：
 *          视图作为应用程序的[正是表示结构] -- 任何表示逻辑作为视图中的模板指令
 *          DOM操作 -- 必须在内置指令或自定义指令的js代码中进行
 *          可重复的任务 -- 实现为服务，通过依赖注入添加到模块
 *          作用域是对应视图的唯一来源，反映模型的当前状态
 *          控制器 -- 确保只充实作用域数据的作用，没有任何业务逻辑
 *          在模块的命名空间中定义控制器 -- 不全局定义，确保容易被包装
 */

/*
 * 2.AngularJS生命周期
 *   引导阶段 -- 编译阶段 -- 运行阶段
 *   引导阶段：在AngularJS JavaScript库被下载到浏览器时发生
 *           1.AngularJS初始化自身的必要组件，初始化ng-app指令指向模块
 *           2.模块被加载，任何依赖关系都被注入模板
 *   编译阶段：静态的DOM被替换成一个表示angularJS视图的动态DOM
 *           1.遍历所有的DOM并收集所有的指令，将指令链接到angular内置库或者自定义指令代码中相应的js功能上
 *           2.指令与作用域相结合，产生动态或者实时的视图
 *   运行时数据绑定阶段：一直存在，直到用户重新加载或者离开网页
 *                    1.在作用域中的任何更改都反映在视图中，在视图中的任何更改也更新到作用域
 *                    2.angularJS只编译DOM以此，根据需要链接已编译的模板
 */

/*
 * 3.将AngularJS与现有的javascript和jquery整合
 *   具体步骤: [1] 至少从头编写一个使用模式、自定义HTML指令、服务和控制器的angularJS应用程序
 *            [2] 确定原本代码的模型部分 | 将模型中增加数据的代码放入控制器函数中
 *                                      将访问后端模型数据的代码放入服务中
 *            [3] 确定操作视图的DOM元素的代码 | 将DOM操作代码放入自定义指令组件中并提供一个HTML指令
 *            [4] 确定其他基于任务的函数 | 放入服务
 *            [5] 把指令和控制器隔离到模块中
 *            [6] 使用依赖注入把服务和模块连接起来
 *            [7] 更新HTML模板以使用新的指令
 */

/*
 * 4.将AngularJS添加到Node.js环境中
 *   在Node.js环境中实现AngularJS：
 *   <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js">
 *   </script>
 */

/*
 * 5.在HTML文档中引导AngularJS
 *   引导分为两个部分: [1] 通过ng-app指令来定义应用程序模块
 *                   [2] 加载在<script>标签中的angular.js库
 *   ng-app告诉angularJS编译器把该元素作为编译的根
 *   将angular.js作为左后一个标签来包括
 */

/*
 * 6.使用全局API
 *   定期执行的常规任务：比较对象，深拷贝，遍历对象，转换JSON数据
 *   当angular.js被加载时，全局api都可用了，可通过angular对象访问
 *   例如：深拷贝， myCopy = angular.copy(myObj);
 */

/*
 * 7.创建基本的AngularJS应用程序
 *   实现 HTML模板 | AngularJS模块 | 控制器 | 作用域 | 表达式
 *   第一步：实现一个基本的Node.js Web服务器
 */

/*---------------------------node_server.js----------------------------*/
var express = require('express'),
    app = express();
app.use('/', express.static("./static")).
    use('/images', express.static("./images")).
    use('/lib', express.static('./lib'));
app.listen(80);
/*---------------------------node_server.js end------------------------*/

/*
 * 第二步：实现一个AngularJS HTML模板 以及 一个AngularJS Javascript模块
 *       理解实现模板、模块、控制器和作用域的过程，以及如何彼此交互
 *       [1] 加载AngularJS库和主模块
 *       <script src="http://code.angularjs.org/1.2.9/angular.min.js"><script>
 *       <script src="/js/first.js"><script>
 *
 *       [2] 定义AngularJS应用程序根元素
 *       a.在根元素中定义ng-app参数，让angularJS知道从哪开始编译
 *       b.在js代码中定义模块来提供增加控制器、过滤器和服务时的命名空间
 *       HTML模板： <html ng-app="firstApp">
 *       JS代码中：var firstApp = angular.module('firstApp', []);
 *
 *       [3] 将控制器添加到模板
 *       添加控制HTML元素的控制器 a.在元素中分配控制器 b.将视图中的元素映射到一个特定的控制器，它包含一个作用域
 *       <div ng-controller="FirstController">
 *       在js模块中，firstApp.controller('FirstController', function($scope){})
 *
 *       [4] 实现作用域模型
 *       将HTML元素链接到作用域变量，在作用域中初始化变量，并提供功能来处理对作用域值得更改
 */