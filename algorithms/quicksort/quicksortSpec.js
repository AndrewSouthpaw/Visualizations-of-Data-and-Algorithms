describe('quicksort', function () {
  var choosePivot;
  beforeEach(function () {
    choosePivot = function(l,r) {return l;};
  });
  it('should sort an array', function () {
    expect(quicksort([4,5,1,3,7,2,6], choosePivot)).to.eql([1,2,3,4,5,6,7]);
  });
  it('should handle an empty array', function () {
    expect(quicksort([], choosePivot)).to.eql([]);
  });
  it('should handle an array with one element', function () {
    expect(quicksort([1], choosePivot)).to.eql([1]);
  });
  it('should provide a default choosePivot function', function () {
    expect(quicksort([4,5,1,3,7,2,6])).to.eql([1,2,3,4,5,6,7]);
  });
  it('should work when choosePivot returns last element', function () {
    choosePivot = function(l,r) {return r-1;};
    expect(quicksort([4,5,1,3,7,2,6], choosePivot)).to.eql([1,2,3,4,5,6,7]);
  });
  it('should work when choosePivot returns random element', function () {
    choosePivot = function(l,r) {
      return Math.floor(Math.random()*((r - 1) - l)) + l;
    };
  });
});