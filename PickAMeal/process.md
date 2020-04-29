**The process of building the Pick a Meal project**

During the early phase I didn't know how I should structure out the project it was because I didn't took the time to make myself a plan. It was overwhelming and hard even after having a reference to follow on. And so after a lot of time thinking. the process starts on by creating the boilerplate in my HTML. structuring out each of the section adding appropriate classes and ID.

Afterwards I had wrote all of the DOM selectors that I would needed to use later in the project. The hardest part about this project is what comes next to doing the first part and what I had decided to do was to create first my own model object that would contains the name, url, recipe, ingredients. The model object will be used as a way to access the values for my template functions.

On creating down each dish it is done by assigning a variable and also instantiating the model object so that we could pass in the 4 values. Its then added to the global variable array and also goes directly to the Local Storage. After all of that it goes in to the template function and its added to the grid container where it hold all the dishes.

```js
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
```

The next thing that I had worked on is on the field validation and this is done first by checking if each of the fields contains a value. It cannot proceed unless all of the fields are filled.

```javascript
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
```

The next part was adding an error message on the input that doesn't contain a value and this is done by using an array method filter and this would help us to find the input fields that the value are empty. We then send a function that would send an error message. A thing that I had learned from this part was wrapping each input on a div and then adding a span message where we insert out the error. We then target that sibling by DOM Traversing.

```javascript
//check the fields for form
const validateField = () => {
  const emptyFields = Array.from(document.querySelectorAll(".field"))
    .filter((field) => field.value === "")
    .forEach((field) => sendError(field.nextElementSibling));
};
```

Now that I was able to manage to create a dish I had then work on the part where we could be able to generate a random meal at our landing page. The first part was that we need to get the values inside of our Local Storage and this would get us all of our meal.

```js
const getDishesFromLS = () => {
  return JSON.parse(localStorage.getItem("dishes"));
};
```

I had then work on adding a listener to the generator button where we call that function and get back us all the values in the Local Storage. first we need to check if our Local storage contains any data and if it does contain we then proceed to creating an object.

The function generateRandomDish is where we pass in all our dishes and then get us back a random dish depending on the length of the array. and after returning us a random value we then pass it on our template function and its inserted on the landing page. I had also did a recursion on generating a random dish so that it would prevent from giving us the same data.

```javascript
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
//
```

since all our data our stored in Local storage we need to retreive out the values and insert it back in our website so that we could see all of the dishes even if we exit out the website. and its done by

- Get all the dishes that are on Local Storage
- Loop through each dish and add it back on our grid container
- Add a listener to the card and used event delegation where it would only happen if we click a function that matches a certain className
- When the button is clicked that is then we insert the popup

```javascript
const init = () => {
  const dishes = getDishesFromLS();

  dishes.forEach((dish) => {
    //get the dish and display
    const newDish = createUIDish(dish);

    newDish.addEventListener("click", (e) => {
      // check if btn is clicked
      if (e.target.className === "card__btn") {
        createPopup(dish);
      }
    });
    allDishes.push(dish);
  });
};

init();
```

The last part on the project was working on a popup. The way this work is

- on each of our card we add a listener and use event delegation to only happens if our button was clicked
- If a button is click we pass the data of the dish and used that to create our own popup
- after calling out the createPopup it would give us back the template where it holds the data of the card that was clicked.

```js
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
```

In Summary what I had learned

- Using local Storage to save items and retrieve back all of our dishes
- Using a Model instance where we could access the value of each data
- Using the array method filter to get us back the input fields that are empty
- Creating template function where we pass in the data of the dish that contains name,url,recipe,ingredients
- Using event delegation that would only happens if a specific classname that we had set
