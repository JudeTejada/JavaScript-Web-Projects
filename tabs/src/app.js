//STATE PATTERN JAVASCRIPT
const pageState = function () {
  let currentState = new coolKids(this);

  this.init = function () {
    this.change(new coolKids());
  };
  this.change = function (state) {
    currentState = state;
  };
};

const coolKids = function (page) {
  document.querySelector(
    ".content__col-1"
  ).innerHTML = `  <h1 class="content__title">Cool Kids</h1>
    <h2 class="content__subtitle">generation</h2>
  <p class="content__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis natus iste maxime, reprehenderit consequatur earum, ullam culpa adipisci cupiditate officia fugiat vel iure magnam! Placeat odio, veniam nostrum cum numquam ipsum laborum quos ipsa sint quia tenetur nobis debitis. Similique repellendus ad excepturi possimus obcaecati et consequatur sint dolorem quo!</p>
  </div>
`;
  document.querySelector(".content__col-2").innerHTML = `
  <img src="https://images.unsplash.com/photo-1587474047750-035e0a7c208a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=596&q=80" alt="Photo 1">
`;
};

const maskPeople = function (page) {
  document.querySelector(
    ".content__col-1"
  ).innerHTML = `  <h1 class="content__title">Mask Kids</h1>
    <h2 class="content__subtitle">generation</h2>
  <p class="content__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis natus iste maxime, reprehenderit consequatur earum, ullam culpa adipisci cupiditate officia fugiat vel iure magnam! Placeat odio, veniam nostrum cum numquam ipsum laborum quos ipsa sint quia tenetur nobis debitis. Similique repellendus ad excepturi possimus obcaecati et consequatur sint dolorem quo!</p>
  </div>
`;

  document.querySelector(".content__col-2").innerHTML = `
  <img src="https://images.unsplash.com/photo-1533835673073-b2575dde4265?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="Photo 2">
`;
};
const partyKids = function (page) {
  document.querySelector(
    ".content__col-1"
  ).innerHTML = `  <h1 class="content__title">Rockstar kids</h1>
    <h2 class="content__subtitle">generation</h2>
  <p class="content__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis natus iste maxime, reprehenderit consequatur earum, ullam culpa adipisci cupiditate officia fugiat vel iure magnam! Placeat odio, veniam nostrum cum numquam ipsum laborum quos ipsa sint quia tenetur nobis debitis. Similique repellendus ad excepturi possimus obcaecati et consequatur sint dolorem quo!</p>
  </div>
`;

  document.querySelector(".content__col-2").innerHTML = `
  <img src="https://images.unsplash.com/photo-1551474618-5e1c664040d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="Photo 3">
`;
};
//instantiate
const page = new pageState();
//init first state
page.init();

//vars
const tab1 = document.getElementById("tab-1"),
  tab2 = document.getElementById("tab-2"),
  tab3 = document.getElementById("tab-3");

//tab 1
tab1.addEventListener("click", (e) => {
  page.change(new coolKids());
  e.preventDefault();
});

//tab 2
tab2.addEventListener("click", (e) => {
  page.change(new maskPeople());
  e.preventDefault();
});

//tab 3
tab3.addEventListener("click", (e) => {
  page.change(new partyKids());
  e.preventDefault();
});

const tabs = document.querySelectorAll("li");

tabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    tab.classList.remove("active");
    //loop through tabs and  remove active
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    //add active that we click
    tab.classList.add("active");
  });
});
