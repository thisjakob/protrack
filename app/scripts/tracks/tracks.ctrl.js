/* global moment */
;(function () {
    'use strict';
    // TODO icon google api lokal speichern!
    angular.module('protrack')
        .controller('TracksCtrl',
        ['dataService', 'calcTime', '$filter', '$interval', 'authData', '$state', 'runningTimer', 'allProjects', 'allTags', 'allTracks', '$anchorScroll', '$timeout', 'toastr',
        function (dataService, calcTime, $filter, $interval, authData, $state, runningTimer ,allProjects, allTags, allTracks, $anchorScroll, $timeout, toastr) {

            var tracksCtrl = this;
            tracksCtrl.tracksArray = [];

            // the resolve config of this route makes sure that the
            // authData object is ready to use by the time this controller
            // is initialized
            var path = 'users/' + authData.uid + '/';

            var trackTmpl = {
                id : '',
                desc : '',
                date : moment().toDate(),
                startTime : moment().format('HH:mm'),
                endTime : moment().format('HH:mm'),
                duration : '00:00',
                availTags : [],
                tags : [],
                project : '',
                durationSet : false,
                dataMissing : true,
                record : false
            };

            /**
             * do some stuff when the view is loaded
             */
            tracksCtrl.init = function(){
                tracksCtrl.allProjects = allProjects;
                tracksCtrl.allTags = allTags;
                tracksCtrl.tracksArray = allTracks;

                tracksCtrl.current = trackTmpl;
                tracksCtrl.current.availTags = loadTags();

                // check if there is a running timer
                // if so, resume it
                checkForRunningTimer();

                // config vars for the edit form
                tracksCtrl.readonly = true;
                tracksCtrl.requireMatch = false;
                tracksCtrl.searchTextTag = null;
                tracksCtrl.selectedTag = null;
                tracksCtrl.editMode = false;

                // add additional data to all tracks objects as soon as they are loaded
                tracksCtrl.tracksArray.$loaded().then(function(tracks){
                    angular.forEach(tracks, function(track){
                        track.starttimestamp = moment(track.starttime, 'DD.MM.YYYY HH:mm:ss').format('X');
                        expandTrack(track);
                    });

                    // expand new or changed tracks as well
                    tracksCtrl.tracksArray.$watch(function(obj){
                        if ( obj.event === 'child_added' ||  obj.event === 'child_added' ||  obj.event === 'child_changed') {
                            var track = getTrackById(obj.key);
                            track.starttimestamp = moment(track.starttime, 'DD.MM.YYYY HH:mm:ss').format('X');
                            expandTrack(track);
                        }
                    });
                });
            };

            /**
             * order tracks by date descending
             */
            var orderTracks = function(a,b){
                return b.starttimestamp - a.starttimestamp;
            };

            /**
             * Expand each object in the tracks array by
             * resolving the project and all tags within.
             * Also sort the array initially
             */
            var expandTrack = function(track){
                // resolve project name for project id
                var projectObj = track.project ? $filter('filter')(tracksCtrl.allProjects, {$id:track.project}, true)[0] : undefined;
                track.project = (projectObj) ? projectObj : false;

                // resolve tag name for tag id
                var tags = [], tagNames = [];
                angular.forEach(track.tags, function(tagId){
                    var tagObj = $filter('filter')(tracksCtrl.allTags, {$id:tagId}, true)[0];
                    if ( tagObj !== undefined ) {
                        tagNames.push(tagObj.name);
                        tags.push(tagObj);
                    }
                });
                track.tags = tags;
                track.tagNames = tagNames;
            };

            /**
             * Check if there is a running timer
             * if so, resume it
             * Also watch the runningTimer object for changes
             * => when a timer is stopped by another client, it's also stopped here.
             */
            var checkForRunningTimer = function(){
                runningTimer.$loaded().then(function(timer){
                    if ( timer.desc ) {
                        tracksCtrl.current = mapDBData(timer);
                        tracksCtrl.current.availTags = loadTags( tracksCtrl.current.project );
                        resumeTimer();
                    }
                });

                runningTimer.$watch(function(obj){
                    $state.go($state.current, {}, {reload: true});
                });

            };

            /**
             * used for the chips control
             */
            tracksCtrl.transformChip = function (chip) {
                return chip;
            };

            /**
             * Search for Tags.
             * Special behavior: when user enters first character all tags are shown.
             * This is necessary because the component does not allow to show all available tags
             * when it get's focus.
             */
            tracksCtrl.querySearchTag = function (query) {
                if ( query.length === 1) {
                    return tracksCtrl.current.availTags;
                }

                return query ? tracksCtrl.current.availTags.filter(createFilterFor(query)) : [];
            };

            /**
             * Create filter function for a query string
             */
            var createFilterFor = function (query) {
                var lowercaseQuery = angular.lowercase(query);
                return function filterFn(queryText) {
                    if ( queryText ) {
                        return (queryText.name.toLowerCase().indexOf(lowercaseQuery) === 0 || queryText.desc.toLowerCase().indexOf(lowercaseQuery) === 0);
                    }
                };
            };

            /**
             * check if a duration is set
             */
            var checkDuration = function() {
                tracksCtrl.current.durationSet = ( parseInt(tracksCtrl.current.duration.replace(/:/,'')) ) ? true : false;
            };

            /**
             * calculate duration from start and end time given
             */
            var getDuration = function(start, end){
                var noDuration = ( start.length > 5 ) ? '00:00:00' : '00:00';
                return ( isEarlier(start, end) ) ? calcTime.diffTime(start, end) : noDuration;
            };

            /**
             * add a specified amount of time to a given duration
             */
            var addTime = function(time, add){
                moment.duration(time, 'HH:mm').add(add);
            };

            /**
             * check if a description is set
             */
            tracksCtrl.checkDesc = function() {
                tracksCtrl.current.dataMissing = ( tracksCtrl.current.desc ) ? false : true;
            };

            /**
             * handle changed value on any of the time/duration fields
             */
            tracksCtrl.changeTime = function(field) {
                var start = tracksCtrl.current.startTime;
                var end = tracksCtrl.current.endTime;

                if ( field === 'start' || field === 'end' ) {
                    // start time changed => update duration
                    tracksCtrl.current.duration = getDuration(start, end);
                }

                if ( field === 'duration' ) {
                    // duration changed => update endTime
                    end = calcTime.addDiffTime(start, tracksCtrl.current.duration).format('HH:mm:ss');
                    if ( isEarlier(start,end) ) {
                        tracksCtrl.current.endTime = end;
                    } else {
                        tracksCtrl.current.duration = '00:00';
                        tracksCtrl.current.endTime = start;
                    }
                }

                checkDuration();
            };

            /**
             * make sure the entry in any of the time fields is in a correct format
             * if the input format cannot be handled, set "00:00"
             */
            tracksCtrl.formatTime = function ( fieldName ) {
                var time = tracksCtrl.current[ fieldName ];

                if (time.match(/[0-9:\.,]{1,5}/) ) {
                    // basic input is okay => continue
                    time = time.replace(/([0-9]{1,2}):\.,([0-9]{1,2})/, '$1:$2');
                    time = moment(time, 'HH:mm').format('HH:mm');

                    if ( fieldName === 'endTime' ) {
                        var startTime = tracksCtrl.current.startTime;
                        if ( isEarlier( time, startTime ) ) {
                            time = startTime;
                        }
                    }

                } else {
                    // not a known time format => set duration to 00:00, start-/endtime to current time
                    time = ( fieldName === 'duration' ) ? '00:00' : moment().format('HH:mm');
                }

                tracksCtrl.current[ fieldName ] = time;
            };

            /**
             * compares two times
             * returns true if time1 is earlier than time2
             * returns false if its the other way around or the same
             */
            var isEarlier = function( time1, time2 ) {
                return parseFloat( time1.replace(/:/,'.').replace(/:/,'') ) <= parseFloat( time2.replace(/:/,'.').replace(/:/,'') );
            };

            /**
             * create track and save it to compare to show form
             */
            tracksCtrl.createTrackElement = function () {
                tracksCtrl.tracksArray.$add(mapTrackData(tracksCtrl.current))
                    .then(function() {
                        toastr.success('New track was added');
                    }
                );
                $state.go($state.current, {}, {reload: true});
            };

            /**
             * handle changes on the project select control
             */
            tracksCtrl.projectSelected = function(){
                tracksCtrl.selectedTags = null;
                tracksCtrl.searchTextTag = null;
                tracksCtrl.current.tags = [];
                tracksCtrl.current.availTags = loadTags(tracksCtrl.current.project);

                if ( tracksCtrl.current.record ) {
                    // update currentTimer in DB
                    saveTimer( true );
                }
            };

            /**
             * handle changes the description
             * save changed description to running timer
             */
            tracksCtrl.descChanged = function(){
                tracksCtrl.tagChanged();
            };

            /**
             * handle changes on the tag select control
             * save changed description to running timer
             */
            tracksCtrl.tagChanged = function(){
                if (tracksCtrl.current.record) {
                    saveTimer( true );
                }
            };

            /**
             * maps data from current track to the structure used in the DB
             */
            var mapTrackData = function(track){
                var newTrack = {
                    desc : track.desc,
                    starttime : moment( track.date ).format('DD.MM.YYYY') + ' ' + track.startTime,
                    endtime : moment( track.date ).format('DD.MM.YYYY') + ' ' + track.endTime,
                    difftime : track.duration,
                    record : track.record,
                    project : (track.project) ? track.project.$id : '',
                    tags : track.tags.map(function(obj){
                        return obj.$id;
                    })
                };

                return newTrack;
            };

            /**
             * maps data from track data in DB to the structure used locally
             */
            var mapDBData = function(track){
                var newTrack = {
                    id : track.$id,
                    desc : track.desc,
                    date : moment( $filter('dateonly')(track.starttime), 'DD.MM.YYYY').toDate(),
                    startTime : $filter('timeonly')(track.starttime),
                    endTime : $filter('timeonly')(track.endtime),
                    duration : track.difftime,
                    durationSet : true,
                    dataMissing : false,
                    project : ( typeof track.project === 'string' ) ? getProjectById( track.project ) : track.project,
                    tags : ( typeof track.tags === 'object' && typeof track.tags[0] === 'object' ) ? track.tags : getTagsById(track.tags),
                    record : track.record
                };

                return newTrack;
            };

            /**
             * prepare the selected track to show in the edit form
             */
            tracksCtrl.editTrack = function (id) {
                var track = getTrackById(id);
                tracksCtrl.current = mapDBData(track);
                tracksCtrl.editMode = true;
                $anchorScroll('editForm');

                // focus first input field in edit form
                // compile this into a service/directive later
                $timeout(function(){
                    $('#currentDesc').select().focus();
                },100);

            };

            /**
             * update track in DB (form submit handler)
             */
            tracksCtrl.updateTrack = function () {
                // update data
                dataService.updateData(path + 'tracks', tracksCtrl.current.id, mapTrackData(tracksCtrl.current));
                $state.go($state.current, {}, {reload: true});
            };

            /**
             * ...
             */
            tracksCtrl.updateProject = function (project, id) {
                console.log('update project in track: ' + id);
                dataService.setData(path + 'tracks/' + id + '/project', project);
            };

            /**
             * ...
             */
            tracksCtrl.cancelTrack = function (track) {
                console.log('update project backup in track: ' + track.$id);

                // write back updated project
                dataService.setData(path + 'tracks/' + track.$id + '/project', tracksCtrl.projectBackup);
                // calc diff time
                track.difftime = calcTime.diffTime(track.starttime, track.endtime);
            };

            /**
             * load tags for a given project
             * if no project is provided, load all tags that are not assigned to a project
             */
            var loadTags = function (project) {
                var tags = [];

                if ( arguments.length === 1 && typeof project === 'object' ) {
                    // load project tags
                    angular.forEach(project.tags, function (tagid) {
                        tags.push(
                            getTagById(tagid)
                        );
                    });
                } else {
                    // load tags without projects
                    tags = tracksCtrl.allTags.filter(function(tag){
                        return ( tag.project ) ? false : true ;
                    });
                }

                return tags;
            };

            /**
             * returns track object for a given track id
             */
            var getTrackById = function(id) {
                return $filter('filter')(tracksCtrl.tracksArray, {$id:id}, true)[0];
            };

            /**
             * returns project object for a given project id
             */
            var getProjectById = function(id) {
                return $filter('filter')(tracksCtrl.allProjects, {$id:id}, true)[0];
            };

            /**
             * returns project object for a given project id
             */
            var getProjectByName = function(name) {
                return $filter('filter')(tracksCtrl.allProjects, {name:name}, true)[0];
            };

            /**
             * returns tag object for a given tag id
             */
            var getTagById = function(id) {
                return $filter('filter')(tracksCtrl.allTags, {$id:id}, true)[0];
            };

            /**
             * takes an array of tagIds and returns an array of corresponding tag objects
             */
            var getTagsById = function(ids){
                var tagObjs = [];
                angular.forEach(ids, function(id){
                    tagObjs.push( getTagById(id) );
                });

                return tagObjs;
            };

            /**
             * delete track with given id from DB
             */
            tracksCtrl.deleteTrack = function (id) {
                var track = getTrackById(id);
                tracksCtrl.deletedTrack = mapDBData( track );

                tracksCtrl.tracksArray.$remove( track )
                    .then(function(){
                        toastr.info(
                            'Click this message to undo.',
                            'Item Deleted! Undo?',
                            {
                                closeButton: true,
                                allowHtml:true,
                                progressBar:true,
                                onTap:tracksCtrl.restoreTrack,
                                timeout: 15000,
                                extendedTimeOut: 2000
                            }
                        );
                    })
                    .catch(function(error){
                        toastr.error('Something went wrong during deletion. Please try again later.', 'Track not deleted!');
                        console.log('Protrack deletion error: ' + error);
                    });
            };


            /**
             * Restore the previously deleted track
             */
            tracksCtrl.restoreTrack = function(){
                tracksCtrl.tracksArray.$add( mapTrackData(tracksCtrl.deletedTrack) )
                    .then(function(){
                        toastr.success('The tracks was restored successfully');
                    });
            };

            /**
             * Starts timer for the current track
             */
            tracksCtrl.startTimer = function () {
                var track = tracksCtrl.current;
                var update = !track.record;

                track.record = true;
                tracksCtrl.editMode = false;
                track.date = moment().toDate();
                track.startTime = moment().format('HH:mm:ss');
                track.endTime = moment().format('HH:mm:ss');
                track.duration = getDuration(track.startTime, track.endTime);

                // save the current timer to DB
                // this makes sure that a running timer will show up on other devices
                // and is not lost on page reload
                saveTimer( update );

                // update duration every second
                track.timerInterval = $interval(function(){
                    track.endTime = moment().format('HH:mm:ss');
                    track.duration = getDuration(track.startTime, track.endTime);
                }, 1000);
            };

            /**
             * Stops timer for the current track and saves it to the DB
             */
            tracksCtrl.stopTimer = function() {
                var track = tracksCtrl.current;
                track.record = false;
                $interval.cancel(track.timerInterval);

                var timerStopped = dataService.getData(path + 'currentTimer', false).$loaded();
                timerStopped.then(function(data){
                    if ( data.desc ) {
                        // delete the current track from DB
                        removeTimer();

                        // save to DB
                        tracksCtrl.createTrackElement();
                    } else {
                        // reset edit form
                        $state.go($state.current, {}, {reload: true});
                    }
                });

                return timerStopped;

            };

            /**
             * Starts timer for the current track
             */
            tracksCtrl.restartTimer = function (id) {
                // check if a timer is already running
                // if so, stop and save it and then start the new one
                if ( tracksCtrl.current.record === true ) {
                    tracksCtrl.stopTimer().then(function(){
                        tracksCtrl.editTrack(id);
                        tracksCtrl.startTimer();
                    });
                } else {
                    tracksCtrl.editTrack(id);
                    tracksCtrl.startTimer();
                }
            };

            /**
             * Resume timer
             */
            var resumeTimer = function (id) {
                var track = tracksCtrl.current;

                track.record = true;
                tracksCtrl.editMode = false;
                track.endTime = moment().format('HH:mm:ss');
                track.duration = getDuration(track.startTime, track.endTime);

                // update duration every second
                track.timerInterval = $interval(function(){
                    track.endTime = moment().format('HH:mm:ss');
                    track.duration = getDuration(track.startTime, track.endTime);
                }, 1000);
            };

            /**
             * add or update timer to DB (currentTimer)
             */
            var saveTimer = function(update){
                var track = tracksCtrl.current;
                if ( update ) {
                    // update currentTimer in DB
                    dataService.updateData(path, 'currentTimer', mapTrackData(track));
                } else {
                    // save currentTimer to DB
                    dataService.setData(path + 'currentTimer', mapTrackData(track));
                }
            };

            /**
             * remove timer to DB (currentTimer)
             */
            var removeTimer = function(){
                dataService.delData(path, 'currentTimer');
            };

            tracksCtrl.init();
        }]);
})();