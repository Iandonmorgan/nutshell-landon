const newArticleForm = () => {
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
};

export default newArticleForm;
