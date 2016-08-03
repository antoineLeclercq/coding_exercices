(function (global) {

    var DLinkedList = function () {
        return new DoublyLinkedList();
    }
    
    // function constructor for doubly linked lists
    var DoublyLinkedList = function () {

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
        insertLeft: function (data) {

            var current = this.head,
                newNode = new this.Node(data);


            // if list is empty set head and tail equal to newNode
            if (this._size === 0) {

                this.tail = this.head = newNode;
            } 
            else {

                // set head equal to newNode
                newNode.next = current;
                current.previous = newNode;
                this.head = newNode;
            }

            this._size++;

            return newNode;
        },

        // delete first node in the list
        deleteLeft: function () {

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
        insertRight: function (data) {

            var current = this.tail,
                newNode = new this.Node(data);

            // if list is empty set tail and head equal to newNode
            if (this._size === 0) {

                this.tail = this.head = newNode;
            } 
            else {

                // set tail equal to newNode
                newNode.previous = current;
                current.next = newNode;
                this.tail = newNode;
            }

            this._size++;

            return newNode;
        },

        // delete last node in the list
        deleteRight: function () {

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
        
        _searchFromLeft: function (position) {
            
            // start crawling from head
            var index = 1,
                current = this.head;

            // crawl until position reached
            while (index < position) {

                current = current.next;
                index++;
            }
            
            return current;
        },
        
        _searchFromRight: function (position) {
            
            // start crawling from tail
            var index = this._size,
                current = this.tail;

            // crawl until position reached
            while (index > position) {
                
                current = current.previous;
                index--;
            }
            
            return current;
        },
        
        searchAt: function (position) {
          
            // if position is within bounds of list
            if (position >= 1 && position <= this._size) {

                // find middle of list to determine shortest way to search
                var middle = Math.ceil(this._size / 2);

                // if position is in first half of list
                if (position <= middle) {
                    // search by crawling from front
                    return this._searchFromLeft(position);
                } 
                else {
                    // search by crawling from end
                    return this._searchFromRight(position);
                }
            }

            throw new Error('Position out of bounds');
        },
        
        _makeActionAt: function (action) {
        
            return function (position, data) {
                
                // if position is within bounds of list
                if (position >= 1 && position <= this._size) {

                    // find middle of list to determine shortest way to access node
                    var middle = Math.ceil(this._size / 2),
                        newNode,
                        previous,
                        current,
                        next;
                    
                    // if action is to insert, declare a newNode with `data`
                    if (action === 'insert') {
                        newNode = new this.Node(data);
                    }

                    // if position is in first half of list
                    if (position <= middle) {

                        if (position === 1) {
                            
                            if (action === 'insert') {
                                // set head equal to new node
                                return this.insertLeft(data);
                            }

                            if (action === 'delete') {
                                // delete head
                                return this.deleteLeft();
                            }
                        }
                        
                        // declare current by finding it searching from the left
                        current = this._searchFromLeft(position);
                    } 
                    // if position in second half of list
                    else {
                        
                        // if position is tail's position and action is to delete, delete tail
                        if (position === this._size && action === 'delete') {
                            return this.deleteRight();
                        }
                        
                        // declare current by finding it seach from the right
                        current = this._searchFromRight(position);
                    }

                    if (action === 'insert') {
                        
                        previous = current.previous;
                        
                        // insert newNode at position
                        previous.next = newNode;
                        current.previous = newNode;
                        newNode.previous = previous;
                        newNode.next = current;
                        
                        this._size++;
                        return newNode;
                    }

                    if (action === 'delete') {
                    
                        previous = current.previous;
                        next = current.next;

                        // delete current node
                        next.previous = previous;
                        previous.next = next;
                        
                        this._size--;
                        return current;
                    }
                }

                throw new Error('Position out of bounds');
            };
        },

        // insert node at specified position
        insertAt: function (position, data) {
            
            this._makeActionAt('insert').call(this,position,data);
        },

        // insert node at specified position
        deleteAt: function (position, data) {
            
            this._makeActionAt('delete').call(this,position);
        },

        // delete first node found containing the specified data
        deleteNode: function (data) {

            var current = this.head,
                next,
                previous;

            if (this._size > 0) {
                
                if (this._size === 1) {
                    
                    // delete head and tail
                    if ( data === current.data) {
                        this.head = this.tail = null;
                        
                        this._size--;
                        return true;
                    }
                }
                else {
                    
                    // if head contains data, delete head
                    if (data === this.head.data) {

                        this.head = this.head.next;
                        this.head.previous = null;
                        
                        this._size--;
                        return true;
                    } 
                    // if tail contains data, delete data
                    else if (data === this.tail.data) {
                        
                        this.tail = this.tail.previous;
                        this.tail.next = null;
                        
                        this._size--;
                        return true;
                    }
                    else {

                        // crawl thorugh list , excluding head and tail, until data is found and delete the node cointaining it
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
            }

            // if node isn't throw an error
            throw new Error('The specified node was not found');
        },

        // logs the full list from head to tail
        displayForward: function () {

            var current = this.head,
                string = '';

            // crawl through every nodes, appending each data to string
            while (current.next) {

                string += (current.data + ',');
                current = current.next;
            }
            
            string += (current.data);
            
            return string;
        },

        // logs the full list from tail to head
        displayBackward: function () {

            var current = this.tail,
                string = '';

            // crawl through every nodes, appending each data to string
            while (current.previous) {

                string += (current.data + ',');
                current = current.previous;
            }

            string += (current.data);
            
            return string;
        },

        // get size of list
        getSize: function (){
            return this._size;
        },

        // delete all elements from list
        clear: function (){

            this.head = this.tail = null;
            this._size = 0;
        },
        
        // swap element at positionLeft with element at positionRight, assuming the fact that positions
        // are opposites when taking the middle of the list as separation
        _swap: function (positionLeft, positionRight) {
            
            var positions = {Left: positionLeft, Right: positionRight},
                positionKeys = Object.keys(positions),
                container = {};
            
            // create properties for left and right node being swapped
            for (var i = 0; i < positionKeys.length; i++) {
                
                var side = positionKeys[i];
                
                container['current' + side] = this.searchAt(positions[side]);
                container['previous' + side] = container['current' + side].previous;
                container['next' + side] = container['current' + side].next;
            }
            
            // if left node is not head
            if (container.previousLeft !== null) {
                container.previousLeft.next = container.currentRight;
            }
            
            // if right node is not tail
            if (container.nextRight !== null) {
                container.nextRight.previous = container.currentLeft;
            }
            
            // if left node and right node are head and tail
            if (container.previousLeft === null && container.nextRight === null) {
                
                this.head  = container.currentRight;
                this.tail = container.currentLeft;
            }
            
            // if left node and right node are next to each other
            if (container.currentLeft === container.previousRight && container.currentRight === container.nextLeft) {

                container.currentLeft.previous = container.currentRight;
                container.currentRight.next = container.currentLeft;
            }
            else {

                container.currentLeft.previous = container.previousRight;
                container.currentRight.next = container.nextLeft;

                container.nextLeft.previous = container.currentRight;
                container.previousRight.next = container.currentLeft;
            }
            
            container.currentLeft.next = container.nextRight;
            container.currentRight.previous = container.previousLeft;
        },
        
        // reverse the list
        reverse: function () {
            
            var indexLeft = 1,
                indexRight = this._size;
            
            // keep swapping elements until indexLeft and indexRight are equal
            while (indexLeft < indexRight) {
                
                this._swap(indexLeft, indexRight);
                
                indexLeft++;
                indexRight --;
            }
        },
        
        reversed: function () {
        }
    };
    
    global.DLinkedList = DLinkedList;
    
}(window));
