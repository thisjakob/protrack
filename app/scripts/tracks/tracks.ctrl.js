/* global $, moment */
'use strict';

angular.module('protrack')
    .controller('TracksCtrl', ['dataService', function (dataService) {
        var tracksCtrl = this;
        var path = 'users/iduser1/tracks';
        tracksCtrl.sumAdd = 0;
        tracksCtrl.tracks = dataService.getData(path);

        // create track and save it to compare to show form
        tracksCtrl.createTrackElement = function () {
            $('#addtrack').prop('disabled', true);
            tracksCtrl.newTrack = {
                starttime: moment().format('DD.MM.YYYY HH:mm:ss'),
                project: '',
                desc: '',
                tags: {},
                endtime: '', // with http://vitalets.github.io/combodate/
                record: false
            };
            dataService.addData(path, tracksCtrl.newTrack);
        };

        tracksCtrl.updateTrack = function (data, key) {
            console.log('update track: ' + key);
            dataService.updateData(path, key, data);
            $('#addtrack').prop('disabled', false);
        };

        tracksCtrl.deleteItem = function (id) {
            console.log('Delete Item: ' + id);
            dataService.delData(path, id);
            $('#addtrack').prop('disabled', false);
        };

        tracksCtrl.writeID = function (id) {
            console.log('Edit Item: ' + id);
        };
    }]);

// .$loaded().then (function(){}) when loaded

// isolierter Scope: Icon in einzelnem Element einer Liste ==> LIN
// git remote für repo auf USB-Stick
