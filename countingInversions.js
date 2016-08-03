(function (global) {
    
    function countInversions(arr) {
        
        return splitAndCountInversions(arr).inversionsCount;
    }
    
    // implementation of counting inversions algorithm by spliting passed array
    function splitAndCountInversions(arr) {
        
        // if arr passed is a single element then there can be no inversions
        if (arr.length > 1) {

            var midIndex,
                leftPartObj,
                rightPartObj,
                arrObj;
                
            // find middle index of arr passed as argument
            midIndex = Math.ceil(arr.length / 2) - 1;
            
            // divide arr in 2 halves using the middle index of `arr`
            // recursively call @splitAndCountInversions on each half 
            // until base case is met
            leftPartObj = splitAndCountInversions(arr.slice(0, midIndex + 1));
            rightPartObj = splitAndCountInversions(arr.slice(midIndex + 1));
            
            // calls mergeAndCountSplitInversions that returns an object with the sorted array of `arr`
            // and the count of split inversions
            arrObj = mergeAndCountSplitInversions(leftPartObj.sortedArr, rightPartObj.sortedArr);
            
            // return object containing total count of inversions and sorted array of `arr`
            return {
                inversionsCount: leftPartObj.inversionsCount + rightPartObj.inversionsCount + arrObj.splitInversionsCount,
                sortedArr: arrObj.sortedArr
            };
        }
        
        return {
            inversionsCount: 0,
            sortedArr: arr
        };
    }
    
    // function sorting two arrays using the merge sort principle and counting the number of split inversions
    function mergeAndCountSplitInversions(leftArrSorted, rightArrSorted) {
        
        var leftPartSortedIndex = 0,
            rightPartSortedIndex = 0,
            splitInversionsCount = 0,
            arrSorted = [];
        
        // traverse each sorted half of `arr` pushing the samellest element first
        // count split inversions for all remaining elements of leftArrSorted if a `rightArrSorted` element is pushed
        for (var k = 0; k < (leftArrSorted.length + rightArrSorted.length); k++) {
            
            if (leftArrSorted[leftPartSortedIndex] <= rightArrSorted[rightPartSortedIndex] || rightPartSortedIndex > (rightArrSorted.length - 1)) {

                arrSorted.push(leftArrSorted[leftPartSortedIndex]);
                leftPartSortedIndex++;
            } 
            else {

                arrSorted.push(rightArrSorted[rightPartSortedIndex]);
                rightPartSortedIndex++;
                splitInversionsCount += leftArrSorted.length - (leftPartSortedIndex);
            }
        }

        // return object containing the count of split inversions and the global sorted array
        return {
            splitInversionsCount: splitInversionsCount,
            sortedArr: arrSorted
        };
    }
    
    global.countInversions = countInversions;
} (window));

