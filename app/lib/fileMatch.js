define([
    'underscore',
    'backbone'
], function (_, Backbone, moment) {
    return FileMatch = function(fileData1, fileData2) {
        var fileData1 = fileData1;
        var fileData2 = fileData2;
        var matchTypeValue = 'unknown';

        var a = _.map(fileData1, function(value, index) {
            delete value["__parsed_extra"];
            return Object.values(value);
        });

        var b = _.map(fileData2, function(value, index) {
            delete value["__parsed_extra"];
            return Object.values(value);
        });

        _.each(a, function(item1, index1) {
            _.each(b, function(item2, index2) {
                if (_.isEqual(item1, item2)) {
                    a.splice(index1, 1);
                    b.splice(index2, 1);
                }
            });
        });

        var different = []; // completly different - this is used to test for other things, show in table
        var differentSort = []; // completly different with sort - 
        var diff = []; // completly different but somewhat the same - ???

        // only select differences with no perfect match

        var s = function(a, b) {
          return _.filter(a, function(vala, indexa) {
              return _.find(b, function(valb, indexb) {
                if (_.isEqual(vala, valb)) {
                    return true;
                }
                if (!_.isEqual(vala, valb)) {
                    different.push(vala.concat(valb));
                }
              });
          });
        };
        
        s(a, b);
        console.log("difference: ", different);
        // need to filter the list to only show items that are a bit different
        var cd = function() {
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
        
           var acceptedLengthDifference = 2;
        
           if (positionMatch && _.intersection(arr1, arr2).length >= arr1.length - acceptedLengthDifference) {
                
                // find a way to add the non matching fields somehow
                diff.push(i);

            }
          });
        };
        
        cd();

        // remove duplicates
        var diff = Array.from(new Set(diff.map(JSON.stringify)), JSON.parse);
        console.log("diff: ", diff);
        // items are sorted different
       /* var c = function(difa, difb) {
          return _.filter(difa, function(vala, indexa) {
              return _.find(difb, function(valb, indexb) {
                var va = vala.slice(0);
                var vb = valb.slice(0);
                   if (!_.isEqual(va.sort(), vb.sort())) {
                    differentSort.push(vala.concat(valb));
                  return _.isEqual(va.sort(), vb.sort());
                }
              });
          });
        };*/
        
        //c(a, b);
        //c(b, a);
    }
});