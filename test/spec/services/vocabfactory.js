'use strict';

describe('Service: VocabFactory', function () {

  // load the service's module
  beforeEach(module('chemiatriaApp'));

  // instantiate service
  var VocabFactory;
  beforeEach(inject(function (_VocabFactory_) {
    VocabFactory = _VocabFactory_;
  }));

  it('should do something', function () {
    expect(!!VocabFactory).toBe(true);
  });

});
