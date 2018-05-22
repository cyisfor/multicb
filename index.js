module.exports = function(o,cb) {
  var n = 0, m = 0, results = [], _err;
	var ready = false;
	/* the callback(err, arg...) convention is enforced by most modules. */

	if(!cb) {
		cb = o;
		o = {};
	}
	
	function maybe_done() {
		if(!ready) return;
		if(n !== m) return;
    if (o.spread) {
			results.unshift(null); // no error
      cb.apply(o, results);
		} else {
      cb(null, results);
		}
	}

  function make_callback() {
		if(ready) console.warn("Already committed. Possible race condition...");
    var i = m++
    return function (err) {
      if (err) {
        if (_err) return
        _err = err
        n = -1 // stop
				cb(err)
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
