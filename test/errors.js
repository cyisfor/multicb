'use strict'
var multicb = require('../')
var t = require('assert')

require('interleavings').test(function (isAsync) {

  function async(cb, delay, args) {
		setTimeout(function() {
      isAsync(function() { cb.apply(null, args) })()
		}, delay)
  }

  var mcb = multicb(function(err, results) {
		if(err) {
			t.equal(err, 'fail')
		} else {
			t.equal(results, void 0)
		}
		isAsync.done()
  })
  async(mcb(), 5, [null, 1])
  async(mcb(), 15, [null, 2])
  async(mcb(), 10, ['fail'])
  mcb.commit()

})
