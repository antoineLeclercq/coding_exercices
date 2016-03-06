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

        // inserts node by crawling from front of list
        _insertFromLeft: function (newNode, position) {

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
        _insertFromRight: function (newNode, position) {

            // start crawling from tail
            var index = this._size,
                next,
                current = this.tail;

            // crawl until position reached
            while (index >= position) {

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
                        return this.insertLeft(data);
                    }

                    // insert node by crawling from front
                    return this._insertFromLeft(newNode, position);
                } 
                else {
                    
                    // insert node by crawling from end
                    return this._insertFromRight(newNode, position);
                }
            }

            throw new Error('Position out of bounds');
        },

        // delete node by crawling from front of list
        _deleteFromRight: function (position) {

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
        _deleteFromLeft: function (position) {

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
                        return this.deleteLeft();
                    }

                    // delete node by crawling from front
                    return this._deleteFromLeft(position);
                } 
                else {

                    // if position is tail, set tail equal to newNode
                    if (position === this._size) {
                        return this.deleteRight();
                    }

                    // delete node by crawling from end
                    return this._deleteFromRight(position);
                }
            }

            throw new Error('Position out of bounds');
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
        }
    };
    
    global.DLinkedList = DLinkedList;
    
}(window));
