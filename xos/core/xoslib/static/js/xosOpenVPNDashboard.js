"use strict";angular.module("xos.openVPNDashboard",["ngResource","ngCookies","ngLodash","ui.router","xos.helpers"]).config(["$stateProvider",function(n){n.state("openVPNList",{url:"/",template:"<vpn-list></vpn-list>"})}]).config(["$compileProvider",function(n){n.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/)}]).service("Vpn",["$http","$q",function(n,e){this.getOpenVpnTenants=function(){var t=e.defer();return n.get("/xoslib/openvpntenant/").then(function(n){t.resolve(n.data)})["catch"](function(n){t.reject(n)}),t.promise}}]).config(["$httpProvider",function(n){n.interceptors.push("NoHyperlinks")}]).directive("vpnList",function(){return{restrict:"E",scope:{},bindToController:!0,controllerAs:"vm",templateUrl:"templates/openvpn-list.tpl.html",controller:["Vpn",function(n){var e=this;n.getOpenVpnTenants().then(function(n){e.vpns=n;for(var t=0;t<e.vpns.length;t++){var i=new Blob([e.vpns[t].script_text],{type:"text/plain"});e.vpns[t].script_text=(window.URL||window.webkitURL).createObjectURL(i)}})["catch"](function(n){throw new Error(n)})}]}}),angular.module("xos.openVPNDashboard").run(["$templateCache",function(n){n.put("templates/openvpn-list.tpl.html",'<div style="display: table;">\n  <div class="vpn-row">\n    <h1 class="vpn-cell">VPN List</h1>\n  </div>\n  <div class="vpn-row">\n    <div class="vpn-cell vpn-header">ID</div>\n    <div class="vpn-cell vpn-header">VPN Network</div>\n    <div class="vpn-cell vpn-header">VPN Subnet</div>\n    <div class="vpn-cell vpn-header">Script Link</div>\n  </div>\n  <div class="vpn-row" ng-repeat="vpn in vm.vpns">\n    <div class="vpn-cell">{{ vpn.id }}</div>\n    <div class="vpn-cell">{{ vpn.server_network }}</div>\n    <div class="vpn-cell">{{ vpn.vpn_subnet }}</div>\n    <div class="vpn-cell">\n      <a download="connect-{{ vpn.id }}.vpn" ng-href="{{ vpn.script_text }}">Script</a>\n    </div>\n  </div>\n</div>\n')}]),angular.module("xos.openVPNDashboard").run(["$location",function(n){n.path("/")}]),angular.bootstrap(angular.element("#xosOpenVPNDashboard"),["xos.openVPNDashboard"]);