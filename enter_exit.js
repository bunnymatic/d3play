MyD3 = {}

$(function() {

  var $main = $('body section.main');
  var data =['a','b','c'];

  var rowTemplate = _.template(
    '<div class="line">'+
      '<h3><%= method_name %></h3>'+
      '<a href="#" class="run_again" data-method="<%=method_name%>">(repeat)</a>'+
      '<div class="unit size1of3">'+
      '<div id="<%= method_class %>" class="container">'+
      '</div>'+
      '<%= hint %>'+
      '</div>'+
      '<div class="unit size2of3">'+
      '<div data-method="<%= method_name %>" class="code">'+
      '</div>'+
      '</div>'+
      '</div>'
  );
      
  var addRow = function(methodName, methodClass) {
    if (!$main.find('#'+methodClass).length) {
      var hint = MyD3[methodName].hint || '';
      $main.append(rowTemplate({method_name: methodName, method_class: methodClass, hint:hint}));
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
      
      // exit - remove elements
      li.exit().remove();
      
    };
    
    /* try calling this with more data */
    this.enterUpdateExit2Draw(data); 
  }
  MyD3.enterUpdateExit2.hint = "<div class='hint'>"+
    "Try<pre><code>MyD3.enterUpdateExit2Draw([1]);\nMyD3.enterUpdateExit2Draw([1,2,'this','that']);</code></pre>"+
    "</div>";

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
      
      // exit - change element color
      li.exit()
        .style("background-color", "#fafafa")
        .style('color', 'purple');
      
    };
    
    /* try calling this with more data */
    this.enterUpdateExit3Draw(data); 
  }
  MyD3.enterUpdateExit3.hint = "<div class='hint'>"+
    "Try<pre><code>MyD3.enterUpdateExit3Draw([1,2]);\nMyD3.enterUpdateExit3Draw([1,2,'this','that']);</code></pre>"+
    "</div>";

  MyD3.enterUpdateExit3();

  MyD3.eueTransition = function() {
    
    addRow('eueTransition', 
           'euet');

    var vis = d3.select('#euet')
      .append('ul')
    
    this.eueTransitionDraw = function(inputData) {
      
      // update
      var li = d3.select("#euet ul").selectAll('li')
        .data(inputData);
      
      // enter
      li.enter()
        .append('li')
        .text(function(d){return d;})
        .style('opacity',0.0)
        .style("background-color", "white")
        .transition()
        .duration(4000)
        .style("opacity", 1);
      
      // exit - change element color
      li.exit()
        .transition()
        .duration(1000)
        .style("background-color", "red")
        .style('color', 'purple')
        .remove();
      
    };
    
    /* try calling this with more data */
    this.eueTransitionDraw(data); 
  }
  MyD3.eueTransition.hint = "<div class='hint'>"+
    "Try<pre><code>MyD3.eueTransitionDraw([1,2]);\nMyD3.eueTransitionDraw([1,2,'this','that']);</code></pre>"+
    "</div>";

  MyD3.eueTransition();


  /** document */
  $('.code').showMethod();

  $('.run_again').bind('click', function(ev) {
    ev.preventDefault();
    var m = $(this).data('method');
    if(MyD3.hasOwnProperty(m)) {
      MyD3[m]();
    }
    return false;
  });
});
