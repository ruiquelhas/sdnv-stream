# sdnv-stream

Encode stream data as [SDNVs](http://www.dtnrg.org/wiki/SDNV).

## Installation

```
$ npm install sdnv-stream
```

## Usage

```javascript
var sdnv = require('sdnv-stream');

// I'm using "through2" to setup the piping
var through = require('through2');

var stream = through();

var encode = sdnv();
// Set an encoding which allows the output to be displayed
encode.setEncoding('hex');

stream.pipe(encode).pipe(process.stdout);

stream.write(new Buffer([0x7F])); // 7f
stream.write(new Buffer([0x8F])); // 810f
stream.write(new Buffer([0x12, 0x34])); // a434
stream.write(new Buffer([0x0A, 0xBC])); // 953c
```

