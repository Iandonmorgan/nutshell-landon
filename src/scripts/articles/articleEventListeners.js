import articleHTMLManager from "./articleHTMLManager.js";

const articleEventListeners = {
  newArticleEventListener: () => {
    const newArticleBtn = document.getElementById("newArticleBtn");
    const dashboardEl = document.getElementById("dashboardFormField");

    newArticleBtn.addEventListener("click", () => {
      dashboardEl.textContent = "";
      dashboardEl.innerHTML += articleHTMLManager.newArticleForm();
      articleEventListeners.addSaveArticleEventListener();
    });
  },
  addSaveArticleEventListener: () => {
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
          url: urlInput.value
        };
        
        dashboardEl.textContent = "";

        //function that renders the news article data
        console.log("clicked save")
        // clears input values
        newsTitleInput.value = "";
        synopsisInput.value = "";
        urlInput.value = "";
      }
    });
  }
};

export default articleEventListeners;
