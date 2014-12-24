// Globals.
var ARRAY_LENGTH = 50;
var BAR_WIDTH = 10;
var BAR_Y_AXIS = 200;
var MAX_NUMBER = 100;
var MIN_NUMBER = 10;
var ANIMATION_DURATION = 200;
var dataArray1; // A global variable that holds the unsorted array.
               // Initialized as a random array. Manipulated by quicksort.
var steps = [];

/**
 * Initializes visualization.
 */
var init = function(){
  var array = createRandomArray(ARRAY_LENGTH, MIN_NUMBER, MAX_NUMBER);
  createDataBars(d3.select('#sort-regular'), array);
  dataArray1 = array.slice();
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
        'fill': 'lightgray'
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
        'y': BAR_Y_AXIS + 18,
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

var highlightBars = function(svg, data, color) {
  svg.selectAll('rect')
    .data(data, function(d) {return d.id;})
    .transition().duration(ANIMATION_DURATION)
    .attr('fill', color)
}

/**
 * clearHighlight
 * ==============
 * Removes highlighting from all bars.
 */

var clearHighlight = function(svg) {
  svg.selectAll('rect')
    .transition().duration(ANIMATION_DURATION)
    .attr('fill', 'lightgray');
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


function parseSteps (svg, step) {
  if (Array.isArray(step)) {
    update(svg, step);
  } else if (typeof step === 'object') {
    if (step.cmd === 'clear') {
      clearHighlight(svg);
    } else if (step.cmd === 'highlight') {
      highlightBars(svg, step.data, step.color);
    }
  }
}



/**
 * quicksort
 * =========
 * Sorts an array in O(n*log(n)) time on average.
 */

function quicksort (data, choosePivot) {
  /* qsort
   * ====================
   * Recursively handles sorting of the provided array.
   */
  function qsort (l, r) {
    if (l < r) {
      steps.push({cmd:'clear'});
      steps.push({cmd:'highlight', color:'green', data:data.slice(l, r)})
      var pivotIndex = choosePivot(l, r);
      steps.push({cmd:'highlight', color:'firebrick', data:[data[pivotIndex]]});
      swap(pivotIndex, l);
      steps.push(data.slice());
      var partitionPoint = partition(l, r);
      qsort(l, partitionPoint);
      qsort(partitionPoint + 1, r);
      
    }
  }

  /* partition
   * ====================
   * Partitions the array around a pivot element. When partitioning finishes,
   * swaps the pivot element into place with last element known to be less
   * than that element.
   */
  function partition (l, r) {
    var p = data[l];
    var i = l + 1;
    // steps.push({cmd:'highlight', color:'deepskyblue', data:[data[i]]});
    for (var j = l + 1; j < r; j++) {
      steps.push({cmd:'highlight', color:'yellow', data:[data[j]]});
      if (data[j].num < p.num) {
        // steps.push({cmd:'highlight', color:'green', data:[data[i]]});
        swap(data, i, j);
        steps.push(data.slice());
        i++;
        steps.push({cmd:'highlight', color:'deepskyblue', data:[data[i - 1]]});
      }
      // steps.push({cmd:'highlight', color:'green', data:[e]});

    }
    swap(data, l, i - 1);
    steps.push(data.slice());
    return i - 1;   // partition point
  }

  var svg;

  // Provide default choosePivot functionality if none provided
  if (typeof choosePivot !== 'function') {
    choosePivot = function (l, r) { return l; };
    svg = d3.select('#sort-regular');
  }

  qsort(0, data.length);
  steps.push({cmd:'clear'});
  steps.forEach(function(i) {
    andThen.doThis(function() {
      parseSteps(svg, i);
    }, ANIMATION_DURATION);
  });
  return data;
}

/******* Helper functions *******/

function swap (array, a, b) {
  var temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}


















// /**
//  * quicksort
//  * =========
//  * Sorts an array in O(n*log(n)) time on average.
//  */

// function quicksort (data, choosePivot) {

//   /* qsort
//    * ====================
//    * Recursively handles sorting of the provided array.
//    */
//   function qsort (l, r) {
//     if (l < r) {
//       var pivotIndex, partitionPoint;
      
//       // Set whole range to gray
//       andThen.doThis(function() {
//         highlightBars(svg, data, 'grey');
//       }, ANIMATION_DURATION);

//       // Show range in consideration
//       andThen.doThis(function() {
//         highlightBars(svg, data.slice(l,r), 'yellow');
//       }, ANIMATION_DURATION * 3);

//       // Select pivot
//       pivotIndex = choosePivot(l, r);
//       andThen.doThis(function() {
//         highlightBars(svg, [data[pivotIndex]], 'blue');
//       }, ANIMATION_DURATION);

//       // Move pivot to start of array
//       andThen.doThis(function() {
//         swap(pivotIndex, l);
//         update(svg, data);
//       }, ANIMATION_DURATION);

//       // Partition the array
//       andThen.doThis(function() {
//         partitionPoint = partition(l, r);
//         andThen.doThis(function() {
//           // Recursively sort
//           andThen.doThis(function() {
//             qsort(l, partitionPoint);
//           }, ANIMATION_DURATION);
//           andThen.doThis(function() {
//             qsort(partitionPoint + 1, r);
//           }, ANIMATION_DURATION);
//         }, ANIMATION_DURATION);
//       }, ANIMATION_DURATION);
      
//     }
//   }

//   /* partition
//    * ====================
//    * Partitions the array around a pivot element. When partitioning finishes,
//    * swaps the pivot element into place with last element known to be less
//    * than that element.
//    */
//   function partition (l, r) {
//     var p = data[l];
//     var i = l + 1;
//     for (var j = l + 1; j < r; j++) {
//       andThen.doThis((function() {
//         var y = j;
//         highlightBars(svg, [p], 'green');
//       })(), ANIMATION_DURATION);
//       andThen.doThis((function() {
//         var y = j;
//         return function() {
//           if (data[y].num < p.num) {
//             swap(data, i, y);
//             i++;
//           }
//           update(svg, data)
//         };
//       })(),ANIMATION_DURATION);
//     }
//     andThen.doThis(function() {
//       swap(data, l, i - 1);
//     }, ANIMATION_DURATION);
//     andThen.doThis(function() {
//       return i - 1;   // partition point
//     }, ANIMATION_DURATION);
//   }

//   var svg;

//   // Provide default choosePivot functionality if none provided
//   if (typeof choosePivot !== 'function') {
//     choosePivot = function (l, r) { return l; };
//     svg = d3.select('#sort-regular');
//   } else {
//     svg = d3.select('#sort-randomized');
//   }

//   qsort(0, data.length);
//   return data;
// }

// /******* Helper functions *******/

// function swap (array, a, b) {
//   var temp = array[a];
//   array[a] = array[b];
//   array[b] = temp;
// }
