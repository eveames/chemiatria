'use strict';

describe('Service: FactPriorityService', function () {

  // load the service's module
  beforeEach(module('chemiatriaApp'));

  // instantiate service
  var FactPriorityService;
  beforeEach(inject(function (_FactPriorityService_) {
    FactPriorityService = _FactPriorityService_;
  }));

  it('should do something', function () {
    expect(!!FactPriorityService).toBe(true);
  });

});
