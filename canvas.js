/* Detecting canva<s from html */
var canvas = document.getElementById("newCanvas");
var ctx = canvas.getContext("2d");
var screenWidth = 1500;
var screenHeight = 600;
var maxNumber = 0;
var arraylength = 0;

/* -------------------------------------------------- Node class -------------------------------------------------- */

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
        this.xPos = x;
    }

}

/* -------------------------------------------------- List class -------------------------------------------------- */

class linkedList {
    constructor() {
        this.node = new Node();
        this.node.data = 5;
    }

    /* ------------------------------ Make node ------------------------------ */
    makeNode(data) {
        var newNode = new Node(data);
        return newNode;
    }

    /* ------------------------------ Insert node ------------------------------ */
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

    /* ------------------------------ Print node ------------------------------ */
    printNode(node) {
        while (node) {
            console.log(node.data);
            node = node.next;
        }
    }

    /* ------------------------------ Clear screen ------------------------------ */
    clearScreen() {
        ctx.beginPath();
        ctx.clearRect(0, 0, screenWidth, screenHeight);
        ctx.stroke();
    }

    /* ------------------------------ Clear node ------------------------------ */
    clearNode(node) {
        ctx.beginPath();
        ctx.clearRect(node.xPos, 0, node.width, screenHeight);
        ctx.stroke();
    }

    /* ------------------------------ Delay for draw list ------------------------------ */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /* ------------------------------ Draw single node ------------------------------ */
    colorNode(node, color) {
        var width = screenWidth / arraylength;
        //var xPosition = -(width);
        var height = (screenHeight * node.data) / maxNumber;

        node.setHeight(height);
        node.setWidth(width);
        //node.setxPos(xPosition);

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.fillRect(node.xPos, 0, node.width, node.height);
        ctx.stroke();

        //node.setxPos(0);
    }

    /* ------------------------------ Draw list ------------------------------ */
    async drawList(node) {
        var width = screenWidth / arraylength;
        var xPosition = 0;

        while (node) {
            await this.sleep(50);
            var height = (screenHeight * node.data) / maxNumber;
            node.setHeight(height);
            node.setWidth(width);
            node.setxPos(xPosition);

            ctx.beginPath();
            ctx.rect(node.xPos, 0, node.width, node.height);
            ctx.stroke();
            //node.setxPos(0);

            xPosition += node.width;
            node = node.next;
        }
        console.log("Draw list done");
    }

    /* ------------------------------ Selection sort ------------------------------ */
    async selectionSort(node) {
        var width = screenWidth / arraylength;
        var xPosition = -(width);

        while (node) {
            if (!node.next) {
                return node;
            }

            var copyNode = node.next;
            var min = node;
            this.colorNode(node, "blue")
            await this.sleep(100);

            while (copyNode) {
                this.colorNode(copyNode, "red")
                await this.sleep(30);

                if (Number(min.data) > Number(copyNode.data)) {
                    min = copyNode;
                }

                this.colorNode(copyNode, "gray")
                await this.sleep(100);
                copyNode = copyNode.next;

            }
            this.colorNode(node, "grey")
            await this.sleep(100);

            this.clearNode(node);
            this.clearNode(min);

            var change = node.data;
            node.data = min.data;
            min.data = change;
            xPosition += width;


            this.colorNode(node, "green")
            await this.sleep(100);

            this.colorNode(min, "gray")
            await this.sleep(100);

            node = node.next;
            //xPosition += width;
        }
        return node;
    }

}


/* -------------------------------------------------- Main -------------------------------------------------- */

var list = new linkedList(); /* Create linled list class object */

/* ---------- Manual insert data in the list (Button) ---------- */
function startTree() {

    var values = document.getElementById("primaryInput").value;
    arraylength = values.length; /* Get array lenght */
    for (var index = 0; index < values.length; index++) {
        if (Number(maxNumber) < Number(values[index])) {
            maxNumber = values[index]; /* Get the highest number in the array */
        }
        list.insertNode(list.node, values[index]); /* Call the insertNode function */
    }

    document.getElementById("primaryInput").value = ""; /* Clear input section */
}

/* ---------- Function who prints the linked list (Button) ---------- */
function printList() {
    list.printNode(list.node); /* Call the printNode function */
}

/* ---------- Function who draws the list in the cancvas (Button) ---------- */
function drawNode() {
    list.clearScreen();
    list.drawList(list.node); /* Call the drawList function */
}

/* ---------- Insert random numbers in the list (Button) ---------- */
function randomInsert() {
    for (var i = 0; i < 100; i++) {
        var data = Math.floor(Math.random() * 99);
        list.insertNode(list.node, data);
        arraylength += 1; /* Get array length */
        if (Number(maxNumber) < Number(data)) {
            maxNumber = data; /* Get max number */
        }
    }
    console.log("Random insert done");
}

/* ---------- Sort the list with the selection sort alorithm (Button) ---------- */
function selectionSort() {
    list.selectionSort(list.node);
}