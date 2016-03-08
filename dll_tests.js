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

    var unitTests = {

        dLinkedListCreationTest: function () {

            var dLinkedList = DLinkedList();

            assert(dLinkedList.head && dLinkedList._size && dLinkedList.tail, 'dLinkedList was not created');
        },

        insertLeftTest: function () {

            var dLinkedList = DLinkedList();

            dLinkedList.insertLeft(5);
            assertEqual(dLinkedList.head.data, 5);
            assertEqual(dLinkedList.head, dLinkedList.tail);
            assertEqual(dLinkedList._size, 1);

            dLinkedList.insertLeft(3);
            assertEqual(dLinkedList.head.data, 3);
            assertEqual(dLinkedList.tail.data, 5);
            assertEqual(dLinkedList.head.next.data, dLinkedList.tail.data);
            assertEqual(dLinkedList.tail.previous.data, dLinkedList.head.data);
            assertEqual(dLinkedList._size, 2);
            
             dLinkedList.insertLeft('string');
            assertEqual(dLinkedList.head.data, 'string');
            assertEqual(dLinkedList.tail.data, 5);
            assertEqual(dLinkedList.head.next.data, 3);
            assertEqual(dLinkedList.tail.previous.data, 3);
            assertEqual(dLinkedList._size, 3);
        },
        
        insertRightTest: function () {
            
            var dLinkedList = DLinkedList();

            dLinkedList.insertRight(5);
            assertEqual(dLinkedList.head.data, 5);
            assertEqual(dLinkedList.tail, dLinkedList.head);
            assertEqual(dLinkedList._size, 1);

            dLinkedList.insertRight(3);
            assertEqual(dLinkedList.head.data, 5);
            assertEqual(dLinkedList.tail.data, 3);
            assertEqual(dLinkedList.head.next.data, dLinkedList.tail.data);
            assertEqual(dLinkedList.tail.previous.data, dLinkedList.head.data);
            assertEqual(dLinkedList._size, 2);
            
             dLinkedList.insertRight('string');
            assertEqual(dLinkedList.head.data, 5);
            assertEqual(dLinkedList.tail.data, 'string');
            assertEqual(dLinkedList.head.next.data, 3);
            assertEqual(dLinkedList.tail.previous.data, 3);
            assertEqual(dLinkedList._size, 3);
        },
        
        deleteLeftTest: function () {
            
            var dLinkedList = DLinkedList();

            dLinkedList.insertLeft(5);
            dLinkedList.deleteLeft();
            assertEqual(dLinkedList._size, 0);
            assertEqual(dLinkedList.head, null);
            assertEqual(dLinkedList.tail, dLinkedList.head);
            
            dLinkedList.insertLeft(3);
            dLinkedList.insertLeft(2);
            dLinkedList.insertLeft('string');
            dLinkedList.deleteLeft();
            assertEqual(dLinkedList._size, 2);
            assertEqual(dLinkedList.head.data, 2);
            assertEqual(dLinkedList.tail.data, 3);
            
            
            dLinkedList.deleteLeft();
            assertEqual(dLinkedList._size, 1);
            assertEqual(dLinkedList.head.data, 3);
            assertEqual(dLinkedList.head.next, null);
            assertEqual(dLinkedList.head.previous, null);
            assertEqual(dLinkedList.tail, dLinkedList.head);
            
            dLinkedList.deleteLeft();
            assertEqual(dLinkedList._size, 0);
            assertEqual(dLinkedList.head, null);
            assertEqual(dLinkedList.tail, dLinkedList.head);
        },
        
        deleteRightTest: function () {
            
            var dLinkedList = DLinkedList();

            dLinkedList.insertLeft(5);
            dLinkedList.deleteRight();
            assertEqual(dLinkedList._size, 0);
            assertEqual(dLinkedList.head, null);
            assertEqual(dLinkedList.tail, dLinkedList.head);
            
            dLinkedList.insertLeft('string');
            dLinkedList.insertLeft(2);
            dLinkedList.insertLeft(4);
            dLinkedList.deleteRight();
            assertEqual(dLinkedList._size, 2);
            assertEqual(dLinkedList.head.data, 4);
            assertEqual(dLinkedList.tail.data, 2);
            
            
            dLinkedList.deleteRight();
            assertEqual(dLinkedList._size, 1);
            assertEqual(dLinkedList.head.data, 4);
            assertEqual(dLinkedList.head.next, null);
            assertEqual(dLinkedList.head.previous, null);
            assertEqual(dLinkedList.tail, dLinkedList.head);
            
            dLinkedList.deleteRight();
            assertEqual(dLinkedList._size, 0);
            assertEqual(dLinkedList.head, null);
            assertEqual(dLinkedList.tail, dLinkedList.head);
        },
        
        seachAtTest: function (position) {
            
            var dLinkedList = new DLinkedList();
            
            for (var i = 0; i < 3; i++) {
                
                dLinkedList.insertRight(i);
                assertEqual(dLinkedList.searchAt(i + 1).data, i);
            }
        },
        
        insertAtTest: function () {
            
            var dLinkedList = DLinkedList();
            
            assertThrowsError(function () {dLinkedList.insertAt(0, 10);},'Position out of bounds');
            assertThrowsError(function () {dLinkedList.insertAt(1, 10);},'Position out of bounds');
            assertThrowsError(function () {dLinkedList.insertAt(2, 10);},'Position out of bounds');
            
            dLinkedList.insertLeft(5);
            dLinkedList.insertAt(1,10);
            assertEqual(dLinkedList._size, 2);
            assertEqual(dLinkedList.head.data, 10);
            assertEqual(dLinkedList.tail.data, 5);
            
            assertThrowsError(function () {dLinkedList.insertAt(3, 20);},'Position out of bounds');
            
            dLinkedList.insertAt(2,20);
            assertEqual(dLinkedList._size, 3);
            assertEqual(dLinkedList.head.data, 10);
            assertEqual(dLinkedList.tail.data, 5);
            assertEqual(dLinkedList.head.next.data, 20);
            
            dLinkedList.insertAt(3,8);
            assertEqual(dLinkedList._size, 4);
            assertEqual(dLinkedList.head.data, 10);
            assertEqual(dLinkedList.tail.data, 5);
            assertEqual(dLinkedList.tail.previous.data, 8);
        },
        
        deleteAtTest: function () {
            
            var dLinkedList = DLinkedList();
            
            assertThrowsError(function () {dLinkedList.deleteAt(0);},'Position out of bounds');
            assertThrowsError(function () {dLinkedList.deleteAt(1);},'Position out of bounds');
            assertThrowsError(function () {dLinkedList.deleteAt(2);},'Position out of bounds');
            
            
            for (var i = 0; i < 3; i++) {
                
                dLinkedList.insertRight(i);
            }
            
            assertThrowsError(function () {dLinkedList.deleteAt(4);},'Position out of bounds');
            
            dLinkedList.deleteAt(2);
            assertEqual(dLinkedList._size, 2);
            assertEqual(dLinkedList.head.data, 0);
            assertEqual(dLinkedList.tail.data, 2);
            assertEqual(dLinkedList.head.next.data, dLinkedList.tail.data);
            
            dLinkedList.deleteAt(2);
            assertEqual(dLinkedList._size, 1);
            assertEqual(dLinkedList.head.data, 0);
            assertEqual(dLinkedList.head.next, null);
            assertEqual(dLinkedList.head.previous, null);
            assertEqual(dLinkedList.head, dLinkedList.tail);
            
            
            assertThrowsError(function () {dLinkedList.deleteAt(2);},'Position out of bounds');
            
            dLinkedList.deleteAt(1);
            assertEqual(dLinkedList._size, 0);
            assertEqual(dLinkedList.head, null);
            assertEqual(dLinkedList.tail, dLinkedList.head);
        },
        
        deleteNodeTest: function () {
            
            var dLinkedList = DLinkedList();
            
            assertThrowsError(function () {dLinkedList.deleteNode(0);},'The specified node was not found');
            
            
            for (var i = 0; i < 3; i++) {
                
                dLinkedList.insertRight(i);
            }
            
            assertThrowsError(function () {dLinkedList.deleteNode(5);},'The specified node was not found');
            
            dLinkedList.deleteNode(1);
            assertEqual(dLinkedList._size, 2);
            assertEqual(dLinkedList.head.data, 0);
            assertEqual(dLinkedList.tail.data, 2);
            assertEqual(dLinkedList.head.next.data, dLinkedList.tail.data);
            
            dLinkedList.deleteNode(2);
            assertEqual(dLinkedList._size, 1);
            assertEqual(dLinkedList.head.data, 0);
            assertEqual(dLinkedList.head.data, dLinkedList.tail.data);
            
            
            assertThrowsError(function () {dLinkedList.deleteNode(2);},'The specified node was not found');
            
            dLinkedList.deleteNode(0);
            assertEqual(dLinkedList._size, 0);
            assertEqual(dLinkedList.head, null);
            assertEqual(dLinkedList.tail, dLinkedList.head);
        },
        
        displayForwardTest: function () {
            
            var dLinkedList = DLinkedList();
            
            for (var i = 0; i < 3; i++) {
                
                dLinkedList.insertRight(i);
            }
            
            assertEqual(dLinkedList.displayForward(), '0,1,2')
            assertEqual(dLinkedList._size, 3);
        },
        
        displayBackwardTest: function () {
            
            var dLinkedList = DLinkedList();
            
            for (var i = 0; i < 3; i++) {
                
                dLinkedList.insertRight(i);
            }
            
            assertEqual(dLinkedList.displayBackward(), '2,1,0')
            assertEqual(dLinkedList._size, 3);
        },
        
        getSizeTest: function () {
            
            var dLinkedList = DLinkedList();
            
            assertEqual(dLinkedList.getSize(), 0);
            
            for (var i = 0; i < 3; i++) {
                
                dLinkedList.insertRight(i);
                assertEqual(dLinkedList.getSize(), i + 1);
            }
        },
        
        clearTest: function () {
            
            var dLinkedList = DLinkedList();
            
            for (var i = 0; i < 3; i++) {
                
                dLinkedList.insertRight(i);
            }
            
            dLinkedList.clear();
            assertEqual(dLinkedList._size, 0);
            assertEqual(dLinkedList.head, null);
            assertEqual(dLinkedList.tail, dLinkedList.head);
        },
        
        reverseTest: function () {
            
            var dLinkedList = DLinkedList();
            
            for (var i = 0; i < 6; i++) {
                
                dLinkedList.insertRight(i);
            }
            
            dLinkedList.reverse();
            assertEqual(dLinkedList._size, 6);
            assertEqual(dLinkedList.displayForward(), '5,4,3,2,1,0');
            
            
            dLinkedList.clear();
            
            for (var i = 0; i < 3; i++) {
                
                dLinkedList.insertRight(i);
            }
            
            dLinkedList.reverse();
            assertEqual(dLinkedList._size, 3);
            assertEqual(dLinkedList.displayForward(), '2,1,0');
            
            dLinkedList.clear();
            
            for (var i = 0; i < 2; i++) {
                
                dLinkedList.insertRight(i);
            }
            
            dLinkedList.reverse();
            assertEqual(dLinkedList._size, 2);
            assertEqual(dLinkedList.displayForward(), '1,0');
        }
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
    }
} ());
