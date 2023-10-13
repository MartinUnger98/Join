// --------------------- board -  main -------------------------------------------------

/**
 * This function creates the specific task
 * @param {string} title - 'title' of tasks
 * @param {string} category - 'category' of tasks
 * @param {string} description - 'description' of tasks
 * @param {string} priority - 'priority-img' of tasks
 * @param {number} i - number of task
 * @returns - created task
 */
function showAddedTasks(title, category, description, priority, amountOfSubtasks, id, contact) {
        return /*html*/ `
        <div id="task-${id}" class="testcard width-column bg-white d-flex flex-column rounded-5" draggable ="true" ondragstart="startDragging(${id})" ondragend="stopDragging(${id})" onclick="openDetailedTask(${id})">
            ${category !== "" ? /*html*/ `
                <div class="d-flex justify-content-between">
                    <div id="cardPrio-${id}" class="card-priority rounded-3 text-white align-self-start">
                        <span>${category}</span>
                    </div>
                    <div class="upDownBox">
                    ${tasks[idToPosition(tasks, id)].status !== "taskDone" ? /*html*/ `
                        <img src="../img/Vector.svg" alt="" class="taskDown" onclick="getTaskBelow(${id}); doNotClose(event);">
                        `: ''}
                    ${tasks[idToPosition(tasks, id)].status !== "toDo" ? /*html*/ `
                        <img src="../img/Vector.svg" alt="" class="taskUp" onclick="getTaskAbove(${id}); doNotClose(event);">
                    `: ''}
                    </div>
                </div>
                
            `: ''}
            <div class="d-flex flex-column row-gap-1">
                <span class="fw-bold detail-color title">${title}</span>
                <span class="description-color">${description}</span>
            </div>
            ${amountOfSubtasks > 0 ? /*html*/` 
                <div class="subtask-container d-flex align-items-center justify-content-between">
                    <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                        <div id="progress-${id}" class="progress-bar" style="width: 0%"></div>
                    </div>
                    <div class="d-flex column-gap-1">
                        <div class="d-flex">
                            <span id="checked_subtasks-${id}">0</span>
                            <span>/</span>
                            <span id="allSubtasks-${id}">${amountOfSubtasks}</span>
                        </div>
                        <span >Subtasks</span>
                    </div>    
                </div>
            `: ''}
                <div class="d-flex justify-content-between align-items-center">
                    <div class="flex-grow-1 ps-2">
                        <div id="selected-contacts-box-${id}" class="d-flex"></div>
                    </div>
                    ${priority !== "" ? /*html*/ `
                        <img src="../${priority}" alt="priority" class="urgent-img">
                    ` : ''}
                </div>
        </div>
    `;
}


/**
 * This function creats for the drag&drop a visible task
 * @param {number} id - id of emptyTask
 * @returns  - div 
 */
function addEmptytask(id) {
    return /*html*/ `
        <div id="${id}" class="rounded-5 emptyTask d-none"></div> 
    `
}

// -------------------------- board - detailed task --------------------------------------------

/**
 * This function creates the specific detailed task
 * @param {string} title - 'title' of tasks
 * @param {string} category - 'category' of tasks
 * @param {string} description - 'description' of tasks
 * @param {string} priority - 'priority' of tasks
 * @param {string} prioImg - 'priority-img' of tasks
 * @param {string} date - 'date' of tasks
 * @param {number} i - number of task (detailed task)
 * @param {string} subtask - subtask-array of task
 * @returns - created detailed task
 */
