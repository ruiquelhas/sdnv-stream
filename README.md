# sdnv-stream

Encode stream data as [SDNVs](http://www.dtnrg.org/wiki/SDNV).

## Installation

```
$ npm install sdnv-stream
```

## Usage

```javascript
var sdnv = require('sdnv-stream');

// Were, we use "through2" to setup the piping
var through = require('through2');

var stream = through();

var encode = sdnv();
// Let's set an encoding which allows the result to be displayed
encode.setEncoding('hex');

stream.pipe(encode).pipe(process.stdout);

stream.write(new Buffer([0x7F])); // <Buffer 7f>
stream.write(new Buffer([0x8F])); // <Buffer 81 0f>
stream.write(new Buffer([0x12, 0x34])); // <Buffer a4 34>
stream.write(new Buffer([0x0A, 0xBC])); // <Buffer 95 3c>
```

