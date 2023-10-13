document.addEventListener('DOMContentLoaded', function () {
    const dateInput = document.getElementById('date');
    const currentDate = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', currentDate);
});


/**
 * This functions loads the category options at the beginning and render all Contacts inside of the contact dropdown
 */
function loadAddTask() {
    addCategory();
    renderUser();
}


/**
 * Toggles the priority style for a given priority level.
 *
 * @param {string} priority - The priority level to toggle, e.g., "urgent", "medium", or "low".
 */
function togglePriority(priority) {
    resetPriorities();
    let selectedDiv = document.getElementById(priority);
    if (selectedDiv) {
      selectedDiv.classList.remove("bg-white");
      selectedDiv.classList.add(`bg-${priority}`);
      let img = selectedDiv.querySelector('img');
      if (img) {
        img.src = `../img/${priority}_white.svg`;
      }
    }
}


/**
 * Resets the priority styles and images for all priority levels.
 */
function resetPriorities() {
    const priorities = ["urgent", "medium", "low"];
    priorities.forEach(priority => {
        let div = document.getElementById(priority);
        if (div) {
        div.classList.remove(`bg-${priority}`);
        div.classList.add("bg-white");
        let img = div.querySelector('img');
        if (img) {
            img.src = `../img/${priority}_${priority === "urgent" ? "red" : priority === "medium" ? "yellow" : "green"}.svg`;
        }
        }
    });
}


/**
 * This function sets the vars of the two dropdowns.
 * @param {string} dropDown - specific value for the dropdown; referred to function showDrowns
 */
function toggleDropdown(dropDown) {
    let category = document.getElementById('content');
    let assign = document.getElementById('contacts');
    let borderContact = document.getElementById('contact_dropdown');
    let borderCategory = document.getElementById('select');
    showDropdowns(dropDown, category, assign, borderContact, borderCategory);
}


/**
 * This function execute the toggle for the specific 
 * @param {string} category - ID of dropdown content of category
 * @param {string} assign - ID of dropdown content of contacts
 * @param {string} borderContact - ID of contact-div; used to switch border-color
 * @param {string} borderCategory - ID of category - div; used to switch border-color
 */

function showDropdowns(dropDown, category, assign, borderContact, borderCategory) {
    if (dropDown == 'contact') {
        toggleStatusAndBorderOfContact(assign, borderContact);
        switchDropDownArrow(dropDown);
    }
    if (dropDown == 'category') {
        toggleStatusAndBorderOfCategory(category, borderCategory);
        switchDropDownArrow(dropDown);
    }
}


/**
 * This function toggles the visibility of the dropdown-content of contacts (active)
 * and the border-color of the contact-div
 */
function toggleStatusAndBorderOfContact(assign, borderContact) {
    assign.classList.toggle('active');
    borderContact.classList.toggle('border-color');
}


/**
 * This function toggles the visibility of the dropdown-content of category (active)
 * and the border-color of the category-div
 */
function toggleStatusAndBorderOfCategory(category, borderCategory) {
    category.classList.toggle('active');
    borderCategory.classList.toggle('border-color');
}


/**
 * This function scales the arrow-image the specific dropDown
 * @param {*} dropDown - referred to function toggleDropdown
 */
function switchDropDownArrow(dropDown) {
    let imgContact = document.getElementById('drop_1')
    let imgCategory = document.getElementById('drop_2');
    if (dropDown == 'contact') {
        imgContact.classList.toggle('switch')
    }
    if (dropDown == 'category') {
        imgCategory.classList.toggle('switch');
    }
}


/**
 * This function loads the categories of the categories-array
 * @param {string} selectedCategory - selected "li"-text of the specific category; referred to updateName();
 */
function addCategory(selectedCategory) {
    let option = document.getElementById('options');
    option.innerHTML = '';
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        let isSelected = category == selectedCategory ? 'selected' : '';
        option.innerHTML += /*html*/`
            <li class="rounded-3 fs-20 d-flex align-items-center ${isSelected}" id="category-${i}" onclick="updateName(this)">${category}</li>
        `;
    }
}


