
/**
 * quicksort
 * =========
 * Sorts an array in O(n*log(n)) time on average.
 */

function quicksort (array, choosePivot) {
  /* qsort
   * ====================
   * Recursively handles sorting of the provided array.
   */
  function qsort (l, r) {
    if (l < r) {
      var pivotIndex = choosePivot(l, r);
      swap(pivotIndex, l);
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
    var p = array[l];
    var i = l + 1;
    for (var j = l + 1; j < r; j++) {
      if (array[j] < p) {
        swap(array, i, j);
        i++;
      }
    }
    swap(array, l, i - 1);
    return i - 1;   // partition point
  }

  // Provide default choosePivot functionality if none provided
  if (typeof choosePivot !== 'function') {
    choosePivot = function (l, r) { return l; };
  }

  qsort(0, array.length);
  return array;
}

/******* Helper functions *******/

function swap (array, a, b) {
  var temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}