let currentDraggedElement;
let statusTasks = ["toDo", "inProgress", "awaitFeedback", "taskDone"];

/**
 * This function is the render-function for board.html
 */
function loadBoard() {
    allMightyRender();
}


/**
 * This function renders every task in each column
 */
function allMightyRender() {
    renderTasks('toDo');
    renderTasks('inProgress');
    renderTasks('awaitFeedback');
    renderTasks('taskDone');
}


/**
 * This function creates tasks
 * @param {string} status
 */
function renderTasks(status) {
    let taskStatus = tasks.filter(t => t['status'] == status);
    let content = document.getElementById(status);
    content.innerHTML = '';
    renderallTasks(taskStatus, content);
    checkColumns(taskStatus, status);
    content.innerHTML += addEmptytask('emptyTask' + status);
}


/**
 * This function renders every task 
 * @param {object} taskStatus 
 * @param {HTMLElement} content 
 */
function renderallTasks(taskStatus, content) {
    for (let i = 0; i < taskStatus.length; i++) {
        const task = taskStatus[i];
        let title = task.title;
        let category = task.category;
        let description = task.description;
        let priority = task.prio;
        let subtasks = task.subtask;
        let amountOfSubtasks = subtasks.length;
        let id = task.id;
        let contact = task.contacts;
        let position = idToPosition(tasks, id);
        content.innerHTML += showAddedTasks(title, category, description, priority, amountOfSubtasks, id, contact);
        determineCategoryColor(category, `cardPrio-${id}`);
        renderDetailedTask(position, id);
        renderSelectedContacts(task, contact, id);
    }
}


/**
 * This function checks, if a task exists in one of the columns
 * @param {array} array - taskstatus
 * @param {string} status - one of the columns
 */
function checkColumns(array, status) {
    let toDo = document.getElementById('toDo');
    let inProgress = document.getElementById('inProgress');
    let awaitFeedback = document.getElementById('awaitFeedback');
    let done = document.getElementById('taskDone');
    if (array.length === 0 && status === "toDo") {
        loadNoTask(toDo, "No tasks to do");
    }
    if (array.length === 0 && status === "inProgress") {
        loadNoTask(inProgress, "No tasks in progress");
    }
    if (array.length === 0 && status === "awaitFeedback") {
        loadNoTask(awaitFeedback, "No tasks await feedback");
    }
    if (array.length === 0 && status === "taskDone") {
        loadNoTask(done, "No tasks are done");
    }
}


/**
 * This function creates the no-task-div
 */
function loadNoTask(column, message) {
    /* column.innerHTML = ''; */
    column.innerHTML += /*html*/ `
        <div class="no-task-container d-flex justify-content-center align-items-center rounded-3">
            <span class="no-task-color">${message}</span>
        </div>
    `;
}


/**
 * This function opens the specific detailed task
 * @param {number} id - id of task
 */
function openDetailedTask(id) {
    let position = idToPosition(tasks, id);
    renderDetailedTask(position, id);
    pushDetailedTaskToMiddle();
}


/**
 * This function gets the position of a task
 * @param {array} arr 
 * @param {number} id 
 * @returns 
 */
function idToPosition(arr, id) {
    let position;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
            position = i;
            break;
        }
    }
    return position;
}


/**
 * This function determine the backgroundcolor of the specific task
 * @param {*} category - category of task loaded from array "tasks"
 * @param {*} id - ID of specific task
 */
function determineCategoryColor(category, id) {
    let label = document.getElementById(id);
    if (category === 'Technical Task') {
        label.classList.add('technical-task')
    } else if (category === 'User Story') {
        label.classList.add('user-story');
    }
}


/**
 * This function renders the contacts of task
 * @param {string} task - array task[i]
 * @param {string} contact - array tasks[i].contact
 * @param {number} id - id of tasks
 */
function renderSelectedContacts(task, contact, id) {
    let content = document.getElementById(`selected-contacts-box-${id}`);
    let bgColor = task.contactsBg;
    let counter = contact.length - 4;
    if (contact) {
        content.innerHTML = '';
        const selectedContacts = [];
        renderAllSelectedContactsInitials(bgColor, contact, selectedContacts)
        addContactsCounter(contact, selectedContacts, counter)
        content.innerHTML = selectedContacts.join('');
    }
}


/**
 * This function renders all initials for each selected contact
 * @param {object} bgColor 
 * @param {object} contact 
 * @param {object} selectedContacts 
 */
function renderAllSelectedContactsInitials(bgColor, contact, selectedContacts) {
    for (let i = 0; i < Math.min(contact.length, 4); i++) {
        const selectedContact = contact[i];
        const initials = getInitials(selectedContact);
        const selectedContactsBg = bgColor[i];
        selectedContacts.push(/*html*/ `
            <div class="initials-selected" style="background-color: ${selectedContactsBg}">${initials}</div>
        `);
    }
}


/**
 * This function adds the contacts counter
 * @param {object} contact 
 * @param {object} selectedContacts 
 * @param {number} counter 
 */
