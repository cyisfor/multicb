'use strict'
var multicb = require('../')
var t = require('assert')

require('interleavings').test(function (isAsync) {

  function async(cb, delay, args) {
      isAsync(function() { cb.apply(null, args) })()
  }

  var mcb = multicb({pluck: 1,spread: 1}, function(err, first, second, third) {
		if(err) {
			console.error(err);
			t.fail("There should be no errors.");
		} else {
			console.log('done')
			t.equal(first, 1)
			t.equal(second, 2)
			t.equal(third, 3)
			isAsync.done()
		}
	})
  async(mcb(), 5, [null, 1])
  async(mcb(), 15, [null, 2])
  async(mcb(), 10, [null, 3])
	mcb.commit()
})
