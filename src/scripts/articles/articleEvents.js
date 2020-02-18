import API from "../data.js";
import articleEventListeners from "./articleEventListeners.js";
import renderArticles from "./articleDomManager.js";

articleEventListeners.newArticleEventListener();
articleEventListeners.deleteArticle();
articleEventListeners.editArticle();
API.get("articles").then(renderArticles);

export default articleEventListeners.newArticleEventListener();
