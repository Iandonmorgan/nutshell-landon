import userAuthenticationListeners from "./userRegEventListeners.js";
import API from "../data.js";

const loggedInHTML = `
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
<div>name: <input id="registerNewUserNameInput" type="text"></input></div>
<div>email: <input id="registerNewUserEmailInput" type="text"></input></div>
<div>password: <input id="registerNewUserPasswordInput" type="password"></input></div>
<div>confirm password: <input id="registerNewUserConfPasswordInput" type="password"></input></div>
<div><button id="createNewAccountSubmit">CREATE NEW ACCOUNT</button></div>
<div><a href="" id="useExistingAccount">login using existing account</a></div>
<input hidden="true" class="editInput"></input>
</fieldset>
`;

const dashboardContainer = document.getElementById("container");

const userRegistration = {
    inputFields() {
        console.log("HELLO");
        dashboardContainer.innerHTML = "HELLO" + signInPrompt;
        userAuthenticationListeners.createNewAcctListener();
        userAuthenticationListeners.loginListener();
    },
    logIn(userNameInput, userPasswordInput) {
        API.get("users").then(objects => {
            console.log(objects);
            console.log(userNameInput);
            console.log(userPasswordInput);
        });
    },
    createNewUser() {
        dashboardContainer.innerHTML = registerNewUserPrompt;
        userAuthenticationListeners.logInAsExistingUser();
    },
    authorizedUser() {
        dashboardContainer.innerHTML = loggedInHTML;
        eventListenersEvents.printEvents();
        const loggedInUserId = 2;
        messagesListeners.logInListener(loggedInUserId);
        articleEventListeners.newsArticleEvents();
    }

}

export default userRegistration;