'use strict';

/**
 * @ngdoc service
 * @name chemiatriaApp.FactPriorityService
 * @description
 * # FactPriorityService
 * Service in the chemiatriaApp.
 */
angular.module('chemiatriaApp')
  .service('FactPriorityService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function

    //ms until next to study
    var stageArray = [
    	0,					//start
    	5000,				//5s
    	25000,				//25s
    	120000,				//2 min
    	600000,				//10 min
    	86400000,			//1d
    	172800000,			//2d
    	345600000,			//4d
    	864000000,			//10d
    	2160000000			//25d
    	];

    this.update = function(studyArrayItem) {
    	//for now, just move bins based on right/wrong
    	//later, dynamically adjust bin sizes using response time?
    	var thisItem = studyArrayItem;
    	var timesStudied = thisItem.accuracyArray.length;
    	var correct = thisItem.accuracyArray[timesStudied - 1];
    	var stage = thisItem.stage;
    	var newStage;
    	if (correct == 0 && timesStudied == 0) {
    		newStage = 4;
    	}
    	else if (correct == 0) {
    		newStage = stage + 1;
    	}
    	else if (correct == 1 || stage == 0) {
    		newStage = stage;
    	}
    	else {
    		newStage = stage -1;
    	}
    	var newPriority = thisItem.lastStudied + stageArray[newStage];
    	thisItem.stage = newStage;
    	thisItem.priority = newPriority;
    	return thisItem;
    };
  });
