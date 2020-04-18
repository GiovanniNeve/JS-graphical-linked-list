/* Detecting canva<s from html */
var canvas = document.getElementById("newCanvas");
var ctx = canvas.getContext("2d");
var screenWidth = 1500;
var screenHeight = 650;
var maxNumber = 0;
var arraylength = 0;

/* Node class */

class Node {
    width;
    height;
    data = null;
    xPos = 0;
    constructor(data) {
        this.data = data;
        this.next = null;
    }

    setWidth(w) {
        this.width = w;
    }

    setHeight(h) {
        this.height = h;
    }

    setxPos(x) {
        this.xPos += x;
    }

}

/* List class */

class linkedList {
    constructor() {
        this.node = new Node();
    }

    makeNode(data) {
        var newNode = new Node(data);
        return newNode;
    }

    insertNode(node, data) {
        if (!node) {
            node = this.makeNode(data);
            return node;
        }
        while (node.next) {
            node = node.next;
        }
        if (!node.next) {
            node.next = this.makeNode(data);
            return node;
        }

    }

    drawList(node) {
        ctx.beginPath();
        ctx.clearRect(0, 0, screenWidth, screenHeight);
        ctx.stroke();

        var xPosition = 0;
        while (node) {
            var height = (screenHeight * node.data) / maxNumber;
            var width = screenWidth / arraylength;
            node.setHeight(height);
            node.setWidth(width);
            node.setxPos(xPosition);

            ctx.beginPath();
            ctx.rect(node.xPos, 0, node.width, node.height);
            ctx.stroke();

            xPosition += node.width;
            node = node.next;
        }
    }

    printNode(node) {
        while (node) {
            console.log(node.data);
            node = node.next;
        }
    }

    selectionSort(node) {
        while (node) {
            if (!node.next) {
                return node;
            }

            var copyNode = node.next;
            var min = node;

            while (copyNode) {
                if (Number(min.data) > Number(copyNode.data)) {
                    min = copyNode;
                }
                copyNode = copyNode.next;
            }
            var change = node.data;
            node.data = min.data;
            min.data = change;
            node = node.next;
        }
        return node;
    }

}

var list = new linkedList();

/* Main function activated by the button (Button) */
function startTree() {

    var values = document.getElementById("primaryInput").value;
    arraylength = values.length;
    for (var index = 0; index < values.length; index++) {
        if (Number(maxNumber) < Number(values[index])) {
            maxNumber = values[index];
        }
        list.insertNode(list.node, values[index]);
    }

    document.getElementById("primaryInput").value = "";
}

/* Function who prints the linked list (Button) */
function printList() {
    list.printNode(list.node);
}

/* Function who draws the list in the cancvas (Button) */
function drawNode() {
    list.drawList(list.node);
}

/* Insert random numbers in the list (Button) */
function randomInsert() {
    for (var i = 0; i < 100; i++) {
        var data = Math.floor(Math.random() * 100) + 1;
        list.insertNode(list.node, data);
        arraylength += 1;
        if (Number(maxNumber) < Number(data)) {
            maxNumber = data;
        }
    }
    console.log("Random insert done");
}

/* Sort the list with the selection sort alorithm */
function selectionSort() {
    list.selectionSort(list.node);
}