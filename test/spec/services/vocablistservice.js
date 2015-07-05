'use strict';

describe('Service: VocabListService', function () {

  // load the service's module
  beforeEach(module('chemiatriaApp'));

  // instantiate service
  var VocabListService;
  beforeEach(inject(function (_VocabListService_) {
    VocabListService = _VocabListService_;
  }));

  it('should do something', function () {
    expect(!!VocabListService).toBe(true);
  });

});
