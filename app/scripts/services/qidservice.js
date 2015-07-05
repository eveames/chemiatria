'use strict';

/**
 * @ngdoc service
 * @name chemiatriaApp.QIDService
 * @description
 * # QIDService
 * Service in the chemiatriaApp.
 */
angular.module('chemiatriaApp')
  .service('QIDService', function () {
    //gets parts of qID, index in returned array
    this.parseID = function(qID) {
    	//console.log(qID);
    	var regex = /[\w.\s]+/g;
    	var tempArray = qID.match(regex);
    	return tempArray;
    }; 
  });
