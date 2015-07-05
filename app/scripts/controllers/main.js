'use strict';

/**
 * @ngdoc function
 * @name chemiatriaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chemiatriaApp
 */
angular.module('chemiatriaApp')
  .controller('MainCtrl', ['$scope', 'SessionLog', 'SessionManagerService', 'TopicsService', function ($scope, 
  	SessionLog, SessionManagerService, TopicsService) {
  	$scope.noQuestion = true;
  	$scope.session = false;
    $scope.isFrustrated = false;
    $scope.bugToReport = false;
    $scope.showResponseToFeedback = false;
    $scope.username = '';
    $scope.showStats = false;
    $scope.stats = {};
    $scope.frustrationDescription = '';
    $scope.bugDescription = '';
    $scope.topicsList = TopicsService.topicsList;
    $scope.topicsSelected = [];
    $scope.currentQ = {};
    $scope.answer = '';
    $scope.answerDetail = {}; //used to display message
    $scope.startSession = function() {
    	//console.log($scope.topicsList[0].selected, $scope.topicsList[1].selected);
    	$scope.session = true;
    	$scope.noQuestion = false;
    	$scope.topicsSelected = $scope.topicsList.filter(function(entry) {
    		//if(entry.selected) {return entry;}
    		return entry.selected;
    	});
    	console.log($scope.topicsSelected);
    	//start logging
    	SessionLog.openSession($scope.username);
    	//console.log($scope.username);
    	$scope.currentQ = SessionManagerService.openSession($scope.username, $scope.topicsSelected);
    	SessionLog.addEvent({type: 'question posted', detail: $scope.currentQ});
    	console.log($scope.currentQ.type);
    };

    //
    $scope.handleAnswer = function() {
    	var responseObj = SessionManagerService.respondToResponse($scope.answer);
    	$scope.answerDetail = responseObj.answerDetail;
    	SessionLog.addEvent({type: 'answer given', detail: $scope.answerDetail});
    	$scope.answer = '';
    	if (responseObj.moveOn) {
    		$scope.currentQ = SessionManagerService.getQuestion();
    		SessionLog.addEvent({type: 'question posted', detail: $scope.currentQ});
    	}
    };
    $scope.imFrustrated = function() {
    	$scope.isFrustrated = true;
    	var eventObj = {type: 'button push', whichButton: 'I\'m frustrated'};
    	SessionLog.addEvent(eventObj);
    };
    $scope.reportBug = function(frustrated) {
    	$scope.bugToReport = true;
    	if(frustrated) {$scope.isFrustrated = false;}
    	var eventObj = {type: 'button push', whichButton: 'Report a bug'};
    	SessionLog.addEvent(eventObj);
    };
    $scope.endSession = function() {
    	//confirm intent

    	
    	//display stats
    	$scope.session = true;
    	$scope.showResponseToFeedback = false;
    	$scope.noQuestion = true;
    	$scope.isFrustrated = false;
    	$scope.bugToReport = false;
    	$scope.stats = SessionLog.closeSession();
    	$scope.showStats = true;


    	//something smart with the session log
    	$scope.session = false;
    	$scope.topicsList = TopicsService.topicsList;

    };
    $scope.describeFrustration = function() {
    	//save description into log
    	var eventObj = {type: 'frustrated'};
    	eventObj.description = $scope.frustrationDescription;
    	SessionLog.addEvent(eventObj);
    	//say something encouraging by setting responseToFeedback and showResponseToFeedback
    	$scope.responseToFeedback = 'Thank you for sharing! I will try to improve the service based on your feedback';
    	$scope.showResponseToFeedback = true;
    	$scope.isFrustrated = false;
    	$scope.frustrationDescription = '';
    };
    $scope.describeBug = function() {
    	//save description into log
    	var eventObj = {type: 'bugReport'};
    	eventObj.description = $scope.bugDescription;
    	SessionLog.addEvent(eventObj);
    	//display thank you message with response to feedback
    	$scope.responseToFeedback = 'Thank you for sharing! I will try to improve the service based on your feedback';
    	$scope.showResponseToFeedback = true;
    	$scope.bugToReport = false;
    	$scope.bugDescription = '';
    };
    $scope.cancelDescribeBug = function() {
    	$scope.bugToReport = false;
    	var eventObj = {type: 'button push', whichButton: 'Cancel bug report'};
    	SessionLog.addEvent(eventObj);

    };
    $scope.feedbackDone = function() {
    	$scope.showResponseToFeedback = false;
    	var eventObj = {type: 'button push', whichButton: 'Done viewing response'};
    	SessionLog.addEvent(eventObj);
    	//maybe add system here for new question, etc? to deal with bugs

    };
  }]);
