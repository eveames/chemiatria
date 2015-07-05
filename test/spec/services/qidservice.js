'use strict';

describe('Service: QIDService', function () {

  // load the service's module
  beforeEach(module('chemiatriaApp'));

  // instantiate service
  var QIDService;
  beforeEach(inject(function (_QIDService_) {
    QIDService = _QIDService_;
  }));

  it('should do something', function () {
    expect(!!QIDService).toBe(true);
  });

});
