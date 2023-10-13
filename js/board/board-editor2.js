
/**
 * This function renders all users within the contact dropdown in editor
 * @param {number} id - id of editor
 */
function renderUserInEditor(id) {
    let content = document.getElementById(`contact_content-editor${id}`);
    content.innerHTML = '';
    sortByFirstName();
    for (let i = 0; i < allContacts.length; i++) {
        const user = allContacts[i];
        let username = user.name;
        const initials = getInitials(username);
        const bgUser = user.bgColor;
        content.innerHTML += showAllContactsinEditor(id, i, initials, bgUser, username);
    };
}


/**
 * This function toggles the the selected contacts in editor
 * @param {number} id - id of editor
 * @param {number} i - index of tasks (used as id for contact selection)
 */
function toggleCheckboxInEditor(id, i) {
    let selection = document.getElementById(`user-selection-${id}-${i}`);
    if (!selection.classList.contains('checked-editor')) {
        selection.classList.add('checked-editor');
        moveSelectedContactsInEditor(id)
    } else {
        selection.classList.remove('checked-editor');
        moveSelectedContactsInEditor(id);
    }
}


/**
 * This function moves the selected contacts into the div underneath
 * @param {number} id - id of editor
 */
function moveSelectedContactsInEditor(id) {
    let selectedContactsDiv = document.getElementById(`selected_contacts_editor-${id}`);
    selectedContactsDiv.innerHTML = ''; 
    for (let i = 0; i < allContacts.length; i++) {
        if (isContactSelectedInEditor(id, i))
        showSelectedContactsInEditor(selectedContactsDiv, id, i);
    }
}


/**
 * This function generates the condition for the function moveSelectedContactsInEditor()
 * @param {number} id - id of detailed task editor
 * @param {number} i - index of tasks
 * @returns - condition
 */
function isContactSelectedInEditor(id, i) {
    let selection = document.getElementById(`user-selection-${id}-${i}`);
    let checkbox = document.getElementById(`user-editor${id}-${i}`);  
    return selection.classList.contains('checked-editor') && checkbox.checked;
}


/**
 * This function shows the selected contacts inside of the div 
 * @param {string} selectedContactsDiv - div of added contacts
 * @param {number} id - id of editor
 * @param {number} i - index of allContacts
 */
function showSelectedContactsInEditor(selectedContactsDiv, id, i) {
    const user = allContacts[i];
    let username = user.name;
    const initials = getInitials(username);
    const bgUser = user.bgColor;
    selectedContactsDiv.innerHTML += /*html*/ `
        <div class="initials-selected" id="selected_contact-${id}-${i}" style="background-color: ${bgUser}">${initials}</div>
    `;
}


/**
 * This function switches the border-color back and closes the dropdown, if contacts were added
 * @param {number} id - id of editor
 */
function switchBorderandDropdownOfContacts(id) {
    let border = document.getElementById(`contact_dropdown-${id}`);
    let dropDown = document.getElementById(`drop_1-${id}`);
    border.classList.remove('border-color');
    dropDown.classList.remove('switch');
}


/**
 * This function determines the priorities and priority-imgages of in editor
 * @param {number} id - id of editor
 * @param {number} i - index of tasks
 */
function updateEditorWithSelectedPriorityBox(id, i) {
    const task = tasks[i]
    let priority = task.priority;
    let urgent = document.getElementById(`urgent-${id}`);
    let medium = document.getElementById(`medium-${id}`);
    let low = document.getElementById(`low-${id}`);
    let urgentImg = document.getElementById(`urgent-img-${id}`);
    let mediumImg = document.getElementById(`medium-img-${id}`);
    let lowImg = document.getElementById(`low-img-${id}`);
    highlightPriorityBoxes(priority, urgent, urgentImg, medium, mediumImg, low, lowImg);
}


/**
 * This function highlights the priority-box in editor, which has the same priority as in the array tasks 
 * @param {string} priority - priority in task
 * @param {string} urgent - id of urgent-box in editor
 * @param {string} urgentImg - id of urgent-img in editor
 * @param {string} medium - id of medium in editor
 * @param {string} mediumImg - id of medium-img in editor
 * @param {string} low - id of low-box in editor
 * @param {string} lowImg -id of low-img in editor
 */
function highlightPriorityBoxes(priority, urgent, urgentImg, medium, mediumImg, low, lowImg) {
    if (priority) {
        if (priority === 'Urgent') {
            switchUrgent(urgent, urgentImg);
        } else if (priority === 'Medium') {
            switchMedium(medium, mediumImg);
        } else if (priority === 'Low') {
            switchLow(low, lowImg);
        }
    }
}


/**
 * This function compares the added contacts of each task with the selection of the contacts dropdown in editor
 * @param {number} id - id of editor
 * @param {number} i - index of task
 */
function updateEditorWithMatchingContacts(id, i) {
    const taskContacts = tasks[i].contacts;
    if (!taskContacts) {
        return; 
    }
    for (let j = 0; j < allContacts.length; j++) {
        const user = allContacts[j];
        const username = user.name;
        if (taskContacts.includes(username)) {
            handleMatchingContact(id, j, username, user);
        }
    }
}


/**
 * This function updates the added contacts of each task with the selection of the contacts dropdown in editor
 * @param {number} id - id of editor
 * @param {number} j - index of allContacts
 * @param {string} username - name of contacts in 
 * @param {string} user - array allContacts
 */
function handleMatchingContact(id, j, username, user) {
    const initials = getInitials(username);
    const bgUser = user.bgColor;
    const selection = document.getElementById(`user-selection-${id}-${j}`);
    const checkbox = document.getElementById(`user-editor${id}-${j}`);
    if (!selection.classList.contains('checked-editor')) {
        selection.classList.add('checked-editor');
    }
    checkbox.checked = true;
    showExistingContactsInEditor(id, j, initials, bgUser);
}


/**
 * This function renders the existing contacts within the selected-contacts-div
 * @param {number} id - id of editor
 * @param {number} i - index of allContacts
 * @param {string} initials - initials of contact
 * @param {string} bgUser - background-color of contact
 */
function showExistingContactsInEditor(id, i, initials, bgUser) {
    let selectedContactsDiv = document.getElementById(`selected_contacts_editor-${id}`);
    let selection = document.getElementById(`user-selection-${id}-${i}`);
    let checkbox = document.getElementById(`user-editor${id}-${i}`);  
    if (selection.classList.contains('checked-editor') && checkbox.checked) {
        selectedContactsDiv.innerHTML += /*html*/ `
            <div class="initials-selected" id="selected_contact-${id}-${i}" style="background-color: ${bgUser}">${initials}</div>
        `;
    }
}


/**
 * This function opens the add new contact card (-->addTask.js) and toggles the editor dropdown
 * @param {number} id - id of detailed task
 * @param {number} i - index of tasks
 */
function addNewContactsInEditor() {
    showContactEditor();
}
