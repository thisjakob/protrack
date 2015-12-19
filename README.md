# protrack
Record working time. Try it out online: https://protrack.firebaseapp.com

## tutorial
- first register and login
- define tags and projects
- add timer, write description in "Working on...", choose project and tags
- start timer or add timer with writing start and end time or duration 
- restart corresponding timer with timer icon

# developer part

## install protrack
- `npm install`
- bower install`

## create firebase db
- create firebase account -> http://www.firebase.com
- create app -> dashboard
- set login data -> manage app -> Login & Auth -> Email & Password -> Add User
- set url in protrack -> copy firebase (data) url to protrack.js (".constant('FirebaseUrl', 'https://<<FIREBASE_APP_NAME>>.firebaseio.com'");

## build
`gulp`

## start
`gulp serve`
`gulp serve:dist` to launch a server on your optimized application
`gulp wiredep`  to fill bower dependencies in your .html file(s)

## test
`gulp test` to launch your unit tests with Karma

`gulp protractor` to launch your e2e tests with Protractor

`gulp protractor:dist` to launch your e2e tests with Protractor on the dist files

## dev tools
vulcan: firebase inspector and editor for chrome devtools

## Known Issues
- The editing experience in the configuration area is not the same as it is in the tracks area. => this needs to be aligned.
- Undo deleted tracks only works correctly when user is online.
- The auto-complete tag selection for tracks sometimes causes the page to become unusable.
  This is caused by known issue in the auto-complete component of angular-material
  (https://github.com/angular/material/issues/3287). Although this specific issue seems to be closed
  some users confirm that the issue is still around.
- tracks.ctrl.js is way overloaded.


