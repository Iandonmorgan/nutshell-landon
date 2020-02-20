import API from "../data.js";
import chatMessages from "./domManagerMessages.js";

const chatDisplay = `<legend align="right">nutshell Internet Relay Chat (nIRC)™ 2020_v1.2 ©</legend>
                    <div id="chatLog">
                        chat is loading...
                    </div>
                    <div id="chatInputContainer">
                        <input type="text" size="60" name="chatInput" id="chatInput">
                        <button type="submit" id="chatSubmit">Submit</button>
                    </div>`;

let newMessageContainer = document.querySelector("#container");
let recentlyEditedId = "";
const messagesListeners = {
    logInListener(userId) {
        const containerMessages = document.getElementById("containerMessages");
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
                    recentlyEditedId = message.id;
                    return recentlyEditedId;
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
                });
                return "";
            } else if (event.target.id.split("--")[0] === "deleteMessage") {
                const message = document.getElementById(event.target.id);
                API.delete(event.target.id.split("--")[1], "messages").then(message.parentNode.parentNode.removeChild(message.parentNode));
                return "";
            };
        });
        newMessageContainer.addEventListener('keyup', function (e) {
            if (e.keyCode == 13 && document.querySelector(".editInput") !== null) {
                const newEditedMessageObject = {
                    "id": parseInt(recentlyEditedId),
                    "userId": userId,
                    "message": document.querySelector(".editInput").value,
                    "timestamp": Date.now()
                };
                API.get("messages/?_expand=user").then(objects => {
                    for (let object in objects) {
                        if (objects[object].id == newEditedMessageObject.id) {
                            newMessageContainer.innerHTML = `<span id="messageId--${newEditedMessageObject.id}">${objects[object].user.username}: ${document.querySelector(".editInput").value}</span> ${chatMessages.editBtnAdd(newEditedMessageObject, userId)} ${chatMessages.deleteBtnAdd(newEditedMessageObject, userId)}`;
                        }
                    }                    
                });
                chatMessages.update(document.querySelector(".editInput").value, recentlyEditedId, userId);
            }
        })
    }
};

export default messagesListeners;