var FileMatch = require('../lib/fileMatch.js');


var fileData1 = [ 
    {    
        ProfileName: "Card Campaign",
        TransactionAmount: "-20000",
        TransactionDate: "2014-01-11 22:27:44",
        TransactionDescription: "DEDUCT",
        TransactionID: "0584011808649511",
        TransactionNarrative: "*MOLEPS ATM25             MOLEPOLOLE    BW",
        TransactionType: "1",
        WalletReference: "P_NzI2ODY2ODlfMTM4MjcwMTU2NS45MzA5"
    },
    {
        ProfileName: "Card Campaign",
        TransactionAmount: "-20000",
        TransactionDate: "2014-01-11 22:27:44",
        TransactionDescription: "DEDUCT",
        TransactionID: "0584011808649511",
        TransactionNarrative: "*MOLEPS ATM25             MOLEPOLOLE    BW",
        TransactionType: "1",
        WalletReference: "P_NzI2ODY2ODlfMTM4MjcwMTU2NS45MzA5"
    },
    {
        ProfileName: "Card Campaign",
        TransactionAmount: "-200001",
        TransactionDate: "2014-01-11 22:27:44",
        TransactionDescription: "DEDUCT",
        TransactionID: "0584011808649511",
        TransactionNarrative: "*MOLEPS ATM25             MOLEPOLOLE    BW",
        TransactionType: "1",
        WalletReference: "P_NzI2ODY2ODlfMTM4MjcwMTU2NS45MzA5"
    },
    {
        ProfileName: "Card Campaign1",
        TransactionAmount: "-100001",
        TransactionDate: "2014-01-11 22:27:24",
        TransactionDescription: "DEDUCT1",
        TransactionID: "058401180864951153",
        TransactionNarrative: "*MOLEPS ATM25             MOLEPOLOLE    BWT",
        TransactionType: "0",
        WalletReference: "P_NzI2ODY2ODlfMTM4MjcwMTU2NS45MzA5"
    }

];

var fileData2 = [ 
    {    
        ProfileName: "Card Campaign",
        TransactionAmount: "-20000",
        TransactionDate: "2014-01-11 22:27:44",
        TransactionDescription: "DEDUCT",
        TransactionID: "0584011808649511",
        TransactionNarrative: "*MOLEPS ATM25             MOLEPOLOLE    BW",
        TransactionType: "1",
        WalletReference: "P_NzI2ODY2ODlfMTM4MjcwMTU2NS45MzA5"
    },
    {
        ProfileName: "Card Campaign",
        TransactionAmount: "-200006",
        TransactionDate: "2014-01-11 22:27:44",
        TransactionDescription: "DEDUCT",
        TransactionID: "0584011808649511",
        TransactionNarrative: "*MOLEPS ATM25             MOLEPOLOLE    BW",
        TransactionType: "1",
        WalletReference: "P_NzI2ODY2ODlfMTM4MjcwMTU2NS45MzA5"
    },
    {
        ProfileName: "Card Campaign",
        TransactionAmount: "-20000",
        TransactionDate: "2014-01-11 22:27:44",
        TransactionDescription: "DEDUCT",
        TransactionID: "0584011808649511",
        TransactionNarrative: "*MOLEPS ATM25             MOLEPOLOLE    BW",
        TransactionType: "1",
        WalletReference: "P_NzI2ODY2ODlfMTM4MjcwMTU2NS45MzA51"
    },
    {
        ProfileName: "Card Campaign1",
        TransactionAmount: "-100001",
        TransactionDate: "2014-01-11 22:27:24",
        TransactionDescription: "DEDUCT1",
        TransactionID: "058401180864951153",
        TransactionNarrative: "*MOLEPS ATM25             MOLEPOLOLE    BWT",
        TransactionType: "0",
        WalletReference: "P_NzI2ODY2ODlfMTM4MjcwMTU2NS45MzA51"
    }
];

var fileMatch = new FileMatch(fileData1, fileData2);

test('fileMatch.diff', () => {
    expect(fileMatch.differentFieldMatchSmall.length).toBe(3);
});

test('fileMatch.bigDiff', () => {
    expect(fileMatch.differentFieldMatchBig.length).toBe(1);
});

test('fileMatch.differentFieldMatchCompletly', () => {
    expect(fileMatch.differentFieldMatchCompletly.length).toBe(2);
});