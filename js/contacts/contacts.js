let initialLetter = [];

/**
 * loads all contacts and shows them in the board.
 * 
 * 
 */
async function initContacts() {
    await init();
    loadContacts();
}


/**
 * sorts the array alphabetially
 * @param {object} allContacts 
 * @returns the array with all contacts sorted alphabetiacally 
 */
function sortByFirstName(allContacts) {
    return allContacts.sort(function (a, b) {
        const firstNameA = a.name.split(' ')[0];
        const firstNameB = b.name.split(' ')[0];
        return firstNameA.localeCompare(firstNameB);
    });
}


/**
 * reveals the contact editor that flies in from the right
 */
function showContactEditor() {
    let overlay = document.getElementById('contactOverlay');
    let editor = document.getElementById('addContact');
    editor.classList.remove('d-none');
    editor.innerHTML = showNewContactEditor();
    overlay.style.opacity = '0.7';
    overlay.style.zIndex = '997';
    setTimeout(function () {
        editor.style.right = '0px';
    }, 100);
    scrollToTop();
}


/**
 * hides the contact editor back to the right and gives him display none due to responsive reasons
 */
function closeEditorCtc() {
    let overlay = document.getElementById('contactOverlay');
    let editor = document.getElementById('addContact');
    overlay.style.opacity = '0';
    overlay.style.zIndex = '-5';
    editor.style.right = '-4000px';
    setTimeout(function () {
        editor.classList.add('d-none');
    }, 100);
}


/**
 * gets the inputs from the contact editor and creates a new object that is then pushed into the JSON array
 */
async function addContact() {
    const nameInput = document.getElementById("name").value;
    const emailInput = document.getElementById("email").value;
    const numberInput = document.getElementById("phone").value;
    const contact = {
        name: nameInput,
        email: emailInput,
        number: numberInput,
        bgColor: setColor()
    };
    allContacts.push(contact);
    await saveNewContact();
    findNewPosition(nameInput);
}


/**
 * all contacts are saved to the server and the editor is closed
 */
async function saveNewContact() {
    try {
        const allContactsAsString = JSON.stringify(allContacts);
        await setItem('allContacts', allContactsAsString);
        loadContacts();
        closeEditorCtc();
    } catch (error) {
        console.error('Fehler beim Speichern des Kontakts:', error);
    }
}


/**
 * findes the initals of the name
 * @param {string} name 
 * @returns the first letter of the first name and the second name are being returned
 */
function getInitials(name) {
    const nameParts = name.split(' ');
    const firstNameInitial = nameParts[0][0].toUpperCase();
    const lastNameInitial = (nameParts.length > 1 ? nameParts[1][0] : '').toUpperCase();
    return `${firstNameInitial}${lastNameInitial}`;
}


/**
 * loads all contacts into the board and shows an individual logo with the initals of the contact
 */
function loadContacts() {
    let allContactsContainer = document.getElementById('allContacts');
    allContactsContainer.innerHTML = '';
    initialLetter = [];
    sortByFirstName(allContacts);
    renderAllContacts(allContactsContainer, initialLetter);
}


/**
 * This function renders all contacts
 * @param {HTMLElement} allContactsContainer 
 * @param {object} initialLetter 
 */
function renderAllContacts(allContactsContainer, initialLetter) {
    for (let i = 0; i < allContacts.length; i++) {
        const contact = allContacts[i];
        const initials = getInitials(contact['name']).toUpperCase();
        const firstInitial = initials[0][0].toUpperCase();
        const bgColor = contact.bgColor;
        checkInitialLetter(firstInitial);
        if (initialLetter[i] != 'blank') {
            allContactsContainer.innerHTML += contactHead(initials);
        }
        allContactsContainer.innerHTML += contactLayout(initials, contact, i);
        document.getElementById(`initialLogo${i}`).style.backgroundColor = bgColor;
    }
}


/**
 * it checks if the first initial does allready exist, if not it gets pushed
 * @param {string} firstInitial - inital letter of the name
 */
function checkInitialLetter(firstInitial) {
    if (!initialLetter.includes(firstInitial)) {
        initialLetter.push(firstInitial);
    }
    else {
        initialLetter.push('blank');
    }
}


/**
 * shows additional information in a separate container to the right that can be found in the allContacts array
 * @param {integer} i - chosen contact
 */
