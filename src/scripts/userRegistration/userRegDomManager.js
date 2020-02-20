import userAuthenticationListeners from "./userRegEventListeners.js";
import API from "../data.js";
import eventListenersEvents from "../events/eventListeners.js";
import messagesListeners from "../messages/messagesEventListeners.js";
import articleEventListeners from "../articles/articleEventListeners.js";

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

<button type="button" id="newArticleBtn">New Article</button>
<input type="hidden" id="articleHiddenId" value="" />
<article id="dashboardFormField"></article>
<article id="newsArticles"></article>
</div>
`;

const signInPrompt = `
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
        let authUserId = "";
        API.get("users").then(objects => {
            for (let i = 0; i < objects.length; i++) {
                if (objects[i].email.toUpperCase() === userNameInput.toUpperCase() || objects[i].username.toUpperCase() === userNameInput.toUpperCase()) {
                    if (objects[i].password === userPasswordInput) {
                        userLoginAuth = true;
                        sessionStorage.setItem("user", JSON.stringify(objects[i]));
                        authUserId = (JSON.parse(sessionStorage.getItem("user"))).id; // use this code to add a conditional somewhere else.... if getItem("user") = null reload login; if getItem("user") has value, load that dashboard.
                    }
                }
            }
            if (userLoginAuth === true) {
                userRegistration.authorizedUser(authUserId);

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
    }

}

export default userRegistration;