let users = [];
let tasks = [];
let allContacts = [];
let categories = ['Technical Task', 'User Story'];
let subtaskcounter = 0;
let bgColors = ['#FF7A00', '#462F8A', '#FFBB2B', '#FC71FF', '#6E52FF', '#1FD7C1', '#9327FF', '#FF4646',];
let loggedInUser;
let popup = "";
let idForEditmode;
let indexForEditmode;
let editModeOnOrOff = false;


/**
 * 
 * load all data, templates and specific information on specific views
 */
async function init() {
    let path = window.location.pathname;
    checkLoginStatus(path);
    await includeHTML();
    await loadData();    
    if (path.endsWith('/board.html') || path.endsWith('/addTask.html')) {
        loadAddTask();
    }
    if (path.endsWith('/board.html')) {
        loadBoard();
    }
}


/**
 * 
 * highlight the current view in the menu and removes the hover effect 
 */
function setCurrentViewInMenu() {
    let currentView = window.location.pathname;
    let lastSlashIndex = currentView.lastIndexOf('/');
    let dotIndex = currentView.lastIndexOf('.');
    let id = currentView.substring(lastSlashIndex + 1, dotIndex);
    document.getElementById("menu-" + id).classList.remove('menu-sections');
    document.getElementById("menu-" + id).classList.add('menu-sectionsNoHover');
}


/**
 * 
 * load all data from the storage 
 */
async function loadData() {
    try {
        users = JSON.parse(await getItem('users'));
        tasks = JSON.parse(await getItem('task'));
        allContacts = JSON.parse(await getItem('allContacts'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}


/**
 * 
 * push the user to the allContacts object 
 * @param {string} user 
 */
async function pushUsersToContacts(user) {
    let isUserInContacts = allContacts.some(contact => contact.email === user.email);
    if (!isUserInContacts) {
        allContacts.push(user);
        const allContactsAsString = JSON.stringify(allContacts);
        await setItem('allContacts', allContactsAsString);
    }
}


/**
 * 
 * @returns a random color from the array bgColors
 */
function setColor() {
    const randomIndex = Math.floor(Math.random() * bgColors.length);
    return bgColors[randomIndex];
}


/**
 * Includes the header and the menu to the view
 * 
 */
async function includeHTML() {
    loggedInUser = await getItem('loggedInUser');
    let includeElements = document.querySelectorAll('[w3-include-html]'); 
    for (let i = 0; i < includeElements.length; i++) { 
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let response = await fetch(file); 
        if (response.ok) {
            element.innerHTML = await response.text(); 
        } else {
            element.innerHTML = 'Page not found';
        }
    }
    showLoggedInUser();
    let path = window.location.pathname;
    if (!path.endsWith('/legalNotice.html') && !path.endsWith('/privatPolicy.html') && !path.endsWith('/help.html')) {
        setCurrentViewInMenu();
    }
    
}


/**
 * 
 * shows the initals of the current logged in user
 */
function showLoggedInUser() {
    let box = document.getElementById('loggedInUser');
    let initials = getInitials(loggedInUser);
    box.innerHTML = initials;
}


/**
 * creates a popup message
 * 
 */
function showSuccessMessage() {
    let successDivContainer = document.createElement('div');
    successDivContainer.id = 'popup';
    let successDiv = document.createElement('div');
    successDiv.textContent = popup;
    successDiv.classList.add('btnDark');
    successDiv.classList.add('widthFit');
    successDiv.classList.add('popupAnimation');
    successDivContainer.appendChild(successDiv);
    document.body.appendChild(successDivContainer);
    setTimeoutPopup(successDivContainer);
}


/**
 * delete the popup and continues to the next page
 *  
 * @param {object} successDivContainer 
 */
function setTimeoutPopup(successDivContainer) {
    setTimeout(() => {
        successDivContainer.remove();
        pathAfterPopup();
    }, 1000);
}


/**
 * 
 * switch for the path after the popup on the differnt views
 */
function pathAfterPopup() {
    switch (popup) {
        case "An Email has been sent to you":
            resetPasswordView();
            break;
        case "You reset your password": 
        case "You Signed Up successfully":
            backToLogin();
            break;
        case "Task added to Board":
            let path = window.location.pathname;
            if (!path.endsWith('/board.html')) {
                window.location.href = 'board.html';
            } else {
                renderTasks('toDo');
                hideAddTask();
            }
            break;
    }
}


/**
 * set the value of the remembered user into the email address input field
 * 
 */
function setRememberedUser() {
    let userInput = document.getElementById('logInEmail');
    userInput.value = getUserFromLocalStorage();   
}


/**
 * check if any keys are pressed on the keyboard and prevent all input except for 0-9 and +
 * 
 * @param {event} event 
 * @returns 
 */
function checkInput(event) {
    let key = event.key || event.which;
    if (/[0-9+]/.test(key) || event.keyCode >= 37 && event.keyCode <= 40 || event.keyCode == 8 || event.keyCode == 46) {
        return true;
    } else {
        event.preventDefault();
        return false;
    }
}


/**
 * checks the login status and switch to login if no one is logged in
 * 
 * @param {string} path 
 */
function checkLoginStatus(path) {
    let status = sessionStorage.getItem('loginStatus');
    if (!path.endsWith('/login.html') && !path.endsWith('/privatPolicy.html') && !path.endsWith('/legalNotice.html')) {
        if (!status) {
            window.location.href = 'login.html';
        }
    }
}


/**
 * sets login status to true
 * 
 */
function setLogInStatus() {
    sessionStorage.setItem('loginStatus', true);
}


/**
 * go back to login in and sets login status to false
 * 
 */
function logOut() {
    window.location.href = 'login.html';
    sessionStorage.setItem('loginStatus', false);
}