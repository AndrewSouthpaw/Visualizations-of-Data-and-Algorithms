
/**
 * Faster implementation of bubble sort. Begins at unsorted portion of array
 * instead of the beginning.
 * @param  { Array.}
 * @return { Sorted array.}
 */
var bubbleSortFaster = function(array, start) {
  if (array.length < 2) return array;
  // Begin on second element in array, and compare with previous values.
  // Swap if necessary.
  var sorted = true;
  var start = start || 1;
  var swapPoint = 0;
  for(var i = start; i < array.length; i++) {
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
    return bubbleSortFaster(array, swapPoint);
  }
};
