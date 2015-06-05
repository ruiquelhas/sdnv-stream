'use strict';

var Transform = require('stream').Transform;

var internals = {
    defauls: {
        msb: 128,
        shift: 7
    }
};

internals.clone = function (buffer) {

    var result = new Buffer(buffer.length);
    buffer.copy(result);

    return result;
};

internals.lsb = function (buffer) {

    var msb = internals.defauls.msb;
    var shift = internals.defauls.shift;

    return (
        buffer[buffer.length - 1] >= msb ?
        buffer[buffer.length - 1] - msb :
        buffer[buffer.length - 1]
    );
};

internals.decimal = function (buffer) {

    if (buffer.length < 2) {
        return buffer.readUInt8(0);
    }

    if (buffer.length < 3) {
        return buffer.readUInt16BE(0);
    }

    return buffer.readUInt32BE(0);
};

internals.encode = function (buffer) {

    var msb = internals.defauls.msb;
    var shift = internals.defauls.shift;

    var clone = internals.clone(buffer);
    var x = internals.lsb(clone);
    var y = internals.decimal(clone) >> shift;

    if (y === 0) {
        return new Buffer([x]);
    }

    var z = msb | internals.lsb(new Buffer([y]));
    var remainder = new Buffer([z, x]);

    y = y >> shift;
    if (y === 0) {
        return remainder;
    }

    return internals.encode(remainder);
};

module.exports = function () {

    var sdnv = new Transform();

    sdnv._transform = function (chunk, encoding, callback) {

        this.push(internals.encode(chunk));
        return callback();
    };

    return sdnv;
};
