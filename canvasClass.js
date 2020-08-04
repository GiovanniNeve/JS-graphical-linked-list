/* Detecting canva<s from html */
var canvas = document.getElementById("newCanvas");
var ctx = canvas.getContext("2d");
var screenWidth = 1500;
var screenHeight = 600;
var maxNumber = 0;
var arraylength = 1;
var delayTime = 30;
var lastNode;

/* -------------------------------------------------- Node class -------------------------------------------------- */

class Node {
    width;
    height;
    data = null;
    xPos = 0;
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
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
    makeNode(node, data) {
        var newNode = new Node(data);
        newNode.prev = node;

        return newNode;
    }

    /* ------------------------------ Insert node ------------------------------ */
    insertNode(node, data) {
        if (!node) {
            node = this.makeNode(null, data);
            lastNode = node;
            return node;
        }
        while (node.next) {
            node = node.next;
        }
        if (!node.next) {
            node.next = this.makeNode(node, data);
            lastNode = node.next;
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
            await this.sleep(delayTime);
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

    async sortCheck(node) {
        while (node.next) {
            if (node.data <= node.next.data) {
                this.clearNode(node);
                this.colorNode(node, "Green");
                await this.sleep(node);
            }
            node = node.next;
        }
        this.clearNode(node);
        this.colorNode(node, "Green");
        await this.sleep(node);
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
            await this.sleep(delayTime);

            while (copyNode) {
                this.colorNode(copyNode, "red")
                await this.sleep(delayTime);

                if (Number(min.data) > Number(copyNode.data)) {
                    min = copyNode;
                }

                this.colorNode(copyNode, "gray")
                await this.sleep(delayTime);
                copyNode = copyNode.next;

            }

            this.clearNode(node);
            this.clearNode(min);

            if (min.data < node.data) {
                var change = node.data;
                node.data = min.data;
                min.data = change;
                xPosition += width;


                this.colorNode(node, "Yellow")
                await this.sleep(delayTime);

                this.colorNode(min, "gray")
                await this.sleep(delayTime);

            } else {

                this.colorNode(node, "gray")
                await this.sleep(delayTime);

                this.colorNode(min, "Yellow")
                await this.sleep(delayTime);
            }

            node = node.next;
            //xPosition += width;
        }
        return node;
    }

    /* ------------------------------ Insertion sort ------------------------------ */
    async insertionSort(node) {
        var change;

        if (!node) {
            return node;
        }

        while (node.next) {
            var nextNode = node.next;
            var copyNode = node;
            var sortedList = node.prev;

            this.colorNode(node, "Blue");
            this.colorNode(nextNode, "Red");
            await this.sleep(delayTime);

            if (node.data > nextNode.data) {
                change = node.data;
                node.data = nextNode.data;
                nextNode.data = change;

                this.colorNode(node, "Blue");
                this.colorNode(nextNode, "Red");
                await this.sleep(delayTime);

                while (sortedList) {
                    this.colorNode(copyNode, "Red");
                    this.colorNode(sortedList, "Yellow");
                    await this.sleep(delayTime);

                    if (sortedList.data > copyNode.data) {
                        change = copyNode.data;
                        copyNode.data = sortedList.data;
                        sortedList.data = change;

                        this.clearNode(sortedList);
                        this.clearNode(copyNode);
                        this.colorNode(sortedList, "Yellow");
                        this.colorNode(copyNode, "Yellow");
                        await this.sleep(delayTime);

                        sortedList = sortedList.prev;
                        copyNode = copyNode.prev;
                    } else {
                        this.colorNode(copyNode, "Yellow");
                        this.colorNode(sortedList, "Yellow");
                        await this.sleep(delayTime);
                        break;
                    }

                }

            }

            //console.log(node.data);
            this.clearNode(node);
            this.colorNode(node, "Yellow");
            await this.sleep(delayTime);
            node = node.next;
        }

        return node;
    }

    /* ------------------------------ Bubble Sort ------------------------------ */
    async bubbleSort(node) {
        if (!node || !node.next) {
            return;
        }

        var startNode = node;

        while (node) {

            if (!node.next) {
                return node;
            }

            var swapped = false;
            var copyNode = startNode;
            var nextNode = startNode.next;

            this.clearNode(lastNode);
            this.colorNode(lastNode, "Purple");
            await this.sleep(delayTime);

            while (nextNode) {

                this.colorNode(copyNode, "red");
                this.colorNode(nextNode, "red");
                await this.sleep(delayTime);

                if (Number(copyNode.data) > Number(nextNode.data) && copyNode !== lastNode) {
                    var change = nextNode.data;
                    nextNode.data = copyNode.data;
                    copyNode.data = change;
                    swapped = true;
                } else if (copyNode === lastNode) {
                    this.clearNode(copyNode);
                    this.clearNode(nextNode);
                    this.colorNode(copyNode, "yellow");
                    this.colorNode(nextNode, "yellow");

                    break;
                }

                this.clearNode(copyNode);
                this.clearNode(nextNode);
                this.colorNode(copyNode, "red");
                this.colorNode(nextNode, "red");
                await this.sleep(delayTime);

                this.clearNode(copyNode);
                this.clearNode(nextNode);
                this.colorNode(copyNode, "gray");
                this.colorNode(nextNode, "gray");

                copyNode = copyNode.next;
                nextNode = nextNode.next;
            }

            if (!swapped) {
                break;
            }

            /*
            this.clearNode(node);
            this.colorNode(node, "Yellow");
            await this.sleep(delayTime);
            */
            node = node.next;
            lastNode = lastNode.prev;
        }

        return node;
    }


    /* ------------------------------ Print data in console ------------------------------ */
    consolePrint(node) {
        while (node) {
            console.log(node.data);
            node = node.next;
        }
    }

}