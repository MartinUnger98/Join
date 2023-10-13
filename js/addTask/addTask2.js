/**
 * This functions deletes the added subtask permanently
 * @param {string} subtaskID 
 */
function deleteSubtask(subtaskID) {
    let subtaskElement = document.getElementById(subtaskID);
    if (subtaskElement) {
        subtaskElement.remove();
    }
}


/**
 * This function is used for the clear-button and clears all input of addTask
 */
function allMightyClear() {
    document.getElementById('input').value = '';
    document.getElementById('textarea').value = '';
    document.getElementById('date').value = '';
    clearPriorityButtons();
    clearCategory();
    document.getElementById('subtask').value = '';
    document.getElementById('subtask-content').innerHTML = '';
    clearContacts();
}


/**
 * This function restores the priorty buttons
 */
function clearPriorityButtons() {
    let urgent = document.getElementById('urgent');
    let medium = document.getElementById('medium');
    let low = document.getElementById('low');
    let urgentImg = document.getElementById('urgent-img');
    let mediumImg = document.getElementById('medium-img');
    let lowImg = document.getElementById('low-img');
    switchPriorityButtonsToNormal(urgent, medium, low, urgentImg, mediumImg, lowImg);
}


/**
 * This function switches every single priority-button back to normal, in case they were seleceted
 * @param {string} urgent - id of priority-box urgent
 * @param {string} medium - id of priority-box medium
 * @param {string} low - id of priority-box low
 * @param {string} urgentImg - id of img urgent
 * @param {string} mediumImg - id of img medium
 * @param {string} lowImg - id of img loe
 */
function switchPriorityButtonsToNormal(urgent, medium, low, urgentImg, mediumImg, lowImg) {
    if (urgent.classList.contains('bg-urgent')) {
        clearUrgent(urgent, urgentImg);
    }
    if (medium.classList.contains('bg-medium')) {
        clearMedium(medium, mediumImg);
    }
    if (low.classList.contains('bg-low')) {
        clearLow(low, lowImg);
    }   
}


/**
 * this function clears the urgent priority
 * 
 * @param {HTMLElement} urgent 
 * @param {HTMLElement} urgentImg 
 */
function clearUrgent(urgent, urgentImg) {
    urgent.classList.add('bg-urgent');
    urgent.classList.add('bg-white');
    urgentImg.src = '..img/urgent_red.svg';
}


/**
 * this function clears the medium priority
 * 
 * @param {HTMLElement} medium 
 * @param {HTMLElement} mediumImgImg 
 */
function clearMedium(medium, mediumImg) {
    medium.classList.add('bg-medium');
    medium.classList.add('bg-white');
    mediumImg.src = '..img/medium_yellow.svg';
}


/**
 * this function clears the low priority
 * 
 * @param {HTMLElement} low 
 * @param {HTMLElement} lowImg 
 */
function clearLow(low, lowImg) {
    low.classList.add('bg-low');
    low.classList.add('bg-white');
    lowImg.src = '..img/low_green.svg';
}


/**
 * The function clears the category dropdown
 */
function clearCategory() {
    let select = document.getElementById('select');
    let content = document.getElementById('content');
    select.firstElementChild.innerText = "Select Task Category";
    content.classList.remove('active');
    addCategory('');
}


/**
 * This function clears the contact dropdown 
 */
function clearContacts() {
    let contacts = document.querySelectorAll('.checked');
    contacts.forEach(contact => {
        contact.classList.remove('checked');
        let checkboxId = contact.querySelector('input[type="checkbox"]').id;
        document.getElementById(checkboxId).checked = false;
    });
    moveSelectedContacts();
}


/**
 * This function loads all existing contacts inside of the contact dropdown
 */
function renderUser() {
    let content = document.getElementById('contact_content');
    content.innerHTML = '';
    sortByFirstName();
    for (let i = 0; i < allContacts.length; i++) {
        const user = allContacts[i];
        let username = user.name;
        const initials = getInitials(username);
        const bgUser = user.bgColor;
        content.innerHTML += showRenderedContacts(initials, bgUser, i, username);
    }
}


/**
 * This function creates the initials of each Contact
 * @param {string} name - name of contact from tasks
 * @returns - initial of firstname and initial of lastname (if existing)
 */
function getInitials(name) {
    const nameParts = name.split(' ');
    const firstNameInitial = nameParts[0][0];
    const lastNameInitial = nameParts.length > 1 ? nameParts[1][0] : '';
    return `${firstNameInitial}${lastNameInitial}`;
}


/**
 * This function gets the selected contact highlighted
 * @param {number} id - number of each contact-div
 */
function toggleCheckbox(id) {
    let selection = document.getElementById(`user-selection-${id}`);
    if (!selection.classList.contains('checked')) {
        selection.classList.add('checked');
        moveSelectedContacts();
    } else {
        selection.classList.remove('checked');
        moveSelectedContacts();
    }
}


/**
 * This function moves the selected contacts into the selctedContacts-div.
 * All selected contacts will be shown by their initials
 */
function moveSelectedContacts() {
    let category = document.getElementById('content');
    let selectedContactsDiv = document.getElementById('selected_contacts');
    selectedContactsDiv.innerHTML = '';
    let contactsAdded = false;
    for (let i = 0; i < allContacts.length; i++) {
        if (isContactSelected(i)) {
            const user = allContacts[i];
            addSelectedContact(selectedContactsDiv, user, i);
            contactsAdded = true;
            category.classList.add('category-top');
        }
    }
    updateCategoryVisibility(contactsAdded, category);
}


/**
 * This function sets a condition
 * @param {number} index 
 * @returns - if classlist 'checked' is added and checkbox is checked
 */
function isContactSelected(index) {
    let selection = document.getElementById(`user-selection-${index}`);
    let checkbox = document.getElementById(`user-${index}`);
    return selection.classList.contains('checked') && checkbox.checked;
}


/**
 * This function creates the icon (initials) of the selected contact and adds it to the div underneath
 * @param {string} selectedContactsDiv - div for selected contacts
 * @param {string} user - array of all Contacts
 * @param {number} index - index of each contact
 */
function addSelectedContact(selectedContactsDiv, user, index) {
    const bgUser = user.bgColor;
    const initials = getInitials(user.name);
    selectedContactsDiv.innerHTML += /*html*/ `
        <div class="initials-selected" id="selected_contact-${index}" style="background-color: ${bgUser}">${initials}</div>
    `;
}


/**
 * This function removes the class 'category-top' if no contact is added.
 * Used for position absolute of category dropdown (Only used for responsive)
 * @param {string} contactsAdded - status of added contact
 * @param {string} category - dropdown id of category
 */
function updateCategoryVisibility(contactsAdded, category) {
    if (!contactsAdded) {
        category.classList.remove('category-top');
    }
}

