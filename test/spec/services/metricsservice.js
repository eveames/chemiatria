'use strict';

describe('Service: MetricsService', function () {

  // load the service's module
  beforeEach(module('chemiatriaApp'));

  // instantiate service
  var MetricsService;
  beforeEach(inject(function (_MetricsService_) {
    MetricsService = _MetricsService_;
  }));

  it('should do something', function () {
    expect(!!MetricsService).toBe(true);
  });

});
