// function constructor for doubly linked lists
function DoublyLinkedList() {
    
    this._size = 0;
    this.head = null;
    this.tail = null;
    
}

DoublyLinkedList.prototype = {
    
    Node: function (data) {
        
        this.previous = null;
        this.data = data;
        this.next = null;
        
    },
    
    // insert new node at the front of the list
    insertFirst: function (data) {
        
        var current = this.head,
            newNode = new this.Node(data);
        
        
        // if list is empty set head and tail equal to newNode
        if (this._size === 0) {
                
            this.tail = this.head = newNode;
            
        } else {
            
            // set head equal to newNode
            newNode.next = current;
            current.previous = newNode;
            this.head = newNode;
            
        }
        
        this._size++;
        
        return newNode;
    
    },
    
    // delete first node in the list
    deleteFirst: function () {
        
        var deleted;
        
        // if list contains at least one node
        if (this._size > 0) {
            
            // head will be deleted
            deleted = this.head;
            
            // if list contains only one node, delete head and tail
            if (this._size === 1) {
                
                this.head = this.tail = null;
                this._size--;
                
                return deleted;
                
            }
            
            // delete head and set new head equal to the following node
            this.head = this.head.next;
            this.head.previous = null;
            this._size--;
            
            return deleted;
            
        }
        
        // throw an error if list is empty
        throw new Error('No node to delete');
        
    },
    
    // insert node at the end of the list
    insertLast: function (data) {
      
        var current = this.tail,
            newNode = new this.Node(data);
        
        // if list is empty set tail and head equal to newNode
        if (this._size === 0) {
                
            this.tail = this.head = newNode;
            this._size++;
            
            
        } else {
            
            // set tail equal to newNode
            newNode.previous = current;
            current.next = newNode;
            this.tail = newNode;
            
        }
        
        this._size++;
        
        return newNode;
        
    },
    
    // delete last node in the list
    deleteLast: function () {
      
        var deleted;
        
        // if list contains at least one node
        if (this._size > 0) {
        
            deleted = this.tail;
            
            // if list contains only one node, delete head and tail
            if (this._size === 1) {
                
                this.head = this.tail = null;
                this._size--;
                
                return deleted;
                
            }
            
            // set tail to the previous node
            this.tail = this.tail.previous;
            this.tail.next = null;
            this._size--;
            
            return deleted;
            
        }
        
        // throw an error if list is empty
        throw new Error('No node to delete');
        
    },
    
    // inserts node by crawling from front of list
    insertFromFront: function (newNode, position) {
        
        // start crawling from head
        var index = 1,
            previous,
            current = this.head;
        
        // crawl until position reached
        while (index < position) {

            previous = current;
            current = current.next;
            index++;

        }
        
        // insert newNode at position
        previous.next = newNode;
        newNode.previous = previous;
        newNode.next = current;
        current.previous = newNode;

        this._size++;

        return newNode;
        
    },
    
    // insert node by crawling from end of list
    insertFromEnd: function (newNode, position) {
        
        // start crawling from tail
        var index = this._size,
            next,
            current = this.tail;
        
        // crawl until position reached
        while (index > position) {

            next = current;
            current = current.previous;
            index--;

        }
        
        // insert newNode at position
        next.previous = newNode;
        newNode.next = next;
        newNode.previous = current;
        current.next = newNode;

        this._size++;

        return newNode;
        
    },
    
    // insert node at specified position
    insertAt: function (position, data) {
        
        // if position is within bounds of list
        if (position >= 1 && position <= this._size) {
            
            // find middle of list to determine shortest way to insert newNode
            var middle = Math.ceil(this._size / 2),
                newNode = new this.Node(data);
            
            // if position is in first half of list
            if (position <= middle) {
                
                // if position is 1, set head equal to newNode
                if (position === 1) {
                    return this.insertFirst(data);
                }
                
                // insert node by crawling from front
                return this.insertFromFront(newNode, position);
                
            } else {
                
                // if position is tail, set tail equal to newNode
                if (position === this._size) {
                    return this.insertLast(data);
                }
                
                // insert node by crawling from end
                return this.insertFromEnd(newNode, position);
                
            }
            
        }
        
        throw new Error('Position out of bounds');
        
    },
    
    // delete node by crawling from front of list
    deleteFromFront: function (position) {
        
        // start crawling from head
        var index = 1,
            previous,
            next,
            current = this.head;
        
        // crawl until position reached
        while (index < position) {

            previous = current;
            current = current.next;
            next = current.next;
            index++;

        }
        
        // delete current node
        previous.next = next;
        next.previous = previous;

        this._size--;

        return current;
        
    },
    
    // insert node by crawling from end of list
    deleteFromEnd: function (position) {
        
        // start crawling from tail
        var index = this._size,
            previous,
            next,
            current = this.tail;
        
        // crawl until position reached
        while (index > position) {

            next = current;
            current = current.previous;
            previous = current.previous;
            index--;

        }
        
        // delete current node
        next.previous = previous;
        previous.next = next;

        this._size--;

        return current;
        
    },
    
    // insert node at specified position
    deleteAt: function (position) {
        
        // if position is within bounds of list
        if (this._size > 0 && position >= 1 && position <= this._size) {
            
            // find middle of list to determine shortest way to delete node at position
            var middle = Math.ceil(this._size / 2);
            
            // if position is in first half of list
            if (position <= middle) {
                
                // if position is 1, set head equal to newNode
                if (position === 1) {
                    return this.deleteFirst();
                }
                
                // delete node by crawling from front
                return this.deleteFromFront(position);
                
            } else {
                
                // if position is tail, set tail equal to newNode
                if (position === this._size) {
                    return this.deleteLast();
                }
                
                // delete node by crawling from end
                return this.deleteFromEnd(position);
                
            }
            
        }
        
        throw new Error('Position out of bounds');
        
    },
    
    // delete first node found containing the specified data
    delete: function (data) {
        
        var current = this.head,
            next,
            previous;
        
        if (this._size > 0) {
        
            // if head contains data, delete head
            if (data === current.data) {

                this.head = current.next;
                this._size--;

                return true;

            } else {

                // crawl thorugh list until data is found and delete the node cointaining it
                for (var i = 1; i < this._size - 1; i++) {

                    previous = current;
                    current = current.next;
                    next = current.next;

                    if (data === current.data) {

                        previous.next = next;
                        next.previous = previous;
                        this._size--;

                        return true;
                    }
                }
            }
        }
        
        // if node isn't throw an error
        throw new Error('The specified node was not found');
        
    },
    
    // logs the full list from head to tail
    displayForward: function () {
        
        var current = this.head,
            string = '';
        
        // crawl through every nodes, appending each data to string
        while (current) {
            
            string += (current.data + ',');
            current = current.next;
            
        }
        
        console.log(string);
        
    },
    
    // logs the full list from tail to head
    displayBackward: function () {
        
        var current = this.tail,
            string = '';
        
        // crawl through every nodes, appending each data to string
        while (current) {
            
            string += (current.data + ',');
            current = current.previous;
            
        }
        
        console.log(string);
        
    },
    
    // get size of list
    getSize: function (){
        
        console.log(this._size);
        return this._size;
        
    },
    
    // delete all elements from list
    clear: function (){
        this.head = this.tail = null;
        this._size = 0;
    }
    
};

