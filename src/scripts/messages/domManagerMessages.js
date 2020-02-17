import API from "../data.js";
import messagesListeners from "./messagesEventListeners.js";


const containerMessages = document.querySelector("#containerMessages");
const loggedInUserId = 5;

const chatLine = (html, messageId, user, message) => {
    return `<${html} id="messageId--${messageId}">${user}: ${message}</${html}>`
}

const chatMessages = {
    editBtnAdd (message) {
        if (loggedInUserId === message.userId) {
            return `<button id="editMessage--${message.id}">Edit</button>`;
        } else {
            return "";
        }
    },
    deleteBtnAdd (message) {
        if (loggedInUserId === message.userId) {
            return `<button id="deleteMessage--${message.id}">Delete</button>`;
        } else {
            return "";
        }
    },
    loggedIn() {
        API.get("messages/?_expand=user").then(objects => chatMessages.render(objects));
        messagesListeners.submitListener();
        messagesListeners.mutateListener();
    },
    render(messages) {
        const chatLog = document.querySelector("#chatLog");
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
    clearChatInput() {
        document.getElementById("chatInput").value = "";
    },
    createMessageLineHTML(message) {
        return `<p>
            ${chatLine("span", message.id, message.user.username, message.message)}
            ${chatMessages.editBtnAdd(message)}
            ${chatMessages.deleteBtnAdd(message)}
            </p>`
    }
}

export default chatMessages;