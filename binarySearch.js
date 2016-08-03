(function (global) {

    var binarySearch = function (arrSorted, valueSearched) {

        var minIndex,
            maxIndex,
            midIndex;
        
        // if minIdex and maxIndex are specified in the function arguments, use them
        if (arguments[2] !== undefined && arguments[3] !== undefined) {
            
            minIndex = arguments[2];
            maxIndex = arguments[3];
        } 
        else {
            
            minIndex = 0;
            maxIndex = arrSorted.length - 1;
        }
        
        // if valueSearched is not in arraySorted, return -1
        if (valueSearched < arrSorted[minIndex] || valueSearched > arrSorted[maxIndex]) {
            return -1;
        }
        
        // store middle of the portion of the array being searched
        midIndex = minIndex + Math.ceil((maxIndex - minIndex) / 2);
        
        // if middle value is the right value return mid index
        if (valueSearched === arrSorted[midIndex]) {
            return midIndex;
        }
        
        // if value is in left part of the portion being looked up, recursively look up left part
        if (valueSearched < arrSorted[midIndex]) {
            return binarySearch(arrSorted, valueSearched, minIndex, midIndex - 1);
        }
        
        // if value is in left part of the portion being looked up, recursively look up right part
        if (valueSearched > arrSorted[midIndex]) {
            
            minIndex = minIndex + 1 + Math.ceil((maxIndex - minIndex) / 2);
            
            return binarySearch(arrSorted, valueSearched, minIndex, maxIndex);
        }
    }
    
    global.binarySearch = binarySearch;

}(window));