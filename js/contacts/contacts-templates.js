/**
 * 
 * @returns html code for add contact detail view
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
                                <rect width="64" height="64" fill="#D9D9D9"/>
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
                        <div class="inputCtcContainer">
                            <input class="inputCtc" required id="name" type="text" placeholder="Name">
                            <img src="../img/person-contact.svg">
                        </div>
                        <div class="inputCtcContainer">
                            <input class="inputCtc" required id="email" type="email"placeholder="Email">
                            <img src="../img/mail-contact.svg">
                        </div>
                        <div class="inputCtcContainer">
                            <input class="inputCtc" required id="phone" type="tel" pattern="[0-9]{2}[0-9]{6,11}" placeholder="e.g. 491234567" oninvalid="this.setCustomValidity('Please enter the following format: 4916754272')" onkeydown="return checkInput(event)">
                            <img src="../img/call.svg">
                        </div>
                        <div class="cnlAndCreateBtns">
                            <button class="cancelBtnContact cancelBtnContactResponsive" onclick="closeEditorCtc()">Cancel
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


/**
 * 
 * @param {string} initials of the contact
 * @returns the initials for the colorful circle
 */
function contactHead(initials) {
    return `
    <div class="categoryHead">${initials[0][0]}</div>
    <div class="categoryBorder"></div>
    `
}


/**
 * 
 * @param {string} initials 
 * @param {string} contact 
 * @param {number} i 
 * @returns html code for every contact in the left list
 */
function contactLayout(initials, contact, i) {
    return `
    <button id="contact${i}" onclick="showContact(${i})" class="contactLayout">
        <div id="initialLogo${i}" class="initials"><span>${initials}</span></div>        
        <div class="infoOrder">
            <span>${contact['name']}</span>
            <a class="emailLink">${contact['email']}</a>
        </div>
    </button>
    `;
}


/**
 * 
 * @param {number} i 
 * @returns html code for the detailed view of the selected contact from the right side bar
 */
function detailView(i) {
    return /*html*/` 
            <div class="detailViewHead">
                <div id="initialsDetailView" class="initalsDetailView initalsDetailView-contact">
                    <span id="initalsDetail">${getInitials(allContacts[i]['name'])}</span></div>
                    <div>
                        <h2 id="headDetail" class="headDetailView">${allContacts[i]['name']}</h2>
                        <div class="detailViewButton">
                            <div class="buttonSpace">
                                <button class="detailButton" id="editButtonDetail" onclick="editContact(${i})">
                                <svg class="svgBtnDetailView" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 17H3.4L12.025 8.375L10.625 6.975L2 15.6V17ZM16.3 6.925L12.05 2.725L13.45 1.325C13.8333 0.941667 14.3042 0.75 14.8625 0.75C15.4208 0.75 15.8917 0.941667 16.275 1.325L17.675 2.725C18.0583 3.10833 18.2583 3.57083 18.275 4.1125C18.2917 4.65417 18.1083 5.11667 17.725 5.5L16.3 6.925ZM14.85 8.4L4.25 19H0V14.75L10.6 4.15L14.85 8.4Z" fill="#2A3647"/>
                                </svg>
                                <span>Edit</span>
                                </button>
                            </div>
                            <div class="buttonSpace">
                                <button class="detailButton" id="deleteButtonDetail" onclick="askToDelete(${i})">
                                    <svg class="svgBtnDetailView" width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.14453 18C2.59453 18 2.1237 17.8042 1.73203 17.4125C1.34036 17.0208 1.14453 16.55 1.14453 16V3C0.861198 3 0.623698 2.90417 0.432031 2.7125C0.240365 2.52083 0.144531 2.28333 0.144531 2C0.144531 1.71667 0.240365 1.47917 0.432031 1.2875C0.623698 1.09583 0.861198 1 1.14453 1H5.14453C5.14453 0.716667 5.24036 0.479167 5.43203 0.2875C5.6237 0.0958333 5.8612 0 6.14453 0H10.1445C10.4279 0 10.6654 0.0958333 10.857 0.2875C11.0487 0.479167 11.1445 0.716667 11.1445 1H15.1445C15.4279 1 15.6654 1.09583 15.857 1.2875C16.0487 1.47917 16.1445 1.71667 16.1445 2C16.1445 2.28333 16.0487 2.52083 15.857 2.7125C15.6654 2.90417 15.4279 3 15.1445 3V16C15.1445 16.55 14.9487 17.0208 14.557 17.4125C14.1654 17.8042 13.6945 18 13.1445 18H3.14453ZM3.14453 3V16H13.1445V3H3.14453ZM5.14453 13C5.14453 13.2833 5.24036 13.5208 5.43203 13.7125C5.6237 13.9042 5.8612 14 6.14453 14C6.42786 14 6.66536 13.9042 6.85703 13.7125C7.0487 13.5208 7.14453 13.2833 7.14453 13V6C7.14453 5.71667 7.0487 5.47917 6.85703 5.2875C6.66536 5.09583 6.42786 5 6.14453 5C5.8612 5 5.6237 5.09583 5.43203 5.2875C5.24036 5.47917 5.14453 5.71667 5.14453 6V13ZM9.14453 13C9.14453 13.2833 9.24037 13.5208 9.43203 13.7125C9.6237 13.9042 9.8612 14 10.1445 14C10.4279 14 10.6654 13.9042 10.857 13.7125C11.0487 13.5208 11.1445 13.2833 11.1445 13V6C11.1445 5.71667 11.0487 5.47917 10.857 5.2875C10.6654 5.09583 10.4279 5 10.1445 5C9.8612 5 9.6237 5.09583 9.43203 5.2875C9.24037 5.47917 9.14453 5.71667 9.14453 6V13Z" fill="#2A3647"/>
                                    </svg>
                                    <span>Delete</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="detailView-box">
                    <div class="detailView">Contact Information</div>
                    <h3 class="h3DetailView">Email</h3>
                    <a class="emailLinkWithHover emailLink" id="emailDetail" href="mailto:${allContacts[i]['email']}">${allContacts[i]['email']}</a>
                    <h3 class="h3DetailView">Phone</h3>
                    ${allContacts[i]['number'] !== undefined ? /*html*/  ` 
                        <span id="phoneDetail">+${allContacts[i]['number']}</span>
                    `: ''}
                </div>    
            </div>
            <div id="askToDelete">
                <span class="marginBotom32">Do you really want to delete this contact?</span>
                <div class="yesNoOrder d-flex">
                    <button class="askBtnDelete" onclick="deleteContact(${i})">yes</button>
                    <button class="askBtnDelete" onclick="closeAskToDelete()">no</button>
                </div>
            </div>
    `;   
}


