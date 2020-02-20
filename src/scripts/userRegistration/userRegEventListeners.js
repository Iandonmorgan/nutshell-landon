import userRegistration from "./userRegDomManager.js";
import API from "../data.js";

const userAuthenticationListeners = {
    createNewAcctListener() {
        const createNewAcct = document.getElementById("createNewAccount");
        createNewAcct.addEventListener("click", userRegistration.createNewUser);
    },
    logInAsExistingUser() {
        const logInAsExistingUser = document.getElementById("useExistingAccount");
        logInAsExistingUser.addEventListener("click", function () {
            event.preventDefault();
            userRegistration.inputFields();
        });
    },
    loginListener() {
        const loginBtn = document.getElementById("nutshellLogin");
        const userNameInput = document.getElementById("userNameInput");
        const userPasswordInput = document.getElementById("userPasswordInput");
        loginBtn.addEventListener("click", function () {
            userRegistration.logIn(userNameInput.value, userPasswordInput.value);
        });
    },
    createNewAcctSubmitListener() {
        const newAcctBtn = document.getElementById("createNewAcctSubmit");
        const userNameInput = document.getElementById("registerNewUserNameInput");
        const userEmailInput = document.getElementById("registerNewUserEmailInput");
        const userPasswordInput = document.getElementById("registerNewUserPasswordInput");
        const userPasswordConfirmInput = document.getElementById("registerNewUserConfPasswordInput");
        const registerNewUserPhotoURL = document.getElementById("registerNewUserPhotoURL");
        newAcctBtn.addEventListener("click", function () {
            if (userPasswordInput.value !== userPasswordConfirmInput.value) {
                window.alert("Passwords must match!");

            } else if (userPasswordInput.value === userPasswordConfirmInput.value) {

                let emailAuth = true;
                let emailAuth2 = true;
                API.get("users").then(objects => {
                    for (let i = 0; i < objects.length; i++) {
                        if (userEmailInput.value === objects[i].email) {
                            emailAuth = false;
                        } else if (userNameInput.value === objects[i].username) {
                            emailAuth2 = false;
                        }
                    };
                    if (emailAuth === true && emailAuth2 === true) {
                        if (userNameInput.value === "" || userEmailInput.value === "" || userPasswordInput.value === "" || userPasswordConfirmInput.value === "" || registerNewUserPhotoURL.value === "") {
                            window.alert("I want all of your info, not just some of it... fill out all of the fields. They're all required and there is nothing you can do about it. Unless you run console.log and find the correct methods to run and hack into the app. In that case there is nothing I can do, and must admit defeat. Your move.")
                            return "";
                        } else {
                            let newUserObject = {
                                "username": userNameInput.value,
                                "email": userEmailInput.value,
                                "password": userPasswordConfirmInput.value,
                                "photoURL": registerNewUserPhotoURL.value
                            }
                            API.save(newUserObject, "users");
                            let newUserId = "";
                            API.get("users").then(objects => {
                                for (let i = 0; i < objects.length; i++) {
                                    if (objects[i].email == newUserObject.email) {
                                        newUserId = parseInt(objects[i].id);
                                        userRegistration.authorizedUser(newUserId);
                                    };
                                }
                            });
                        }
                    } else if (emailAuth === false || emailAuth2 === false) {
                        let message = "";
                        if (emailAuth === false) {
                            message = "Account already created with this email address.";
                        }
                        if (emailAuth2 === false) {
                            message += " Username already exists, please choose new username."
                        }
                        window.alert(message);
                    }
                    return "";

                });
            }
        });
    }

};

export default userAuthenticationListeners;