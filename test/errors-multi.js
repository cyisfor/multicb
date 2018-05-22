'use strict'
var multicb = require('../')
var t = require('assert')

var called = 0

var mcb = multicb({
	done: function(results) {
		t.fail("No failed callback should ever be done.")
	},
	error: function(err) {
		t.equal(err, 'fail')
		++called;
	}
})
var cbs = [mcb(), mcb()]

mcb.commit()

cbs[0]('fail')
cbs[1]('fail')
t.equal(called, 2)