function showDetailedTask(title, category, description, priority,prioImg, date, i, subtask, id, contact) {
    return /*html */ `
        <div id="detailed-card-${id}" class="d-flex flex-column row-gap-4 detailed-card-responsive-height">
            <div class="d-flex justify-content-between align-items-center">
                <div id="prio-detail-${i}" class="detailed-priority rounded-3 text-white">
                    <span>${category}</span>
                </div>
                <div class="clear-button d-flex align-items-center justify-content-center rounded-5 ms-auto" onclick="hideDetailedTask()">
                    <img src="../img/clear.svg" alt="clear" class="clear-img">
                </div>
            </div>
            <span class="fw-bold fs-61">${title}</span>
            <span class="fs-20 fs-responsive">${description}</span>
            <div class="d-flex fs-20 column-gap-3 fs-responsive">
                <span class="detail-color">Due date:</span>
                <span>${date}</span>
            </div>
            ${prioImg !== "" ? /*html*/ `
                <div class="d-flex align-items-center fs-20 column-gap-4 fs-responsive">
                    <span>Priority:</span>
                    <div class="d-flex align-items-center column-gap-2">
                        <span id="p-${id}" class="mb-12">${priority}</span>
                        <img src="../${prioImg}" alt="priority">
                    </div> 
                </div>
            `: ''}
                <div class="fs-20 fs-responsive">
                    <div>
                        <span class="detail-color">Assigned to:</span>
                    </div>
                    <div id="contacts-detailed-${id}" class="ps-4 d-flex flex-column row-gap-3 mt-3"></div>
                </div>
            ${subtask.length > 0 ? /*html */ `
                <div class="d-flex flex-column row-gap-2">
                   <div>
                        <span class="detail-color fs-20 fs-responsive">Subtasks:</span>
                    </div>
                    <div id="subtasks-${i}" class="d-flex flex-column row-gap-1"></div>
                </div>
            `: ''} 
            <div class="d-flex justify-content-end">
                <div class="d-flex align-items-center column-gap-2">
                    <div class="d-flex align-items-center column-gap-2 edit-boxes" onclick="deleteNote(${i})">
                        <svg width="18" height="18" viewBox="0 0 17 18" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.14453 18C2.59453 18 2.1237 17.8042 1.73203 17.4125C1.34036 17.0208 1.14453 16.55 1.14453 16V3C0.861198 3 0.623698 2.90417 0.432031 2.7125C0.240365 2.52083 0.144531 2.28333 0.144531 2C0.144531 1.71667 0.240365 1.47917 0.432031 1.2875C0.623698 1.09583 0.861198 1 1.14453 1H5.14453C5.14453 0.716667 5.24036 0.479167 5.43203 0.2875C5.6237 0.0958333 5.8612 0 6.14453 0H10.1445C10.4279 0 10.6654 0.0958333 10.857 0.2875C11.0487 0.479167 11.1445 0.716667 11.1445 1H15.1445C15.4279 1 15.6654 1.09583 15.857 1.2875C16.0487 1.47917 16.1445 1.71667 16.1445 2C16.1445 2.28333 16.0487 2.52083 15.857 2.7125C15.6654 2.90417 15.4279 3 15.1445 3V16C15.1445 16.55 14.9487 17.0208 14.557 17.4125C14.1654 17.8042 13.6945 18 13.1445 18H3.14453ZM3.14453 3V16H13.1445V3H3.14453ZM5.14453 13C5.14453 13.2833 5.24036 13.5208 5.43203 13.7125C5.6237 13.9042 5.8612 14 6.14453 14C6.42786 14 6.66536 13.9042 6.85703 13.7125C7.0487 13.5208 7.14453 13.2833 7.14453 13V6C7.14453 5.71667 7.0487 5.47917 6.85703 5.2875C6.66536 5.09583 6.42786 5 6.14453 5C5.8612 5 5.6237 5.09583 5.43203 5.2875C5.24036 5.47917 5.14453 5.71667 5.14453 6V13ZM9.14453 13C9.14453 13.2833 9.24037 13.5208 9.43203 13.7125C9.6237 13.9042 9.8612 14 10.1445 14C10.4279 14 10.6654 13.9042 10.857 13.7125C11.0487 13.5208 11.1445 13.2833 11.1445 13V6C11.1445 5.71667 11.0487 5.47917 10.857 5.2875C10.6654 5.09583 10.4279 5 10.1445 5C9.8612 5 9.6237 5.09583 9.43203 5.2875C9.24037 5.47917 9.14453 5.71667 9.14453 6V13Z" fill="#2A3647"/>
                        </svg>
                        <span>Delete</span>
                    </div>
                    <div class="separator"></div>
                    <div class="d-flex align-items-center column-gap-2 edit-boxes" onclick="openDetailedCardEditor('${title}', '${description}', '${date}', ${id}, ${i})">
                        <svg width="16" height="18" viewBox="0 0 19 19" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 17H3.4L12.025 8.375L10.625 6.975L2 15.6V17ZM16.3 6.925L12.05 2.725L13.45 1.325C13.8333 0.941667 14.3042 0.75 14.8625 0.75C15.4208 0.75 15.8917 0.941667 16.275 1.325L17.675 2.725C18.0583 3.10833 18.2583 3.57083 18.275 4.1125C18.2917 4.65417 18.1083 5.11667 17.725 5.5L16.3 6.925ZM14.85 8.4L4.25 19H0V14.75L10.6 4.15L14.85 8.4Z" fill="#2A3647"/>
                        </svg>
                        <span>Edit</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}


/**
 * This function creates all subtasks inside the array "subtask"
 * @param {string} subtaskItem - subtask-array 
 * @param {number} i - specific number of detailed task (task) -used as ID
 * @param {number} j - specific number of subtask
 * @param {string} subtaskStatus - 
 * @returns created subtask
 */
function showSubtasksOfDetailedTask(subtaskItem, i, j, subtaskStatus) {
    return  /*html */`
        <div class="d-flex align-items-center subtask-boxes column-gap-3 align-self-start rounded-3">
            <input id="subtask-${i}-${j}" type="checkbox" name="subtask" ${subtaskStatus ? 'checked' : ''}>
            <label for="subtask-${i}-${j}">${subtaskItem}</label>
        </div>    
    `;
}


// ----------------------- board - editor of detailedTask ---------------------------
/**
 * Template for the editor
 */
function showDetailedCardEditor(title, description, formattedDate, id, i) {
    return /*html*/ `
        <form id="detailedCardEditor-${id}" class="d-flex flex-column row-gap-4 detailed-card-editor-responsive-height" onsubmit="savedEditedTask(${id}, ${i}); return false">
            <div class="d-flex justify-content-end">
                <div class="clear-button d-flex align-items-center justify-content-center rounded-5 ms-auto" onclick="hideDetailedTask()">
                    <img src="../img/clear.svg" alt="clear" class="clear-img">
                </div>
            </div>
            <div class="editor-content">
                <div class="d-flex flex-column">
                    <label for="input-editor-${id}" class="input-headlines fs-20 fs-responsive">Title</label>
                    <input class="fs-20 rounded-3 input fs-responsive" required id="input-editor-${id}" type="text" placeholder="Enter a title" value="${title}">
                </div>
                <div class="d-flex flex-column">   
                    <label for="textarea-editor-${id}" class="input-headlines fs-20 fs-responsive">Description</label>
                    <textarea class="textarea fs-20 rounded-3 fs-responsive" required id="textarea-editor-${id}" name="" cols="30" rows="10" placeholder="Enter a Description">${description}</textarea>
                </div>
                <div class="d-flex flex-column">
                    <label for="date-editor-${id}" class="input-headlines fs-20 fs-responsive">Due date</label>
                    <input required class="date fs-20 rounded-3 bg-white fs-responsive" id="date-editor-${id}" type="date" value="${formattedDate}">
                </div>
                <div class="d-flex flex-column">
                    <span class="input-headlines fs-20 fs-responsive">Prio</span>
                    <div class="priority d-flex justify-content-between">
                        <div class="priority-boxes bg-white rounded-3 d-flex align-items-center justify-content-center" id="urgent-${id}" onclick="togglePriorityEditor('urgent', ${id})">
                            <span class="fs-20 priority-sublines prio-fontsize-responsive">Urgent</span>
                            <img src="../img/urgent_red.svg" alt="urgent" id="urgent-img-${id}" class="urgent-img">
                        </div>
                        <div class="priority-boxes bg-white rounded-3 d-flex align-items-center justify-content-center" id="medium-${id}" onclick="togglePriorityEditor('medium', ${id})">
                            <span class="fs-20 prio-fontsize-responsive">Medium</span>
                            <img src="../img/medium_yellow.svg" alt="medium" id="medium-img-${id}">
                        </div>
                        <div class="priority-boxes bg-white rounded-3 d-flex align-items-center justify-content-center" id="low-${id}" onclick="togglePriorityEditor('low', ${id})">
                            <span class="fs-20 prio-fontsize-responsive">Low</span>
                            <img src="../img/low_green.svg" alt="low" id="low-img-${id}">
                        </div>
                    </div>
                </div>
                <div class="d-flex flex-column mb-4">
                    <span class="input-headlines fs-20 fs-responsive">Assigned to</span>
                    <div>
                        <div id="contact_dropdown-${id}" class="select-editor rounded-3 d-flex align-items-center justify-content-between bg-white" onclick="toggleEditorDropdown(${id})">
                            <span class="fs-20 fs-responsive">Select contacts to assign</span>
                            <div class="subtask-buttons d-flex align-items-center justify-content-center">
                                <img src="../img/arrow_drop_down.svg" alt="arrow_drop_down" id="drop_1-${id}">
                            </div>
                        </div>
                        <div class="assign-content-editor rounded-3 bg-white" id="contacts-${id}">
                            <div id="contact_content-editor${id}" class="contacts-box-editor d-flex flex-column"></div>
                            <div class="new-contact-btn rounded-3 d-flex justify-content-center align-items-center gap-3" onclick="addNewContactsInEditor()">
                                <span class="text-white fw-semibold fs-responsive">Add new contact</span>
                                <img src="../img/person_add.svg" alt="" class="person_add-responsive">
                            </div>
                        </div>
                    </div>
                    <div id="selected_contacts_editor-${id}" class="d-flex px-3 mt-3"></div>
                </div>
                <div class="d-flex flex-column">
                    <label for="subtask-${id}" class="input-headlines fs-20 fs-responsive">Subtasks</label>
                    <div class="subtask-add rounded-3 d-flex align-items-center justify-content-between bg-white" id="subtask-creator-${id}">
                        <input class="subtask fs-20 fs-responsive" type="text" placeholder="Add new subtask" id="subtask-${id}" onclick="openNewSubtaskInEditor(${id})">
                        <div id="new-subtask-field-${id}">
                        <div class="subtask-buttons d-flex align-items-center justify-content-center" onclick="openNewSubtaskInEditor(${id})">
                            <img src="../img/add_addTask.svg" alt="plus" class="add">
                        </div>
                        </div>
                    </div>
                    <div>
                        <ul id="subtask-content-${id}" class="subtask-content"></ul>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-end">
                <button type="submit" class="ok-button text-white fw-bold rounded-3 d-flex align-items-center">
                    <span>Ok</span>
                    <img src="../img/check_addTask.svg" alt="">
                </button>
            </div>
        </form>
    `;
}


/**
 * Template for the existing subtasks in editor
 */
function showExistingSubtasksInEditor(sub, id, j) {
    return /*html*/ `
        <div id="subtask-edit-${id}-${j}" class="added-subtask-container">
            <div class="added-subtask-editor rounded-3 d-flex align-items-center justify-content-between">
                <li>${sub}</li>
                <div class="hidden">
                    <img src="../img/delete.svg" alt="delete" onclick="deleteSubtaskInEditor('subtask-edit-${id}-${j}')">
                    <span class="mini_separator_2">|</span>
                    <img src="../img/edit.svg" alt="edit" onclick="openInputForEditInEditor('subtask-edit-${id}-${j}','${sub}')">
                </div>
            </div>
        </div>
    `;
}


/**
 * Template for new added subtasks in editor
 * @param {number} id - id of task-card
 */
function showNewSubtaskInEditor(id) {
    return /*html*/ `
        <div class="d-flex align-items-center justify-content-between">
            <div class="subtask-buttons d-flex align-items-center justify-content-center" onclick="restoreOldSubtaskInEditor(${id})">
                <img src="../img/clear.svg" alt="clear" class="button-responsive">
            </div>
            <span class="mini-separator">|</span>
            <div class="subtask-buttons d-flex align-items-center justify-content-center" onclick="addSubtaskInEditor(${id})">
                <img src="../img/check_blue_addTask.svg" alt="check" class="check-responsive">
            </div>
        </div>  
    `;
}


/**
 * Template for added subtasks in editor
 * @param {string} subtaskID - id of new added subtask
 * @param {string} input - value of new added subtask
 */
function showAddedSubtasksInEditor(subtaskID, input) {
    return /*html*/ `
        <div id="${subtaskID}" class="added-subtask-container">
            <div class="added-subtask-editor rounded-3 d-flex align-items-center justify-content-between">
                <li>${input}</li>
                <div class="hidden">
                    <img src="../img/delete.svg" alt="delete" onclick="deleteSubtaskInEditor('${subtaskID}')">
                    <span class="mini_separator_2">|</span>
                    <img src="../img/edit.svg" alt="edit" onclick="openInputForEditInEditor('${subtaskID}','${input}')">
                </div>
            </div>
        </div>
    `;
}


/**
 * Template for subtask editor in card editor
 * @param {string} subtaskID - id of subtask
 * @param {string} input - value of edited subtask
 */
function showInputEditorInEditor(subtaskID, input) {
    return /*html*/ `
        <div class="edit-box d-flex justify-content-between align-items-center bg-white" id="${subtaskID}">
            <input type="text" value="${input}" class="edit-input" id="input-${subtaskID}">
            <div class="d-flex justify-content-between align-items-center">
                <div class="subtask-buttons d-flex align-items-center justify-content-center" onclick="deleteSubtaskInEditor('${subtaskID}')">
                    <img class="trash-width" src="../img/delete.svg" alt="delete">
                </div>
                <span class="mini-separator">|</span>
                <div class="subtask-buttons d-flex align-items-center justify-content-center" onclick="updateInputValueInEditor('${subtaskID}','input-${subtaskID}')">
                    <img src="../img/check_blue_addTask.svg" alt="check" class="check-responsive">
                </div>
            </div>
        </div>
    `;
}


/**
 * Template for updated subtask in editor
 * @param {string} newValue - new value of subtask
 * @param {string} subtask - 
 */
function showUpdatedInputValueInEditor(newValue, subtask) {
    return /*html*/ `
    <div class="added-subtask-editor d-flex justify-content-between align-items-center rounded-3">
        <li>${newValue}</li>
        <div class="hidden">
            <img class="trash-width" src="../img/delete.svg" alt="delete" onclick="deleteSubtaskInEditor('${subtask}')">
            <span class="mini_separator_2">|</span>
            <img src="../img/edit.svg" alt="edit" onclick="openInputForEditInEditor('${subtask}','${newValue}')">
        </div>
    </div>
`;
}


/**
 * Template for chosen contacts in editor
 * @param {number} id - ID of task-card
 * @param {number} i - index of task-card
 * @param {string} initials - initials of added contacts
 * @param {string} bgUser - backgroundcolor of initials
 * @param {string} username - name of contact
 */
function showAllContactsinEditor(id, i, initials, bgUser, username) {
    return  /*html*/ `
        <div id="user-selection-${id}-${i}" class="contact-selection d-flex justify-content-between fs-20 rounded-3 fs-responsive"> <!-- Klick-Event hinzufügen -->
            <div class="d-flex align-items-center contact-selection-box ">
                <div id="contact-${id}-${i}" class="initials" style="background-color: ${bgUser}">
                    <span>${initials}</span>
                </div>
                <label class="label-contact-editor" for="user-editor${id}-${i}">${username}</label>
            </div>
            <input type="checkbox" id="user-editor${id}-${i}" onclick="toggleCheckboxInEditor(${id}, ${i})">
        </div>
    `;
}