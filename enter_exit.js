MyD3 = {}

$.fn.showMethod = function() {
  var inArgs = arguments;
  var init = function(opts) {
    var namespace = 'MyD3' || opts.namespace;
    var method = $(this).data('method');
    var m = eval([namespace, method].join('.'));
    $(this).html($('<pre><code>' + m.toString() + '</code></pre>'));
  };
  return this.each(function() {
    init.apply( this, inArgs );    
  });
};

$(function() {

  var $main = $('body section.main');
  var data =['a','b','c'];

  var rowTemplate = _.template(
    '<div class="line">'+
      '<h3><%= method_name %></h3>'+
      '<a href="#" class="run_again" data-method="<%=method_name%>">(repeat)</a>'+
      '<div class="unit size1of2">'+
      '<div id="<%= method_class %>" class="container">'+
      '</div>'+
      '</div>'+
      '<div class="unit size1of2">'+
      '<div data-method="<%= method_name %>" class="code">'+
      '</div>'+
      '</div>'+
      '</div>'
  );
      
  var addRow = function(method_name, method_class) {
    if (!$main.find('#'+method_class).length) {
      $main.append(rowTemplate({method_name: method_name, method_class: method_class}));
    }
  };

  MyD3.simple = function() {
    addRow('simple','simple');

    /* length of data does not drive the drawing */
    var vis = d3.select('#simple').append('ul')
      .data(data)
      .append('li')
      .text(function(d){return d;});
  };

  MyD3.simple();

  MyD3.simple2 = function() {
    addRow('simple2','simple2');

    /* add empty li's */
    var vis = d3.select('#simple2').append('ul');
    _.times(3, function() {
      vis.append('li')
    });

    /* fill them with data */
    vis.selectAll('li')
      .data(data)
      .text(function(d){return d;});
  };

  MyD3.simple2();

  MyD3.withEnter = function() {
    addRow('withEnter', 'with_enter');

    var vis = d3.select('#with_enter').append('ul');

    vis.selectAll('li')
      .data(data)
      .enter()
      .append('li')
      .text(function(d){return d;});
  };

  MyD3.withEnter();

  MyD3.withEnterAndFixedElement = function() {
    addRow('withEnterAndFixedElement', 
           'with_enter_and_fixed_element');

    var vis = d3.select('#with_enter_and_fixed_element')
      .append('ul')
      .append('li').text('fix me');

    /* after render, $('li').length == data.length */
    d3.select('#with_enter_and_fixed_element ul')
      .selectAll('li')
      .data(data)
      .enter()
      .append('li')
      .text(function(d){return d;});
  };

  MyD3.withEnterAndFixedElement();


  MyD3.enterUpdateExit = function() {
    
    addRow('enterUpdateExit', 
           'enter_update_exit');

    var vis = d3.select('#enter_update_exit')
      .append('ul')

    // update
    var li = vis.selectAll('li')
      .data(data);

    // enter
    li.enter()
      .append('li')
      .text(function(d){return d;});

    // exit
    li.exit().remove();

  };

  MyD3.enterUpdateExit();

  MyD3.transition = function() {
    addRow('transition', 'transition');

    var vis = d3.select('#transition')
      .append('ul')

    vis.selectAll('li')
      .data(data)
      .enter()
      .append('li')
      .text(function(d){return d;});
    
    vis.selectAll('li')
      .transition()
      .duration(1000)
      .delay(function(d,i) { return i*500; })
      .style("color", "red");

  };

  MyD3.transition();

  MyD3.enterUpdateExit2 = function() {
    
    addRow('enterUpdateExit2', 
           'enter_update_exit2');

    var vis = d3.select('#enter_update_exit2')
      .append('ul')
    
    this.enterUpdateExit2Draw = function(inputData) {
      
      // update
      var li = d3.select("#enter_update_exit2 ul").selectAll('li')
        .data(inputData);
      
      // enter
      li.enter()
        .append('li')
        .text(function(d){return d;});
      
      // exit
      li.exit().remove();
      
    };
    
    /* try calling this with more data */
    this.enterUpdateExit2Draw(data); 
  }

  MyD3.enterUpdateExit2();

  MyD3.enterUpdateExit3 = function() {
    
    addRow('enterUpdateExit3', 
           'enter_update_exit3');

    var vis = d3.select('#enter_update_exit3')
      .append('ul')
    
    this.enterUpdateExit3Draw = function(inputData) {
      
      // update
      var li = d3.select("#enter_update_exit3 ul").selectAll('li')
        .data(inputData);
      
      // enter
      li.enter()
        .append('li')
        .text(function(d){return d;});
      
      // exit
      li.exit()
        .style("background-color", "#fafafa")
        .style('color', 'purple');
      
    };
    
    /* try calling this with more data */
    this.enterUpdateExit3Draw(data); 
  }

  MyD3.enterUpdateExit3();

  /** document */
  $('.code').showMethod();

  $('.run_again').bind('click', function(ev) {
    ev.preventDefault();
    eval('MyD3.'+$(this).data('method')+'()')
    return false;
  });
});
