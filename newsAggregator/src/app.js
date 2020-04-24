// dom selectors
const queryByCounty = document.querySelector("#countries");
const articlesContainer = document.querySelector("#articles");
const categories = document.querySelectorAll(".newsCategories");
const header = document.querySelector("#hero-content");
// API
const API = "596efbaf32f548faa75b18be8581bca0";
let url = "http://newsapi.org/v2/top-headlines?";

const fetchHeroArticles = async () => {
  const response = await axios.get(`${url}country=us&apiKey=${API}&pageSize=3`);

  return await response.data.articles;
};
//send request api
const fetchArticles = async () => {
  const response = await axios.get(
    `${url}country=${queryByCounty.value}&apiKey=${API}&pageSize=8`
  );
  return await response.data.articles;
};

const fetchArticleByCategory = async (e) => {
  const categoryClicked = e.target.textContent;
  const response = await axios.get(
    `${url}country=${queryByCounty.value}&apiKey=${API}&pageSize=8&category=${categoryClicked}`
  );

  displayCategoryArticles(response.data.articles, categoryClicked);
};

//display articles by country
const searchArticleByCountry = async () => {
  const data = await fetchArticles();
  displayLatestArticles(data);
};

//display latest articles
const displayLatestArticles = (articles) => {
  articlesContainer.innerHTML = `
    <h2 class="heading--2">Latest Articles</h2>
      <div class="grid">
        ${articles.map((data) => templateArticleCard(data)).join("")}
      </div>
  `;
};

//display articles by category
const displayCategoryArticles = (articles, category) => {
  articlesContainer.innerHTML = `
    <h2 class="heading--2">${category}</h2>
      <div class="grid">
        ${articles.map((data) => templateArticleCard(data)).join("")}
      </div>
  `;
};
//display the top 3 articles
const displayHeroArticles = async () => {
  const data = await fetchHeroArticles();

  header.innerHTML = `
  ${data.map((article) => templateArticleHero(article)).join("")};
  `;
};

const templateArticleHero = (data) => {
  const article = `
    <figure class="header__article">
    <img src="${data.urlToImage}" />
    <figcaption>${data.title}</figcaption>
    </figure>
  `;

  return article;
};
const templateArticleCard = (data) => {
  const article = `
  <div class="card">
    <div class="card__photo">
      <img src="${data.urlToImage}" />
    </div>
    <div class="card__content">
      <a href="${data.url}" target="_blank">
        <h2 class="card__heading">${data.title}</h2>
      </a>
    </div>
    
  </div>
  `;

  return article;
};
displayHeroArticles();
searchArticleByCountry();
queryByCounty.addEventListener("change", searchArticleByCountry);

categories.forEach((category) =>
  category.addEventListener("click", fetchArticleByCategory)
);
