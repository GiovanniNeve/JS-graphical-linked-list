/* -------------------------------------------------- Main -------------------------------------------------- */

var list = new linkedList(); /* Create linled list class object */


/* ---------- Insert random numbers in the list (Button) ---------- */
function randomInsert() {
    for (var i = 0; i < 29; i++) {
        var data = Math.floor(Math.random() * 200) + 1;
        list.insertNode(list.node, data);
        arraylength += 1; /* Get array length */
        if (Number(maxNumber) < Number(data)) {
            maxNumber = data; /* Get max number */
        }
    }
    console.log("Random insert done");
    list.clearScreen();
    list.drawList(list.node); /* Call the drawList function */
}

/* ---------- Sort the list with the selection sort alorithm (Button) ---------- */
function selectionSort() {
    list.selectionSort(list.node);
}

/* ---------- Set animation delay (Button) ---------- */
function setDelay() {
    delayTime = document.querySelector(".delayButton > select").value;
}

/* ---------- Insertion sort (Button) ---------- */
function insertionSort() {
    list.insertionSort(list.node);
    console.log("Insertion sort done");
}

/* ---------- Merge sort (Button) ---------- */
function BubbleSort() {
    list.bubbleSort(list.node);
    console.log("Bubble sort done");
}