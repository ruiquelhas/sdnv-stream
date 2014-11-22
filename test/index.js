var Lab = require('lab');
var Stream = require('stream');

var sndv = require('../');

var lab = exports.lab = Lab.script();

lab.experiment('sdnv-stream', function () {
    var decoded, encoded;

    lab.beforeEach(function (done) {
        decoded = [
            new Buffer([0x7F]),
            new Buffer([0x8F]),
            new Buffer([0x12, 0x34]),
            new Buffer([0x0A, 0xBC])
        ];

        encoded = [
            new Buffer([0x7F]),
            new Buffer([0x81, 0x0F]),
            new Buffer([0xA4, 0x34]),
            new Buffer([0x95, 0x3C])
        ];

        return done();
    });

    lab.test('should encode an input stream', function (done) {
        return done();
    });

    lab.test('should decode an output stream', function (done) {
        return done();
    });

    lab.test('should match output to input for codec pipe', function (done) {
        return done();
    });

});
