/**
 * This function creates the contact selections inside of the dropdown
 * @param {string} initials - initials of contact
 * @param {string} bgUser - backgroundcolor of contact
 * @param {number} i - index of contact
 * @param {string} username - name of contact
 * @returns - selection div
 */
function showRenderedContacts(initials, bgUser, i, username) {
    return /*html*/ `
    <div id="user-selection-${i}" class="contact-selection notHide d-flex justify-content-between fs-20 rounded-3"> <!-- Klick-Event hinzufügen -->
        <div class="d-flex notHide align-items-center contact-selection-box ">
            <div id="contact-${i}" class="initials notHide" style="background-color: ${bgUser}">
                <span>${initials}</span>
            </div>
            <label class="label-contact notHide" for="user-${i}">${username}</label>
        </div>
        <input class="notHide" type="checkbox" id="user-${i}" onclick="toggleCheckbox(${i})">
    </div>
`;
}


/**
 * This function creates a new subtask-input-field
 */
function showNewSubtask() {
    return /*html*/ `
        <div class="d-flex align-items-center justify-content-between">
            <div class="subtask-buttons d-flex align-items-center justify-content-center" onclick=" restoreOldSubtask()">
                <img src="../img/clear.svg" alt="clear" class="clear-responsive">
            </div>
            <span class="mini-separator">|</span>
            <div class="subtask-buttons d-flex align-items-center justify-content-center" onclick="addSubtask()">
                <img src="../img/check_blue_addTask.svg" alt="check" class="check-responsive">
            </div>
        </div>  
    `;
}


/**
 * This function creates new added subtasks
 * @param {string} subtaskID - ID of specific added subtask
 * @param {string} input - value of added subtask
 * @returns 
 */
function showAddedSubtasks(subtaskID, input) {
    return /*html*/ `
        <div id="${subtaskID}" class="added-subtask-container">
            <div class="added_subtask rounded-3 d-flex align-items-center justify-content-between">
                <li>${input}</li>
                <div class="hidden">
                    <img src="../img/delete.svg" alt="delete" onclick="deleteSubtask('${subtaskID}')">
                    <span class="mini_separator_2">|</span>
                    <img src="../img/edit.svg" alt="edit" onclick="openInputForEdit('${subtaskID}','${input}')">
                </div>
            </div>
        </div>
    `;
}


/**
 * This function creates editor for the specific added subtask
 * @param {string} subtaskID -ID of specific added subtask 
 * @param {string} input - value of added subtask
 */
function showInputEditor(subtaskID, input) {
    return /*html*/ `
        <div class="edit-box d-flex justify-content-between align-items-center bg-white" id="${subtaskID}">
            <input type="text" value="${input}" class="edit-input" id="input-${subtaskID}">
            <div class="d-flex justify-content-between align-items-center">
                <div class="subtask-buttons d-flex align-items-center justify-content-center">
                    <img class="trash-width" src="../img/delete.svg" alt="delete" onclick="deleteSubtask('${subtaskID}')">
                </div>
                <span class="mini-separator">|</span>
                <div class="subtask-buttons d-flex align-items-center justify-content-center">
                    <img src="../img/check_blue_addTask.svg" alt="check" onclick="updateInputValue('${subtaskID}','input-${subtaskID}')" class="check-responsive">
                </div>
            </div>
        </div>
    `;
}


/**
 * This function creates the edited subtask
 * @param {string} newValue - value of editor-input
 * @param {string} subtask - ID of edited subtask
 */
function showUpdatedInputValue(newValue, subtask) {
    return /*html*/ `
    <div class="added_subtask d-flex justify-content-between align-items-center rounded-3">
        <li>${newValue}</li>
        <div class="hidden">
            <img class="trash-width" src="../img/delete.svg" alt="delete" onclick="deleteSubtask('${subtask}')">
            <span class="mini_separator_2">|</span>
            <img src="../img/edit.svg" alt="edit" onclick="openInputForEdit('${subtask}','${newValue}')">
        </div>
    </div>
`;
}

// ------------------------------- add new contact - card -------------------------------------------

/**
 * Template of subtask-editor
 */
