var _ = require("underscore");

module.exports = function testForAddres(transaction) {
    var cities = ['GABORONE', 'BOTSWANA', 'LOBATSE', 'MAHALAPYE', 'MALEPOLOLE', 'MOGODITHSANE', 'PALAPYE', 'SEROWE', 'MOCHAUDI', 'FRSNCISTOWN', 'MAUN', 'JOHANNESBURG']

    // add BW to the end of the list
    transaction = transaction.replace(/[a-zA-z]{1,2}$/, "BW");

    /** remove spaces, convert to upper case and split the address in separate array chunks
        transaction[transaction.length-1] - BW
        transaction[transaction.length-2] - town
        transaction[transaction.length-3] - other strings
        transaction[transaction.length-4] - * (if exists)
    **/
    transaction = transaction.trim().toUpperCase().split(/\s\s+/).filter(function(val) {
        val.trim();
        return val;
    });

    if (transaction.length > 2) {

        // test if the address maches teh city array
        if (!_.contains(cities, transaction[transaction.length-2])) {
            _.find(cities, function(city) {
                
                // test if the city could be mismatched
                if (_.intersection(city.split(''), transaction[transaction.length-2].split('')).length > 2 && !city.includes(transaction[transaction.length-2])
                 && transaction[transaction.length-2].length <= 3) {
                    transaction[transaction.length-2] = city
                }

                // get the common part between the city and the rest of the address
                if (_.intersection(city.split(''), transaction[transaction.length-3].split('')).length > 2) {
                    
                    // match address to different city
                    switch(transaction[transaction.length-2]) {
                        case "BOTSWANA":
                            if (!/^\d+/.test(transaction[transaction.length-3])) {
                                transaction[transaction.length-3] = transaction[transaction.length-3].replace(/^/, Math.floor(Math.random()* 900000) + 100000 + " ");
                            }
                            break;
                        case "LOBATSE":
                            if (!/^CHOPPIES|Choppies/.test(transaction[transaction.length-3])) {
                                transaction[transaction.length-3] = transaction[transaction.length-3].replace(/^/, "Choppies ");
                            }
                            break;
                        case "MAHALAPYE":
                            if (!/^\*MAHALAPYE/.test(transaction[transaction.length-3])) {
                                transaction[transaction.length-3] = transaction[transaction.length-3].replace(/^/, "*MAHALAPYE ");
                            }
                            break;
                        case "MALEPOLOLE":
                            if (!/^\*/.test(transaction[transaction.length-3])) {
                                transaction[transaction.length-3] = transaction[transaction.length-3].replace(/^/, "*");
                            }
                            break;
                        case "MOGODITSHANE":
                            if (!/^\*MOGODITSHANE2$/.test(transaction[transaction.length-3])) {
                                transaction[transaction.length-3] = transaction[transaction.length-3].replace(/^.+$/, "*MOGODITSHANE2");
                            }
                            break;
                        case "PALAPYE":
                            if (!/^PALAPYE Branch|PALAPYE CHOPPIES/.test(transaction[transaction.length-3])) {
                                transaction[transaction.length-3] = transaction[transaction.length-3].replace("", "PALAPYE Branch");
                            }
                            break;
                        case "SEROWE":
                            if (!/^SEROWE Branch/.test(transaction[transaction.length-3])) {
                                transaction[transaction.length-3] = transaction[transaction.length-3].replace(/^/, "SEROWE Branch");
                            }
                            break;
                        case "FRANCISTOWN":
                            if (!/^\*TONOTA|SHELL FRANCISTOWN|Sunset Butchery 100343|FRANCISTOWN INDUSTRIAL|F'TOWN GAME$/.test(transaction[transaction.length-3])) {
                                transaction[transaction.length-3] = transaction[transaction.length-3].replace("", "*TONOTA");
                            }
                            break;
                        case "MAUN":
                            if (!/^\*MAUN/.test(transaction[transaction.length-3])) {
                                transaction[transaction.length-3] = transaction[transaction.length-3].replace(/^/, "*MAUN");
                            }
                            break;
                        case "KAGISO":
                            if (!/^GABORONE$/.test(transaction[transaction.length-3])) {
                                transaction[transaction.length-3] = transaction[transaction.length-3].replace("", "GABORONE");
                            }
                            break;                        
                    }
                }

                return (_.intersection(city.split(''), transaction[transaction.length-2].split('')).length > 2 && !city.includes(transaction[transaction.length-2])
                && transaction[transaction.length-2].length <= 3);
            });

        }

    }

    return transaction.join(" ");
}
