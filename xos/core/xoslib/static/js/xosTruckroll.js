"use strict";angular.module("xos.truckroll",["ngResource","ngCookies","ui.router","xos.helpers"]).config(["$stateProvider",function(l){l.state("user-list",{url:"/",template:"<truckroll></truckroll>"})}]).config(["$httpProvider",function(l){l.interceptors.push("NoHyperlinks")}]).directive("truckroll",function(){return{restrict:"E",scope:{},bindToController:!0,controllerAs:"vm",templateUrl:"templates/truckroll.tpl.html",controller:["$timeout","$log","Subscribers","Truckroll",function(l,n,t,s){var r=this;t.query().$promise.then(function(l){r.subscribers=l}),this.loader=!1,this.runTest=function(){delete r.truckroll.id,delete r.truckroll.result,delete r.truckroll.is_synced,delete r.truckroll.result_code,delete r.truckroll.backend_status;var l=new s(r.truckroll);r.loader=!0,l.$save().then(function(l){r.waitForTest(l.id)})},this.waitForTest=function(n){s.get({id:n}).$promise.then(function(t){t.backend_status.indexOf("2")>=0||t.result_code&&t.result_code.indexOf("2")>=0||t.is_synced?(r.truckroll=angular.copy(t),r.loader=!1,s["delete"]({id:n})):l(function(){r.waitForTest(n)},2e3)})}}]}}),angular.module("xos.truckroll").run(["$templateCache",function(l){l.put("templates/truckroll.tpl.html",'<div class="row">\n  <div class="col-xs-12">\n    <h2>Virtual Truck Roll</h2>\n    <p>Use this page to run test against your subscriber</p>\n  </div>\n</div>\n<form ng-submit="vm.runTest()">\n  <div class="row">\n    <div class="col-xs-12">\n      <label>Target:</label>\n    </div>\n    <div class="col-xs-12">\n      <select class="form-control" ng-model="vm.truckroll.target_id" ng-options="s.id as s.humanReadableName for s in vm.subscribers"></select>\n    </div>\n  </div>\n  <div class="row">\n    <div class="col-xs-12">\n      <label>Scope:</label>\n    </div>\n    <div class="col-xs-6">\n      <a \n      ng-click="vm.truckroll.scope = \'container\'"\n      ng-class="{\'btn-default\': vm.truckroll.scope !== \'container\', \'btn-primary\': vm.truckroll.scope === \'container\'}"\n      class="btn btn-block"\n      >\n        Container\n      </a>\n    </div>\n    <div class="col-xs-6">\n      <a \n      ng-click="vm.truckroll.scope = \'vm\'"\n      ng-class="{\'btn-default\': vm.truckroll.scope !== \'vm\', \'btn-primary\': vm.truckroll.scope === \'vm\'}"\n      class="btn btn-block"\n      >\n        VM\n      </a>\n    </div>\n  </div>\n  <div class="row">\n    <div class="col-xs-12">\n      <label>Test:</label>\n    </div>\n    <div class="col-xs-4">\n      <a \n      ng-click="vm.truckroll.test = \'ping\'"\n      ng-class="{\'btn-default\': vm.truckroll.test !== \'ping\', \'btn-primary\': vm.truckroll.test === \'ping\'}"\n      class="btn btn-block">Ping</a>\n    </div>\n    <div class="col-xs-4">\n      <a \n      ng-click="vm.truckroll.test = \'traceroute\'"\n      ng-class="{\'btn-default\': vm.truckroll.test !== \'traceroute\', \'btn-primary\': vm.truckroll.test === \'traceroute\'}"\n      class="btn btn-block">Traceroute</a>\n    </div>\n    <div class="col-xs-4">\n      <a \n      ng-click="vm.truckroll.test = \'tcpdump\'"\n      ng-class="{\'btn-default\': vm.truckroll.test !== \'tcpdump\', \'btn-primary\': vm.truckroll.test === \'tcpdump\'}"\n      class="btn btn-block">Tcp Dump</a>\n    </div>\n  </div>\n  <div class="row">\n    <div class="col-xs-12">\n      <label>Argument:</label>\n    </div>\n    <div class="col-xs-12">\n      <input type="text" class="form-control" ng-model="vm.truckroll.argument" required />\n    </div>\n  </div>\n  <div class="row">\n    <div class="col-xs-12" ng-show="!vm.loader">\n      <button class="btn btn-success btn-block">Run test</button>\n    </div>\n  </div>\n</form>\n<div class="row">\n    <div class="col-xs-12 animate-vertical" ng-show="vm.loader">\n      <div class="loader"></div>\n    </div>\n  </div>\n  <div class="row" ng-hide="!vm.truckroll.result_code">\n    <div class="col-xs-12">\n      <label>Result Code</label>\n    </div>\n    <div class="col-xs-12">\n      <pre>{{vm.truckroll.result_code}}</pre>\n    </div>\n  </div>\n  <div class="row" ng-hide="!vm.truckroll.result">\n    <div class="col-xs-12">\n      <label>\n        Result:\n      </label>\n    </div>\n    <div class="col-xs-12">\n      <pre>{{vm.truckroll.result}}</pre>\n    </div>\n  </div>\n  <div class="row" ng-hide="!vm.truckroll.backend_status">\n    <div class="col-xs-12">\n      <label>Backend Status</label>\n    </div>\n    <div class="col-xs-12">\n      <pre>{{vm.truckroll.backend_status}}</pre>\n    </div>\n  </div>'),l.put("templates/users-list.tpl.html",'<xos-table config="vm.tableConfig" data="vm.users"></xos-table>')}]),angular.module("xos.truckroll").run(["$location",function(l){l.path("/")}]);