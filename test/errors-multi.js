'use strict'
var multicb = require('../')
var t = require('assert')

var called = 0

var mcb = multicb(function(err, results) {
	if(err) {
		t.equal(err, 'fail')
		++called;
	} else {
		t.fail("No failed callback should ever be done.")
	}
})

var cbs = [mcb(), mcb()]

mcb.commit()

cbs[0]('fail')
cbs[1]('fail')
t.equal(called, 1)
