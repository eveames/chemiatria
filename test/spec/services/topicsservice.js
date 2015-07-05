'use strict';

describe('Service: TopicsService', function () {

  // load the service's module
  beforeEach(module('chemiatriaApp'));

  // instantiate service
  var TopicsService;
  beforeEach(inject(function (_TopicsService_) {
    TopicsService = _TopicsService_;
  }));

  it('should do something', function () {
    expect(!!TopicsService).toBe(true);
  });

});
