const articleHTMLManager = {
  newArticleForm: () => {
    return `
    <form action="">
    <legend><b>News Article</b></legend>
        <input type="hidden" id="entryId" value="" />
        <fieldset class="articleFieldSet">
            <label for="newsTitle">News Title</label>
            <input type="text" name="newsTitle" id="newsTitle" />
        </fieldset>

        <fieldset class="articleFieldSet">
            <label for="synopsis">Synopsis</label>
            <input type="text" name="synopsis" id="synopsis" />
        </fieldset>

        <fieldset class="articleFieldset">
            <label for="url">URL</label>
            <input type="text" name="articleUrl" id="articleUrl" /><br><br>
            <button type="button" id="saveArticleBtn">Save Article</button>
        </fieldset>
        
    `;
  },
  makeNewsArticleComponent: newsArticle => {
    return `
      <h1>${newsArticle.title}</h1>
      <section>${newsArticle.synopsis}</section>
      <article>${newsArticle.url}</article>
      <article>${newsArticle.timestamp}</article>
      <button id="editNewsArticle--${newsArticle.id}" class="editBtn">Edit</button>
      <button id="deleteNewsArticle--${newsArticle.id}" class="deleteBtn">Delete</button>
      `;
  },
  renderArticles: articles => {
    const articlesDom = document.getElementById("newsArticles");
  
    articlesDom.innerHTML = "";
  
    articles.forEach(article => {
    articlesDom.innerHTML += makeNewsArticleComponent(article)    
    });
  }
};


export default articleHTMLManager;
