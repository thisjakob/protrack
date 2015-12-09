# protrack
Record working time. Try it out online: https://protrack.firebaseapp.com

# install protrack
- npm install
- bower install

# create firebase db
- create firebase account -> http://www.firebase.com
- create app -> dashboard
- set login data -> manage app -> Login & Auth -> Email & Password -> Add User
- set url in protrack -> copy firebase (data) url to protrack.js (".constant('FirebaseUrl', 'https://<<FIREBASE_APP_NAME>>.firebaseio.com'");

# build
gulp

# start
gulp serve

gulp serve:dist to launch a server on your optimized application

gulp wiredep to fill bower dependencies in your .html file(s)

# test
gulp test to launch your unit tests with Karma

gulp protractor to launch your e2e tests with Protractor

gulp protractor:dist to launch your e2e tests with Protractor on the dist files

# dev tools
vulcan: firebase inspector and editor for chrome devtools

