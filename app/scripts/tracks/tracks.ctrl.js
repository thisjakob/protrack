/* global moment */
(function () {
    'use strict';
    // TODO icon google api lokal speichern!
    angular.module('protrack')
        .controller('TracksCtrl',
        ['dataService', 'calcTime', '$filter', '$interval', 'authData', '$state','allProjects', 'allTags', '$anchorScroll',
        function (dataService, calcTime, $filter, $interval, authData, $state, allProjects, allTags, $anchorScroll) {

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
                project : {},
                durationSet : false,
                dataMissing : true,
                record : false
            };

            /**
             * do some stuff when the view is loaded
             */
            tracksCtrl.init = function(){
                tracksCtrl.current = trackTmpl;
                tracksCtrl.readonly = false;
                tracksCtrl.requireMatch = false;
                tracksCtrl.searchTextTag = null;
                tracksCtrl.selectedTag = null;
                tracksCtrl.allProjects = allProjects;
                tracksCtrl.allTags = allTags;
                tracksCtrl.current.availTags = loadTags();
                tracksCtrl.editMode = false;

                // load all tracks
                // => this might also be handled via resolve in the state
                tracksCtrl.tracksArray = dataService.getData(path + 'tracks', true);

                // add additional data to all tracks objects as soon as they are loaded
                //
                tracksCtrl.tracksArray.$loaded(function(tracks){
                    var enhancedTracks = [];

                    angular.forEach(tracks, function(track){
                        // resolve project name for project id
                        var projectObj = $filter('filter')(tracksCtrl.allProjects, {$id:track.project}, true)[0];
                        track.project = (projectObj) ? projectObj : false;

                        // resolve tag name for tag id
                        var tags = [], tagNames = [];
                        angular.forEach(track.tags, function(tagId){
                            var tagObj = $filter('filter')(tracksCtrl.allTags, {$id:tagId}, true)[0];
                            tagNames.push(tagObj.name);
                            tags.push(tagObj);
                        });
                        track.tags = tags;
                        track.tagNames = tagNames;

                        enhancedTracks.push(track);
                    });

                    tracksCtrl.tracksArray = enhancedTracks;
                });

                /*
                dataService.getData(path + 'tracks', true).$loaded(function (data) {
                    angular.forEach(data, function (track) {
                        if (track.record) {
                            console.log("Initial track " + track.$id + " record!");
                            tracksCtrl.recordTrack(track, true);
                        }
                    });
                });
                */

                //tracksCtrl.projects = dataService.getData(path + 'projects', false);
                //tracksCtrl.projectsArray = dataService.getData(path + 'projects', true);
                tracksCtrl.projectBackup = '';
                tracksCtrl.record = {recording: '', id: '', data: ''};
                tracksCtrl.allRecording = [];
            };

            /**
             * used for the chips control
             */
            tracksCtrl.transformChip = function (chip) {
                return chip;
            };

            /**
             * Search for Tags.
             */
            tracksCtrl.querySearchTag = function (query) {
                var results = query ? tracksCtrl.current.availTags.filter(createFilterFor(query)) : [];
                return results;
            };

            /**
             * Create filter function for a query string
             */
            var createFilterFor = function (query) {
                var lowercaseQuery = angular.lowercase(query);
                return function filterFn(queryText) {
                    return (queryText.name.toLowerCase().indexOf(lowercaseQuery) === 0 || queryText.desc.toLowerCase().indexOf(lowercaseQuery) === 0);
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
                    tracksCtrl.current.endTime = calcTime.addDiffTime(start, tracksCtrl.current.duration);
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
                return parseFloat( time1.replace(/:/,'.').replace(/:/,'') ) < parseFloat( time2.replace(/:/,'.').replace(/:/,'') );
            };

            /**
             * create track and save it to compare to show form
             */
            tracksCtrl.createTrackElement = function () {
                dataService.addData(path + 'tracks', mapTrackData(tracksCtrl.current));
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
            };

            /**
             * maps data from current track to the structure used in the DB
             */
            var mapTrackData = function(track){
                var project = getProjectByName(track.project.name);

                var newTrack = {
                    desc : track.desc,
                    starttime : moment( track.date ).format('DD.MM.YYYY') + track.startTime,
                    endtime : moment( track.date ).format('DD.MM.YYYY') + track.endTime,
                    difftime : track.duration,
                    record : track.record,
                    project : project.$id || '',
                    tags : track.tags.map(function(obj){
                        return obj.$id;
                    })
                };

                return newTrack;
            };

            /**
             * read actual time and set end and diff time. if endtime is on another day, recording will be stopping.
             */
            tracksCtrl.setActualTime = function () {
                if (tracksCtrl.record.recording !== '' && tracksCtrl.record.id !== '') {
                    // get actual time
                    tracksCtrl.record.data.endtime = moment().format('DD.MM.YYYY HH:mm:ss');

                    // read start time from track
                    dataService.getValue(path + 'tracks/' + tracksCtrl.record.id + '/starttime', function (snapshot) {
                        if (tracksCtrl.record.data !== null && tracksCtrl.record.data !== '') {
                            // set new end and diff time
                            tracksCtrl.record.data.starttime = snapshot.val();
                            tracksCtrl.record.data.difftime = calcTime.diffTime(tracksCtrl.record.data.starttime, tracksCtrl.record.data.endtime);
                            // check if end is another day than start
                            // TODO if (moment(tracksCtrl.record.data.endtime).isSame(moment(tracksCtrl.record.data.starttime), "day")){
                            dataService.setData(path + 'tracks/' + tracksCtrl.record.id + '/endtime', tracksCtrl.record.data.endtime);
                            dataService.setData(path + 'tracks/' + tracksCtrl.record.id + '/difftime', tracksCtrl.record.data.difftime);
                            /*} else {
                             console.log("Stop recording, because another day: " + tracksCtrl.record.data.starttime + " and " + tracksCtrl.record.data.endtime);
                             tracksCtrl.stopRecording();
                             }*/
                        }
                    });
                } else {
                    console.error('setActualTime fired with recording off!');
                    tracksCtrl.stopRecording();
                }
            };

            /**
             * prepare the selected track to show in the edit form
             */
            tracksCtrl.editTrack = function (id) {
                var track = getTrackById(id);

                var t = tracksCtrl.current;

                t.id = id;
                t.desc = track.desc;
                t.date = moment( $filter('dateonly')(track.starttime), 'DD.MM.YYYY').toDate();
                t.startTime = $filter('timeonly')(track.starttime);
                t.endTime = $filter('timeonly')(track.endtime);
                t.duration = track.difftime;
                t.durationSet = true;
                t.dataMissing = false;
                t.project = track.project;
                t.tags = track.tags;
                t.record = track.record;

                tracksCtrl.editMode = true;
                $anchorScroll('editForm');
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

                if ( arguments.length === 1 ) {
                    // load project tags
                    angular.forEach(project.tags, function (tagid) {
                        tags.push(
                            getTagById(tagid)
                        );
                    });
                } else {
                    // load tags without projects
                    tags = tracksCtrl.allTags.filter(function(tag){
                        return !tag.project;
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
             * delete track with given id from DB
             */
            tracksCtrl.deleteTrack = function (id) {
                if (tracksCtrl.record.id === id) {
                    tracksCtrl.stopRecording();
                }
                dataService.delData(path + 'tracks', id);
                $state.go($state.current, {}, {reload: true});
            };

            /**
             * ...
             */
            tracksCtrl.changeStarttime = function (starttime, track) {
                console.log('change starttime > change difftime');
                track.starttime = starttime;
                track.difftime = calcTime.diffTime(starttime, track.endtime);
            };

            /**
             * ...
             */
            tracksCtrl.changeEndtime = function (endtime, track) {
                console.log('change endtime > change difftime');
                track.endtime = endtime;
                track.difftime = calcTime.diffTime(track.starttime, endtime);
            };

            /**
             * ...
             */
            tracksCtrl.changeDifftime = function (difftime, track) {
                console.log('change difftime > change endtime');
                track.difftime = difftime;
                track.endtime = calcTime.addDiffTime(track.starttime, difftime);
            };

            /**
             * record time (set every minute end time to actual time)
             * @param track     object of firebase
             * @param record    boolean true = recording; false = stop recording
             */
            tracksCtrl.recordTrack = function (track, record) {
                // deepcopy of track
                var id = track.$id;
                var data = jQuery.extend(true, {}, track);
                delete data.$id;
                delete data.$priority;
                delete data.$$hashKey;
                // stop last timer
                tracksCtrl.stopRecording();
                if (record) {
                    // check if end time is difference to actual time is greater than one minute,
                    // then create a new track with same content and start this
                    if (calcTime.diffTime(moment(track.endtime, 'DD.MM.YYYY HH:mm:ss').format('DD.MM.YYYY HH:mm'),
                            moment().format('DD.MM.YYYY HH:mm')) !== '00:00:00') {
                        console.log("Difftime is greater than 1 Minute");
                        data.starttime = moment().format('DD.MM.YYYY HH:mm:ss');
                        data.endtime = moment().format('DD.MM.YYYY HH:mm:ss');
                        data.difftime = '00:00';
                        track = dataService.addData(path + 'tracks', data);
                        id = track.key();
                    }
                    // start new timer
                    dataService.setData(path + 'tracks/' + id + '/record', true);
                    tracksCtrl.startRecording(data, id);
                }

            };

            /**
             * Starts timer for the current track
             */
            tracksCtrl.startTimer = function () {
                var track = tracksCtrl.current;
                track.record = true;
                track.startTime = moment().format('HH:mm:ss');
                track.endTime = moment().format('HH:mm:ss');
                //dataService.setData(path + 'tracks/' + track.id + '/record', true);

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

                // save to DB
                tracksCtrl.createTrackElement();
            };

            tracksCtrl.init();
        }]);
})();