function showNewContactEditor() {
    return /*html*/ `
        <div class="addNewContactWrapper">
            <div class="addContactLeft">
                <img class="joinLogoAddContact" src="../img/Join logo white.svg">
                <h2 class="headlineContactEditor">Add contact</h2>
                <h3 class="headlineContactEditor3">Tasks are better with a team!</h3>
                <div class="underline"></div>
            </div>
            <div class="addContactRight">
                <div class="ctcEditorRightFirst">
                    <div class="placeholderContact">
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="mask0_71395_17941" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">
                                <rect width="64" height="64" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_71395_17941)">
                                <path d="M32.0001 32.0001C29.0667 32.0001 26.5556 30.9556 24.4667 28.8667C22.3779 26.7779 21.3334 24.2667 21.3334 21.3334C21.3334 18.4001 22.3779 15.889 24.4667 13.8001C26.5556 11.7112 29.0667 10.6667 32.0001 10.6667C34.9334 10.6667 37.4445 11.7112 39.5334 13.8001C41.6223 15.889 42.6667 18.4001 42.6667 21.3334C42.6667 24.2667 41.6223 26.7779 39.5334 28.8667C37.4445 30.9556 34.9334 32.0001 32.0001 32.0001ZM48.0001 53.3334H16.0001C14.5334 53.3334 13.2779 52.8112 12.2334 51.7668C11.189 50.7223 10.6667 49.4668 10.6667 48.0001V45.8667C10.6667 44.3556 11.0556 42.9667 11.8334 41.7001C12.6112 40.4334 13.6445 39.4667 14.9334 38.8001C17.689 37.4223 20.489 36.389 23.3334 35.7001C26.1779 35.0112 29.0667 34.6667 32.0001 34.6667C34.9334 34.6667 37.8223 35.0112 40.6667 35.7001C43.5112 36.389 46.3112 37.4223 49.0667 38.8001C50.3556 39.4667 51.389 40.4334 52.1667 41.7001C52.9445 42.9667 53.3334 44.3556 53.3334 45.8667V48.0001C53.3334 49.4668 52.8112 50.7223 51.7668 51.7668C50.7223 52.8112 49.4668 53.3334 48.0001 53.3334ZM16.0001 48.0001H48.0001V45.8667C48.0001 45.3779 47.8779 44.9334 47.6334 44.5334C47.389 44.1334 47.0667 43.8223 46.6667 43.6001C44.2668 42.4001 41.8445 41.5001 39.4001 40.9001C36.9556 40.3001 34.489 40.0001 32.0001 40.0001C29.5112 40.0001 27.0445 40.3001 24.6001 40.9001C22.1556 41.5001 19.7334 42.4001 17.3334 43.6001C16.9334 43.8223 16.6112 44.1334 16.3667 44.5334C16.1223 44.9334 16.0001 45.3779 16.0001 45.8667V48.0001ZM32.0001 26.6667C33.4667 26.6667 34.7223 26.1445 35.7668 25.1001C36.8112 24.0556 37.3334 22.8001 37.3334 21.3334C37.3334 19.8667 36.8112 18.6112 35.7668 17.5667C34.7223 16.5223 33.4667 16.0001 32.0001 16.0001C30.5334 16.0001 29.2779 16.5223 28.2334 17.5667C27.189 18.6112 26.6667 19.8667 26.6667 21.3334C26.6667 22.8001 27.189 24.0556 28.2334 25.1001C29.2779 26.1445 30.5334 26.6667 32.0001 26.6667Z" fill="white" />
                            </g>
                        </svg>
                    </div>
                </div>
                <div class="ctcEditorRightSecond">
                    <div class="closeBtn" onclick="closeEditorCtc()">
                        <svg width="13" height="14" viewBox="0 0 13 14"  xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.24959 6.99984L11.4926 12.2428M1.00659 12.2428L6.24959 6.99984L1.00659 12.2428ZM11.4926 1.75684L6.24859 6.99984L11.4926 1.75684ZM6.24859 6.99984L1.00659 1.75684L6.24859 6.99984Z" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <form onsubmit="addContact(); return false">
                        <div class="inputCtcContainer"><input class="inputCtc" required id="name" type="text"
                            placeholder="Name"><img src="../img/person-contact.svg">
                        </div>
                        <div class="inputCtcContainer"><input class="inputCtc" required id="email" type="email"
                            placeholder="Email"><img src="../img/mail-contact.svg">
                        </div>
                        <div class="inputCtcContainer"><input class="inputCtc" required id="phone" type="tel" pattern="[0-9]{2}[0-9]{6,11}" placeholder="e.g. 491234567" onkeydown="return checkInput(event)">
                            <img src="../img/call.svg">
                        </div>
                        <div class="cnlAndCreateBtns">
                            <button class="cancelBtnContact cancelBtnContactResponsive" oncli1ck="closeEditorCtc()">Cancel
                                <svg class="cnlSvgCtc" width="13" height="14" viewBox="0 0 13 14" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.24959 6.99984L11.4926 12.2428M1.00659 12.2428L6.24959 6.99984L1.00659 12.2428ZM11.4926 1.75684L6.24859 6.99984L11.4926 1.75684ZM6.24859 6.99984L1.00659 1.75684L6.24859 6.99984Z" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                            <button type="submit" class="createBtnContact">
                                <span>Create contact</span>
                                <img class="checkCreateCtc"src="../img/check_addTask.svg">
                            </button>
                        </div>    
                    </form>
                </div>
            </div>
        </div>
    `;
}