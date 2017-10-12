var _ = require('underscore');
var Backbone = require('backbone');
    module.exports = FileMatch = function(fileData1, fileData2) {

        var matchTypeValue = 'unknown';

        var a = _.map(fileData1, function(value, index) {
            delete value["__parsed_extra"];
            return Object.values(value);
        });

        var b = _.map(fileData2, function(value, index) {
            delete value["__parsed_extra"];
            return Object.values(value);
        });

        // create array from objects
        a = Array.from(new Set(a.map(JSON.stringify)), JSON.parse);
        b = Array.from(new Set(b.map(JSON.stringify)), JSON.parse);

        var rDuplicates = function(a, b) {
            var g = true;
            var ls = [];
            _.each(a, function(itema, indexa) {
                g = true;
                _.each(b, function(itemb, indexb) {
                    if (_.isEqual(itema, itemb)) { g = false; }
                });
                if (g) ls.push(itema);
            });
    
            return ls;
        }

        var als = rDuplicates(a, b);
        var bls = rDuplicates(b, a);

        var different = []; // completly different - this is used to test for other things, show in table
        var differentSort = []; // completly different with sort - 

        // only select differences with no perfect match
        var s = function(als, bls) {
          return _.filter(als, function(vala, indexa) {
              return _.find(bls, function(valb, indexb) {
                if (_.isEqual(vala, valb)) {
                    return true;
                }
                if (!_.isEqual(vala, valb)) {
                    different.push(vala.concat(valb));
                }
              });
          });
        };

        s(als, bls);

        // need to filter the list to only show items that are a bit different
        var spreadDifference = function(acceptedLengthDifference, acceptedLengthDifferenceMin) {
            var diff = [];
            _.filter(different, function(item, index) {
                var i = item.slice(0);
                var ii = i.slice(0);
                var iii = i.slice(0);
                var sliceLengthFirst = i.length%2==0 ? i.length/2 : (i.length-1)/2;
                var sliceLengthLast = i.length%2==0 ? i.length/2 : i.length+1/2;
                var arr1 = ii.splice(0, sliceLengthFirst);
                var arr2 = iii.splice(sliceLengthLast, item.length);
                i = arr1.concat(arr2);
           
           var positionMatch = _.every(_.intersection(arr1, arr2), function(item, index) {
                return arr1.indexOf(index) == arr2.indexOf(index);
           });
           if (positionMatch && _.intersection(arr1, arr2).length >= arr1.length - acceptedLengthDifference) {
                i.unshift(_.difference(arr1, arr2));
                diff.push(i);
            }
          });
          return diff;
        };

        var diff = spreadDifference(2); // completly different but somewhat the same - ???
        var bigDiff = spreadDifference(7); // completly different but somewhat the same but not really - ???
        bigDiff = rDuplicates(bigDiff, diff);

        // remove duplicates
        var diff = Array.from(new Set(diff.map(JSON.stringify)), JSON.parse);
        var bigDiff = Array.from(new Set(bigDiff.map(JSON.stringify)), JSON.parse);

        return {
            "differentFieldMatchSmall": diff,
            "differentFieldMatchBig": bigDiff
        }
    };