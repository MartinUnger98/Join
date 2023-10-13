/**
 * This function renders the whole editor
 * @param {string} title - value of title input from task-card
 * @param {string} description - value of description input from task-card
 * @param {string} date - value of date input from task-card
 * @param {number} id - id of task card
 * @param {number} i - index of task
 */
function openDetailedCardEditor(title, description, date, id, i) {
    editModeOnOrOff = true;
    let editor = document.getElementById('detailedTask');
    let dateEditor = date.split('/');
    let formattedDate = `${dateEditor[2]}-${dateEditor[1]}-${dateEditor[0]}`;
    editor.innerHTML = '';
    editor.innerHTML += showDetailedCardEditor(title, description, formattedDate, id, i);
    renderSubtasksInEditor(id, i);
    renderUserInEditor(id);
    updateEditorWithSelectedPriorityBox(id, i);
    updateEditorWithMatchingContacts(id, i,);    
    setIDForEditAndindex(id, i);
}


/**
 * This function sets the ID and Index for editor
 * @param {number} id - id of task-card
 * @param {number} i - index of tasks
 */
function setIDForEditAndindex(id, i){
    idForEditmode = id;
    indexForEditmode =  i;
}


/**
 * This function toggles the priority-boxes inside of the editor
 * @param {string} priority - 'priority-name'
 * @param {number} id - id of editor
 */
function togglePriorityEditor(priority, id) {
    let urgent = document.getElementById(`urgent-${id}`);
    let medium = document.getElementById(`medium-${id}`);
    let low = document.getElementById(`low-${id}`);
    let urgentImg = document.getElementById(`urgent-img-${id}`);
    let mediumImg = document.getElementById(`medium-img-${id}`);
    let lowImg = document.getElementById(`low-img-${id}`);
    toggle(priority, urgent, medium, urgentImg, mediumImg, low, lowImg);
}


/**
 * This function determines the contact dropdown
 * @param {number} id - id of editor
 */
function toggleEditorDropdown(id) {
    let assign = document.getElementById(`contacts-${id}`);
    let borderContact = document.getElementById(`contact_dropdown-${id}`);
    showDropdownInEditor(assign, borderContact, id);
}


/**
 * This functions toggles the contact dropdown in editor
 * @param {string} assign - id of contact dropdown in editor
 * @param {string} borderContact - id of contact div
 * @param {number} id - id of editor
 */
function showDropdownInEditor(assign, borderContact, id) {
    toggleStatusAndBorderOfContact(assign, borderContact);
    switchDropDownArrowInEditor(id);
}


/**
 * This function switches the dropdown icon of the contact dropdown back, when a contact was selected
 * @param {number} id 
 */
function switchDropDownArrowInEditor(id) {
    let imgContact = document.getElementById(`drop_1-${id}`);
    imgContact.classList.toggle('switch');
}


/**
 * This function determines the new subtaskbuttons
 * @param {number} id - id of editor
 */
function openNewSubtaskInEditor(id) {
    let newField = document.getElementById(`new-subtask-field-${id}`);
    newField.innerHTML = '';
    newField.innerHTML += showNewSubtaskInEditor(`${id}`);
    document.getElementById(`subtask-${id}`).value = '';
    addBorderColorInEditor(id);
}


/**
 * This function adds a border-color to the subtask container in editor
 * @param {number} id - id of editor
 */
function addBorderColorInEditor(id) {
    let borderColor = document.getElementById(`subtask-creator-${id}`);
    borderColor.classList.add('border-color');
}


/**
 * This function restores the subtask div
 * @param {number} id - id of editor
 */
function restoreOldSubtaskInEditor(id) {
    let oldSubtask = document.getElementById(`new-subtask-field-${id}`);
    oldSubtask.innerHTML = '';
    oldSubtask.innerHTML += /*html*/ `
    <div class="subtask-buttons d-flex align-items-center justify-content-center" onclick="openNewSubtaskInInEditor(${id})">
        <img src="../img/add_addTask.svg" alt="plus" class="add">
    </div>    
    `;
    document.getElementById(`subtask-${id}`).value = '';
    removeBorderColorInEditor(id);
}


/**
 * This function removes the border color from the subtask container in editor, when a subtask was added
 * @param {number} id - id of editor
 */
function removeBorderColorInEditor(id) {
    let borderColor = document.getElementById(`subtask-creator-${id}`);
    borderColor.classList.remove('border-color');
}


/**
 * This function determines the added subtasks by giving it a specific id
 * @param {number} id - id of editor
 */
function addSubtaskInEditor(id) {
    let content = document.getElementById(`subtask-content-${id}`);
    let input = document.getElementById(`subtask-${id}`).value;
    let subtaskID = `subtask-editor-${subtaskcounter}`;
    if (input.length > 0) {
        content.innerHTML += showAddedSubtasksInEditor(subtaskID, input);
        subtaskcounter++;
    }
    document.getElementById(`subtask-${id}`).value = '';
    restoreOldSubtaskInEditor(id);
}


/**
 * This function determines the added subtask
 * @param {string} subtaskID - id of added subtask
 * @param {string} input - value of subtask-container-input
 */
function openInputForEditInEditor(subtaskID, input) {
    let content = document.getElementById(`${subtaskID}`);
    content.innerHTML = '';
    content.innerHTML += showInputEditorInEditor(subtaskID, input);
}


/**
 * This determines the updated added subtask
 * @param {string} subtaskID - id of added subtask
 * @param {string} inputID - value of added subtask
 */
