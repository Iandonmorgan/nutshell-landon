import articleHTMLManager from "./articleHTMLManager.js";

const articleEventListeners = {
  newArticleEventListener: () => {
    const newArticleBtn = document.getElementById("newArticleBtn");
    const dashboardEl = document.getElementById("dashboardFormField");
    const articleHiddenVal = document.getElementById("saveArticleBtn");

    newArticleBtn.addEventListener("click", () => {
      dashboardEl.textContent = "";
      dashboardEl.innerHTML += articleHTMLManager.newArticleForm();
      articleHiddenVal.value = 1;
    });
  },
  addSaveArticleEventListener: () => {
    if (parseInt(articleHiddenVal.value) === 1) {
      const saveBtn = document.getElementById("saveArticleBtn");

      saveBtn.addEventListener("click", () => {
        console.log("clicked save");
      });
    }
  }
};

export default articleEventListeners;
