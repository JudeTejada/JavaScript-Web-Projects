const mealWrapper = document.querySelector(".meal");
const button = document
  .querySelector("button")
  .addEventListener("click", () => {
    fetchMeal();
  });

//Fetch data from an api

const fetchMeal = (
  url = "https://www.themealdb.com/api/json/v1/1/random.php"
) => {
  axios.get(url).then(res => {
    createMeal(res.data.meals[0]);
  });
};

const createMeal = data => {
  const ingredient = [];
  for (let i = 1; i <= 20; i++) {
    if (data[`strIngredient${i}`]) {
      ingredient.push(data[`strIngredient${i}`]);
    } else {
      break;
    }
  }

  const meal = `
  <img src="${data.strMealThumb}" alt="a photo of a Meal" class="meal__photo">
  <h2 class="meal__title">${data.strMeal}</h2>
  <p class="meal__description">${data.strInstructions}</p>

  <h3 class="meal__title-2">Ingredients:</h3>
  <ul class="meal__ingredients">
  ${ingredient
    .map(ingredient => `<li class="meal__item">${ingredient}</li>`)
    .join("")}
  </ul>
  `;

  mealWrapper.innerHTML = meal;
};
