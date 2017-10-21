var _ = require('underscore');
var validate = require('./fileMatchValidate.js');

module.exports = FileMatch = function(fileData1, fileData2) {
    var a = _cleanObject(fileData1);
    var b = _cleanObject(fileData2);

    //remove duplicates
    a = Array.from(new Set(a.map(JSON.stringify)), JSON.parse);
    b = Array.from(new Set(b.map(JSON.stringify)), JSON.parse);

    var mergedTransactions = _mergedList(a, b);
    mergedTransactions = _removeDuplicates(mergedTransactions);

    return mergedTransactions;
}

// remove extra array added by Papa parse
function _cleanObject(obj) {
    return _.map(obj, function(value, index) {
        delete value["__parsed_extra"];
        return Object.values(value);
    });
}

function _mergedList(a, b) {

    var mergedTransactions = [];

    // create a single transaction list, we need it for datatables rendering
    _.each(a, function(valuea, indexa) {
        _.each(b, function(valueb, indexb) {
            if (!_.isEqual(valuea, valueb) && indexa == indexb) {
                mergedTransactions.push(valuea.concat(valueb)); 
            } 
        });
    });

    // add common traansaction fields to the list, so we have list 1 differences, list 2 differences and the errors and suggestions fields
    _.each(mergedTransactions, function(value, index) {
        value.splice(0, 0,  _.difference(value.slice(0, value.length/2), value.slice(value.length/2, value.length)));
        value.splice(value.length/2+1, 0,  _.difference(value.slice((value.length+1)/2, value.length+1), value.slice(0, (value.length+1)/2)));
        value.splice(0, 0, _getErrors(value[0], value[value.length/2]));
    });

    return mergedTransactions;
}

// return the errors in each transactions and "flaten" them to a list
function _getErrors(a, b) {
    var suggest = []
    _.each(a, function(value, index) {
        suggest.push(validate(a[index], b[index]));
    });
    
    if (suggest.length == 0) return "no suggestions";

    // remove duplicate suggestions
    return _.uniq(_.flatten(suggest));
}

// remove duplicates from merged list
function _removeDuplicates(obj) {
    return _.filter(obj, function(value, index) {
        return value[0].length > 0;
    });
}