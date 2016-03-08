(function (global) {
    
    var binarySearch = function (arrSorted, valueSearched) {

        var minIndex,
            maxIndex,
            midIndex;
        
        if (arguments[2] !== undefined && arguments[3] !== undefined) {
            
            minIndex = arguments[2];
            maxIndex = arguments[3];
        } 
        else {
            
            minIndex = 0;
            maxIndex = arrSorted.length - 1;
        }
        
        if (valueSearched < arrSorted[minIndex] || valueSearched > arrSorted[maxIndex]) {
            
            return -1;
        }
        
        midIndex = minIndex + Math.ceil((maxIndex - minIndex) / 2);
        
        if (valueSearched === arrSorted[midIndex]) {
            
            return midIndex;
        }
        
        if (valueSearched < arrSorted[midIndex]) {
            
            return binarySearch(arrSorted, valueSearched, minIndex, midIndex - 1);
        }
        
        if (valueSearched > arrSorted[midIndex]) {
            
            minIndex = minIndex + 1 + Math.ceil((maxIndex - minIndex) / 2);
            
            return binarySearch(arrSorted, valueSearched, minIndex, maxIndex);
        }
    }
    
    global.binarySearch = binarySearch;

}(window));