/**
 * 
 * @param {number} i 
 * @returns the html code for the contact editor
 */
function showEditor(i) {
    return /*html*/ `
        <div class="addNewContactWrapper">
            <div class="addContactLeft">
                    <img class="joinLogoAddContact" src="../img/Join logo white.svg">
                    <h2 class="headlineContactEditor">Edit contact</h2>
                <div class="underline underline-edit-responsive"></div>
            </div>
            <div class="addContactRight">
                <div class="ctcEditorRightFirst ctcEditorRightFirstResponsive">
                    <div id="initialDiv" class="initalsDetailView newInitialSize ">
                        ${getInitials(allContacts[i]['name'])}
                    </div>
                </div>
                <div class="ctcEditorRightSecond">
                    <div class="closeBtn" onclick="closeEditorCtc()">
                        <svg width="13" height="14" viewBox="0 0 13 14"  xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.24959 6.99984L11.4926 12.2428M1.00659 12.2428L6.24959 6.99984L1.00659 12.2428ZM11.4926 1.75684L6.24859 6.99984L11.4926 1.75684ZM6.24859 6.99984L1.00659 1.75684L6.24859 6.99984Z" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <form onsubmit="saveContact(${i}); return false">
                        <div class="inputCtcContainer">
                            <input class="inputCtc" required id="name" type="text" placeholder="Name">
                            <img src="../img/person-contact.svg">
                        </div>
                        <div class="inputCtcContainer">
                            <input class="inputCtc" required id="email" type="email" placeholder="Email">
                            <img src="../img/mail-contact.svg">
                        </div>
                        <div class="inputCtcContainer">
                            <input class="inputCtc" required id="phone" type="tel" pattern="[0-9]{2}[0-9]{6,11}" placeholder="e.g. 491234567" oninvalid="this.setCustomValidity('Please enter the following format: 4916754272')" onkeydown="return checkInput(event)">
                            <img src="../img/call.svg">
                        </div>
                        <div class="cnlAndCreateBtns ">
                            <button class="cancelBtnContact edit-button-responsive" onclick="closeEditorCtc()">Cancel
                                <svg class="cnlSvgCtc" width="13" height="14" viewBox="0 0 13 14" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.24959 6.99984L11.4926 12.2428M1.00659 12.2428L6.24959 6.99984L1.00659 12.2428ZM11.4926 1.75684L6.24859 6.99984L11.4926 1.75684ZM6.24859 6.99984L1.00659 1.75684L6.24859 6.99984Z" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                            <button type="submit" class="createBtnContact edit-button-responsive ">Save
                                <img class="checkCreateCtc"src="../img/check_addTask.svg">
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
}