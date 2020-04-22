const draggableItems = document.querySelectorAll("li");
const container = document.querySelector("ul");

let dragStartIndex, dragEndIndex;

//add class when its drag
function dragStart() {
  //get the one that we drag
  dragStartIndex = this.getAttribute("data-index");
  this.classList.add("isDragging");
}
//remove class when its done dragging
function dragEnd() {
  this.classList.remove("isDragging");
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  //get the item where its dragged
  dragEndIndex = this.getAttribute("data-index");

  swapItems(dragStartIndex, dragEndIndex);
}

//swap two items
function swapItems(fromIndex, toIndex) {
  // get all the li
  const listItems = [...draggableItems];

  //get the content of the two
  const firstitem = listItems[fromIndex].querySelector(".draggable");
  const seconditem = listItems[toIndex].querySelector(".draggable");

  //change the content of the li
  listItems[fromIndex].appendChild(seconditem);
  listItems[toIndex].appendChild(firstitem);
}

draggableItems.forEach((item) => {
  item.addEventListener("dragstart", dragStart);
  item.addEventListener("dragend", dragEnd);
  item.addEventListener("drop", dragDrop);
});

container.addEventListener("dragover", dragOver);
