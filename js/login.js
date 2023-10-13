let userPasswordChange = "";

/**
 * this is where it is checked whether a user or a guest wants to log in.
 * 
 * @param {string} user - it specifies either 'user' or 'guest' to determine who wants to log in
 */
async function loggedIn(user) {
    if(user === 'Guest'){
        loggedInUser = await setItem('loggedInUser', user);
        window.location.href = "summary.html";
        setLogInStatus();
        clearLocalStorageUser();
    }
    else{
        checkUserExist('logIn');
    }
}


/**
 * it navigates back to the homepage
 * 
 */
function backToLogin() {
    window.location.href = "login.html";
}


/**
 * the image of the checkbox is being changed here 
 * 
 * @param {string} id - the ID of the image box that needs to be changed 
 */
function changeCheckBox(id) {
    let box = document.getElementById(id);
    let isChecked = box.getAttribute('src') === "../img/Check button.svg";
    box.src = isChecked ? "../img/checkButtenChecked.svg" : "../img/Check button.svg";
    if(id === "checkSignUp"){
        document.getElementById("signUpBtn").disabled = !isChecked;
    }
}


/**
 * the image of the input field is being changed, and the type of input is being changed to either "text" or "password
 * 
 * @param {string} idImg - the ID of the image that is going to be changed
 * @param {string} idInput - the ID of the input that is going to be changed
 */
function changeInputPasswordToTxt(idImg, idInput) {
    let imgBox = document.getElementById(idImg);
    let inputBox = document.getElementById(idInput);
    switch(imgBox.getAttribute('src')) {
        case "../img/lock.svg":
            imgBox.src = "../img/visibility_off.svg";
            break;
        case "../img/visibility.svg":
            imgBox.src ="../img/visibility_off.svg";
            inputBox.type = "password";
            break;
        case "../img/visibility_off.svg":
            imgBox.src ="../img/visibility.svg";
            inputBox.type = "text";
            break;
    }    
}


/**
 * the view is going to be changed to the Sign Up perspective
 * 
 */
function signUp() {
    document.getElementById("signUp").classList.add("d-none");
    document.getElementById("loginBox").innerHTML = signUpTemplate();
}


/**
 * the view is going to be changed to the Forgot Password perspective
 * 
 */
function forgotPasswordView() {
    let loginBox = document.getElementById("loginBox");
    document.getElementById("signUp").classList.add("d-none");
    loginBox.classList.add("loginBoxWide");
    loginBox.classList.remove("loginBox");
    loginBox.innerHTML = forgotPasswordTemplate();
}


/**
 * the view is going to be changed to the Reset Password perspective
 * 
 */
function resetPasswordView() {
    document.getElementById("loginBox").innerHTML = resetPasswordTemplate();
}


/**
 * variables are created here to further check the inserted passwords if they match or not 
 * 
 * @param {string} view - the current view 
 */
function validatePassword(view) {
    let password = document.getElementById(view + "Password").value;
    let confirmPassword = document.getElementById(view + "ConfirmPassword").value;
    let confirmPasswordInput = document.getElementById(view + "ConfirmPassword");
    passwordMatchOrNot(password, confirmPassword , confirmPasswordInput, view);
    emptyCustomValidity(confirmPasswordInput);
}


/**
 * here it is checked whether the entered passwords match or not
 * 
 * @param {string} password - value of password which was inserted
 * @param {string} confirmPassword - value of confirm password which was inserted
 * @param {object} confirmPasswordInput - input field of the confirm password which was inserted
 * @param {string} view - the current view 
 */
function passwordMatchOrNot(password, confirmPassword , confirmPasswordInput, view) {
    if(password !== confirmPassword){
        confirmPasswordInput.setCustomValidity("Passwords do not match");
        confirmPasswordInput.reportValidity();
    }
    else{
        validatePasswordPath(view);
    } 
}


/**
 * decides the path to take depending on the view
 * 
 * @param {string} view - the current view
 */
function validatePasswordPath(view) {
    view === "signUp" ? checkUserExist(view) : resetPassword();
}


/**
 * resets the custum validity to empty
 * 
 * @param {object} input - the objekt where the custum validity is going to be cleared
 */
function emptyCustomValidity(input) {
    input.addEventListener("input", function () {
        input.setCustomValidity("");
        input.reportValidity();
    });
}


