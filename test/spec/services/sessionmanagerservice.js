'use strict';

describe('Service: SessionManagerService', function () {

  // load the service's module
  beforeEach(module('chemiatriaApp'));

  // instantiate service
  var SessionManagerService;
  beforeEach(inject(function (_SessionManagerService_) {
    SessionManagerService = _SessionManagerService_;
  }));

  it('should do something', function () {
    expect(!!SessionManagerService).toBe(true);
  });

});
