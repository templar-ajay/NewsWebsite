console.log(`Welcome to StarNews`);

// grab the new container
let newsAccordion = document.getElementById("newsAccordion");

// initialise the news api parameters
let source = "bbc-news";
const apiKey = "d619d33aeec548728219e5847ccd2f26";
let json;
// create an AJAX GET request
const xhr = new XMLHttpRequest();
xhr.open(
  "GET",
  `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`,
  true
);

// what to do when response is ready
xhr.onload = function () {
  if (this.status == 200) {
    json = JSON.parse(this.responseText);
    // console.log(``, json);
    populate(json.articles);
    // let t = json.articles[0].title;
    // console.log(``, t);
  } else {
    console.log(`Some error Occured while fetching data from server`);
  }
};

xhr.send();

function populate(articles) {
  let news = "";
  for (let i = 0; i < articles.length; i++) {
    news += `<div class="accordion-item">
   <h2 class="accordion-header" id="heading${i}">
     <button
       class="accordion-button collapsed"
       type="button"
       data-bs-toggle="collapse"
       data-bs-target="#collapse${i}"
       aria-expanded="true"
       aria-controls="collapse${i}"
     >
       <b>Breaking News ${i + 1} -</b>&nbsp;&nbsp;${articles[i].title}
     </button>
   </h2>
   <div
     id= "collapse${i}"
     class="accordion-collapse collapse "
     aria-labelledby="heading${i}"
     data-bs-parent="#newsAccordion"
   >
     <div class="accordion-body">
       ${articles[i].content}. <a href="${
      articles[i].url
    }" target="_blank"> Read more here </a>
     </div>
   </div>
  </div>`;
  }
  newsAccordion.innerHTML = news;
}
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", (e) => {
  let searchText = e.target.value.toLowerCase();
  search(searchText);
});
function search(x) {
  let arr = [];
  json.articles.forEach((article) => {
    if (article.title.toLowerCase().indexOf(x) >= 0) {
      arr.push(article);
    }
  });
  //   console.log(`arr`, arr);
  evacuate();
  populate(arr);
}
function evacuate() {
  newsAccordion.innerHTML = "";
}
