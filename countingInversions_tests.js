(function () {

    var unitTests = {

        countInversionsTest: function () {
            
            assertEqual(typeof countInversions([0]), 'number');
            assertEqual(countInversions([0]), 0);
            assertEqual(countInversions([1,0]), 1);
            assertEqual(countInversions([2,1,0]), 3);
            assertEqual(countInversions([0,1,2,3,4,5]), 0);
            assertEqual(countInversions([1,3,0,2,4]), 3);
            assertEqual(countInversions([6,5,4,3,2,1]), 15);
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

