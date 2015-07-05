'use strict';

describe('Service: RandomFactory', function () {

  // load the service's module
  beforeEach(module('chemiatriaApp'));

  // instantiate service
  var RandomFactory;
  beforeEach(inject(function (_RandomFactory_) {
    RandomFactory = _RandomFactory_;
  }));

  it('should do something', function () {
    expect(!!RandomFactory).toBe(true);
  });

});
