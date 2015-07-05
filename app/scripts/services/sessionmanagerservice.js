'use strict';

/**
 * @ngdoc service
 * @name chemiatriaApp.SessionManagerService
 * @description
 * # SessionManagerService
 * Service in the chemiatriaApp.
 */
angular.module('chemiatriaApp')
	//insert complete list of available question generator factories
	//may want to redesign as provider?
  .service('SessionManagerService', ['QuestionFactory', 'TopicsService', 'StudyArrayService',
  	function (QuestionFactory, TopicsService, StudyArrayService) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var currentQ = {};
    var currentQResult = {};
    var sessionHistory = [];
    var learningSpeed = 1; // integer or fraction
    //var howFocused = 1; //integer or fraction
    var timeQDisplayed;
    var timeLastAction;
    var qSinceProgressReport = 0;
    var topicsList = [];
    var studyArray = [];

    var setCurrentQ = function(currentQ) {
    	currentQResult = {};
		currentQResult.type = currentQ.type;
		currentQResult.subtype = currentQ.subtype;
		currentQResult.qID = currentQ.qID;
		currentQResult.indexInStudyArray = currentQ.indexInStudyArray;
		currentQResult.answersGiven = [];
		currentQResult.hintRequests = 0;
		currentQResult.gotIt = false;
		timeQDisplayed = Date.now;
		currentQResult.timeDisplayed = timeQDisplayed;
		timeLastAction = timeQDisplayed;

    };

    var selectNextQuestion = function() {
    	//reduce studyArray to next value
    	var currentTime = Date.now();
    	//var nextQ;
    	var readiest;
    	var readiestUnready;
    	for (var i = 0; i < studyArray.length; i++) {
    		if (studyArray[i].priority === 1) {
    			if (readiest) {return readiest;} 
    			else {return studyArray[i];}
    		}
    		else if (studyArray[i] <= currentTime) {
    			if (readiest) {
    				if (readiest.priority > studyArray[i].priority) {
    				readiest = studyArray[i];
    				}
    			}
    			else {readiest = studyArray[i];}
    		}
    		else {
    			if (readiestUnready) {
    				if (readiestUnready.priority > studyArray[i].priority) {
    					readiestUnready = studyArray[i];
    				}
    			}
    			else {readiestUnready = studyArray[i];}
    		}	 
    	}
    	if (readiest) {return readiest;}
    	else {return readiestUnready;}  	
    };

    //when does currentQ/currentQResult get reset??

    this.openSession = function(username, selectedTopics) {
    	//get user history, someday

		//initialize variables if needed 
		topicsList = selectedTopics;
		studyArray = TopicsService.toStudyArray(selectedTopics);
		studyArray = StudyArrayService.initializeStudyArray(studyArray);
		//set first question
		currentQ = QuestionFactory.getQuestion(selectNextQuestion());
		//console.log(currentQ);
		setCurrentQ(currentQ);
		return currentQ;

    };

    //used to change current question in main.js
    this.getQuestion = function() {
    	currentQ = QuestionFactory.getQuestion(selectNextQuestion());
    	setCurrentQ(currentQ);
		return currentQ;

    };
    this.giveHint = function() {
    	//set hintRequests, specify which hint
    	currentQResult.hintRequests++; 

    	var whichHint = Math.min(learningSpeed + currentQResult.hintRequests -2, currentQ.qHint.length -1);
    	return currentQ.qHint[whichHint];
    };

    this.respondToResponse = function(answer) {
    	var answerDetail = currentQ.checkMethod(currentQ.qAnswer, answer);
    	//console.log('answerDetail from checkMethod is: ',answerDetail);
    	answerDetail.timeStamp = Date.now();
    	answerDetail.timeToReply = answerDetail.timeStamp - timeLastAction;
    	var correct = answerDetail.correct;
    	//console.log('correct is: ', correct);
    	var moveOn = false;

    	if (correct) {
    		currentQResult.gotIt = true;
    		answerDetail.messageSent = 'Good job! Here\'s the next question:';
    		//console.log(answerDetail.messageSent);
    		moveOn = true;
    	}
    	else if (answerDetail.detail.dontKnow) {
    		moveOn = true;
    		answerDetail.messageSent = currentQ.responseToWrong[1];
    	}

    	else {
    		var previousTries = currentQResult.answersGiven.length;
    		answerDetail.messageSent = currentQ.responseToWrong[previousTries];
    		if (previousTries > 1) { moveOn = true;}

    	}
    	currentQResult.answersGiven.push(answerDetail);

    	if (moveOn) {
    		sessionHistory.push(currentQResult);
    		studyArray = StudyArrayService.update(studyArray, currentQResult);
    	}

    	qSinceProgressReport++;
    	return {moveOn: moveOn, answerDetail: answerDetail};
    };
  }]);
