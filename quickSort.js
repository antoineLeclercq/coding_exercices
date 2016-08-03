(function (global) {

    // implementation of quickSort algorithm
    function quickSort (arr) {
        
        var indexPivot,
            arrLeftPart, arrRightPart,
            minIndex, maxIndex, indexes;
        
        // assign parameters to minIndex and maxIndex if passed, else assign default values
        minIndex = typeof arguments[1] === 'number' ? arguments[1] : 0;
        maxIndex = typeof arguments[2] === 'number' ? arguments[2] : arr.length - 1;
        
        // randomized choice of the pivot
        indexPivot = Math.floor(maxIndex * Math.random());
        
        // partition poriton of `arr` between minIndex and maxIndex around the pivot
        // update index of pivot
        indexPivot = partition(arr, indexPivot, minIndex, maxIndex);
        
        // recusively call quickSort on left and right part of pivot,
        // only if the part contains more than one element
        if (indexPivot > minIndex + 1) {
            quickSort(arr, minIndex, indexPivot - 1);
        }
        
        if (indexPivot < maxIndex - 1) {
            quickSort(arr, indexPivot + 1, maxIndex);
        }
        
        return arr;
    }
    
    // implementation of subroutine partition for quickSort
    function partition (arr, indexPivot, minIndex, maxIndex) {
        
        var pivot = arr[indexPivot],
            temp,
            lessThanPivotIndex,
            moreThanPivotIndex,
            lessThanPivotCount = 0,
            moreThanPivotCount = 0;
        
        // if pivot is not first element of portion to be partitioned,
        // swap it with first element
        if (indexPivot > minIndex) {
            
            swap(arr, minIndex, indexPivot);
            indexPivot = minIndex;
        }
        
        // for elements from minIndex to maxIndex partition them using `pivot`
        // parition without using additional memory
        for (lessThanPivotIndex = indexPivot + 1, moreThanPivotIndex = indexPivot + 1; moreThanPivotIndex <= maxIndex; moreThanPivotIndex++) {

            if (arr[moreThanPivotIndex] < pivot) {

                if (moreThanPivotCount > 0) {
                    swap(arr, lessThanPivotIndex, moreThanPivotIndex);
                }

                lessThanPivotCount++;
                lessThanPivotIndex++;
            } else {

                moreThanPivotCount++;
            }
        }
        
        // if all elements after pivot are more than pivot, leave it as first element
        // otherwise swap it in its sorted position in `arr`
        if (lessThanPivotCount > 0) {

            indexPivot = lessThanPivotIndex - 1;
            swap(arr, indexPivot, minIndex);
        }

        return indexPivot;
    }
    
    // helper function for quickSort swapping element at index1 with element at index2
    function swap (arr, index1, index2) {
        
        var temp;
        
        temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;
    }
    
    global.quickSort = quickSort;

}(window));
