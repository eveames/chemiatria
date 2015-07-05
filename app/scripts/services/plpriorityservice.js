'use strict';

/**
 * @ngdoc service
 * @name chemiatriaApp.PLPriorityService
 * @description
 * # PLPriorityService
 * Service in the chemiatriaApp.
 */
angular.module('chemiatriaApp')
  .service('PLPriorityService', ['MetricsService', function (MetricsService) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var delayWrong = 30000;
    var delayDiscover = 30000;
    var delayMaster = 240000;
    var delayReview = 1200000;

    var timesCriterionForMaster = 10; //must have studied 10x to move to master stage
    var accCriterionForMaster = 1;		// no more than 1 mistake in last 10 to move up
    var rtCriterionForReview = 10;
    var timesCriterionForReview = 30;
    var accCriterionForReview = 1;

    this.update = function(studyArrayItem) {
    	//for now, just move bins based on right/wrong
    	//later, dynamically adjust bin sizes using response time?
    	var thisItem = studyArrayItem;
    	var timesStudied = thisItem.accuracyArray.length;
    	var correct = thisItem.accuracyArray[timesStudied - 1];
    	var stage = thisItem.stage;
    	var newStage, newPriority;
    	
    	//this doesn't seem to be working quite right--repeats subtype too much
    	if (!correct) {
    		newStage = stage;
    		newPriority = thisItem.lastStudied + delayWrong;

    	}

    	else {
    		//determine if moving stages
    		//should this only depend on last 10??
    		var metrics = MetricsService.getMetrics(thisItem);
    		if (timesStudied > timesCriterionForReview && 
    			metrics.accuracyLast10 <= accCriterionForReview && 
    			metrics.averageRTLast10 < rtCriterionForReview) {
    			if (stage === 'master') {
    				newStage = 'review';
 					console.log(thisItem.type + ' ' + thisItem.subtype + ' now mastered!');
    			}
    		}

    		if (timesStudied > timesCriterionForMaster && 
    			metrics.accuracyLast10 <= accCriterionForMaster) {
    			if (stage === 'discover') {
    				newStage = 'master';
    				console.log(thisItem.type + ' ' + thisItem.subtype + ' now discovered!');
    			}
    		}
    	}
 
    	stage = newStage;

    	//update priority
    	if (stage === 'discover') {
    		newPriority = thisItem.lastStudied + delayDiscover;
    	}

    	if (stage === 'master' && correct) {
    		newPriority = thisItem.lastStudied + delayMaster;
    	}

    	if (stage === 'review' && correct) {
    		newPriority = thisItem.lastStudied + delayReview;
    	}
    	
    	thisItem.stage = newStage;
    	thisItem.priority = newPriority;
    	return thisItem;
    };
  }]);
