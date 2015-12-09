'use strict';

describe('service calc time', function () {
    var sampleCalcTime;

    beforeEach(module('protrack'));
    beforeEach(inject(function (calcTime) {
        sampleCalcTime = calcTime;
    }));

    it('difference of times', inject(function () {
        var from = "10:15:00";
        var to = "11:00:00";
        expect(sampleCalcTime.diffTimeHours(from, to)).toEqual('0:45');

        from = "01:01:00";
        to = "23:00:00";
        expect(sampleCalcTime.diffTimeHours(from, to)).toEqual('21:59');

        from = "01:01:31";
        to = "23:00:00";
        expect(sampleCalcTime.diffTimeHours(from, to)).toEqual('21:58');

        from = "01:01:59";
        to = "23:00:00";
        expect(sampleCalcTime.diffTimeHours(from, to)).toEqual('21:58');
    }));

    it('add hours to time', inject(function () {
        var time = '10:13';
        var diffTime = '02:12';
        expect(sampleCalcTime.addDiffTime(time, diffTime).hours()).toEqual(12);
        expect(sampleCalcTime.addDiffTime(time, diffTime).minutes()).toEqual(25);

        time = '10:13';
        diffTime = '15:12';
        var sum = sampleCalcTime.addDiffTime(time, diffTime);
        expect(sampleCalcTime.diffTimeHours(time, sum)).toEqual(diffTime);
        sum = sampleCalcTime.addDiffTime(sum, diffTime);
        expect(sampleCalcTime.diffTimeHours(time, sum)).toEqual('30:24');
    }))
});
