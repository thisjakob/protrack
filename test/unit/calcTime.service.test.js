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
        expect(sampleCalcTime.diffTime(from, to)).toEqual('00:45:00');
    }));

    it('add hours to time', inject(function () {
        var time = '10:13';
        var diffTime = '02:12';
        var res = '12:25:00';

        expect(sampleCalcTime.addDiffTime(time, diffTime)).toEqual(res);
    }))
});
