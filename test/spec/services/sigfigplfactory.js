'use strict';

describe('Service: SigFigPLFactory', function () {

  // load the service's module
  beforeEach(module('chemiatriaApp'));

  // instantiate service
  var SigFigPLFactory;
  beforeEach(inject(function (_SigFigPLFactory_) {
    SigFigPLFactory = _SigFigPLFactory_;
  }));

  it('should do something', function () {
    expect(!!SigFigPLFactory).toBe(true);
  });

});
