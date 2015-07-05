'use strict';

describe('Service: SessionLog', function () {

  // load the service's module
  beforeEach(module('chemiatriaApp'));

  // instantiate service
  var SessionLog;
  beforeEach(inject(function (_SessionLog_) {
    SessionLog = _SessionLog_;
  }));

  it('should do something', function () {
    expect(!!SessionLog).toBe(true);
  });

});
