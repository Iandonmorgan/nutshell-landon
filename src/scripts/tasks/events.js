import API from "../data.js"

const saveBtn = document.querySelector("#submitTask")

saveBtn.addEventListener("click", () => {
    const taskVal = document.querySelector("#createTask")
    const dateVal = document.querySelector("#completionDate")

    

    API.save()
})