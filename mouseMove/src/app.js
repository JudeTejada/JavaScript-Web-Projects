const hero = document.querySelector(".hero");
const h1 = document.querySelector("h1");
const walk = 100; // 100px

function moveEffects(e) {
  const { offsetWidth: width, offsetHeight: height } = hero;
  let { offsetX: x, offsetY: y } = e;

  //this refers to the the hero container
  if (this !== e.target) {
    //add if mouse hover on h1
    x = x + e.target.offsetLeft;
    y = y + e.target.offsetTop;
  }
  const xWalk = Math.round((x / width) * walk - walk / 2);
  const yWalk = Math.round((y / height) * walk - walk / 2);

  h1.style.textShadow = `
  ${xWalk}px ${yWalk}px 0 #dd00e1,
  ${xWalk * -1}px ${yWalk}px 0 #1401f5,
  ${xWalk}px ${yWalk * -1}px 0 #50dbea,
  ${xWalk * -1}px ${yWalk * -1}px 0 #000000
  
  `;
}

hero.addEventListener("mousemove", moveEffects);
