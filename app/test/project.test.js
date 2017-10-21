var FileMatch = require('../lib/fileMatch.js');
var _ = require('underscore');


var fileData1 = [ 
    {
        ProfileName: "Card Campaign",
        TransactionDate: "2014-01-11 22:27:44",
        TransactionAmount: "-20000",
        TransactionNarrative: "*MOLEPS ATM25             MOLEPOLOLE    BW",
        TransactionDescription: "DEDUCT",
        TransactionID: "0584011808649511",
        TransactionType: 1,
        WalletReference: "P_NzI2ODY2ODlfMTM4MjcwMTU2NS45MzA5" 
    },
    {
        ProfileName: "Card Campaign",
        TransactionDate: "2014-01-11 22:39:11",
        TransactionAmount: "-10000",
        TransactionNarrative: "*MOGODITSHANE2            MOGODITHSANE  BW",
        TransactionDescription: "DEDUCT",
        TransactionID: "0584011815513406",
        TransactionType: 1,
        WalletReference: "P_NzI1MjA1NjZfMTM3ODczODI3Mi4wNzY5"
    },

];

var fileData2 = [ 
    {
        ProfileName: "Card Campaign",
        TransactionDate: "2014-01-11 22:27:44",
        TransactionAmount: "20000",
        TransactionNarrative: "*MOLEPS ATM25             MOLEPOLOLE    BW",
        TransactionDescription: "DEDUCT",
        TransactionID: "0584011808649511",
        TransactionType: 1,
        WalletReference: "P_NzI2ODY2ODlfMTM4MjcwMTU2NS45MzA5" 
    },
    {
        ProfileName: "Card Campaign",
        TransactionDate: "2014-01-12 12:56:25",
        TransactionAmount: "4310",
        TransactionNarrative: "766831 SHOPRITE GABORONE  BOTSWANA      BW",
        TransactionDescription: "REVERSAL",
        TransactionID: "0004012321856252",
        TransactionType: 0,
        WalletReference: "P_NzI0MTE0MjJfMTM4ODEzMTA0Mi42MTI3" 
    },
];

var fileMatch = new FileMatch(fileData1, fileData2);
console.log(fileMatch);
test('first transaction matching', () => {
    expect(fileMatch[0][0]).toEqual(['-20000']);
});

test('second transaction matching', () => {
    expect(fileMatch[1][0]).toEqual([ '2014-01-11 22:39:11','-10000','DEDUCT','0004012321856252',1,'P_NzIzMjA1MjZFMTM4ODczMTI3Mi4MMjY5']);
});