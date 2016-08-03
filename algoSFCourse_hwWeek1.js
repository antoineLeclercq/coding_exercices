/* Instructions: compute the number of inversions in the file given, where the ith row of the file indicates the ith entry of an array.*/

// include countingInversions.js in index.html

(function () {
    
    var xhttp = new XMLHttpRequest(),
        arr;

    xhttp.open('GET', 'algoSFCourse_hwWeek1_file.txt', false);
    xhttp.send();

    arr = xhttp.responseText.split('\n');

    for (var i = 0; i < arr.length; i++) {

        arr[i] = parseInt(arr[i]);
    }

    console.log(countInversions(arr));
    
} ());
