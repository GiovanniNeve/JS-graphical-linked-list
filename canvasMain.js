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
async function selectionSort() {
    await list.selectionSort(list.node);
    console.log("Selection sort done");
    list.sortCheck(list.node);
}

/* ---------- Set animation delay (Button) ---------- */
function setDelay() {
    delayTime = document.querySelector(".delayButton > select").value;
}

/* ---------- Insertion sort (Button) ---------- */
async function insertionSort() {
    await list.insertionSort(list.node);
    console.log("Insertion sort done");
    list.sortCheck(list.node);
}

/* ---------- Merge sort (Button) ---------- */
async function BubbleSort() {
    await list.bubbleSort(list.node);
    console.log("Bubble sort done");
    list.sortCheck(list.node);
}