import userAuthenticationListeners from "./userRegEventListeners.js";
import API from "../data.js";
import eventListenersEvents from "../events/eventListeners.js";
import messagesListeners from "../messages/messagesEventListeners.js";
import articleEventListeners from "../articles/articleEventListeners.js";
import openTasksForm from "../tasks/events.js";

const loggedInHTML = `
<div id="userLoginPrompt">
    <fieldset id="containerMessages">
      <button id="chatLogin">LOGIN TO CHAT</button>
      <input hidden="true" class="editInput"></input>
    </fieldset>
    <div id="containerEvents">
      <input type="hidden" id="hiddenUserId" value="">
      <input type="hidden" id="hiddenInputEvents" value="">
      <div id="entryFormEvents">
        <button type="button" id="newEventButton">New Event</button>
      </div>
      <div id="printLocationEvents">
      </div>
    </div>

    <div id="tasks-container">
      <button id="tasks">Tasks</button>
      <input type="hidden" id="hidden-input" value="">
      <div id="tasks-form">
        
      </div>
      <div id="tasks-list">
        
      </div>
    </div>
    <button type="button" id="newArticleBtn">New Article</button>
    <input type="hidden" id="articleHiddenId" value="" />
    <article id="dashboardFormField"></article>
    <article id="newsArticles"></article>
</div>
`;

const signInPrompt = `
<div id=alert></div>
<fieldset id="signInPrompt">
<legend align="right">WELCOME TO nUTSHELL</legend>
<div>username: <input id="userNameInput" type="text"></input></div>
<div>password: <input id="userPasswordInput" type="password"></input></div>
<div><button id="nutshellLogin">LOGIN</button></div>
<div><a href="" id="createNewAccount">create new account</a></div>
<input hidden="true" class="editInput"></input>
</fieldset>
`;

const registerNewUserPrompt = `
<div id=alert></div>
<fieldset id="registerNewUserPrompt">
<div>username: <input id="registerNewUserNameInput" type="text"></input></div>
<div>email: <input id="registerNewUserEmailInput" type="email"></input></div>
<div>password: <input id="registerNewUserPasswordInput" type="password"></input></div>
<div>confirm password: <input id="registerNewUserConfPasswordInput" type="password"></input></div>
<div>Photo Link (URL): <input id="registerNewUserPhotoURL" type="text"></input></div>
<div><button id="createNewAcctSubmit">CREATE NEW ACCOUNT</button></div>
<div><a href="" id="useExistingAccount">login using existing account</a></div>
<input hidden="true" class="editInput"></input>
</fieldset>
`;

const dashboardContainer = document.getElementById("container");

const userRegistration = {
    inputFields() {
        dashboardContainer.innerHTML = signInPrompt;
        userAuthenticationListeners.createNewAcctListener();
        userAuthenticationListeners.loginListener();
    },
    logIn(userNameInput, userPasswordInput) {
        let userLoginAuth = false;
        let match = "";
        let authUserId = "";
        API.get("users").then(objects => {
            for (let i = 0; i < objects.length; i++) {
                if (objects[i].email.toUpperCase() === userNameInput.toUpperCase() || objects[i].username.toUpperCase() === userNameInput.toUpperCase()) {
                    if (objects[i].password === userPasswordInput) {
                        userLoginAuth = true;
                        sessionStorage.setItem("user", JSON.stringify(objects[i]));
                        authUserId = (JSON.parse(sessionStorage.getItem("user"))).id; // use this code to add a conditional somewhere else.... if getItem("user") = null reload login; if getItem("user") has value, load that dashboard.
                    } else {
                        document.getElementById("alert").innerHTML = "";
                        setTimeout(function () { document.getElementById("alert").innerHTML = `While I appreciate your login attempt, I regret to inform you it was unsuccessful as your username and/or your password are incorrect. Please try again.` }, 180);
                    }
                }
                if (userLoginAuth === true) {
                    userRegistration.authorizedUser(authUserId);

                }
            }
            match = (objects.find(obj => obj.email.toUpperCase() === userNameInput.toUpperCase()));
            match = (objects.find(obj => obj.username.toUpperCase() === userNameInput.toUpperCase()));
            if (match === undefined) {
                document.getElementById("alert").innerHTML = "";
                setTimeout(function () { document.getElementById("alert").innerHTML = `While I appreciate your login attempt, I regret to inform you it was unsuccessful as your username and/or your password are incorrect. Please try again.` }, 180);
            }
        });
    },
    createNewUser() {
        event.preventDefault();
        dashboardContainer.innerHTML = registerNewUserPrompt;
        userAuthenticationListeners.createNewAcctSubmitListener();
        userAuthenticationListeners.logInAsExistingUser();
    },
    authorizedUser(userId) {
        dashboardContainer.innerHTML = loggedInHTML;
        eventListenersEvents.printEvents(userId);
        messagesListeners.logInListener(userId);
        articleEventListeners.newsArticleEvents(userId);
        openTasksForm(userId);
    }

}

export default userRegistration;