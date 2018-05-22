# MultiCB

Simple way to aggregate multiple node-style callbacks

```js
var multicb = require('multicb')

// default usage

var mcb = multicb({
  done: function(results) {
	console.log(results) /* =>
  [
    ['foo'],
    ['bar'],
    ['baz']
  ]
  */
  }
})
doAsync(mcb())
doAsync(mcb())
doAsync(mcb())
mcb.commit()

// pluck argument

var mcb = multicb({ 
  pluck: 1,
  done: function(err, results) {
    console.log(err) // => undefined
    console.log(results) /* =>
    [
      'foo',
      'bar',
      'baz'
    ]
    */
  }
})
doAsync(mcb())
doAsync(mcb())
doAsync(mcb())
mcb.commit()
delete mcb

// spread argument

var mcb = multicb({ pluck: 1, spread: true,
  done: function(a, b, c) {
    console.log(a) // => 'foo'
    console.log(b) // => 'bar'
    console.log(c) // => 'baz'
  }
})
doAsync(mcb())
doAsync(mcb())
doAsync(mcb())
mcb.commit()


// error handling
var mcb = multicb({ pluck: 1, spread: true,
  done: function(a, b, c) {
    console.log(a) // => 'foo'
    console.log(b) // => 'bar'
    console.log(c) // => 'baz'
  },
  error: function(err) {
    console.error(err);
	throw “other results may complete successfully, despite this error”;
  }
})
doAsync(mcb())
doAsync(mcb())
doAsync(mcb())
mcb.commit()
```
