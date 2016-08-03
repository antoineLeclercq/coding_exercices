(function () {

    var unitTests = {

        mergeSortTest: function () {
            
            assertEqual(Object.prototype.toString.call(mergeSort([0])), '[object Array]');
            assertEqual(mergeSort([0]).toString(), [0].toString());
            assertEqual(mergeSort([1,0]).toString(), [0,1].toString());
            assertEqual(mergeSort([2,1,0]).toString(), [0,1,2].toString());
            assertEqual(mergeSort([4,9,1,5,7,8,3,5,9]).toString(), [1,3,4,5,5,7,8,9,9].toString());
        }
    };
    
    var unitTestsMethods = Object.keys(unitTests);
    
    for (var i = 0; i < unitTestsMethods.length; i++) {
        
        try {
            unitTests[unitTestsMethods[i]]();
            console.log(unitTestsMethods[i] + ' OK');
        }
        catch (error) {

            if (error) {
                console.log(unitTestsMethods[i] + ' failed.\n' + error);
            }
        }
    };
} ());

