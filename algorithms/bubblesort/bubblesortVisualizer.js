/**
 * Runs d3 visualization of bubble sort.
 */

// Globals.
var ARRAY_LENGTH = 10;
var BAR_WIDTH = 50;
var BAR_Y_AXIS = 200;
var MAX_NUMBER = 100;
var MIN_NUMBER = 10;
var ANIMATION_DURATION = 100;
var dataArray1; // A global variable that holds the unsorted array.
               // Initialized as a random array. Manipulated by bubbleSort.
var dataArray2; // A global variable that holds the unsorted array.
               // Initialized as a random array. Manipulated by bubbleSortFaster.


/**
 * Initializes visualization.
 */
var init = function(){
  var array = createRandomArray(ARRAY_LENGTH, MIN_NUMBER, MAX_NUMBER);
  createDataBars(d3.select('#sort-regular'), array);
  createDataBars(d3.select('#sort-faster'), array);
  dataArray1 = array.slice();
  dataArray2 = array.slice();
};

var createDataBars = function(svg, data) {
  var bars = svg.selectAll('rect');
  bars.data(data,function(d){return d.id;})
    .enter()
    .append('rect')
    .attr(
      {
        'width': BAR_WIDTH,
        'height': function(d){return d.num;},
        'x': function(d,i){return BAR_WIDTH * i;},
        'y': function(d){ return BAR_Y_AXIS - d.num;},
        'fill': 'green'
      });
  var text = svg.selectAll('text');
  text.data(data, function(d){return d.id;})
    .enter()
    .append('text')
    .text(function(d){return d.num;})
    .attr(
      {
        'fill': 'black',
        'font-size': 18,
        'x': function(d,i){return i * BAR_WIDTH + (BAR_WIDTH / 2);},
        'y': BAR_Y_AXIS,
        'text-anchor': 'middle'
      });
};


/**
 * update
 * ======
 * Updates placement of the bars.
 */

var update = function(svg, data) {
  svg.selectAll('rect')
    .data(data, function(d){return d.id;})
    .transition().duration(ANIMATION_DURATION)
    .attr('x', function(d, i) {return i * BAR_WIDTH;});

  svg.selectAll('text')
    .data(data, function(d){return d.id;})
    .transition().duration(ANIMATION_DURATION)
    .attr('x', function(d, i) {return i * BAR_WIDTH + (BAR_WIDTH / 2);});
}

/**
 * highlightBars
 * =============
 * Animates highlighting of bars being compared.
 */

var highlightBars = function(svg, data) {
  svg.selectAll('rect')
    .data(data, function(d) {return d.id;})
    .transition().duration(ANIMATION_DURATION)
    .attr('fill', 'yellow')
}

/**
 * clearHighlight
 * ==============
 * Removes highlighting from all bars.
 */

var clearHighlight = function(svg) {
  svg.selectAll('rect')
    .transition().duration(ANIMATION_DURATION)
    .attr('fill', 'green');
}


/**
 * createRandomArray
 * =================
 * Returns an array of specified length with random numbers.
 */
var createRandomArray = function(length, min, max){
  var result = [];
  for (var i = 0; i < length; i++){
    var newElement = {};
    newElement["num"] = Math.floor(Math.random() * (max - min) + min);
    newElement["id"] = i;
    result.push(newElement);
  }
  return result;
}


/**
 * bubbleSort
 * ==========
 * Handles sorting and visualization of sorting process. Can specify 'faster'
 * to specify a faster implementation of bubble sort.
 */

var bubbleSort = function(algorithm, data, start) {
  // Store svg for later reference
  
  var svg, start;
  if (algorithm === 'faster') {
    svg = d3.select('#sort-faster');
    start = start || 1;
  } else {
    svg = d3.select('#sort-regular');
    start = 1;
  }

  // Reset andThen timer for each recursive round
  andThen.reset();

  if (data.length < 2) return data;
  
  // Begin on second element in array, and compare with previous values.
  // Swap if necessary.
  var sorted = true;
  var swapPoint = 0;
  for(var i = start; i < data.length; i++) {
    andThen.doThis((function() {
      var j = i;
      return function() {
        highlightBars(svg, [data[j - 1], data[j]])
      };
    })(),ANIMATION_DURATION)

    andThen.doThis((function() {
      var j = i;
      return function() {
        var delay = 10;
        if (data[j - 1].num > data[j].num) {
          var temp = data[j];
          data[j] = data[j - 1];
          data[j - 1] = temp;
          // If array was sorted up to this point, toggle that it is not sorted,
          // and mark the point at which the swap occurred.
          if (sorted) {
            sorted = false;
            swapPoint = j-1;
          } 
          update(svg, data);
        }
      };
    })(), ANIMATION_DURATION);

    
    andThen.doThis(function() {
      clearHighlight(svg);
    }, ANIMATION_DURATION)
    
  }
  andThen.doThis(function() {
    if (sorted) {
      return data;
    } else {
      // Look one index before swapPoint. We'll keep the sorted
      // data up to that point, then concat the rest of the array which will be
      // sorted. If swapPoint is already 0, keep it at the beginning of the
      // array.
      return bubbleSort(algorithm, data, swapPoint);
    }
    
  },ANIMATION_DURATION);
};


