'use strict';

/**
 * @ngdoc service
 * @name chemiatriaApp.SigFigPLFactory
 * @description
 * # SigFigPLFactory
 * Factory in the chemiatriaApp.
 */
angular.module('chemiatriaApp')
  .factory('SigFigPLFactory', ['RandomFactory', function (RandomFactory, subtype, idArray, flags) {
    // initialize general properties
    return {
      getQuestion : function(subtype, idArray, flags) {
        var qToReturn = {type: 'SigFigPL', qHint: []};
        qToReturn.factOrSkill = 'skill';
        qToReturn.qAnswerFormat = 'small-text-box';
        var number, middleDigits, numZeros, zeros, firstDigits, afterDigits;
        //console.log(qToReturn.factOrSkill);
        console.log('getQuestion: ',subtype);

        qToReturn.checkMethod = function(correctAnswer, givenAnswer) {
          var answerDetailToReturn = {answer: givenAnswer};
          answerDetailToReturn.correct = Number(givenAnswer) === correctAnswer;
          answerDetailToReturn.detail = {};
          if (!answerDetailToReturn.correct) {
            if (givenAnswer.isNaN) {
              answerDetailToReturn.detail.formatError = 'Answer should be a number';
            }
            if (givenAnswer.match(/[.]/g)) {
              answerDetailToReturn.detail.formatError = 'Answer should be an integer';
            }     
          }
          return answerDetailToReturn;
        };

        //array holding responses, would depend on context. 
        //first element assumes it was careless error
        //second element provides hint
        
        

        var zeroString = '000000000000';
        //min inclusive, max exclusive
       

        switch(subtype) {
          case 'noDecimalPlace':
            number = String(RandomFactory.getRandomDigit(10, 1));
            middleDigits = RandomFactory.getRandomString(RandomFactory.getRandomDigit(3, 0), 3);
            number += String(middleDigits);
            number += String(RandomFactory.getRandomDigit(10, 1));
            qToReturn.qAnswer = number.length;
            numZeros = RandomFactory.getRandomDigit(3, 0);
            zeros = zeroString.slice(0, numZeros);
            number += String(zeros);
            qToReturn.subtype = 'noDecimalPlace';
            qToReturn.qText = 'How many significant figures does ' + number + ' have?';
            qToReturn.qID = 'SigFigPL-' + subtype +'-' + number;
            qToReturn.qHint = ['only count zeros in between non-zero digits'];
            qToReturn.qBackgroundText = 'If there is no decimal point, every non-zero digit and every zero between non-zero digits is significant';
            //console.log(qToReturn);
            break;
          case 'decimalPlace':
            number = String(RandomFactory.getRandomDigit(10, 1));
            console.log(number);
            firstDigits = RandomFactory.getRandomString(RandomFactory.getRandomDigit(3, 1), 3);
            number += String(firstDigits);
            number += '.';
            console.log(number);
            afterDigits = RandomFactory.getRandomString(RandomFactory.getRandomDigit(3, 1), 3);
            number += String(afterDigits);
            console.log(number);
            qToReturn.qAnswer = firstDigits.length + 1 + afterDigits.length;
            qToReturn.subtype = 'decimalPlace';
            qToReturn.qText = 'How many significant figures does ' + number + ' have?';
            qToReturn.qID = 'SigFigPL-' + subtype +'-' + number;
            qToReturn.qHint = ['Zeros at the end count if there\'s a decimal point'];
            qToReturn.qBackgroundText = 'Zeros at the end count if there\'s a decimal point';
            //console.log(qToReturn);
            break;
          case 'allAfterPoint':
            var numZerosBefore = RandomFactory.getRandomDigit(4, 0);
            var zerosBefore = zeroString.slice(0, numZerosBefore);
            var number1 = String(RandomFactory.getRandomDigit(10, 1));
            middleDigits = number1 + String(RandomFactory.getRandomString(RandomFactory.getRandomDigit(3, 0), 3));
            var numZerosAfter = RandomFactory.getRandomDigit(3, 0);
            var zerosAfter = zeroString.slice(0, numZerosAfter);
            number1 = '0.' + String(zerosBefore) + String(middleDigits) + String(zerosAfter);
            qToReturn.qAnswer = middleDigits.length + zerosAfter.length;
            qToReturn.subtype = 'allAfterPoint';
            qToReturn.qText = 'How many significant figures does ' + number1 + ' have?';
            qToReturn.qID = 'SigFigPL-' + subtype +'-' + number1;
            qToReturn.qHint = ['Zeros at the end count if there\'s a decimal point'];
            qToReturn.qBackgroundText = 'Zeros at the end count if there\'s a decimal point';
            break;
          case 'decimalPointNoPlaces':
            number = String(RandomFactory.getRandomDigit(10, 1));
            middleDigits = RandomFactory.getRandomString(RandomFactory.getRandomDigit(3, 0), 3);
            number += String(middleDigits);
            number += String(RandomFactory.getRandomDigit(10, 1));
            numZeros = RandomFactory.getRandomDigit(3, 0);
            zeros = zeroString.slice(0, numZeros);
            number += zeros;
            qToReturn.qAnswer = number.length;
            number += '.';
            qToReturn.subtype = 'noDecimalPlace';
            qToReturn.qText = 'How many significant figures does ' + number + ' have?';
            qToReturn.qID = 'SigFigPL-' + subtype +'-' + number;
            qToReturn.qHint = ['If there\'s a decimal point but nothing after it, all the digits are significant.'];
            qToReturn.qBackgroundText = 'If there\'s a decimal point but nothing after it, all the digits are significant.';
            break;
          default: 
            qToReturn.subtype = 'not found';
        }

        qToReturn.responseToWrong = ['Try again!', 
        'Try again, but remember: ' + qToReturn.qHint[0] + '.', 
        'Answer is ' + qToReturn.qAnswer + '. Try a new one!'];

      return qToReturn;
      }
    };
  }]);
