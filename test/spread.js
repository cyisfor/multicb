'use strict'
var multicb = require('../')
var t = require('assert')

require('interleavings').test(function (isAsync) {

  function async(cb, delay, args) {
      isAsync(function() { cb.apply(null, args) })()
  }

  var mcb = multicb({
		pluck: 1,
		done: function(results) {
			console.log('done')
			t.equal(results[0], 1)
			t.equal(results[1], 2)
			t.equal(results[2], 3)
			isAsync.done()
		},
		error: function(err) {
			console.error(err);
			t.fail("There should be no errors.");
		}
	})
  async(mcb(), 5, [null, 1])
  async(mcb(), 15, [null, 2])
  async(mcb(), 10, [null, 3])
	mcb.commit()
})
