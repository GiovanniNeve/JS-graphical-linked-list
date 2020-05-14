/* Detecting canva<s from html */
var canvas = document.getElementById("newCanvas");
var ctx = canvas.getContext("2d");
var screenWidth = 1500;
var screenHeight = 600;
var maxNumber = 0;
var arraylength = 0;
var delayTime = 30;

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
            return node;
        }
        while (node.next) {
            node = node.next;
        }
        if (!node.next) {
            node.next = this.makeNode(node, data);
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
                await this.sleep(delayTime);

                if (Number(min.data) > Number(copyNode.data)) {
                    min = copyNode;
                }

                this.colorNode(copyNode, "gray")
                await this.sleep(100);
                copyNode = copyNode.next;

            }

            this.clearNode(node);
            this.clearNode(min);

            if (min.data < node.data) {
                var change = node.data;
                node.data = min.data;
                min.data = change;
                xPosition += width;


                this.colorNode(node, "green")
                await this.sleep(100);

                this.colorNode(min, "gray")
                await this.sleep(100);

            } else {

                this.colorNode(node, "gray")
                await this.sleep(100);

                this.colorNode(min, "green")
                await this.sleep(100);
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
                        this.colorNode(sortedList, "Green");
                        this.colorNode(copyNode, "Green");
                        await this.sleep(100);

                        sortedList = sortedList.prev;
                        copyNode = copyNode.prev;
                    } else {
                        this.colorNode(copyNode, "Green");
                        this.colorNode(sortedList, "Green");
                        await this.sleep(100);
                        break;
                    }

                }

            }

            //console.log(node.data);
            this.clearNode(node);
            this.colorNode(node, "Green");
            await this.sleep(100);
            node = node.next;
        }

        return node;
    }

    /* ------------------------------ Merge sort ------------------------------ */
    mergeSort(node) {
        if (!node || !node.next) {
            return node;
        }

        let first = node;
        let second = this.splitNode(node);

        first = this.mergeSort(first);
        second = this.mergeSort(second);

        node = this.mergeSorting(first, second);
        return node;
    }

    mergeSorting(first, second) {
        if (!first) {
            return second;
        }
        if (!second) {
            return first;
        }

        if (first.data < second.data) {
            first.next = this.mergeSorting(first.next, second);
            first.next.prev = first;
            first.prev = null;
            return first;

        } else if (first.data > second.data) {
            second.next = this.mergeSorting(first, second.next);
            second.next.prev = second;
            second.prev = null;
            return second;
        }

    }

    splitNode(node) {
        let back = node;
        let front = node.next;

        while (front.next) {
            front = front.next;
            if (front.next) {
                back = back.next;
                front = front.next;
            }
        }

        return back.next;
    }

    /* ------------------------------ Print data in console ------------------------------ */
    consolePrint(node) {
        while (node) {
            console.log(node.data);
            node = node.next;
        }
    }

}