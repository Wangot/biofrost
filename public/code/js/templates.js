angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("home.html","<h1 class=\"heading -large\">{{ home.title | ExampleFilter }}</h1>\r\n\r\n<h3 class=\"heading -medium\">Here is a fancy number served up courtesy of Angular: <span class=\"number-example\">{{ home.number }}</span></h3>\r\n\r\n<img src=\"images/angular.png\" height=\"100\" example-directive />\r\n<img src=\"images/gulp.png\" height=\"100\" />\r\n<img src=\"images/browserify.png\" height=\"100\" />\r\n");
$templateCache.put("directives/example.html","<div class=\"example-directive\">\r\n  <h1>{{title}}</h1>\r\n</div>\r\n");}]);