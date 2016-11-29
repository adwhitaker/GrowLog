#!/bin/sh
mkdir -p public/vendors;

# angular
cp node_modules/angular/angular.min.js public/vendors;
cp node_modules/angular/angular.min.js.map public/vendors;

# angular-route
cp node_modules/angular-route/angular-route.min.js public/vendors;
cp node_modules/angular-route/angular-route.min.js.map public/vendors;

# angular-messages
cp node_modules/angular-messages/angular-messages.min.js public/vendors;
cp node_modules/angular-messages/angular-messages.min.js.map public/vendors;


# angular-animate
cp node_modules/angular-animate/angular-animate.min.js public/vendors;
cp node_modules/angular-animate/angular-animate.min.js.map public/vendors;

# angular ui bootstrap
cp node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css public/vendors;
cp node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js public/vendors;
cp node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js public/vendors;

# bootstrap
cp node_modules/bootstrap/dist/js/bootstrap.min.js public/vendors;
cp node_modules/bootstrap/dist/css/bootstrap.min.css public/vendors;
cp node_modules/bootstrap/dist/css/bootstrap.min.css.map public/vendors;

# jQuery
cp node_modules/jquery/dist/jquery.min.js public/vendors;

# moment.js
cp node_modules/moment/moment.js public/vendors;
