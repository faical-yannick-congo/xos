!function(){"use strict";function e(e,n,o){e.interceptors.push("SetCSRFToken"),n.startSymbol("{$"),n.endSymbol("$}"),o.defaults.stripTrailingSlashes=!1}e.$inject=["$httpProvider","$interpolateProvider","$resourceProvider"],angular.module("bugSnag",[]).factory("$exceptionHandler",function(){return function(e,n){window.Bugsnag?Bugsnag.notifyException(e,{diagnostics:{cause:n}}):console.error(e,n,e.stack)}}),angular.module("xos.helpers",["ngCookies","xos.xos","xos.hpcapi","xos.xoslib","bugSnag"]).config(e)}(),function(){"use strict";function e(){return{request:function(e){return-1===e.url.indexOf(".html")&&(e.url+="?no_hyperlinks=1"),e}}}angular.module("xos.helpers").factory("NoHyperlinks",e)}(),function(){"use strict";function e(e){return{request:function(n){return"GET"!==n.method&&(n.headers["X-CSRFToken"]=e.get("xoscsrftoken")),n}}}e.$inject=["$cookies"],angular.module("xos.helpers").factory("SetCSRFToken",e)}(),function(){"use strict";function e(e){return r||(r=new e({domain:""})),r}function n(e){return t||(t=new e({domain:""})),t}function o(e){return i||(i=new e({domain:""})),i}e.$inject=["xos"],n.$inject=["xoslib"],o.$inject=["hpcapi"],angular.module("xos.helpers").service("XosApi",e).service("XoslibApi",n).service("HpcApi",o);var r,t,i}();