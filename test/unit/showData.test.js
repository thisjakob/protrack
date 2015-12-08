'use strict';

describe('service show data ', function () {
    var sampleShowData;
    var array = [
        { '$id': 'id0',
            'name': 'NameId0'},
        { '$id': 'id1',
            'name': 'NameId1'},
        { '$id': 'id2',
            'name': 'NameId2'},
        { '$id': 'id3',
            'name': 'NameId3'}
    ];

    beforeEach(module('protrack'));
    beforeEach(inject(function (showData) {
        sampleShowData = showData;
    }));

    it('return name of data with id', inject(function () {
        var id = 'id2';
        var res = 'NameId2'
        expect(sampleShowData.showDataName(array, id)).toBe(res);
    }));

    it('return no item if id is not available', inject(function () {
        var id = 'id4';
        var res = 'No item'
        expect(sampleShowData.showDataName(array, id)).toBe(res);
    }));
});
