// render function
const makeNewsArticleComponent = newsArticle => {
  return `
      <div id="newsArticle--${newsArticle.id}" class="newsArticle">
      <h1>${newsArticle.title}</h1>
      <section>${newsArticle.synopsis}</section>
      <article class="articleURL"><a href="${newsArticle.url}" target="_blank">LINK TO FULL ARTICLE</a></article>
      <button id="editNewsArticle--${newsArticle.id}" class="editBtn">Edit</button>
      <button id="deleteNewsArticle--${newsArticle.id}" class="deleteBtn">Delete</button>
      </div>
      `;
};

const renderArticles = articles => {
  const articlesDom = document.getElementById("newsArticles");

  articlesDom.innerHTML = "";

  articles.sort(function(a, b){return b.timeStamp - a.timeStamp});

  articles.forEach(article => {
    articlesDom.innerHTML += makeNewsArticleComponent(article);
  });
};

export default renderArticles;
