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
            
            console.log('insertLeftTest OK');
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
            
            console.log('insertRightTest OK');
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
            
            console.log('deleteLeftTest OK');
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
            
            console.log('deleteRight OK');
        },
        
        insertAtTest: function () {
            
            var dLinkedList = DLinkedList();
            
            assertError.call(dLinkedList,'this.insertAt(0, 10);','Position out of bounds');
            assertError.call(dLinkedList,'this.insertAt(1, 10);','Position out of bounds');
            assertError.call(dLinkedList,'this.insertAt(2, 10);','Position out of bounds');
            
            dLinkedList.insertLeft(5);
            dLinkedList.insertAt(1,10);
            assertEqual(dLinkedList._size, 2);
            assertEqual(dLinkedList.head.data, 10);
            assertEqual(dLinkedList.tail.data, 5);
            
            assertError.call(dLinkedList,'this.insertAt(3, 20);','Position out of bounds');
            
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
            
            console.log('insertAt OK');
        },
        
        deleteAtTest: function () {
            
            var dLinkedList = DLinkedList();
            
            assertError.call(dLinkedList,'this.deleteAt(0);','Position out of bounds');
            assertError.call(dLinkedList,'this.deleteAt(1);','Position out of bounds');
            assertError.call(dLinkedList,'this.deleteAt(2);','Position out of bounds');
            
            
            for (var i = 0; i < 3; i++) {
                
                dLinkedList.insertRight(i);
            }
            
            assertError.call(dLinkedList,'this.deleteAt(4);','Position out of bounds');
            
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
            
            
            assertError.call(dLinkedList,'this.deleteAt(2);','Position out of bounds');
            
            dLinkedList.deleteAt(1);
            assertEqual(dLinkedList._size, 0);
            assertEqual(dLinkedList.head, null);
            assertEqual(dLinkedList.tail, dLinkedList.head);
            
            console.log('deleteAt OK');
        },
        
        deleteNodeTest: function () {
            
            var dLinkedList = DLinkedList();
            
            assertError.call(dLinkedList,'this.deleteNode(0);','The specified node was not found');
            
            
            for (var i = 0; i < 3; i++) {
                
                dLinkedList.insertRight(i);
            }
            
            assertError.call(dLinkedList,'this.deleteNode(5);','The specified node was not found');
            
            dLinkedList.deleteNode(1);
            assertEqual(dLinkedList.head.data, 0);
            assertEqual(dLinkedList.tail.data, 2);
            assertEqual(dLinkedList.head.next.data, dLinkedList.tail.data);
            
            dLinkedList.deleteNode(2);
            assertEqual(dLinkedList.head.data, 0);
            assertEqual(dLinkedList.head.data, dLinkedList.tail.data);
            
            
            assertError.call(dLinkedList,'this.deleteNode(2);','The specified node was not found');
            
            dLinkedList.deleteNode(0);
            assertEqual(dLinkedList.head, null);
            assertEqual(dLinkedList.tail, dLinkedList.head);
            
            console.log('deleteNode OK');
        },
        
        displayForwardTest: function () {
            
            var dLinkedList = DLinkedList();
            
            for (var i = 0; i < 3; i++) {
                
                dLinkedList.insertRight(i);
            }
            
            assertEqual(dLinkedList.displayForward(), '0,1,2')
        },
        
        displayBackwardTest: function () {
            
            var dLinkedList = DLinkedList();
            
            for (var i = 0; i < 3; i++) {
                
                dLinkedList.insertRight(i);
            }
            
            assertEqual(dLinkedList.displayBackward(), '2,1,0')
        },
        
        getSizeTest: function () {
            
            var dLinkedList = DLinkedList();
            
            for (var i = 0; i < 3; i++) {
                
                dLinkedList.insertRight(i);
            }
            
            assertEqual(dLinkedList.getSize(), 3);
        },
        
        clearTest: function () {
            
            var dLinkedList = DLinkedList();
            
            for (var i = 0; i < 3; i++) {
                
                dLinkedList.insertRight(i);
            }
            
            dLinkedList.clear();
            assertEqual(dLinkedList.head, null);
            assertEqual(dLinkedList.tail, dLinkedList.head);
        }
    }
    
    var unitTestsMethods = Object.keys(unitTests);
    
    for (var i = 0; i < unitTestsMethods.length; i++) {
        
         unitTests[unitTestsMethods[i]]();
    }
    
    console.log('All unit tests succeeded');
} ());
