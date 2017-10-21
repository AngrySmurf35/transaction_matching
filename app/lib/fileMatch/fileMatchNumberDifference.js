var testForId = require("./fileMatchValidateId.js");

// if the differences are numbers
module.exports = function fileMatchNumberDifference(a, b) {
    // test for type
    if (a !== b && /^(0|1)$/.test(a) && /^(0|1)$/.test(b)) {
        return a;
    }

    // test for amount
    if (a.length != 16 && !/^0|1$/.test(a) && !/^0|1$/.test(b)) {
        // if it is negative and 10 multiplier
        if (/^-\d+(0)$/.test(a)) return a;
        else if (/^-\d+(0)$/.test(b)) return b;
        // else brings it to a common denominator
        else return Math.round(a/10)*10;
    }

    // test for id's
    if (a.length == 16) {
        return testForId(a, b);
    }
}