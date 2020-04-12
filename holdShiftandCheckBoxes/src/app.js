//get all the checkboxes
const checkboxes = document.querySelectorAll('.wrapper input[type="checkbox"]');
const btn = document.querySelector("button");

let lastChecked;

function changedAll(e) {
  let inBetween = false;

  //check if shift was pressed and checkbox is checked
  if (e.shiftKey && this.checked) {
    // loop through all of the checkbox
    checkboxes.forEach((checkbox) => {
      console.log(checkbox);
      //the this refers to the one that was checked ||
      // or if the last checkbox was the last checked
      if (checkbox === this || checkbox === lastChecked) {
        //returns true
        inBetween = !inBetween;
        console.log("checked");
      }
      if (inBetween) {
        console.log(inBetween);
        checkbox.checked = true;
      }
      console.log(inBetween);
    });
  }

  // hold the 1st checkbox that was clicked
  lastChecked = this;
}
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("click", changedAll);
});

function addMore() {
  const item = document.createElement("div");
  item.className = "item";
  item.innerHTML = `
  <div class="item">
    <input type="checkbox" name="checkbox">
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, inventore?</p>
  </div>
  `;
  document.querySelector(".wrapper").appendChild(item);
}
btn.addEventListener("click", addMore);
