'use strict';

/**
 * @ngdoc service
 * @name chemiatriaApp.MetricsService
 * @description
 * # MetricsService
 * Service in the chemiatriaApp.
 */
angular.module('chemiatriaApp')
  .service('MetricsService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.getMetrics = function(studyArrayItem) {
    	var accArray = studyArrayItem.accuracyArray;
    	var rtArray = studyArrayItem.rtArray;

    	var plusStart = function(start) {
    		return function(a,b, c) {
    			if (c < start) {return 0;}
    			else {return a + b;}
    		};
    	};

    	var flatRTArray = rtArray.reduce(function(a, b) {
  			return a.concat(b);
		}); 

		var lastRTArray = rtArray.reduce(function(a,b) {
			return a.concat(b.pop());
		});

    	var totalAccuracy = accArray.reduce(plusStart(0));
    	var timesStudied = accArray.length;
    	var lastMistake = Math.max(accArray.lastIndexOf(1), 
    		accArray.lastIndexOf(2), accArray.lastIndexOf(3));
    	var lastStreak = timesStudied - lastMistake;
    	var accuracyLastChunk = accArray.reduce(plusStart(timesStudied - 10));
    	var totalRT = flatRTArray.reduce(plusStart(0))/flatRTArray.length;
    	var streakRT = lastRTArray.reduce(plusStart(lastMistake+1))/lastStreak;
    	var rtLastChunk = lastRTArray.reduce(plusStart(timesStudied - 10))/(Math.min(10, timesStudied));


    	return {
    		totalAccuracy: totalAccuracy, timesStudied: timesStudied,
    		lastStreak: lastStreak, accuracyLast10: accuracyLastChunk,
    		averageRT: totalRT, streakAverageRT: streakRT, averageRTLast10: rtLastChunk
    	};


    };
  });
