// DOM SELECTORS

// Button selectors
const btnAdd = document.querySelector("#btn-add");
const btnClear = document.querySelector("#btn-clear");
const btnRandom = document.querySelector("#btn-random");

// TOP SELECTORS
const randomImg = document.querySelector("#random-img");
const randomName = document.querySelector("#random-name");
const randomRecipe = document.querySelector("#random-recipe");
const randomIngredients = document.querySelector("#random-ingredients");

// FORM SELECTORS
const mealForm = document.querySelector("#form-meal");
const mealName = document.querySelector("#meal-name");
const mealUrl = document.querySelector("#meal-url");
const mealRecipe = document.querySelector("#meal-recipe");
const mealIngredients = document.querySelector("#meal-ingredients");

// POPUP SELECTOR

const popup = document.querySelector("#popup-overlay");
const popupClosebtn = document.querySelector("#popup-closebtn");
const popupName = document.querySelector("#popup-meal");
const popupDish = document.querySelector("#popup-photo");
const popupRecipe = document.querySelector("#popup-recipe");
const popupIngredients = document.querySelector("#popup-ingredients");

const myDishes = document.querySelector("#myDishes");
//used for  putting all our meals

let allDishes = [];
let newDish;
//MODEL Instance Dish
const Dish = function (name, url, recipe, ingredients) {
  this.name = name.value;
  this.url = url.value;
  this.recipe = recipe.value;
  this.ingredients = ingredients.value;
};
//creating a dish

const getDishesFromLS = () => {
  return JSON.parse(localStorage.getItem("dishes"));
};

const createNewDish = () => {
  //create a new dish in an object
  const newDish = new Dish(mealName, mealUrl, mealRecipe, mealIngredients);

  //add meal to allMeal
  allDishes.push(newDish);
  //store the array in LS
  localStorage.setItem("dishes", JSON.stringify(allDishes));
  //create THE UI of the dish
  createUIDish(newDish);
  //reset the fields
  mealForm.reset();
};

//create UI Dish
const createUIDish = (dish) => {
  const dishCard = document.createElement("card");
  dishCard.classList.add("card");
  dishCard.innerHTML = `${templateCardDish(dish)}`;

  //add A Listener
  dishCard.addEventListener("click", (e) => {
    if (e.target.className === "card__btn") {
      createPopup(dish);
    }
  });
  myDishes.appendChild(dishCard);

  return dishCard;
};

const createPopup = (data) => {
  popup.style.display = "flex";
  popupDish.style.backgroundImage = `url(${data.url})`;
  popupName.textContent = data.name;
  popupRecipe.innerHTML = `
  <h2 class="popup__subtitle">Recipe:</h2>
  <p>${data.recipe}</p>
  `;
  popupIngredients.innerHTML = `
  <h2 class="popup__subtitle">Ingredients: </h2>
  <p>${data.ingredients}</p>
 `;
};

// Generate a random Dish
const generateRandomDish = (dishes) => {
  let lastdish;
  const idx = Math.floor(Math.random() * dishes.length);
  const dish = dishes[idx];
  //prevents from generating the same photo
  if (dish === lastdish) {
    return generateRandomDish(dishes);
  }
  lastdish = dish;
  return dish;
};

//check the fields for form
const validateField = () => {
  const emptyFields = Array.from(document.querySelectorAll(".field"))
    .filter((field) => field.value === "")
    .forEach((field) => sendError(field.nextElementSibling));
};

//send error for validation on input fields
const sendError = (error) => {
  //set the text
  error.innerHTML = "Please Fill out the value";

  //removes after 3s
  setTimeout(() => {
    error.innerHTML = "";
  }, 3000);
};

const templateCardDish = (data) => {
  const templateCard = `
  <figure class="card__photo" id="card-image">
    <img
      src="${data.url}"
      alt="Meal photo" class="card__img">
  </figure>
  <h2 class="card__meal">${data.name}</h2>
  <button class="card__btn">View more</button>
  `;

  return templateCard;
};
//template for random dish
const templateRandomDish = (data) => {
  //Display content
  randomImg.style.backgroundImage = `url(${data.url})`;
  randomName.textContent = data.name;

  randomImg.addEventListener("click", () => {
    createPopup(data);
  });
};
//remove default
mealForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (e.keyCode === 13 || event.which === 13) {
    if (
      !mealName.value ||
      !mealUrl.value ||
      !mealRecipe.value ||
      !mealIngredients.value
    ) {
      validateField();
    } else {
      // create dish if everything is filled
      createNewDish();
    }
  }
});

//generate a random Meal
btnRandom.addEventListener("click", () => {
  //get dishes from LS
  const dishes = getDishesFromLS();
  if (dishes) {
    const randomDish = generateRandomDish(dishes);

    templateRandomDish(randomDish);
  } else {
    randomName.innerHTML = `Please Create a Meal first`;
  }
});
// Adding Meal
btnAdd.addEventListener("click", () => {
  //check if each one has no value
  if (
    !mealName.value ||
    !mealUrl.value ||
    !mealRecipe.value ||
    !mealIngredients.value
  ) {
    validateField();
  } else {
    // create dish if everything is filled
    createNewDish();
  }
});
// removes all data from Local Storage
btnClear.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});
popupClosebtn.addEventListener("click", () => {
  popup.style.display = "none";
});

const init = () => {
  const dishes = getDishesFromLS();

  if (!dishes) return;
  dishes.forEach((dish) => {
    //get the dish and display
    const newDish = createUIDish(dish);

    newDish.addEventListener("click", (e) => {
      // check if btn is clicked
      if (e.target.className === "card__btn") {
        createPopup(dish);
      }
      allDishes.push(dish);
    });
  });
};

init();
// Photo Example https://images.unsplash.com/photo-1532980400857-e8d9d275d858?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ
// CLEARING ALL MY DISHES AT ONCE AND RELOAD PAGE