function addContactsCounter(contact, selectedContacts, counter) {
    if (contact.length > 4) {
        selectedContacts.push(/*html*/ `
            <div class="initials-selected" style="background-color: lightgrey">+${counter}</div>
        `);
    }
}


/**
 * This function renders the specifc detailed task for each rendered task
 * @param {number} i - speicfic number of detailed task (task) - used as id
 */
function renderDetailedTask(i, id) {
    let content = document.getElementById('detailedTask');
    content.innerHTML = '';
    const task = tasks[i];
    let title = task.title;
    let category = task.category;
    let description = task.description;
    let priority = task.priority;
    let contact = task.contacts;
    let prioImg = task.prio;
    let date = formatDate(task.date);
    let subtask = task.subtask;
    content.innerHTML += showDetailedTask(title, category, description, priority, prioImg, date, i, subtask, id, contact);
    renderSubtasks(subtask, i, id);
    updateCheckedSubtasksCount(i, id);
    determineCategoryColor(category, `prio-detail-${i}`);
    renderSelectedContactsInDetailedTask(task, contact, id);
}


/**
 * This function renders all contacts of task in the detailed card
 * @param {string} task - array task[i]
 * @param {string} contact - array tasks[i].contact
 * @param {number} id - id of tasks
 */
function renderSelectedContactsInDetailedTask(task, contact, id) {
    let content = document.getElementById(`contacts-detailed-${id}`);
    let bgColor = task.contactsBg;
    if (contact) {
        content.innerHTML = '';
        for (let i = 0; i < contact.length; i++) {
            showSelectedContactsInDetailedTask(contact, bgColor, i, content);
        }
    }
}


/**
 * This function creates the selected contacts in the detailed task
 * @param {string} contact - tasks.contacts
 * @param {string} bgColor - task.contactsBg
 * @param {number} i - index of contact-array
 * @param {string} content - div `contacts-detailed-${id}`
 */
function showSelectedContactsInDetailedTask(contact, bgColor, i, content) {
    const selectedContact = contact[i];
            const initials = getInitials(selectedContact);
            const selectedContactsBg = bgColor[i];
            content.innerHTML += /*html*/ `
                <div class="d-flex align-items-center column-gap-4">
                    <div class="initials-selected" style="background-color: ${selectedContactsBg}">${initials}</div>
                    <span>${selectedContact}</span>
                </div>
            `;
}


/**
 * This function formates the date
 * @param {string} dateString - date-value from array-tasks
 * @returns - formatted date
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}


/**
 * This function renders all existing subtasks
 * @param {*} subtask - array inside of the array ""tasks
 * @param {*} i - speicfic number of detailed task (task) - used as id
 */
function renderSubtasks(subtask, i, id) {
    let subtaskContent = document.getElementById(`subtasks-${i}`);
    if (subtaskContent) {
        subtaskContent.innerHTML = '';
        if (subtask && subtask.length > 0) {
            for (let j = 0; j < subtask.length; j++) {
                const subtaskItem = subtask[j];
                const subtaskStatus = tasks[i].subtaskStatus[j];
                subtaskContent.innerHTML += showSubtasksOfDetailedTask(subtaskItem, i, j, subtaskStatus);
            }
            addChangeListenersToCheckboxes(i, id);
        }
    }
}


/**
 * This functions updates the checkboxes
 * @param {number} i - index of task
 * @param {number} id - id of task
 */
function addChangeListenersToCheckboxes(i, id) {
    const checkboxes = document.querySelectorAll(`#subtasks-${i} input[type="checkbox"]`);
    checkboxes.forEach((checkbox, j) => {
        checkbox.addEventListener('change', () => {
            tasks[i].subtaskStatus[j] = checkbox.checked;
            updateCheckedSubtasksCount(i, id);
        });
    });
}


/**
 * This function checks if a checkbox is checked
 * @param {number} i - index of task
 * @param {number} id - id of task
 */
function updateCheckedSubtasksCount(i, id) {
    const checkboxes = document.querySelectorAll(`#subtasks-${i} input[type="checkbox"]`);
    checkedCount = 0;
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            checkedCount++;
        }
    });
    const checkedSubtasksSpan = document.getElementById(`checked_subtasks-${id}`);
    if (checkedSubtasksSpan) {
        checkedSubtasksSpan.textContent = checkedCount.toString();
    }
    updateProgressbar(id);
    saveTasks();
}


/**
 * This function updates the progressbar of a task
 * @param {number} id - id of task
 */
function updateProgressbar(id) {
    const checkedSubtasksSpan = document.getElementById(`checked_subtasks-${id}`);
    const allSubtasksSpan = document.getElementById(`allSubtasks-${id}`);
    const progressBar = document.getElementById(`progress-${id}`);
    if (checkedSubtasksSpan && allSubtasksSpan && progressBar) {
        let checkedSubtask = checkedSubtasksSpan.innerText;
        let allSubtasks = allSubtasksSpan.innerText;
        let percent = checkedSubtask / allSubtasks;
        percent = Math.round(percent * 100);
        progressBar.style.width = `${percent}%`;
    }
}

