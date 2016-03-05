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

    unitTests = {

        dllCreationTest: function () {

            var dll = DLL();

            assert(dll.head && dll._size && dll.tail, 'Dll was not created');
        },

        insertLeftTest: function () {

            var dll = DLL();

            dll.insertLeft(5);
            assertEqual(dll.head.data, 5);
            assertEqual(dll.tail.data, 5);
            assertEqual(dll._size, 1);

            dll.insertLeft(3);
            assertEqual(dll.head.data, 3);
            assertEqual(dll.tail.data, 5);
            assertEqual(dll.head.next.data, 5);
            assertEqual(dll.tail.previous.data, 3);
            assertEqual(dll._size, 2);
            
             dll.insertLeft(2);
            assertEqual(dll.head.data, 2);
            assertEqual(dll.tail.data, 5);
            assertEqual(dll.head.next.data, 3);
            assertEqual(dll.tail.previous.data, 3);
            assertEqual(dll._size, 3);
        },
    }

    unitTests.dllCreationTest();
    unitTests.insertLeftTest();
} ());