function updateInputValueInEditor(subtaskID, inputID) {
    const content = document.getElementById(`${subtaskID}`);
    const newValue = document.getElementById(`${inputID}`).value;
    content.innerHTML = '';
    content.innerHTML += showUpdatedInputValueInEditor(newValue, subtaskID);
}


/**
 * This function deletes the added subtask
 * @param {string} subtaskID - id of added subtask
 */
function deleteSubtaskInEditor(subtaskID) {
    let subtaskElement = document.getElementById(subtaskID);
    if (subtaskElement) {
        subtaskElement.remove();
    }
}


/**
 * This function renders the subtasks of the array tasks in editor
 * Used to show existing subtask
 * @param {string} id - id of editor
 * @param {string} i - index of task
 */
function renderSubtasksInEditor(id, i) {
    let subtasks = tasks[i].subtask;
    if (subtasks) {
        let content = document.getElementById(`subtask-content-${id}`);
        content.innerHTML = '';
        subtasks.forEach((sub, j) => {
            content.innerHTML += showExistingSubtasksInEditor(sub, id, j);
        });
    }
}


/**
 * This function saves the editor by updating the specific task array
 * @param {number} id - id of editor
 * @param {number} i -index of array
 */
function savedEditedTask(id, i) {
    editModeOnOrOff = false;
    const newTask = tasks[i];
    let input = document.getElementById(`input-editor-${id}`).value;
    let textarea = document.getElementById(`textarea-editor-${id}`).value;
    let date = document.getElementById(`date-editor-${id}`).value;
    let priorityImg = getPrioImageFromEditor(id);
    let priority = getPriorityFromEditor(id);
    let contacts = getContactsFromEditor();
    let subtasks = getSubtasksFromEditor();
    let bgContacts = getBgofContactFromEditor();
    pushEditedTask(newTask, input, textarea, date, priorityImg, priority, contacts, subtasks, bgContacts);
    hideDetailedTask();
    allMightyRender();
}


/**
 * This function pushes all gathered infos of the editor inside of the array tasks
 * @param {string} newTask - array tasks
 * @param {string} input - tasks input
 * @param {string} textarea - tasks textarea
 * @param {string} date - tasks date
 * @param {string} priorityImg - tasks priority image
 * @param {string} priority - tasks priority
 * @param {string} contacts - tasks contact
 * @param {string} subtasks - tasks subtasks
 * @param {string} bgContacts - tasks backgrouncolors of contacts
 */
function pushEditedTask(newTask, input, textarea, date, priorityImg, priority, contacts, subtasks, bgContacts) {
    newTask.title = input;
    newTask.description = textarea;
    newTask.date = date;
    newTask.prio = priorityImg;
    newTask.priority = priority;
    newTask.contacts = contacts;
    newTask.contactsBg = bgContacts;
    newTask.subtask = subtasks;
}


/**
 * This function gets the selected priority-img in editor
 * @param {number} id - id of editor
 * @returns - priority-img
 */
function getPrioImageFromEditor(id) {
    let urgent = document.getElementById(`urgent-${id}`);
    let medium = document.getElementById(`medium-${id}`);
    let low = document.getElementById(`low-${id}`);
    let img = '';
    if (urgent.classList.contains('bg-urgent')) {
        img = 'img/urgent_red.svg';
    } else if (medium.classList.contains('bg-medium')) {
        img = 'img/medium_yellow.svg';
    } else if (low.classList.contains('bg-low')) {
        img = 'img/low_green.svg';
    }
    return img;
}


/**
 * This function gets the selected priority in editor
 * @param {number} id - id of editor
 * @returns - priority
 */
function getPriorityFromEditor(id) {
    let urgent = document.getElementById(`urgent-${id}`);
    let medium = document.getElementById(`medium-${id}`);
    let low = document.getElementById(`low-${id}`);
    let priority = '';
    if (urgent.classList.contains('bg-urgent')) {
        priority = urgent.innerText;
    } else if (medium.classList.contains('bg-medium')) {
        priority = medium.innerText
    } else if (low.classList.contains('bg-low')) {
        priority = low.innerText;
    }
    return priority;
}


/**
 * This function gets the selected contact in editor
 * @returns array of selected contacts
 */
function getContactsFromEditor() {
    let selectedContactsFromEditor = [];
    let checkedContact = document.querySelectorAll('.contact-selection.checked-editor');
    checkedContact.forEach(contact => {
        let label = contact.querySelector('label.label-contact-editor');
        let username = label.textContent;
        selectedContactsFromEditor.push(username);
    });
    return selectedContactsFromEditor;
}


/**
 * This function gets the background-color of each selected contact
 * @param {number} id - id of editor
 * @returns array with background-colors
 */
function getBgofContactFromEditor() {
    let selectedContactsFromEditor = getContactsFromEditor();
    let bgContacts = [];

    for (let i = 0; i < selectedContactsFromEditor.length; i++) {
        let selectedContact = selectedContactsFromEditor[i];
        for (let j = 0; j < allContacts.length; j++) {
            let contact = allContacts[j];
            if (contact.name === selectedContact) {
                bgContacts.push(contact.bgColor);
                break;
            }
        }
    }

    return bgContacts;
}


/**
 * This function gets all added subtasks
 * @returns array with subtask
 */
function getSubtasksFromEditor() {
    let subtaskElements = document.querySelectorAll('.added-subtask-editor');
    let subtasks = [];
    subtaskElements.forEach(subtaskElement => {
        subtasks.push(subtaskElement.innerText);
    });
    return subtasks;
}


