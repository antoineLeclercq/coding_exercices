(function () {

    var unitTests = {

        quickSort: function () {
            
//            assertEqual(Object.prototype.toString.call(quickSort([0])), '[object Array]');
//            assertEqual(quickSort([0]).toString(), [0].sort().toString());
//            assertEqual(quickSort([1,0]).toString(), [1,0].sort().toString());
//            assertEqual(quickSort([4,1,3]).toString(), [4,1,3].sort().toString());
            assertEqual(quickSort([1,2,3,4,5]).toString(), [1,2,3,4,5].sort().toString());
            assertEqual(quickSort([4,9,1,5,7,8,3,5,9]).toString(), [4,9,1,5,7,8,3,5,9].sort().toString());
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