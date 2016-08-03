(function (global) {
    
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
    
    function assertThrowsError(statement, errorMessage) {
        
        try {
            statement();
        } catch (error) {
            
            if(error.toString().search(errorMessage) > -1) {
                return;
            } 
            else {
                throw new Error('Different error should be trown.\nCurrent ' + error);
            }
        }
    }
    
    global.assert = assert;
    global.assertEqual = assertEqual;
    global.assertThrowsError = assertThrowsError;
    
} (window));