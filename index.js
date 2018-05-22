module.exports = function(o) {
  var n = 0, m = 0, results = [], _err;
	var ready = false;
	
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
