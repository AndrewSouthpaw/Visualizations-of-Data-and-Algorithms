/**
 * Runs d3 visualization of bubble sort.
 */

// Globals.
var ARRAY_LENGTH = 10;
var BAR_WIDTH = 50;
var BAR_Y_AXIS = 200;
var MAX_NUMBER = 100;
var MIN_NUMBER = 10;
var ANIMATION_DURATION = 500;
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

var update = function() {
  d3.selectAll('rect')
    .data(dataArray1, function(d){return d.id;})
    .transition().duration(ANIMATION_DURATION)
    .attr('x', function(d, i) {return i * BAR_WIDTH;});

  d3.selectAll('text')
    .data(dataArray1, function(d){return d.id;})
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
    .transition()
    .attr('fill', 'yellow')
}

/**
 * clearHighlight
 * ==============
 * Removes highlighting from all bars.
 */

var clearHighlight = function(svg) {
  svg.selectAll('rect')
    .transition()
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
 * Runs the bubble sort algorithm. Requires JavaScript backflips to pause
 * processing of array to allow animation to proceed.
 */

//  var bubbleSort = function(data) {
//   andThen.reset();
//   if (data.length < 2) return data;
//   // Begin on second element in array, and compare with previous values.
//   // Swap if necessary.
//   // Keep track of whether the array is sorted.
//   var sorted = true;
//   for(var i = 1; i < data.length; i++) {
//     andThen.doThis((function() {
//       var j = i;
//       return function() {
//         highlightBars([data[j - 1], data[j]]);
//       }
//     })(),250);
//     var delay = 10;
//     andThen.doThis((function() {
//       var j = i;
//       return function() {
//         if (data[j - 1].num > data[j].num) {
//           // If swap occurs: mark array as unsorted.
//           var temp = data[j];
//           data[j] = data[j - 1];
//           data[j - 1] = temp;
//           sorted = false;
//           delay = ANIMATION_DURATION; // set delay to wait for swap animation
//           update();
//         }
//       };
//     })(), 250);
//     andThen.doThis(function() {
//       clearHighlight();
//     }, delay);
//   }
//   andThen.doThis(function() {
//     console.log(sorted)
//     return sorted ? data : bubbleSort(data);
//   }, ANIMATION_DURATION);
// };



var bubbleSort = function(data) {
  if (data.length < 2) return data;
  var sorted = true;

  // Recursive approach to call iterations within setTimeout delay
  function iterate (i) {
    if (i >= data.length) {
      return sorted ? data : bubbleSort(data);
    }

    // Show bars being compared
    highlightBars(d3.select('#sort-regular'), [data[i - 1], data[i]]);

    // Call remainder after animation for highlightBars
    setTimeout(function() {
      // Set default delay
      var delay = 10;

      // Compare elements, swap, and animate
      if (data[i - 1].num > data[i].num) {
        var temp = data[i];
        data[i] = data[i - 1];
        data[i - 1] = temp;
        sorted = false;
        delay = ANIMATION_DURATION; // set delay to wait for swap animation
        update();
      }

      // Call remainder after animation for swap
      setTimeout(function() {
        clearHighlight(d3.select('#sort-regular'));

        // Call remainder after animation for removing highlights
        setTimeout(function() {
          iterate(i + 1);
        }, 250);
      }, delay);
    }, 250);
  }

  // Initiate recursion
  iterate(1);
};


var bubbleSortFaster = function(array) {
  if (array.length < 2) return array;
  // Begin on second element in array, and compare with previous values.
  // Swap if necessary.
  var sorted = true;
  var swapPoint = 0;
  for(var i = 1; i < array.length; i++) {
    if (array[i - 1] > array[i]) {
      var temp = array[i];
      array[i] = array[i - 1];
      array[i - 1] = temp;
      // If array was sorted up to this point, toggle that it is not sorted,
      // and mark the point at which the swap occurred.
      if (sorted) {
        sorted = false;
        swapPoint = i-1;
      }
    }
  }
  if (sorted) {
    return array;
  } else {
    // Look one index before swapPoint. We'll keep the sorted
    // array up to that point, then concat the rest of the array which will be
    // sorted. If swapPoint is already 0, keep it at the beginning of the
    // array.
    swapPoint = Math.max(0, swapPoint-1)
    return array.slice(0, swapPoint)
                .concat(bubbleSortFaster(array.slice(swapPoint)));
  }
};


