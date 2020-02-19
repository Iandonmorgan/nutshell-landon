import userRegistration from "./userRegDomManager.js"


const userAuthenticationListeners = {
    createNewAcctListener() {
        const createNewAcct = document.getElementById("createNewAccount");
        createNewAcct.addEventListener("click", userRegistration.createNewUser); 
    },
    logInAsExistingUser() {
        const logInAsExistingUser = document.getElementById("useExistingAccount");
        logInAsExistingUser.addEventListener("click", userRegistration.inputFields);
    },
    loginListener() {
        const loginBtn = document.getElementById("nutshellLogin");
        const userNameInput = document.getElementById("userNameInput");
        const userPasswordInput = document.getElementById("userPasswordInput");
        loginBtn.addEventListener("click", function(){
            userRegistration.logIn(userNameInput.value, userPasswordInput.value);
        }, false);
    }

};

export default userAuthenticationListeners;