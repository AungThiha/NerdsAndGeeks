angular.module('sampleApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('public/views/EditNerdItem.html',
    "<div class=\"row form-container\">\n" +
    "	<h4 style=\"color: #999;\">Edit {{nerd.name}}</h4>\n" +
    "\n" +
    "    <ul class=\"photo\">\n" +
    "        <li class=\"photo add\" ngf-select=\"uploadPhotos($files)\" multiple=\"multiple\"><p><i class=\"fa fa-plus\"></i></p></li>\n" +
    "        <li ng-repeat=\"photo in nerd.editted.photos\" class=\"photo\">\n" +
    "            <img src=\"{{photo}}\" alt=\"\">\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "\n" +
    "    <ul class=\"progress-list\">\n" +
    "    </ul>\n" +
    "	\n" +
    "	<form name=\"EditNerdForm\" ng-submit=\"EditNerdForm.$valid && editNerd()\" novalidate>\n" +
    "\n" +
    "	\n" +
    "		<fieldset class=\"form-group\">\n" +
    "			<input id=\"nerd-name\" type=\"text\" class=\"form-control\" placeholder=\"Name\" title=\"Name\" ng-model=\"nerd.editted.name\" required />\n" +
    "		</fieldset>\n" +
    "		<fieldset class=\"form-group\">\n" +
    "		<input type=\"number\" class=\"form-control\" placeholder=\"Age\" title=\"Age\" ng-model=\"nerd.editted.age\" required />\n" +
    "		</fieldset>\n" +
    "		<fieldset class=\"form-group\">\n" +
    "			<textarea class=\"form-control\" placeholder=\"About\" title=\"About\" ng-model=\"nerd.editted.bio\"></textarea>\n" +
    "		</fieldset>\n" +
    "		<fieldset class=\"form-group\">\n" +
    "			<textarea class=\"form-control\" placeholder=\"Address\" title=\"Address\" ng-model=\"nerd.editted.address\"></textarea>\n" +
    "		</fieldset>\n" +
    "\n" +
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
    "\n" +
    "<ul class=\"photo\" ng-show=\"nerd.photos.length\">\n" +
    "	<li ng-repeat=\"photo in nerd.photos\" class=\"photo\">\n" +
    "		<img src=\"{{photo}}\" alt=\"\">\n" +
    "	</li>\n" +
    "</ul>\n" +
    "\n" +
    "<p><strong>age: </strong>{{nerd.age}}</p>\n" +
    "<section ng-controller=\"PanelController as panelCtrl\">\n" +
    "<ul class=\"nav nav-pills\">\n" +
    "	<li ng-class=\"{active:panelCtrl.isSelected(1)}\"><a href ng-click=\"panelCtrl.selectTab(1)\">About</a></li>\n" +
    "	<li ng-class=\"{active:panelCtrl.isSelected(2)}\"><a href ng-click=\"panelCtrl.selectTab(2)\">Address</a></li>\n" +
    "</ul>\n" +
    "	<p ng-show=\"panelCtrl.isSelected(1)\">{{nerd.bio}}</p>\n" +
    "<p ng-show=\"panelCtrl.isSelected(2)\">{{nerd.address}}</p>\n" +
    "\n" +
    "</section>"
  );


  $templateCache.put('public/views/about.html',
    "\n" +
    "<div class=\"jumbotron text-center\">\n" +
    "    <h1>Aung Thiha</h1>\n" +
    "\n" +
    "    <p>A brief description about me</p>\n" +
    "</div>\n" +
    "\n" +
    "<h3>Work Experience</h3>\n" +
    "<p>I've been freelancing as an android developer for one and a half year before I worked at <a href=\"https://www.unikupid.com/\">Unikupid</a> for 6 months.</p>\n" +
    "\n" +
    "<h3>Education</h3>\n" +
    "<p> I've got a Full Stack Web Developer Nanodegree from Udacity, Diploma in Computer Studies from NCC education and a few other certificates</p>\n" +
    "\n" +
    "<h3>Skills</h3>\n" +
    "<p>Skills I have used for work are Java, C#, Windows Batch, Shell Script, C++, Git, Android Studio, Eclipse, NetBeans, Visual Studio, Sqlite3 and Microsoft Access.</p>\n" +
    "<p>Skills I have learned are NodeJS, AngularJS, ExpressJS, GruntJS, Bower, Python, HTML5, CSS, JavaScript, Twitter Bootstrap, jQuery, Flask (Python), Heroku, Amazon Web Services, Google App Engine, PostgreSQL and MongoDB.</p>\n" +
    "\n" +
    "<h3>Current work</h3>\n" +
    "<p>Currently, I'm leading a two member team and we partner with some freelance web developers for some projects.</p>\n" +
    "\n" +
    "\n" +
    "<h3><p><a href=\"https://www.linkedin.com/in/aung-thiha-a4990b106\">Linkedin Profile</a></p></h3>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n"
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
    "<!-- public/views/home.html -->\n" +
    "\n" +
    "<div class=\"jumbotron text-center\">\n" +
    "    <h1>Geek here to rescue you</h1>\n" +
    "\n" +
    "    <p>Oh yeah, I'm a geek</p>\n" +
    "</div>"
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
    "\n" +
    "			<fieldset class=\"form-group\">\n" +
    "				<textarea class=\"form-control\" placeholder=\"About\" title=\"About\" ng-model=\"nerd.bio\"></textarea>\n" +
    "			</fieldset>\n" +
    "\n" +
    "			<fieldset class=\"form-group\">\n" +
    "				<textarea class=\"form-control\" placeholder=\"Address\" title=\"Address\" ng-model=\"nerd.address\"></textarea>\n" +
    "			</fieldset>\n" +
    "\n" +
    "\n" +
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