/**
 * This function gets the innerText of the li-item and removes the 'active'-class
 * @param {string} selectedLi - "li" of specific category;
 */
function updateName(selectedLi) {
    let select = document.getElementById('select');
    let content = document.getElementById('content');
    select.firstElementChild.innerText = selectedLi.innerText;
    content.classList.remove('active');
    addCategory(selectedLi.innerText);
    switchBorderandDropdown();
}


/**
 * This functions switches the dropdownicon and removes the border-color for the category dropdown.
 * Used when one category got selected
 */
function switchBorderandDropdown() {
    let border = document.getElementById('select');
    let dropDown = document.getElementById('drop_2');
    let subtaskDiv = document.getElementById('subtask-container');
    border.classList.remove('border-color');
    dropDown.classList.remove('switch');
}


/**
 * This functions switches the dropdownicon and removes the border-color for the contacts dropdown.
 * Used when one category got selected
 */
function switchBorderandDropdownOfContacts() {
    let border = document.getElementById('contact_dropdown');
    let dropDown = document.getElementById('drop_1')
    border.classList.remove('border-color');
    dropDown.classList.remove('switch');
}


/**
 * This function creates a new subtask-input-field
 * showNewSubtask -> addTask-templates.js
 */
function openNewSubtask() {
    let newField = document.getElementById('new-subtask-field');
    newField.innerHTML = '';
    newField.innerHTML += showNewSubtask();
    document.getElementById('subtask').value = '';
    addBorderColor();
}


/**
 * This functions adds a new border-color to the subtask-div
 */
function addBorderColor() {
    let borderColor = document.getElementById('subtask-creator');
    borderColor.classList.add('border-color');
}


/**
 * This function restores the previous subtask-input-field
 */
function restoreOldSubtask() {
    let oldSubtask = document.getElementById('new-subtask-field');
    oldSubtask.innerHTML = '';
    oldSubtask.innerHTML += /*html*/ `
    <div class="subtask-buttons d-flex align-items-center justify-content-center" onclick="openNewSubtask()">
        <img src="../img/add_addTask.svg" alt="plus" class="add">
    </div>    
    `;
    document.getElementById('subtask').value = '';
    removeBorderColor();
}


/**
 * This function removes the border-color of the subtask-div
 */
function removeBorderColor() {
    let borderColor = document.getElementById('subtask-creator');
    borderColor.classList.remove('border-color');
}


/**
 * This function creates the added subtask
 * showAddedSubtasks -> addTask-templates.js
 */
function addSubtask() {
    let content = document.getElementById('subtask-content');
    let input = document.getElementById('subtask').value;
    let subtaskID = `subtask-${subtaskcounter}`;
    if (input.length > 0) {
        content.innerHTML += showAddedSubtasks(subtaskID, input);
        subtaskcounter++;
    }
    document.getElementById('subtask').value = '';
    restoreOldSubtask();
}


/**
 * This function creates an edit-section for the specific subtask
 * @param {string} subtaskID - ID of specific added subtask
 * @param {string} input - value of old subtask
 * showInputEditor() -> addTask-templates.js
 */
function openInputForEdit(subtaskID, input) {
    let content = document.getElementById(`${subtaskID}`);
    content.innerHTML = '';
    content.innerHTML += showInputEditor(subtaskID, input);
}


/**
 * This function updates the new input value.
 * @param {string} subtaskID - ID of new subtask-div 
 * @param {string} inputID - ID of new input
 */
function updateInputValue(subtaskID, inputID) {
    const content = document.getElementById(`${subtaskID}`);
    const newValue = document.getElementById(`${inputID}`).value;
    content.innerHTML = '';
    content.innerHTML += showUpdatedInputValue(newValue, subtaskID);
}

