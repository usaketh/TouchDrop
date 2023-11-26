let lists = document.querySelectorAll(".list");
let rightBox = document.getElementById("right");
let leftBox = document.getElementById("left");
let container = document.querySelector(".container");

// Function to handle the start of a drag or touch event
function handleStartEvent(e) {
    selected = e.target;
}

// Event listeners for drag and touch events on each list item
for (let list of lists) {
    list.addEventListener("dragstart", handleStartEvent);
    list.addEventListener("dragend", handleEndEvent);
    list.addEventListener("touchstart", handleStartEvent);
    list.addEventListener("touchend", handleEndEvent);
}

// Event listeners for the right box
rightBox.addEventListener("dragover", function (e) {
    e.preventDefault();
});

rightBox.addEventListener("drop", function (e) {
    handleDrop(e, rightBox);
});

// Event listeners for the left box
leftBox.addEventListener("dragover", function (e) {
    e.preventDefault();
});

leftBox.addEventListener("drop", function (e) {
    handleDrop(e, leftBox);
});

container.addEventListener("dragmove", function (e) {
    if (e.target.classList.contains("list")) {
        e.target.remove();
    }
});

// Event listener for touchmove on the container
container.addEventListener("touchmove", function (e) {
    e.preventDefault(); // Prevent scrolling on touch devices

    let touch = e.touches[0]; // Get the first touch point

    // Move the selected element with the touch coordinates
    if (selected) {
        selected.style.position = "absolute";
        selected.style.left = touch.clientX - selected.clientWidth / 2 + "px";
        selected.style.top = touch.clientY - selected.clientHeight / 2 + "px";
    }
});

// Function to handle the end of a drag or touch event
function handleEndEvent() {
    selected = null;
}

// Function to handle dropping an item into a box
function handleDrop(e, targetBox) {
    e.preventDefault();

    let draggedItem = e.dataTransfer.getData("text/plain");

    if (draggedItem) {
        targetBox.appendChild(document.getElementById(draggedItem));
    }

    handleEndEvent();
}
