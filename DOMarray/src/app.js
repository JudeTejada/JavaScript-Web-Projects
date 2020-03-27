const addBtn = document.getElementById("addUser");
const doublBbtn = document.getElementById("doubleMoney");
const sortBtn = document.getElementById("sortWealth");
const calculateW = document.getElementById("calculateWealth");
const lessBtn = document.getElementById("showPoor");
const showbtn = document.getElementById("showMillionaire");

const result = document.getElementById("result");

//holds all the data
let data = [];

const fetchUser = async () => {
  const response = await axios.get("https://randomuser.me/api/");

  const user = response.data.results[0];

  if (!user) {
    return [];
  } else {
    //add the user in an object
    const newUser = {
      name: `${user.name.first} ${user.name.last}`,
      wealth: Math.floor(Math.random() * 1000000)
    };
    addPerson(newUser);
  }
};

const addPerson = person => {
  data.push(person);

  showUser();
};

//double their money by USING Map
// which is good for manipulating data
const doubleMoney = () => {
  //get the data and manipulate
  data = data.map(person => {
    //Inherit all the person name and only change their wealth
    //If life were this easy
    return { ...person, wealth: person.wealth * 2 };
  });
  showUser();
};

//sort from highest o lowest
const sortWealth = () => {
  //subtract the second first wealth to the first person wealth
  data.sort((first, second) => {
    return second.wealth - first.wealth;
  });
  showUser();
};

// sort from bottom to High
const lessMoney = () => {
  data.sort((first, second) => {
    return first.wealth - second.wealth;
  });
  showUser();
};

//Show person that only exceeds weaalth for more than 1m
// By accessing the wealth of each person and check if its greater than 1m
const showOnlyMillionaire = () => {
  data = data.filter(person => person.wealth > 1000000);

  showUser();
};

//calculate their wealth by using reduce
// accumulate all the person's wealth and return the total value in the accumulator
const calculateWealth = () => {
  const wealth = data.reduce(
    (accumulator, currentValue) => (accumulator += currentValue.wealth),
    0
  );

  const div = document.createElement("div");
  div.innerHTML = `
  <p class="total">Total Money = <strong>${formatMoney(wealth)}</strong></p>
  `;
  result.appendChild(div);
};

//template for adding a User
const showUser = (persons = data) => {
  result.innerHTML = ` <h3>Person <strong>Wealth</strong></h3>`;

  //Target each user and add it to the result div
  persons.forEach(person => {
    //create a div
    const div = document.createElement("div");
    //add ac lass
    div.classList.add("person");
    div.innerHTML = `
    <ul>
      <li>
        <span class="name">${
          person.name
        }</span> </span class="wealth">${formatMoney(person.wealth)}</span>
      </li>
    </ul>
    `;

    result.appendChild(div);
  });
};

//Listener
addBtn.addEventListener("click", fetchUser);
doublBbtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortWealth);
lessBtn.addEventListener("click", lessMoney);
calculateW.addEventListener("click", calculateWealth);
showbtn.addEventListener("click", showOnlyMillionaire);

//Populate user when browser is loaded
window.addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i <= 3; i++) {
    fetchUser();
  }
});
