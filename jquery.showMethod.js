$.fn.showMethod = function() {
  var inArgs = arguments;
  var init = function(opts) {
    var namespace = 'MyD3' || opts.namespace;
    var method = $(this).data('method');
    if(MyD3.hasOwnProperty(method)) {
      var m = MyD3[method];
      $(this).html($('<pre><code>' + m.toString() + '</code></pre>'));
    }
  };
  return this.each(function() {
    init.apply( this, inArgs );    
  });
};

