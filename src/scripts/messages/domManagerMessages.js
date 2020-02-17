import API from "../data.js";

const containerMessages = document.querySelector("#containerMessages");
const loggedInUserId = 5;

const chatLine = (html, messageId, user, message) => {
    return `<${html} id="messageId--${messageId}">${user}: ${message}</${html}>`
}

const editBtnAdd = (message) => {
    if (loggedInUserId === message.userId) {
        return `<button id="editMessage--${message.id}">Edit</button>`;
    } else {
        return "";
    }
}

const deleteBtnAdd = (message) => {
    if (loggedInUserId === message.userId) {
        return `<button id="deleteMessage--${message.id}">Delete</button>`;
    } else {
        return "";
    }
}

const chatDisplay = `<div id="chatLog">
                        chat is loading...
                    </div>
                    <div id="chatInputContainer">
                        <input type="text" size="40" name="chatInput" id="chatInput">
                        <button type="submit" id="chatSubmit">Submit</button>
                    </div>`

const chatMessages = {
    logInListener() {
        document.getElementById("chatLogin").addEventListener("click", function () {
            containerMessages.innerHTML = chatDisplay;
            chatMessages.loggedIn();
        });
    },
    loggedIn() {
        API.get("messages/?_expand=user").then(objects => chatMessages.render(objects));
        chatMessages.submitListener();
        chatMessages.mutateListener();
    },
    render(messages) {
        const chatLog = document.querySelector("#chatLog");
        console.log(messages);
        let chatLogMessages = "";
        chatLog.innerHTML = "";
        messages.forEach(message => {
            chatLogMessages += chatMessages.createMessageLineHTML(message);
        })
        chatLog.innerHTML += chatLogMessages;
        chatLog.scrollTop = 9999999;
        chatMessages.clearChatInput();
    },
    post(message) {
        const objToSave = {
            "userId": loggedInUserId,
            "message": message,
            "timeStamp": Date.now()
        };
        chatMessages.clearChatInput();
        API.save(objToSave, "messages");
        API.get("messages/?_expand=user").then(objects => chatMessages.render(objects));
    },
    submitListener() {
        const submit = document.getElementById("chatSubmit");
        const chatInput = document.getElementById("chatInput")
        chatInput.addEventListener('keyup', function (e) {
            if (e.keyCode === 13 && chatInput.value == "") {
                window.alert("Please enter a message before submitting.");
            } else if (e.keyCode === 13) {
                chatMessages.post(chatInput.value);
            }
        });
        submit.addEventListener("click", function () {
            if (chatInput.value !== "") {
                chatMessages.post(chatInput.value);
            } else {
                window.alert("Please enter a message before submitting.");
            }

        });
    },
    mutateListener() {
        const chatLog = document.querySelector("#chatLog");
        chatLog.addEventListener("click", function () {
            if (event.target.id.split("--")[0] === "editMessage") {
                API.edit(`${event.target.id.split("--")[1]}/?_expand=user`, "messages").then(message => {
                    const oldUser = message.user.username;
                    const oldMessage = message.message;
                    const oldMessageId = message.id;
                    console.log(oldMessage);
                    const newMessage = `<span id="messageId--${message.id}">${message.user.username}: <input id="newMessage--${message.id}" type="text" value="${message.message}"></input></span><button id="cancelMessage--${message.id}">Cancel</button><button id="saveMessage--${message.id}">Save</button><button id="deleteMessage--${message.id}">Delete</button>`;
                    const newMessageContainer = document.getElementById(`messageId--${message.id}`).parentNode;
                    newMessageContainer.innerHTML = newMessage;
                    newMessageContainer.addEventListener("click", function () {
                        if (event.target.id.split("--")[0] === "cancelMessage") {
                            newMessageContainer.innerHTML = `<span id="messageId--${oldMessageId}">${oldUser}: ${oldMessage}</span>${editBtnAdd(message)}${deleteBtnAdd(message)}`;
                        } else if (event.target.id.split("--")[0] === "saveMessage") {
                            const newEditedMessage = document.getElementById(`newMessage--${event.target.id.split("--")[1]}`);
                            console.log(newEditedMessage.value);
                            const newEditedMessageObject = {
                                "id": parseInt(event.target.id.split("--")[1]),
                                "userId": loggedInUserId,
                                "message": newEditedMessage.value,
                                "timestamp": Date.now()
                            }
                            API.update(newEditedMessageObject, "messages");
                            newMessageContainer.innerHTML = `<span id="messageId--${newEditedMessageObject.id}">${oldUser}: ${newEditedMessageObject.message}</span> ${editBtnAdd(message)} ${deleteBtnAdd(message)}`;
                        }
                    });
                });
            } else if (event.target.id.split("--")[0] === "deleteMessage") {
                const message = document.getElementById(event.target.id);
                API.delete(event.target.id.split("--")[1], "messages").then(message.parentNode.parentNode.removeChild(message.parentNode));
            }
        });
    },
    clearChatInput() {
        document.getElementById("chatInput").value = "";
    },
    createMessageLineHTML(message) {
        return `<p>
            ${chatLine("span", message.id, message.user.username, message.message)}
            ${editBtnAdd(message)}
            ${deleteBtnAdd(message)}
            </p>`
    }
}

export default chatMessages;