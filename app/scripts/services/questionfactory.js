'use strict';

/**
 * @ngdoc service
 * @name chemiatriaApp.QuestionFactory
 * @description
 * # QuestionFactory
 * Factory in the chemiatriaApp.
 */
angular.module('chemiatriaApp')
  .factory('QuestionFactory', ['SigFigPLFactory', 'VocabFactory', 'QIDService',
    'RandomFactory', function (SigFigPLFactory, VocabFactory, QIDService, RandomFactory) {
    // array holds topics available, connection to appropriate factories
    //var qFactoriesAvailable = [{type: 'SigFigPL', factory: 'SigFigPLFactory'},
     // {type: Vocab, factory: 'VocabFactory'}];
//var qFactoriesAvailable = [{type: 'SigFigPL', factory: 'SigFigPLFactory'}];
    // ...
    // type is SigFigPL, Vocab, DimAnalPL, etc
    // subtype is specific format/detail, or for vocab topic area
    //idArray: if type is vocab/from database, holds single value to be retrieved
    //idAarray: if not vocab, randomly generated, holds list of ids to avoid
    //flags object: holds extra settings to tailor q generation
    return {
      getQuestion: function(studyArrayItem) {
        var qToReturn = {};
        var type = studyArrayItem.type;
        //console.log(type);
        var subtype, qID, idArray, stage;

        //in here, put logic to determine subtype, idArray, flags
        switch(type)  {
          case 'SigFigPL': 
            subtype = studyArrayItem.subtype[0];
            qToReturn = SigFigPLFactory.getQuestion(subtype, [], {});
            break;
          case 'VocabBasic':
            subtype = 'wordRecall'; 
            qID = studyArrayItem.qID;
            var idParseArray = QIDService.parseID(qID);
            var numPrompts = idParseArray[4];
            idArray = [qID];
            stage = studyArrayItem.stage;
            var choosePrompt = function(numPrompts, stage) {
              if (stage < 4) {return [0];}
              else {
                var index = RandomFactory.getRandomDigit(numPrompts, 0);
                return [index];
              }
            };
            var flags = choosePrompt(numPrompts, stage);
            qToReturn = VocabFactory.getQuestion(subtype, idArray, flags);
            //console.log('in QuestionFactory');
            break;
          default:
            qToReturn.qText = 'Question type error';
            break;
        }
      // Public API here
      qToReturn.indexInStudyArray = studyArrayItem.indexInStudyArray;
      return qToReturn;
    }
  };
}]);
