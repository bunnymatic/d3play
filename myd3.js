$(function() {
  
  var vis = d3.select('#container')
    .append('svg')
    .attr('width', '100%')
    .attr('height','100%')
    .append('g').attr('id', 'interim').append('g').attr('id', 'viewport');
  
  var rads = [ 1,10,10,20,200,2000 ];
  var circles_data = _.map(rads, function(v) {
    var cx = v * Math.random();
    var cy = v / Math.random();
    return { cx: cx, cy : cy, r:v };
  });
  console.log(circles_data);
  var circles = vis.selectAll('circle, text').data(circles_data);
  
  var e = circles.enter()
    .append('circle')
    .attr('cx', function(d) { return d.cx; })
    .attr('cy', function(d) { return d.cy; })
    .attr('r', function(d) { return d.r; })
    .attr("fill", function() { return "hsl(" + Math.random() * 360 + ",100%,50%)"; })
    .classed('rock', true);

  var e = circles.enter()
    .append('text')
    .attr('x', function(d) { return d.cx; })
    .attr('y', function(d) { return d.cy; })
    .text( function(d) { return d.r; });

  var oldscale;
  var scaleIt = function() {

    _me.bb();
    var bb = $("#viewport")[0].getBBox();
    var scaleH = $('#container').width() / bb.width;
    var scaleV = $('#container').height() / bb.height;
    var scale = scaleH;
    if ( Math.log(scaleH) > Math.log(scaleV) ) {
      // scale by h
      scale = scaleV;
    }
    if (oldscale == scale) {
      return false;
    }
    oldscale = scale;
    scale = scale *  .9; // account for margin
    var pos = $('#container').position();
    var centerPt = [-bb.x , -bb.y  ].join(",");
    console.log('bounds', _.map(bb, function(k,v) { return v + " => " + k;}));
    console.log('scale', scale);

    d3.select('#viewport').attr('transform',
                                'translate(' + centerPt + ") scale(" + scale + ")" );
    return true;

  };

  var interval = setInterval(function() {
    if (!scaleIt()) {
      clearInterval(interval);
    } else {
    }
  }, 1000);
  _me = {
    bb: function() {
      console.log($("#viewport")[0].getBBox());
    }
  };
});