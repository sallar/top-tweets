"use strict";

var assert  = require('assert'),
    filter  = require('../source/app/controllers/validator.js'),
    mocks   = require('./data/strings.json');

describe('Validation Tools', function() {

    describe('Language detector', function () {
        it('should recognize farsi from other languages', function(done) {
            var fa = mocks.fa;
            fa = fa.map(function(item) {
                return filter.detector({text: item}, 'fa', 'PERSIAN');
            });

            Promise.all(fa).then(function(result) {
                result = result.filter(function(item) {
                    return item !== null;
                });
                assert.equal(result.length, fa.length);
                done();
            });
        });

        it('should recognize arabic from other languages', function(done) {
            var ar = mocks.ar;
            ar = ar.map(function(item) {
                return filter.detector({text: item}, 'ar', 'ARABIC');
            });

            Promise.all(ar).then(function(result) {
                result = result.filter(function(item) {
                    return item !== null;
                });
                assert.equal(result.length, ar.length - 2);
                done();
            });
        });
    });

});