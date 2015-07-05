'use strict';

/**
 * @ngdoc service
 * @name chemiatriaApp.VocabFactory
 * @description
 * # VocabFactory
 * Factory in the chemiatriaApp.
 */
angular.module('chemiatriaApp')
  .factory('VocabFactory', ['QIDService', 'VocabListService', function (QIDService, VocabListService) {
    // Service logic
    // ...

    //subtypes; enter the word; multiple choice from random set of prompts; 
    //identify as example of: multiple choice from random group of words in similar group

    
    

    return {
      //returns an array of qID that includes fields starting at position 2 in qID (no type, subtype)

      getQuestion : function(subtype, idArray, flags) {
        var qToReturn = {type: 'VocabBasic', qHint: []};
        qToReturn.factOrSkill = 'fact';
        qToReturn.instructions = 'If you don\'t know the answer, enter 0 (zero). ' +
            'The answer will be displayed, and you\'ll see it again soon. ';
        var idParseArray = QIDService.parseID(idArray[0]);
        var word = idParseArray[2];
        //console.log('in vocabFactory:', idParseArray);
        var entry = VocabListService.getEntry(idParseArray[3]);
        if (word !== entry.word) {console.log('index does not match word');}

        //for vocab, correctAnswer is an array containing prompt and alternates
        qToReturn.checkMethod = function(correctAnswer, givenAnswer) {
          var answerDetailToReturn = {answer: givenAnswer};
          console.log('correct is: ', correctAnswer);
          console.log('given is: ', givenAnswer);

          //likely problem here
          var indexOfAnswer = correctAnswer.indexOf(givenAnswer);
          console.log(indexOfAnswer);
          answerDetailToReturn.correct = indexOfAnswer > -1;
          answerDetailToReturn.detail = {};
          if (indexOfAnswer > 0) {
            answerDetailToReturn.detail = {indexOfAnswer: indexOfAnswer};
          }
          if (givenAnswer === '0') {
            answerDetailToReturn.detail = {dontKnow: true};
          }
          console.log(answerDetailToReturn.detail);
          return answerDetailToReturn;
        };

         switch (subtype) {

          case 'wordRecall':
            qToReturn.qAnswerFormat = 'small-text-box';
            qToReturn.subtype = 'wordRecall';
            var answerArray = [word];
            console.log('entry.alternates is:', entry.alternates);

            //statement below not working
            answerArray = answerArray.concat(entry.alternates);
            console.log('answerArray:', answerArray);
            qToReturn.qAnswer = answerArray;   
            var prompt = entry.prompts[flags[0] || 0];
            qToReturn.qText = 'Enter the word or phrase that matches the prompt:\n' + prompt;
            qToReturn.qID = idArray[0];
            qToReturn.qHint = ['sorry, no hints available for vocab questions yet'];
            qToReturn.instructions +='Spelling counts. Plurals are accepted when reasonable, '+ 
              'such as key and keys. Some answers are multiple words. '+
              'All vocabulary words have multiple prompts, so give the word that seems '+
              'right even if the prompt isn\'t the same as last time.';
            //console.log(qToReturn);
            break;
          case 'defineMultipleChoice':
            
            break;
          case 'classifyExample':

            break;
          case 'classifyExampleMultipleChoice':

            break;
          default: 
            qToReturn.subtype = 'notFound';
            qToReturn.qAnswer = [0];
        }

        qToReturn.responseToWrong = ['Try again! Spell carefully.', 
        'Answer is ' + qToReturn.qAnswer[0] + '. We\'ll come back to it.'];

      return qToReturn;
      }
    };
  }]);
