import API from "../data.js";
import newArticleForm from "./articleFormManager.js";
import renderArticles from "./articleDomManager.js";

const activeId = 2;

const articleEventListeners = {
  newArticleEventListener() {
    const newArticleBtn = document.getElementById("newArticleBtn");
    const dashboardEl = document.getElementById("dashboardFormField");

    newArticleBtn.addEventListener("click", () => {
      dashboardEl.textContent = "";
      dashboardEl.innerHTML += newArticleForm();
      articleEventListeners.addSaveArticleEventListener();
    });
  },
  addSaveArticleEventListener() {
    const saveBtn = document.getElementById("saveArticleBtn");

    saveBtn.addEventListener("click", () => {
      const newsTitleInput = document.getElementById("newsTitle");
      const synopsisInput = document.getElementById("synopsis");
      const urlInput = document.getElementById("articleUrl");
      const dashboardEl = document.getElementById("newsArticles");

      if (newsTitleInput.value === "") {
        alert("Please add a Title");
      } else if (synopsisInput.value === "") {
        alert("please add a synopsis");
      } else if (urlInput.value === "") {
        alert("Please add a url link");
      } else {
        const newNewsArticleEntry = {
          title: newsTitleInput.value,
          synopsis: synopsisInput.value,
          url: urlInput.value,
          timeStamp: Date.now(),
          userId: activeId
        };

        dashboardEl.textContent = "";

        API.save(newNewsArticleEntry, "articles")
          .then(articleEventListeners.clearForm)
          .then(articleEventListeners.getArticlesByUserId());
      }
    });
  },
  deleteArticle() {
    const newsArticlesEl = document.getElementById("newsArticles");

    newsArticlesEl.addEventListener("click", event => {
      if (event.target.id.startsWith("deleteNewsArticle--")) {
        const articleToDelete = event.target.id.split("--")[1];
        const alert = confirm("Are you sure you want to delete this article?");

        if (alert) {
          API.delete(articleToDelete, "articles").then(
            articleEventListeners.getArticlesByUserId()
          );
        }
      }
    });
  },
  editArticle() {
    const newsArticlesEl = document.getElementById("newsArticles");
    const dashboardEl = document.getElementById("dashboardFormField");

    newsArticlesEl.addEventListener("click", event => {
      if (event.target.id.startsWith("editNewsArticle--")) {
        const articleToEdit = event.target.id.split("--")[1];
        dashboardEl.scrollIntoView();
        dashboardEl.textContent = "";
        dashboardEl.innerHTML += newArticleForm();
        articleEventListeners.updateArticleForm(articleToEdit);
        articleEventListeners.addSaveArticleEventListener();
      }
    });
  },
  updateArticleForm(articleId) {
    const newsTitleInput = document.getElementById("newsTitle");
    const synopsisInput = document.getElementById("synopsis");
    const urlInput = document.getElementById("articleUrl");
    const hiddenIdInput = document.getElementById("articleHiddenId");

    API.get(`articles/${articleId}`).then(article => {
      hiddenIdInput.value = article.id;
      newsTitleInput.value = article.title;
      synopsisInput.value = article.synopsis;
      urlInput.value = article.url;
    });
  },
  clearForm() {
    const newsTitleInput = document.getElementById("newsTitle");
    const synopsisInput = document.getElementById("synopsis");
    const urlInput = document.getElementById("articleUrl");

    newsTitleInput.value = "";
    synopsisInput.value = "";
    urlInput.value = "";
  },
  getArticlesByUserId() {
    let renderArray = [];

    API.get("articles").then(articles => {
      articles.map(object => {
        if (object.userId === activeId) {
          renderArray.push(object);
        }
      });
      renderArticles(renderArray);
    });
  }
};

export default articleEventListeners;
