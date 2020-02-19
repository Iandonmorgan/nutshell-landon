import API from "../data.js";
import messagesListeners from "./messagesEventListeners.js";

const chatMessages = {
    chatLine(html, messageId, user, message) {
        return `<${html} id="messageId--${messageId}">${user}: ${message}</${html}>`
    },
    editBtnAdd(message, userId) {
        if (userId === message.userId) {
            return `<button id="editMessage--${message.id}">Edit</button>`;
        } else {
            return "";
        }
    },
    deleteBtnAdd(message, userId) {
        if (userId === message.userId) {
            return `<button id="deleteMessage--${message.id}">Delete</button>`;
        } else {
            return "";
        }
    },
    loggedIn(userId) {
        API.get("messages/?_expand=user").then(objects => chatMessages.render(objects, userId));
        messagesListeners.submitListener(userId);
        messagesListeners.mutateListener(userId);
    },
    render(messages, userId) {
        const chatLog = document.querySelector("#chatLog");
        let chatLogMessages = "";
        chatLog.innerHTML = "";
        messages.forEach(message => {
            chatLogMessages += chatMessages.createMessageLineHTML(message, userId);
        })
        chatLog.innerHTML += chatLogMessages;
        chatLog.scrollTop = 9999999999; // there should be a better way to do this scroll. I've noticed with images in the chat, it isn't perfect.
        chatMessages.clearChatInput();
    },
    post(message, userId) {
        const objToSave = {
            "userId": parseInt(userId),
            "message": message,
            "timeStamp": Date.now()
        };
        chatMessages.clearChatInput();
        API.save(objToSave, "messages");
        API.get("messages/?_expand=user").then(objects => chatMessages.render(objects, userId));
    },
    update(message, id, userId) {
        const objToSave = {
            "id": parseInt(id),
            "userId": userId,
            "message": message,
            "timeStamp": Date.now()
        };
        // chatMessages.clearUpdateInput();
        API.update(objToSave, "messages");
    },
    clearUpdateInput() {
        document.querySelector(".editInput").value = "";
    },
    clearChatInput() {
        document.getElementById("chatInput").value = "";
    },
    createMessageLineHTML(message, userId) {
        return `<p>
            ${chatMessages.chatLine("span", message.id, message.user.username, message.message)}
            ${chatMessages.editBtnAdd(message, userId)}
            ${chatMessages.deleteBtnAdd(message, userId)}
            </p>`
    }
}

export default chatMessages;