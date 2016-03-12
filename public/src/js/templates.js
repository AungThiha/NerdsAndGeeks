angular.module('sampleApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('public/views/EditNerdItem.html',
    "<div class=\"row form-container\">\n" +
    "	<h4 style=\"color: #999;\">Edit {{nerd.name}}</h4>\n" +
    "	\n" +
    "	<form name=\"EditNerdForm\" ng-submit=\"EditNerdForm.$valid && editNerd()\" novalidate>\n" +
    "	\n" +
    "		<fieldset class=\"form-group\">\n" +
    "			<input id=\"nerd-name\" type=\"text\" class=\"form-control\" placeholder=\"Name\" title=\"Name\" ng-model=\"nerd.editted.name\" required />\n" +
    "		</fieldset>\n" +
    "		<fieldset class=\"form-group\">\n" +
    "		<input type=\"number\" class=\"form-control\" placeholder=\"Age\" title=\"Age\" ng-model=\"nerd.editted.age\" required />\n" +
    "		</fieldset>\n" +
    "		<fieldset class=\"form-group\">\n" +
    "			<textarea class=\"form-control\" placeholder=\"Address\" title=\"Address\" ng-model=\"nerd.editted.address\"></textarea>\n" +
    "		</fieldset>\n" +
    "\n" +
    "		<fieldset class=\"form-group\">\n" +
    "			<textarea class=\"form-control\" placeholder=\"Biography\" title=\"Biography\" ng-model=\"nerd.editted.bio\"></textarea>\n" +
    "		</fieldset>\n" +
    "		<fieldset class=\"form-group pull-right\" style=\"padding-right: 12px\">\n" +
    "			<input class=\"btn btn-primary\" value=\"Save\" type=\"submit\" style=\"margin-right: 12px\" />\n" +
    "			<a href=\"#\" ng-click=\"cancelForm()\">Cancel</a>\n" +
    "		</fieldset>\n" +
    "	\n" +
    "		<!-- <div>reviewForm is {{reviewForm.$valid}}</div> -->\n" +
    "	</form>\n" +
    "	\n" +
    "</div>"
  );


  $templateCache.put('public/views/NerdItem.html',
    "<h1 style=\"padding-bottom: 0; margin-bottom: 0;\">{{nerd.name}}</h1>\n" +
    "<div class=\"pull-right\">\n" +
    "	<a href=\"#\" ng-click=\"editMode()\">Edit</a>\n" +
    "	<a href=\"#\" ng-click=\"delete(nerd)\">Delete</a>\n" +
    "</div>\n" +
    "<small style=\"padding-top: 0; margin-top: 0\"><strong>created at: </strong>{{ nerd.createdAt | date:' HH:mma MMM d, yyyy'}}</small>\n" +
    "<p><strong>age: </strong>{{nerd.age}}</p>\n" +
    "<section ng-controller=\"PanelController as panelCtrl\">\n" +
    "<ul class=\"nav nav-pills\">\n" +
    "	<li ng-class=\"{active:panelCtrl.isSelected(1)}\"><a href ng-click=\"panelCtrl.selectTab(1)\">Address</a></li>\n" +
    "	<li ng-class=\"{active:panelCtrl.isSelected(2)}\"><a href ng-click=\"panelCtrl.selectTab(2)\">Biography</a></li>\n" +
    "</ul>\n" +
    "<p ng-show=\"panelCtrl.isSelected(1)\">{{nerd.address}}</p>\n" +
    "<p ng-show=\"panelCtrl.isSelected(2)\">{{nerd.bio}}</p>\n" +
    "</section>"
  );


  $templateCache.put('public/views/deleteConfirmationModal.html',
    "<!-- Modal -->\n" +
    "<div class=\"modal-header\">\n" +
    "  <button ng-click=\"cancel()\" type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
    "  <h4 class=\"modal-title\" id=\"myModalLabel\">Delete Nerd</h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  Are you sure you want to delete {{ name }}?\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-default\" ng-click=\"cancel()\">Cancel</button>\n" +
    "  <button type=\"button\" class=\"btn btn-primary\" ng-click=\"ok()\">Delete Nerd</button>\n" +
    "</div>\n"
  );


  $templateCache.put('public/views/geek.html',
    ""
  );


  $templateCache.put('public/views/home.html',
    "<!-- public/views/home.html -->\n" +
    "\n" +
    "<div class=\"jumbotron text-center\">\n" +
    "    <h1>Home Page 4 Life</h1>\n" +
    "\n" +
    "    <p>{{ tagline }}</p>\n" +
    "</div>"
  );


  $templateCache.put('public/views/nerd.html',
    "<!-- public/views/nerd.html -->\n" +
    "\n" +
    "<div class=\"jumbotron text-center\">\n" +
    "    <h1>Nerds and Proud</h1>\n" +
    "\n" +
    "    <p>{{ tagline }}</p>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"container list\">\n" +
    "\n" +
    "<div class=\"row new-container form-container\">\n" +
    "	<div class=\"col-md-3\">\n" +
    "		<h4 style=\"color: #999;\">Add new nerd</h4>\n" +
    "	</div>\n" +
    "	<div class=\"col-md-9\">\n" +
    "		<form name=\"nerdForm\" ng-submit=\"nerdForm.$valid && addNerd(nerd)\" novalidate>\n" +
    "	\n" +
    "		<fieldset class=\"form-group\">\n" +
    "			<input id=\"nerd-name\" type=\"text\" class=\"form-control\" placeholder=\"Name\" title=\"Name\" ng-model=\"nerd.name\" ng-click=\"slideDown()\" required />\n" +
    "		</fieldset>\n" +
    "\n" +
    "		<div class=\"slideToggle\" style=\"display: none;\">\n" +
    "			<fieldset class=\"form-group\">\n" +
    "			<input type=\"number\" class=\"form-control\" placeholder=\"Age\" title=\"Age\" ng-model=\"nerd.age\" required />\n" +
    "			</fieldset>\n" +
    "			<fieldset class=\"form-group\">\n" +
    "				<textarea class=\"form-control\" placeholder=\"Address\" title=\"Address\" ng-model=\"nerd.address\"></textarea>\n" +
    "			</fieldset>\n" +
    "\n" +
    "			<fieldset class=\"form-group\">\n" +
    "				<textarea class=\"form-control\" placeholder=\"Biography\" title=\"Biography\" ng-model=\"nerd.bio\"></textarea>\n" +
    "			</fieldset>\n" +
    "			<fieldset class=\"form-group pull-right\" style=\"padding-right: 12px\">\n" +
    "				<input class=\"btn btn-primary\" value=\"Submit\" type=\"submit\" style=\"margin-right: 12px\" />\n" +
    "				<a href=\"#\" ng-model=\"nerd\" ng-click=\"cancelForm(this)\">Cancel</a>\n" +
    "			</fieldset>\n" +
    "		</div>\n" +
    "		<!-- <div>reviewForm is {{reviewForm.$valid}}</div> -->\n" +
    "	</form>\n" +
    "	</div>\n" +
    "</div>\n" +
    "\n" +
    "<ul class=\"list-group\">\n" +
    "  <li class=\"list-group-item\" ng-repeat=\"nerd in nerds\">\n" +
    "  	<nerd-item></nerd-item>\n" +
    "  </li>\n" +
    "</ul>\n" +
    "	\n" +
    "</div>\n" +
    "\n"
  );

}]);
