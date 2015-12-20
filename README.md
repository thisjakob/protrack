# protrack
Record working time. Try it out online: https://protrack.firebaseapp.com

## tutorial
- first register and login
- define tags and projects
- add timer, write description in "Working on...", choose project and tags
- start timer or add timer with writing start and end time or duration 
- restart corresponding timer with timer icon

# features
- Synchronisation between pc and mobile over firebase
- Offline feature. Editing possible after login (reload not possible)
- Responsive design (collapse navigation, layout optimised for mobile)
- Angular Material Design
- Improved accessibility
- Messaging with toastr.
- Tags and projects editable with x-editable
- Unit, e2e and usertests

# components

## authenfication
Register user on firebase. Login and logout to protrack. Possibility to reset password.

## configuration
Define, edit and delete tags and projects. Delete tags or projects will remove all references in tracks and projects.

## timer / tracks
Add, edit, delete, start and stop timer. Possibility to restart an added timer with same description, project and tags. Editing start and end time or duration will calculate the others. The timerlist is sorted by start time descending. Editing a timer will not stop a running timer. There is a undo function until 15s after deleting a track.

## reports
Report all tracks between start and end date. The tracks are sorted by startime ascending. Show the total duration. Export will download a csv-file.

## services

### data services
Data handling with firebase db. Add, set, get and delete data on firebase database.

### calculate time
Calculating and formating date and time.

# developer part

## install protrack
- `npm install`
- `bower install`

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

`gulp protractor` to launch your e2e tests with Protractor (need account on protrack (test@protrack.com/protrack))

`gulp protractor:dist` to launch your e2e tests with Protractor on the dist files (need account on protrack (test@protrack.com/protrack))

## dev tools
vulcan: firebase inspector and editor for chrome devtools

## Known Issues / Missing Features
- The editing experience in the configuration area is not the same as it is in the tracks area. => this needs to be aligned.
- Undo deleted tracks only works correctly when user is online.
- The auto-complete tag selection for tracks sometimes causes the page to become unusable.
  This is caused by known issue in the auto-complete component of angular-material
  (https://github.com/angular/material/issues/3287). Although this specific issue seems to be closed
  some users confirm that the issue is still around.
- tracks.ctrl.js is way overloaded.
- No option to change users password or delete account.


