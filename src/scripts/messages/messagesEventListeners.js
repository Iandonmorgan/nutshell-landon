import API from "../data.js";
import chatMessages from "./domManagerMessages.js";

const containerMessages = document.querySelector("#containerMessages");
const loggedInUserId = 5;

const chatDisplay = `<div id="chatLog">
                        chat is loading...
                    </div>
                    <div id="chatInputContainer">
                        <input type="text" size="60" name="chatInput" id="chatInput">
                        <button type="submit" id="chatSubmit">Submit</button>
                    </div>`;

const messagesListeners = {
    logInListener() {
        document.getElementById("chatLogin").addEventListener("click", function () {
            containerMessages.innerHTML = chatDisplay;
            chatMessages.loggedIn();
        });
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
                    const newMessage = `<span id="messageId--${message.id}">${message.user.username}: <input id="newMessage--${message.id}" type="text" value="${message.message}"></input></span><button id="cancelMessage--${message.id}">Cancel</button><button id="saveMessage--${message.id}">Save</button><button id="deleteMessage--${message.id}">Delete</button>`;
                    const newMessageContainer = document.getElementById(`messageId--${message.id}`).parentNode;
                    newMessageContainer.innerHTML = newMessage;
                    newMessageContainer.addEventListener("click", function () {
                        if (event.target.id.split("--")[0] === "cancelMessage") {
                            newMessageContainer.innerHTML = `<span id="messageId--${oldMessageId}">${oldUser}: ${oldMessage}</span>${chatMessages.editBtnAdd(message)}${chatMessages.deleteBtnAdd(message)}`;
                        } else if (event.target.id.split("--")[0] === "saveMessage") {
                            const newEditedMessage = document.getElementById(`newMessage--${event.target.id.split("--")[1]}`);
                            const newEditedMessageObject = {
                                "id": parseInt(event.target.id.split("--")[1]),
                                "userId": loggedInUserId,
                                "message": newEditedMessage.value,
                                "timestamp": Date.now()
                            }
                            API.update(newEditedMessageObject, "messages");
                            newMessageContainer.innerHTML = `<span id="messageId--${newEditedMessageObject.id}">${oldUser}: ${newEditedMessageObject.message}</span> ${chatMessages.editBtnAdd(message)} ${chatMessages.deleteBtnAdd(message)}`;
                        }
                    });
                });
            } else if (event.target.id.split("--")[0] === "deleteMessage") {
                const message = document.getElementById(event.target.id);
                API.delete(event.target.id.split("--")[1], "messages").then(message.parentNode.parentNode.removeChild(message.parentNode));
            }
        });
    }
}

export default messagesListeners;