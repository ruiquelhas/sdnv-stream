'use strict';

var Lab = require('lab');
var Code = require('code');

var through = require('through2');
var each = require('async-each');

var sdnv = require('../');

var lab = exports.lab = Lab.script();

lab.experiment('sdnv-stream', function () {

    var decoded = [
        new Buffer([0x7F]),
        new Buffer([0x8F]),
        new Buffer([0x12, 0x34]),
        new Buffer([0x0A, 0xBC])
    ];

    var encoded = [
        new Buffer([0x7F]),
        new Buffer([0x81, 0x0F]),
        new Buffer([0xA4, 0x34]),
        new Buffer([0x95, 0x3C])
    ];

    lab.test('should encode buffer', function (done) {

        var stream = through();
        var chunks = [];

        var write = function (buffer, encoding, next) {

            chunks.push(buffer);
            return next();
        };

        var output = through(write);

        stream.pipe(sdnv()).pipe(output);

        var iterator = function (item, callback) {

            return stream.write(item, 'hex', callback);
        };

        each(decoded, iterator, function (err) {

            Code.expect(chunks).to.deep.equal(encoded);
            return done();
        });
    });
});
