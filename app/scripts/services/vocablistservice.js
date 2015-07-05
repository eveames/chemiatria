'use strict';

/**
 * @ngdoc service
 * @name chemiatriaApp.VocabListService
 * @description
 * # VocabListService
 * Service in the chemiatriaApp.
 */
angular.module('chemiatriaApp')
  .service('VocabListService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var vocabList = [
    {word: 'matter', prompts: ['the stuff everything is made of', 
    'stuff', 'anything that has mass and occupies space', 'the physical material of everything'], 
    alternates: []},
    {word: 'property', prompts: ['a distinguishing characteristic', 
    'something that helps us tell one material from another', 
    'a particular quality or attribute of a material'], alternates: ['properties']},
    {word: 'element', prompts: ['the fundamental types of matter', 
    'the simplest form of pure substance', 'a material that has only one type of atoms'], 
    alternates: ['elements']},
    {word: 'atom', prompts: ['the building block of everything (if you ask a chemist)',
    'tiniest chunk of an element', 'particles molecules are made of'], alternates: ['atoms']},
    {word: 'molecule', prompts: ['a small group of atoms that is strongly attached to each other',
    'the smallest bit of a compound'], alternates: ['molecules']},
    {word: 'state of matter', alternates: ['phase', 'phase of matter', 'physical state'], 
    prompts: ['whether something is a solid, liquid or gas']},
    {word: 'solid', prompts: ['something hard', 
    'a material in a state where the atoms or molecules are held in fixed positions next to each other',
    'a material which does not flow and cannot be compressed'], alternates: ['solids']},
    {word: 'liquid', prompts: ['something flowy', 
    'a material in a state in which the atoms or molecules are close together but can move around',
    'a material in a state which can flow but cannot be compressed'], alternates: ['liquids']},
    {word: 'gas', alternates: ['vapor','gases', 'vapors', 'vapour', 'vapours'], prompts: ['something airy', 
    'a material in a state in which the atoms or molecules are far apart and bouncing around rapidly',
    'a material in a state which can flow and expands to fill available space']},
    {word: 'composition', prompts: ['what kind of atoms a material is made of, and in what proportion',
    'percentage of each element in a material usually by mass', 'ratio of elements in a material, pure or impure']},
    {word: 'pure substance', alternates: ['substance', 'substances', 'pure substances'], prompts: ['has only one type of atoms or molecules',
    'a material with constant properties and composition in all samples']},
    {word: 'compound', prompts: ['a pure substance that is not a pure element',
    'a substance with a distinct ratio of different elements'], alternates: ['compounds']},
    {word: 'mixture', alternates: ['mix', 'mixes', 'mixtures'], prompts: 
    ['a combination of substances that usually has properties similar or in between compared to the properties of the pure substances',
     'a material whose composition changes from sample to sample', 'a combo of materials that is not a compound']}
    ];

    this.getIDList = function(type) {
        //when multiple lists, add switch or similar to choose which array using type
        console.log('in VocabListService.getIDList');
        var map = [];
        var idMaker = function(entry, index) {
        	var numPrompts = entry.prompts.length;
          return entry.word +'-' + index + '-' +numPrompts;
      	};
        map = vocabList.map(idMaker);
        return map;
      };

    this.getEntry = function(index) {
    	return vocabList[index];
    };
  });
