var _ = require('underscore');

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

// return the errors in each transactions a "flatens" them to a list
function _getErrors(a, b) {
    var errors = []
    _.each(a, function(value, index) {
        errors.push(_validate(a[index], b[index], _));
    });

    if (errors.length == 0) return "no errors";

    // remove duplicate errors
    return _.uniq(_.flatten(errors));
}

// validation for each type of field in the transaction
function _validate(a, b, _) {
    var errors = [];
    var dateMatch = /^\d{4}([./-])(0[1-9]|1[012])\1(0[1-9]|[12][0-9]|3[01])([ ])([01][0-9]|[2][0-3])([:])([0-5][0-9])\6([0-5][0-9])$/;
    var dateType = /^\d{4}([./-])\d{2}\1\d{2}([ ])\d{2}([:])\d{2}\3\d{2}$/;
    var testWallet = /^P_Nz([A-Za-z0-9]+)/;
    var testId = /\d{1,3}()\d{1,4}()\d{1,2}()\d{1,4}\d{1,3}/;
    var replaceSpecialChar = /[&\/\\#,+()$~%.'":*?<>{}]/g;

    // test for empty fields
    if (a.length == 0 || b.length == 0) {
        errors.push("a transaction field is missing");
    }

    // test for numbers
    if (a == "DEDUCT" || b == "DEDUCT") {
        errors.push("DEDUCT");
    }

    // if the differences are numbers
    if (/^(-|)\d+$/.test(a)) {

        // test for type
        if (a !== b && /^(0|1)$/.test(a) && /^(0|1)$/.test(b)) {
            errors.push(a);
        }

        // test for amount
        if (a.length != 16  &&  (parseFloat(a) > parseFloat(b) + 50 || parseFloat(b) > parseFloat(a) + 50)) {
            if (b >= 0) errors.push(a);
            else if (a >= 0) errors.push(b);
            else errors.push(-a);
        }

        // test for id's
        if (a.length == 16) {
            if (/^\d{3}4012\d{9}$/.test(a)) {
                errors.push(a);
            } else {
                errors.push(b);
            }
        }
    }

    // itest for date
    if (dateType.test(a)) {

        // test for invalid date
        if (!dateMatch.test(a) || !dateMatch.test(b)) {
            errors.push(dateMatch.test(a) ? a : b);
        }

        // test for 6 hours difference
        if (new Date(a).getTime()/1000 > new Date(b).getTime()/1000 + 43200 || new Date(b).getTime()/1000 > new Date(a).getTime()/1000 + 43200) {
            errors.push(a);
        }

    }

    // test for wallet id
    if (testWallet.test(a) && testWallet.test(b)) {

        var suggestedWallet = [];

        suggestedWallet.push(a.slice(0, 4)) //P_Nz
        a.slice(4, 5) == b.slice(4, 5) ? suggestedWallet.push(a.slice(4, 5)) : suggestedWallet.push("I");
        a.slice(5, 6) == b.slice(5, 6) ? suggestedWallet.push(a.slice(5, 6)) : suggestedWallet.push("z");
        a.slice(6, 7) == b.slice(6, 7) ? suggestedWallet.push(a.slice(6, 7)) : /[A-Z]/.test(a.slice(6, 7)) ? suggestedWallet.push("M") : suggestedWallet.push("z");      
        a.slice(7, 8) == b.slice(7, 8) ? suggestedWallet.push(a.slice(7, 8)) : /[A-Z]/.test(a.slice(7, 8)) ? suggestedWallet.push("T") : suggestedWallet.push("j"); 
        
        suggestedWallet.push(a.slice(8, 9));
        suggestedWallet.push(a.slice(9, 10));

        a.slice(10, 11) == b.slice(10, 11) ? suggestedWallet.push(a.slice(10, 11)) : /[A-Z]/.test(a.slice(10, 11)) ? suggestedWallet.push("M") : suggestedWallet.push("z");      
        a.slice(11, 12) == b.slice(11, 12) ? suggestedWallet.push(a.slice(11, 12)) : /[A-Z]/.test(a.slice(11, 12)) ? suggestedWallet.push("T") : suggestedWallet.push("j"); 
        
        suggestedWallet.push(a.slice(12, 13));

        a.slice(13, 18) == b.slice(13, 18) ? suggestedWallet.push(a.slice(13, 18)) : suggestedWallet.push("FMTM4");

        a.slice(18, 19) == b.slice(18, 19) ? suggestedWallet.push(a.slice(18, 19)) : suggestedWallet.push("M");
        a.slice(19, 20) == b.slice(19, 20) ? suggestedWallet.push(a.slice(19, 20)) : /[A-Z]/.test(a.slice(19, 20)) ? suggestedWallet.push("T") : suggestedWallet.push("j");    
        
        suggestedWallet.push(a.slice(20, 21));
        suggestedWallet.push(a.slice(21, 22));

        a.slice(22, 23) == b.slice(22, 23) ? suggestedWallet.push(a.slice(22, 23)) : suggestedWallet.push("M");
        a.slice(23, 24) == b.slice(23, 24) ? suggestedWallet.push(a.slice(23, 24)) : /[A-Z]/.test(a.slice(23, 24)) ? suggestedWallet.push("T") : suggestedWallet.push("z");    
        
        suggestedWallet.push(a.slice(24, 25));
        suggestedWallet.push(a.slice(25, 26));

        a.slice(26, 27) == b.slice(26, 27) ? suggestedWallet.push(a.slice(26, 27)) : suggestedWallet.push("O");
        a.slice(27, 28) == b.slice(27, 28) ? suggestedWallet.push(a.slice(27, 28)) : suggestedWallet.push("S");
        
        a.slice(28, 29) == b.slice(28, 29) ? suggestedWallet.push(a.slice(28, 29)) : suggestedWallet.push("4");
        a.slice(29, 30) == b.slice(29, 30) ? suggestedWallet.push(a.slice(29, 30)) : suggestedWallet.push("M");

        a.slice(30, 31) == b.slice(30, 31) ? suggestedWallet.push(a.slice(30, 31)) : suggestedWallet.push("M");
        a.slice(31, 32) == b.slice(31, 32) ? suggestedWallet.push(a.slice(31, 32)) : /[A-Z]/.test(a.slice(31, 32)) ? suggestedWallet.push("T") : suggestedWallet.push("j");    

        suggestedWallet.push(a.slice(32, 33));
        suggestedWallet.push(a.slice(33, 34));
        
        errors.push(suggestedWallet.join(""));
    }

    // test for address
    if (!dateType.test(a) && !/^(-|)\d+$/.test(a) && !dateType.test(b) && !/^(-|)\d+$/.test(b) && !testWallet.test(a) && !testWallet.test(b)) {
       
        // test for special characters
        var splitA = a.replace(replaceSpecialChar, '');
        var splitB = b.replace(replaceSpecialChar, '');
        if (a == b && splitA !== splitB) {
            if (a == splitA) {
                errors.push(a);
            } else {
                errors.push(b);
            }
        }

        // tokenize addreses
        splitA = splitA.trim().toLowerCase().split(/\s\s+/).filter(function(val) {
            val.trim();
            return val;
        });
        splitB = splitB.trim().toLowerCase().split(/\s\s+/).filter(function(val) {
            val.trim();
            return val;
        });
        
        var cities = ['gaborone', 'botswana', 'lobatse', 'mahalapye', 'malepolole', 'mogodithsane', 'pal', 'bws', 'mochudi', 'francistown', 'maun', 'johannesburg', 'bot']


        if (_.intersection(splitA, splitB) < 2)  {
            // is the last token "bw" or the next to last token in the list
            if (a[a.length-1] == "bw" && !_.contains(a[a.length - 2],cities)) {
                errors.push(b);
            } else {
                errors.push(a);
            }}
    }

    return errors;
}

// remove duplicates from merged list
function _removeDuplicates(obj) {
    return _.filter(obj, function(value, index) {
        return value[0].length > 0;
    });
}