var _ = require('underscore');
var testForAddres = require("./fileMatchValidateAddres.js");
var testForId = require("./fileMatchValidateId.js");
var testForWalletId = require("./fileMatchValidateWalletId.js");
var fileMatchNumberDifference = require("./fileMatchNumberDifference.js");

// validation for each type of field in the transaction
module.exports = function validate(a, b) {
    var suggestions = [];
    var dateMatch = /^\d{4}([./-])(0[1-9]|1[012])\1(0[1-9]|[12][0-9]|3[01])([ ])([01][0-9]|[2][0-3])([:])([0-5][0-9])\6([0-5][0-9])$/;
    var dateType = /^\d{4}([./-])\d{2}\1\d{2}([ ])\d{2}([:])\d{2}\3\d{2}$/;
    var testWallet = /^P_Nz([A-Za-z0-9]+)/;
    var testId = /\d{1,3}()\d{1,4}()\d{1,2}()\d{1,4}\d{1,3}/;

    // test for empty fields
    if (a.length == 0 || b.length == 0) {
        suggestions.push("a transaction field is missing");
    }

    // test for description
    if (/^DEDUCT|REVERSAL$/.test(a) || /^DEDUCT|REVERSAL$/.test(b)) {
        suggestions.push("DEDUCT");
    }

    // if the differences are numbers
    if (/^(-|)\d+$/.test(a)) {
        suggestions.push(fileMatchNumberDifference(a, b));
    }

    // test for date
    if (dateType.test(a)) {
        // test for invalid date
        if (!dateMatch.test(a) || !dateMatch.test(b)) {
            suggestions.push(dateMatch.test(a) ? a : b);
        } else {
            suggestions.push(a);
        }
    }

    // test for wallet id
    if (testWallet.test(a) && testWallet.test(b)) {
        suggestions.push(testForWalletId(a, b));
    }

    // test for address
    if (!dateType.test(a) && !/^(-|)\d+$/.test(a) && !testWallet.test(a) && !/^DEDUCT|REVERSAL$/.test(a) ) {
        suggestions.push(testForAddres(a));
    }

    return suggestions;
}