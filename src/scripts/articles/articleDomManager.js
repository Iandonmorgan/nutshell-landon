// render function
const makeNewsArticleComponent = newsArticle => {
  return `
      <h1>${newsArticle.title}</h1>
      <section>${newsArticle.synopsis}</section>
      <article>${newsArticle.url}</article>
      <button id="editNewsArticle--${newsArticle.id}" class="editBtn">Edit</button>
      <button id="deleteNewsArticle--${newsArticle.id}" class="deleteBtn">Delete</button>
      `;
};

const renderArticles = articles => {
  const articlesDom = document.getElementById("newsArticles");

  articlesDom.innerHTML = "";

  articles.forEach(article => {
    articlesDom.innerHTML += makeNewsArticleComponent(article);
  });
};

export default renderArticles;
