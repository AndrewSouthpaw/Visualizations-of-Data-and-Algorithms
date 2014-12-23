describe('bubbleSort', function () {
  it('should return arrays of length < 2', function () {
    expect(bubbleSort([1])).to.eql([1]);
    expect(bubbleSort([])).to.eql([]);
  });

  it('should sort an easy array', function () {
    expect(bubbleSort([2,1,3])).to.eql([1,2,3]);
  });

  it('should sort a complex array', function () {
    expect(bubbleSort([4,5,1,2,3])).to.eql([1,2,3,4,5]);
  });

  it('should handle an array in reverse order', function() {
    expect(bubbleSort([5,4,3,2,1])).to.eql([1,2,3,4,5]);
  });
});

describe('bubbleSortFaster', function () {
  it('should return arrays of length < 2', function () {
    expect(bubbleSortFaster([1])).to.eql([1]);
    expect(bubbleSortFaster([])).to.eql([]);
  });

  it('should sort an easy array', function () {
    expect(bubbleSortFaster([2,1,3])).to.eql([1,2,3]);
  });

  it('should sort a complex array', function () {
    expect(bubbleSortFaster([4,5,1,2,3])).to.eql([1,2,3,4,5]);
  });

  it('should handle an array in reverse order', function() {
    expect(bubbleSortFaster([5,4,3,2,1])).to.eql([1,2,3,4,5]);
  });
});