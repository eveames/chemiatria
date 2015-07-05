'use strict';

describe('Service: PLPriorityService', function () {

  // load the service's module
  beforeEach(module('chemiatriaApp'));

  // instantiate service
  var PLPriorityService;
  beforeEach(inject(function (_PLPriorityService_) {
    PLPriorityService = _PLPriorityService_;
  }));

  it('should do something', function () {
    expect(!!PLPriorityService).toBe(true);
  });

});
