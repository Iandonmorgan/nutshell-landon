import API from "../data.js";
import newArticleForm from "./articleFormManager.js";
import renderArticles from "./articleDomManager.js";

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
          timeStamp: Date.now()
        };

        dashboardEl.textContent = "";

        //function that updates the 'articles' database and renders the news articles to the DOM
        console.log("clicked save");
        API.save(newNewsArticleEntry, "articles")
          .then(() => API.get("articles").then(renderArticles))
          .then(articleEventListeners.clearForm);
      }
    });
  },
  deleteArticle() {
    const newsArticlesEl = document.getElementById("newsArticles");

    newsArticlesEl.addEventListener("click", event => {
      if (event.target.id.startsWith("deleteNewsArticle--")) {
        const articleToDelete = event.target.id.split("--")[1];

        API.delete(articleToDelete, "articles").then(() =>
          API.get("articles").then(renderArticles)
        );
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
  }
};

export default articleEventListeners;
