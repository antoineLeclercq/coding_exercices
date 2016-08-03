(function () {
    function assert (condition, message) {
    
        if (condition) {
            throw new Error(message);
        }
    }

    function assertEqual (reference, value) {

        if (reference !== value) {

            throw new Error(reference + ' !== ' + value);
        }
    }
    
    function assertError(statement, errorMessage) {
        
        try {
            eval(statement);
        } catch (error) {
            if(error.toString().search(errorMessage) > -1) {
                return;
            } 
            else {
                throw new Error('Error should be trown');
            }
        }
    }

    var unitTests = {

        binarySearchTest: function () {
            
            var arrSorted = [],
                matchIndex;
            
            for (var i = 1; i <= 1000000; i++) {
                
                arrSorted.push(i);
            }
            
            
            matchIndex = binarySearch(arrSorted, 1);
            assertEqual(arrSorted[matchIndex], 1);
            
            matchIndex = binarySearch(arrSorted, 1000000);
            assertEqual(arrSorted[matchIndex], 1000000);
            
            matchIndex = binarySearch(arrSorted, 49);
            assertEqual(arrSorted[matchIndex], 49);
            
            matchIndex = binarySearch(arrSorted, 650598);
            assertEqual(arrSorted[matchIndex], 650598);
            
            matchIndex = binarySearch(arrSorted, -3);
            assertEqual(matchIndex, -1);
            
            matchIndex = binarySearch(arrSorted, 90000000000);
            assertEqual(matchIndex, -1);
        },
    }
    
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