function showContact(i) {
    let contactDetailContainer = document.getElementById('contactDetailView');
    if (contactDetailContainer.style.left === '') {
        changeDetails(i, contactDetailContainer);
        document.getElementById('initialsDetailView').style.backgroundColor = allContacts[i]['bgColor'];
        scrollToTop();
    } else {
        contactDetailContainer.style.left = '100vw';
        setTimeout(function () {
            changeDetails(i, contactDetailContainer);
            document.getElementById('initialsDetailView').style.backgroundColor = allContacts[i]['bgColor'];
        }, 225);
        scrollToTop();
    }
}


/**
 * shows the changed contact directly
 */
function showDetails() {
    document.getElementById("contactsContainer").classList.add("opacity0");
    document.getElementById("contactDetailContainer").classList.remove("opacity0");
}


/**
 * shows the contact board again
 */
function showContacts() {
    document.getElementById("contactsContainer").classList.remove("opacity0");
    document.getElementById("contactDetailContainer").classList.add("opacity0");
}


/**
 * changes the details in the detail container to the details of the chosen 
 * @param {integer} i - chosen contact 
 * @param {HTMLElement} contactDetailContainer - the container that shows the additional information 
 */
function changeDetails(i, contactDetailContainer) {
    contactDetailContainer.innerHTML = '';
    contactDetailContainer.innerHTML += detailView(i);
    contactDetailContainer.classList.remove('d-none');
    setTimeout(function () {
        contactDetailContainer.classList.add("left764px");
    }, 400);
    contactDetailContainer.classList.remove("left100vw");
    showDetails();
}


/**
 * 
 * deletes the contact at the position i and saves the object allContacts
 * @param {number} i 
 */
async function deleteContact(i) {
    let contactDetailContainer = document.getElementById('contactDetailView');
    allContacts.splice(i, 1);
    await saveNewContact();
    contactDetailContainer.classList.remove("left764px");
    contactDetailContainer.classList.add("left100vw");
    closeAskToDelete();
    showContacts();
}


/**
 * 
 * renders the edit contact view
 * @param {number} i 
 */
function editContact(i) {
    let overlay = document.getElementById('contactOverlay');
    let editor = document.getElementById('addContact');
    editor.innerHTML = showEditor(i);
    overlay.style.opacity = '0.7';
    overlay.style.zIndex = '997';
    editor.classList.remove('d-none');
    setTimeout(function () {
        editor.style.right = '0px';
    }, 100);
    document.getElementById('name').value = checkUndefined(allContacts[i]['name']);
    document.getElementById('email').value = checkUndefined(allContacts[i]['email']);
    document.getElementById('phone').value = checkUndefined(allContacts[i]['number']);
    document.getElementById('initialDiv').style.backgroundColor = allContacts[i]['bgColor'];
    scrollToTop();
}


/**
 * 
 * @param {string or number} value 
 * @returns the value or an empty string 
 */
function checkUndefined(value) {
    return value !== undefined ? value : '';
}


/**
 * gets the information that has been put into the inputfields of a specific contact and saves the changes
 * @param {integer} i - chosen contact
 */
async function saveContact(i) {
    allContacts[i].name = document.getElementById("name").value;
    allContacts[i].email = document.getElementById("email").value;
    allContacts[i].number = document.getElementById("phone").value;
    closeEditorCtc();
    loadContacts();
    await saveNewContact();
    findNewPosition(allContacts[i].name);
}


/**
 * 
 * this function searches for a contact with a specific name (nameInput) in a list of contacts (allContacts)
 * @param {string} nameInput 
 */
function findNewPosition(nameInput) {
    for (let j = 0; j < allContacts.length; j++) {
        if (allContacts[j].name === nameInput) {
            showContact(j);
        }
    }
}


/**
 * scrolls to the top of the window
 */
function scrollToTop() {
    document.documentElement.scrollTop = 0;
}


/**
 * This function shows the delete question for contacts
 */
function askToDelete(){
    let askContainer = document.getElementById('askToDelete');
    let askOverlay = document.getElementById('askCloseOverlay');
    askOverlay.style.zIndex = '101';
    askOverlay.style.opacity = '0.5';
    askContainer.style.zIndex = '102';
    askContainer.style.opacity = '1';
    
}


/**
 * This function hides the delete question for contacts
 */
function closeAskToDelete(){
    let askContainer = document.getElementById('askToDelete');
    let askOverlay = document.getElementById('askCloseOverlay');
    askOverlay.style.zIndex = '-6';
    askOverlay.style.opacity = '0';
    askContainer.style.zIndex = '-6';
    askContainer.style.opacity = '0';
}





