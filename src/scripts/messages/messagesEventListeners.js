import API from "../data.js";
import chatMessages from "./domManagerMessages.js";

const containerMessages = document.querySelector("#containerMessages");
let newMessageContainer = "";
const chatDisplay = `<div id="chatLog">
                        chat is loading...
                    </div>
                    <div id="chatInputContainer">
                        <input type="text" size="60" name="chatInput" id="chatInput">
                        <button type="submit" id="chatSubmit">Submit</button>
                    </div>`;

const messagesListeners = {
    logInListener(userId) {
        document.getElementById("chatLogin").addEventListener("click", function () {
            containerMessages.innerHTML = chatDisplay;
            chatMessages.loggedIn(userId);
        });
    },
    submitListener(userId) {
        const submit = document.getElementById("chatSubmit");
        const chatInput = document.getElementById("chatInput")
        chatInput.addEventListener('keyup', function (e) {
            if (e.keyCode === 13 && chatInput.value == "") {
                window.alert("Please enter a message before submitting.");
            } else if (e.keyCode === 13) {
                chatMessages.post(chatInput.value, userId);
            }
        });
        submit.addEventListener("click", function () {
            if (chatInput.value !== "") {
                chatMessages.post(chatInput.value, userId);
            } else {
                window.alert("Please enter a message before submitting.");
            }

        });
    },
    processMessage(msg) {
        let newMessage = "";
        let newMessageSafeHTML = msg.split('"');
        for (let i = 0; i < newMessageSafeHTML.length - 1; i++) {
            newMessage += newMessageSafeHTML[i] + '&quot;';
        }
        newMessage += newMessageSafeHTML[parseInt(newMessageSafeHTML.length - 1)];
        return newMessage;
    },
    mutateListener(userId) {
        const chatLog = document.getElementById("chatLog");
        chatLog.addEventListener("click", function () {
            if (event.target.id.split("--")[0] === "editMessage") {
                API.edit(`${event.target.id.split("--")[1]}/?_expand=user`, "messages").then(message => {
                    let newMessageHTML = `<div id="newMessageHTML"><span id="messageId--${message.id}">${message.user.username}: <input id="newMessage--${message.id}" class="editInput" type="text" value="` + messagesListeners.processMessage(message.message) + `"></input></span><button id="cancelMessage--${message.id}">Cancel</button><button id="saveMessage--${message.id}">Save</button><button id="deleteMessage--${message.id}">Delete</button></div>`;
                    newMessageContainer = document.getElementById(`messageId--${message.id}`).parentNode;
                    newMessageContainer.innerHTML = newMessageHTML;
                    newMessageContainer.addEventListener('keyup', function (e) {
                        if (e.keyCode === 13 && newMessageContainer.value == "") {
                            window.alert("Empty comments won't help anyone.");
                        } else if (e.keyCode === 13) {
                            const newEditedMessageObject = {
                                "id": parseInt(message.id),
                                "userId": userId,
                                "message": newMessageContainer.value,
                                "timestamp": Date.now()
                            };
                            chatMessages.update(newMessageContainer.value, message.id, userId);
                            newMessageContainer.innerHTML = `<span id="messageId--${newEditedMessageObject.id}">${message.user.username}: ${newEditedMessageObject.message}</span> ${chatMessages.editBtnAdd(message, userId)} ${chatMessages.deleteBtnAdd(message, userId)}`;
                        }
                    });
                });
            } else if (event.target.id.split("--")[0] === "cancelMessage") {
                API.edit(`${event.target.id.split("--")[1]}/?_expand=user`, "messages").then(message => {
                    newMessageContainer = document.getElementById(`messageId--${message.id}`).parentNode;
                    newMessageContainer.innerHTML = `<span id="messageId--${message.id}">${message.user.username}: ${message.message}</span>${chatMessages.editBtnAdd(message, userId)}${chatMessages.deleteBtnAdd(message, userId)}`;
                    return "";
                });
            } else if (event.target.id.split("--")[0] === "saveMessage") {
                let newEditedMessage = document.querySelector(".editInput");
                const newEditedMessageObject = {
                    "id": parseInt(event.target.id.split("--")[1]),
                    "userId": userId,
                    "message": newEditedMessage.value,
                    "timestamp": Date.now()
                };
                API.edit(`${event.target.id.split("--")[1]}/?_expand=user`, "messages").then(message => {
                    newMessageContainer = document.getElementById(`messageId--${message.id}`).parentNode;
                    newMessageContainer.innerHTML = `<span id="messageId--${newEditedMessageObject.id}">${message.user.username}: ${newEditedMessageObject.message}</span> ${chatMessages.editBtnAdd(message, userId)} ${chatMessages.deleteBtnAdd(message, userId)}`;
                    API.update(newEditedMessageObject, "messages");
                    return "";
                });
            } else if (event.target.id.split("--")[0] === "deleteMessage") {
                const message = document.getElementById(event.target.id);
                API.delete(event.target.id.split("--")[1], "messages").then(message.parentNode.parentNode.removeChild(message.parentNode));
            }
        });
    }
};

export default messagesListeners;