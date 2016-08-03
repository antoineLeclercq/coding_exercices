(function (global) {
    
    // implementation of mergeSort algorithm
    function mergeSort (arr) {
        
        // if arr passed is a single element then no sorting is needed
        // return the one element array instead
        if (arr.length > 1) {

            var midIndex,
                leftPartSorted,
                rightPartSorted,
                arrSorted = [],
                leftPartSortedIndex = 0,
                rightPartSortedIndex = 0;
            
            // find middle index of arr passed as argument
            midIndex = Math.ceil(arr.length / 2) - 1;
            
            // divide arr in 2 halves using the middle index of `arr`
            // recursively call @mergeSort on each half until leftPartSorted and rightPartSorted
            // are each equal to a one-element array
            leftPartSorted = mergeSort(arr.slice(0, midIndex + 1));
            rightPartSorted = mergeSort(arr.slice(midIndex + 1));
            
            // traverse each sorted half of `arr` pushing the samellest element first
            for (var k = 0; k < arr.length; k++) {

                if (leftPartSorted[leftPartSortedIndex] <= rightPartSorted[rightPartSortedIndex] || rightPartSortedIndex > rightPartSorted.length - 1) {

                    arrSorted.push(leftPartSorted[leftPartSortedIndex]);
                    leftPartSortedIndex++;
                } 
                else {

                    arrSorted.push(rightPartSorted[rightPartSortedIndex]);
                    rightPartSortedIndex++;
                }
            }
            
            // return the sorted version of `arr`
            return arrSorted
        }

        return arr;
    }
    
    global.mergeSort = mergeSort;
} (window));