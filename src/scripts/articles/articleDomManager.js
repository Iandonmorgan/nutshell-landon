// render function
const makeNewsArticleComponent = newsArticle => {
  return `
      <h1>${newsArticle.title}</h1>
      <section>${newsArticle.synopsis}</section>
      <article><a href="${newsArticle.url}">${newsArticle.url}</a></article>
      <button id="editNewsArticle--${newsArticle.id}" class="editBtn">Edit</button>
      <button id="deleteNewsArticle--${newsArticle.id}" class="deleteBtn">Delete</button>
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
