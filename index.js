module.exports = function(o) {
  var n = 0, m = 0, results = [], _err;
	var ready = false;
	/* for convenience of packaging up error and done... */
	if(o.cb) {
		o.done = o.cb.done
		o.error = o.cb.error;
		delete o.cb;
	} else if(o.done.error) {
		o.error = o.done.error;
		if(o.done.done)
			o.done = o.done.done;
	}
	
	function maybe_done() {
		if(!ready) return;
		if(n !== m) return;
    if (o.spread)
      o.done.apply(o, results)
    else
      o.done(results)
	}

  function make_callback() {
		if(ready) console.warn("Already committed. Possible race condition...");
    var i = m++
    return function (err) {
      if (err) {
        if (_err) return
        _err = err
        n = -1 // stop
				o.error(err)
      } else {
        n++
        if (o.pluck)
          results[i] = arguments[o.pluck]
        else
          results[i] = Array.prototype.slice.call(arguments)
				maybe_done()
      }
    }
  }
	make_callback.commit = function commit() {
		ready = true;
		maybe_done();
	}
	return make_callback
}
