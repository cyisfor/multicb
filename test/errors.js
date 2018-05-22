'use strict'
var multicb = require('../')
var t = require('assert')

require('interleavings').test(function (isAsync) {

  function async(cb, delay, args) {
		setTimeout(function() {
      isAsync(function() { cb.apply(null, args) })()
		}, delay)
  }

  var mcb = multicb({
		error: function(err) {
			t.equal(err, 'fail')
			isAsync.done()
		},
		done: function(results) {
			t.equal(results, void 0)
			isAsync.done()
		}
  })
  async(mcb(), 5, [null, 1])
  async(mcb(), 15, [null, 2])
  async(mcb(), 10, ['fail'])
  mcb.commit()

})
