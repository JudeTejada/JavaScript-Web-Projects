const search = document.getElementById("search");
const postsContainer = document.getElementById("posts");
const loader = document.getElementById("loader");
limit = 5;
page = 1;
const fetchData = async () => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  await showPost(response.data);
};

const showPost = posts => {
  posts.forEach(post => {
    const div = document.createElement("div");
    div.className = "post";

    div.innerHTML = `
      <h3 class="title">${post.title}</h3>
      <span class="id">post:${post.id}</span>
      <p class="body">${post.body}</p>
    `;

    postsContainer.appendChild(div);
  });
};

// Show Loader and add Content
const showLoading = () => {
  //show loader
  loader.classList.add("show");

  setTimeout(() => {
    //remove loader after 1s
    loader.classList.remove("show");

    setTimeout(() => {
      //Add more Content
      page++;
      fetchData();
    }, 300);
  }, 1000);
};
const filterBlog = e => {
  const value = e.target.value.toUpperCase();

  const posts = document.querySelectorAll(".post");

  //get title and body
  posts.forEach(post => {
    const title = document.querySelector(".title").innerText.toUpperCase();
    const body = document.querySelector(".body").innerText.toUpperCase();

    // if the index return us -1 then remove
    //indexOf is use to compare the two value if they have the same index number
    if (title.indexOf(value) > -1 || body.indexOf(value) > -1) {
      post.style.display = "block";
    } else {
      post.style.display = "none";
    }
  });
};

search.addEventListener("input", filterBlog);

//get 5 posts
fetchData();

//Infinite Scroll Through Posts
window.addEventListener("scroll", () => {
  //initialize variable
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  console.log(scrollTop);

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    //add the loading bar
    showLoading();
  }
});
