'use strict';

/**
 * @ngdoc service
 * @name chemiatriaApp.StudyArrayService
 * @description
 * # StudyArrayService
 * Service in the chemiatriaApp.
 */

angular.module('chemiatriaApp')
  .service('StudyArrayService', ['PLPriorityService', 'FactPriorityService', 
  	function (PLPriorityService, FactPriorityService) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.initializeStudyArray = function(studyArray) {
    	var addFields = function(element, index) {
    		element.lastStudied = null;
    		element.accuracyArray = [];
    		element.rtArray = [];
    		element.priority = 1;
    		element.indexInStudyArray = index;
    		switch (element.priorityCalcAlgorithm) {
    			case 'PL' :
    				element.stage = 'discovery';
    				break;
    			case 'fact' :
    				element.stage = '0';
    				break;
    			default: 
    				element.stage = 'AlgorithmRecognitionError';
    				break;
    		}
    		return element;
    	};
    		
    	return studyArray.map(addFields);
    };

    this.update = function(studyArray, currentQResult) {
    	var index = currentQResult.indexInStudyArray;
    	studyArray[index].lastStudied = Date.now();
    	var tries = currentQResult.answersGiven.length;
    	studyArray[index].accuracyArray.push(tries - 1);
    	var qTimeArray = [];
    	for (var i = 0; i < currentQResult.answersGiven.length; i++) {
    		qTimeArray.push(currentQResult.answersGiven[i].timeToReply);
    	}
    	studyArray[index].rtArray.push(qTimeArray);
    	switch (studyArray[index].priorityCalcAlgorithm) {
    		case 'PL': 
    			studyArray[index] = PLPriorityService.update(studyArray[index]);
    			break;
    		case 'fact':
    			studyArray[index] = FactPriorityService.update(studyArray[index]);
    			break;
    		default: 
    			console.log('priorityCalcAlgorithm not recognized');
    	}
    	return studyArray;
    };

  }]);
