# protrack
record working time

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

# dev tools
vulcan: firebase inspector and editor for chrome devtools