/**
 * a new user is going to be registered
 * 
 */
async function register() {
    let user = setUserInfo();
    users.push(user);
    await setItem('users', JSON.stringify(users));
    pushUsersToContacts(user);
}


/**
 * user infos are going to be collected and saved in an JSON-Object
 * 
 * @returns the user info which is going to be registered
 */
function setUserInfo() {
    let username = document.getElementById("signUpName").value;
    let usermail = document.getElementById("signUpEmail").value;
    let userpassword = document.getElementById("signUpPassword").value;
    let userInfo = {
        name: username,
        email: usermail,
        password: userpassword,
        bgColor: setColor(),
    };
    return userInfo;
}


/**
 * variables are created here to check the existence from the inserted user
 * 
 * @param {string} view - the current view 
 */
function checkUserExist(view) {
    let usermailInput = document.getElementById(view + "Email");
    let usermail = usermailInput.value;
    let emailExists = users.some(user => user.email === usermail);
    checkUserExistWhichView(emailExists, view, usermailInput, usermail);
    emptyCustomValidity(usermailInput);
}

/**
 * variables are checked and then it is decided which other functions are to be executed 
 * 
 * @param {boolean} emailExists - email exist or not 
 * @param {string} view - the current view
 * @param {object} usermailInput - input field of the email which was inserted
 * @param {string} usermail - value of the email which was inserted
 */
async function checkUserExistWhichView(emailExists, view, usermailInput, usermail) {
    if (emailExists && view === "signUp") {
        usermailInput.setCustomValidity("Email already exists!");
        usermailInput.reportValidity();
    } else if(view === "signUp"){
        popup = 'You Signed Up successfully';
        await register();
        showSuccessMessage();
    } else if(!emailExists && (view === "forgotPassword" || view === "logIn")){     
        usermailInput.setCustomValidity("Email doesn't exist");
        usermailInput.reportValidity();
    } else if(view === "forgotPassword"){
        popup = "An Email has been sent to you";
        userPasswordChange = usermail;
        showSuccessMessage();
    } else {
        checkEmailExistence(usermail);
    }
}


/**
 * checks if the mail which was inserted is created
 * 
 * @param {string} usermail - value of the email which was inserted
 */
function checkEmailExistence(usermail) {
    let logInPassword = document.getElementById("logInPassword").value;
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        if(user.email === usermail) {
            let userPassword = user.password;
            let userName = user.name;
            checkPassword(userPassword, logInPassword, userName);
        }
    }
}


/**
 * checks if booth passwords are the same
 * 
 * @param {string} userPassword - password form server to the inserted email
 * @param {string} logInPassword - password which was inserted
 */
function checkPassword(userPassword, logInPassword, userName) {
    if (userPassword === logInPassword) {
        logInToSummary(userName);
    }
    else {
        denyLogIn();
    }
}


/**
 * This function allows the log in
 * @param {string} userName 
 */
async function logInToSummary(userName) {
    loggedInUser = await setItem('loggedInUser', userName);
    let userInput = document.getElementById('logInEmail').value;
    let rememberMe = document.getElementById('checkLogIn').getAttribute('src');
    checkRememberBtn(userInput, rememberMe);
    setLogInStatus();
    window.location.href = "summary.html"
}


/**
 * This function denies the log in by setting custom validity
 * 
 */
function denyLogIn() {
    let logInPasswordInput = document.getElementById("logInPassword");
    logInPasswordInput.setCustomValidity("Wrong password Ups! Try again.");
    logInPasswordInput.reportValidity();
    emptyCustomValidity(logInPasswordInput);
}


/**
 * checks if the "Remember Me" button is checked
 * 
 * @param {Object} userInput 
 * @param {Object} rememberMe 
 */
function checkRememberBtn(userInput, rememberMe) {
    if (rememberMe === "../img/checkButtenChecked.svg") {
        setUserToLocalStorage(userInput);
    }
    else {
        clearLocalStorageUser();
    }
}


/**
 * changes the user password to a new value which was inserted
 * 
 */
function resetPassword() {
    let newPassword = document.getElementById("resetPassword").value;
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        if(userPasswordChange === user.email) {
            user.password = newPassword;
            break;
        }
    }
    setItem('users', JSON.stringify(users));
    popup = "You reset your password";
    showSuccessMessage();
}