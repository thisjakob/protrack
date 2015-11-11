/* global $, moment */
(function () {
    'use strict';
    //TODO icon google api lokal speichern!
    angular.module('protrack')
        .controller('TracksCtrl', ['dataService', 'calcTime', '$filter', 'authData', function (dataService, calcTime, $filter, authData) {
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
                dataService.addData(path + 'tracks', tracksCtrl.newTrack);
            };

            tracksCtrl.editTrack = function (project) {
                if (project !== undefined) {
                    tracksCtrl.projectBackup = project;
                }
            };

            tracksCtrl.updateTrack = function (data, key) {
                console.log('update track: ' + key);
                tracksCtrl.projectBackup = data.project;
                dataService.updateData(path + 'tracks', key, data);
                $('#addtrack').prop('disabled', false);
            };

            tracksCtrl.updateProject = function (project, key) {
                console.log('update project in track: ' + key);
                dataService.setData(path + 'tracks/' + key + '/project', project);
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
                    //if (tracksCtrl.projects[project] !== undefined) { console.log('projects: ' + tracksCtrl.projects[project].name); }
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

            // TODO button = on ==> change endtime to actual time
        }]);
})();
// .$loaded().then (function(){}) when loaded

// isolierter Scope: Icon in einzelnem Element einer Liste ==> LIN
// git remote für repo auf USB-Stick
