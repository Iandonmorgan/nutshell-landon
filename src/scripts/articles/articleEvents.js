// import API from "../data.js";
import articleEventListeners from "./articleEventListeners.js";
// import renderArticles from "./articleDomManager.js";

articleEventListeners.newArticleEventListener();
articleEventListeners.deleteArticle();
articleEventListeners.editArticle();
articleEventListeners.getArticlesByUserId();

export default articleEventListeners.newArticleEventListener();
