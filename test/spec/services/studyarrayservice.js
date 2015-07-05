'use strict';

describe('Service: StudyArrayService', function () {

  // load the service's module
  beforeEach(module('chemiatriaApp'));

  // instantiate service
  var StudyArrayService;
  beforeEach(inject(function (_StudyArrayService_) {
    StudyArrayService = _StudyArrayService_;
  }));

  it('should do something', function () {
    expect(!!StudyArrayService).toBe(true);
  });

});