var doublyLinkedList = new DoublyLinkedList();

doublyLinkedList.getSize();
doublyLinkedList.insertFirst(3);
doublyLinkedList.displayForward();
doublyLinkedList.displayBackward();
doublyLinkedList.getSize();
doublyLinkedList.insertLast(4);
doublyLinkedList.displayForward();
doublyLinkedList.displayBackward();
doublyLinkedList.getSize();
doublyLinkedList.insertFirst(2);
doublyLinkedList.displayForward();
doublyLinkedList.displayBackward();
doublyLinkedList.getSize();
doublyLinkedList.insertLast(5);
doublyLinkedList.displayForward();
doublyLinkedList.displayBackward();
doublyLinkedList.getSize();
doublyLinkedList.insertAt(4,100);
doublyLinkedList.displayForward();
doublyLinkedList.displayBackward();
doublyLinkedList.getSize();
doublyLinkedList.insertFirst(1);
doublyLinkedList.displayForward();
doublyLinkedList.displayBackward();
doublyLinkedList.getSize();
doublyLinkedList.insertLast(6);
doublyLinkedList.displayForward();
doublyLinkedList.displayBackward();
doublyLinkedList.getSize();
doublyLinkedList.deleteAt(5);
doublyLinkedList.displayForward();
doublyLinkedList.displayBackward();
doublyLinkedList.getSize();
doublyLinkedList.insertAt(5, 30);
doublyLinkedList.displayForward();
doublyLinkedList.displayBackward();
doublyLinkedList.getSize();
doublyLinkedList.delete(30);
doublyLinkedList.displayForward();
doublyLinkedList.displayBackward();
doublyLinkedList.getSize();

doublyLinkedList.displayForward();
doublyLinkedList.clear();

doublyLinkedList.displayForward();
doublyLinkedList.delete(19);
doublyLinkedList.displayForward();
doublyLinkedList.displayBackward();
doublyLinkedList.getSize();

console.log(doublyLinkedList.head.data, doublyLinkedList.tail.data);

doublyLinkedList.deleteFirst();
doublyLinkedList.deleteFirst();
doublyLinkedList.deleteFirst();
doublyLinkedList.deleteFirst();
doublyLinkedList.deleteFirst();
doublyLinkedList.deleteFirst();
doublyLinkedList.deleteFirst();
doublyLinkedList.deleteFirst();
doublyLinkedList.deleteFirst();

doublyLinkedList.getSize();
doublyLinkedList.displayForward();
doublyLinkedList.displayBackward();
