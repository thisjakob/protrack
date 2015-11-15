/* global $, moment */
(function () {
    'use strict';
    //TODO icon google api lokal speichern!
    angular.module('protrack')
        .controller('TracksCtrl', ['dataService', 'calcTime', '$filter', '$interval', 'authData', function (dataService, calcTime, $filter, $interval, authData) {
            var tracksCtrl = this;
            var path = 'users/';

            // the resolve config of this route makes sure that the
            // authData object is ready to use by the time this controller
            // is initialized
            path = path + authData.uid + '/';

            tracksCtrl.tracksArray = dataService.getData(path + 'tracks', true);
            tracksCtrl.projects = dataService.getData(path + 'projects', false);
            tracksCtrl.projectsArray = dataService.getData(path + 'projects', true);
            tracksCtrl.tagsAll = dataService.getData(path + 'tags', false);
            tracksCtrl.tags = [];
            tracksCtrl.projectBackup = '';
            tracksCtrl.record = {recording: '', id: '', data: ''};
            tracksCtrl.allRecording = [];

            // TODO bei Initialisierung prüfen, ob Recording gesetzt
            /**
             * read actual time and set end and diff time. if endtime is on another day, recording will be stopping.
             */
            tracksCtrl.setActualTime = function () {
                if (tracksCtrl.record.recording !== '' && tracksCtrl.record.id !== '') {
                    // get actual time
                    tracksCtrl.record.data.endtime = moment().format('DD.MM.YYYY HH:mm');

                    // read start time from track
                    dataService.getValue(path + 'tracks/' + tracksCtrl.record.id + '/starttime', function (snapshot) {
                        if (tracksCtrl.record.data !== null) {
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

            // create track and save it to compare to show form
            tracksCtrl.createTrackElement = function () {
                $('#addtrack').prop('disabled', true);

                tracksCtrl.newTrack = {
                    starttime: moment().format('DD.MM.YYYY HH:mm'),
                    project: '',
                    desc: '',
                    tags: '',
                    endtime: moment().format('DD.MM.YYYY HH:mm'), // with http://vitalets.github.io/combodate/
                    difftime: '00:00',
                    record: false
                };
                return dataService.addData(path + 'tracks', tracksCtrl.newTrack);
            };

            tracksCtrl.editTrack = function (project) {
                if (project !== undefined) {
                    tracksCtrl.projectBackup = project;
                }
            };

            tracksCtrl.updateTrack = function (data, id) {
                console.log('update track: ' + id);
                tracksCtrl.projectBackup = data.project;

                // update data
                dataService.updateData(path + 'tracks', id, data);
                $('#addtrack').prop('disabled', false);

                // if start and endtime is the same, start timing
                if (data.starttime === data.endtime) {
                    dataService.setData(path + 'tracks/' + id + '/record', true);
                    tracksCtrl.startRecording(data, id);
                }
            };

            tracksCtrl.updateProject = function (project, id) {
                console.log('update project in track: ' + id);
                dataService.setData(path + 'tracks/' + id + '/project', project);
            };

            tracksCtrl.cancelTrack = function (track) {
                console.log('update project backup in track: ' + track.$id);
                // write back updated project
                dataService.setData(path + 'tracks/' + track.$id + '/project', tracksCtrl.projectBackup);
                // calc diff time
                track.difftime = calcTime.diffTime(track.starttime, track.endtime);
            };

            tracksCtrl.showProject = function (project) {
                var selected = $filter('filter')(tracksCtrl.projectsArray, {$id: project});
                return (project && selected.length) ? selected[0].name : 'No project';
            };

            tracksCtrl.loadTags = function (project) {
                var tags = [];
                if (tracksCtrl.tags.length === 0) {
                    if (project !== '' && tracksCtrl.projects[project] !== undefined && tracksCtrl.projects[project].tags !== undefined) {
                        // load project tags
                        angular.forEach(tracksCtrl.projects[project].tags, function (tagid) {
                            var tag = tracksCtrl.tagsAll[tagid];
                            if (tag !== undefined) {
                                // set id in tag to select
                                tag.$id = tagid;
                                tags.push(tag);
                            }
                        });
                    } else {
                        // load tags without projects
                        angular.forEach(tracksCtrl.tagsAll, function (tag, tagid) {
                            // set id in tag to select
                            tag.$id = tagid;
                            tags.push(tag);
                        });
                    }
                }
                return tags;
            };

            tracksCtrl.loadTagname = function (tag) {
                return tag.name + ": " + tag.desc;
            };

            tracksCtrl.showTags = function (project, tags) {
                var selected = [];
                angular.forEach(tracksCtrl.loadTags(project), function (tag) {
                    angular.forEach(tags, function (tagproject) {
                        if (tag.$id !== undefined && tag.$id.indexOf(tagproject) >= 0) {
                            if (tag.name !== undefined) {
                                selected.push(tag.name);
                            }
                        }
                    });
                });
                return selected.length ? selected.sort().join(', ') : 'No tag';
            };

            tracksCtrl.deleteTrack = function (id) {
                console.log('Delete Item: ' + id);
                if (tracksCtrl.record.id === id) {
                    tracksCtrl.stopRecording();
                }
                dataService.delData(path + 'tracks', id);
                $('#addtrack').prop('disabled', false);
            };

            tracksCtrl.changeStarttime = function (starttime, track) {
                console.log('change starttime > change difftime');
                track.difftime = calcTime.diffTime(starttime, track.endtime);
            };

            tracksCtrl.changeEndtime = function (endtime, track) {
                console.log('change endtime > change difftime');
                track.difftime = calcTime.diffTime(track.starttime, endtime);
            };

            tracksCtrl.changeDifftime = function (difftime, track) {
                console.log('change difftime > change endtime');
                track.endtime = calcTime.addDiffTime(track.starttime, difftime);
            };

            /**
             * record time (set every minute end time to actual time)
             * @param track     object of firebase
             * @param record    boolean true = recording; false = stop recording
             */
            tracksCtrl.recordTrack = function (track, record) {
                // deepcopy of track
                var data = jQuery.extend(true, {}, track);
                delete data.$id;
                delete data.$priority;
                delete data.$$hashKey;
                if (record) {
                    // stop last timer
                    tracksCtrl.stopRecording();

                    // check if end time is different to actual time, then create a new track with same content and start this
                    if (calcTime.diffTime(track.endtime, moment().format('DD.MM.YYYY HH:mm')) !== '00:00') {
                        console.log("Difftime is greater than 1 Minute");
                        data.starttime = moment().format('DD.MM.YYYY HH:mm');
                        data.endtime = moment().format('DD.MM.YYYY HH:mm');
                        data.difftime = '00:00';
                        track = tracksCtrl.createTrackElement();
                        tracksCtrl.updateTrack(data, track.$id);
                    }

                    // start new timer
                    dataService.setData(path + 'tracks/' + track.$id + '/record', true);
                    tracksCtrl.startRecording(data, track.$id);
                } else {
                    // stop timer
                    tracksCtrl.stopRecording(data, track.$id);
                }

            };

            tracksCtrl.startRecording = function (data, id) {
                tracksCtrl.record.id = id;
                tracksCtrl.record.data = data;

                // start recording cycle (set end time to actual time)
                tracksCtrl.record.recording = $interval(tracksCtrl.setActualTime, 10000);
                tracksCtrl.allRecording.push(tracksCtrl.record.recording);
                if (tracksCtrl.record.recording !== '') {
                    console.log("Timer started");
                }
            };

            /**
             * stops recording. stop interval and delete flag in track.
             */
            tracksCtrl.stopRecording = function () {
                // delete record
                if (tracksCtrl.record.data !== null && tracksCtrl.record.id !== '') {
                    dataService.setData(path + 'tracks/' + tracksCtrl.record.id + '/record', false);

                    // delete recording
                    if (tracksCtrl.record.recording !== '') {
                        if ($interval.cancel(tracksCtrl.record.recording)) {
                            console.log("Timer canceled");
                            tracksCtrl.allRecording.pop();
                        }
                    }
                } else {
                    console.log('no recording saved to stop');
                    // remove record from tracks
                    angular.forEach(tracksCtrl.tracksArray, function (track) {
                        dataService.setData(path + 'tracks/' + track.$id + '/record', false);
                    });
                    // delete all interval started
                    if (tracksCtrl.allRecording !== null) {
                        while (tracksCtrl.allRecording.length) {
                            $interval.cancel(tracksCtrl.allRecording.pop());
                            console.log("interval canceled");
                        }
                    }
                }
                tracksCtrl.record = {recording: '', id: '', data: ''};
            };
        }]);
})();
// .$loaded().then (function(){}) when loaded

// isolierter Scope: Icon in einzelnem Element einer Liste ==> LIN
// git remote für repo auf USB-Stick
