/*jshint expr:true*/

/*
 * Bubble sort is the most basic sorting algorithm in all of Computer
 * Sciencedom. It works by starting at the first element of an array and
 * comparing it to the second element; if the first element is greater than the
 * second element, it swaps the two. It then compares the second to the third,
 * and the third to the fourth, and so on; in this way, the largest values
 * "bubble" to the end of the array. Once it gets to the end of the array, it
 * starts over and repeats the process until the array is sorted numerically.

// Time complexity: O(n^2)
*/


var bubbleSort = function(array) {
  if (array.length < 2) return array;
  // Begin on second element in array, and compare with previous values.
  // Swap if necessary.
  // Keep track of whether the array is sorted.
  var sorted = true;
  for(var i = 1; i < array.length; i++) {
    if (array[i - 1] > array[i]) {
      // If swap occurs: mark array as unsorted.
      var temp = array[i];
      array[i] = array[i - 1];
      array[i - 1] = temp;
      sorted = false;
    }
  }
  return sorted ? array : bubbleSort(array);
};
