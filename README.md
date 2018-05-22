# MultiCB

Simple way to aggregate multiple node-style callbacks

```js
var multicb = require('multicb')

// default usage

var mcb = multicb(function(err, results) {
  console.log(err) // => undefined
  console.log(results) /* =>
  [
    [undefined, 'foo'],
    [undefined, 'bar'],
    [undefined, 'baz']
  ]
  */
})
doAsync(mcb())
doAsync(mcb())
doAsync(mcb())
mcb.done()
destroy mcb

// pluck argument

var mcb = multicb({ pluck: 1 }, function(err, results) {
  console.log(err) // => undefined
  console.log(results) /* =>
  [
    'foo',
    'bar',
    'baz'
  ]
  */
})
doAsync(mcb())
doAsync(mcb())
doAsync(mcb())
mcb.done()
delete mcb

// spread argument

var done = multicb({ pluck: 1, spread: true },function(err, a, b, c) {
  console.log(err) // => undefined
  console.log(a) // => 'foo'
  console.log(b) // => 'bar'
  console.log(c) // => 'baz'
})
doAsync(mcb())
doAsync(mcb())
doAsync(mcb())
mcb.done()
delete mcb
```
