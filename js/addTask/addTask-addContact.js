/**
 * This function opens the editor for adding a new contact
 */
function showContactEditor() {
    let overlay = document.getElementById('contactOverlay');
    let editor = document.getElementById('addContact');
    editor.classList.remove('d-none');
    editor.innerHTML = showNewContactEditor();
    document.body.classList.add('no-scroll');
    overlay.style.opacity = '0.7';
    overlay.style.zIndex = '997';
    setTimeout(function () {
        editor.style.right = '0px';
    }, 100);
    scrollToTop();
}


/**
 * This function closes the "Add new Contact"-editor
 */
function closeEditorCtc() {
    let overlay = document.getElementById('contactOverlay');
    let editor = document.getElementById('addContact');
    document.body.classList.remove('no-scroll');
    overlay.style.opacity = '0';
    overlay.style.zIndex = '-5';
    editor.style.right = '-4000px';
    setTimeout(function () {
        editor.classList.add('d-none');
    }, 100);
}


/**
 * This function adds a new contact
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
}


/**
 * This function saves a nw contact
 */
async function saveNewContact() {
    const allContactsAsString = JSON.stringify(allContacts);
    await setItem('allContacts', allContactsAsString);
    if (!editModeOnOrOff) {
        renderUser();
    }
    else {
        renderUserInEditor(idForEditmode, indexForEditmode);
    }
    renderUser();
    closeEditorCtc();
}


/**
 * This function scrolls to the top, whenever the "Add new contact"-editor is shown
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}


/**
 * This function sorts the all contacts
 * @returns 
 */
function sortByFirstName() {
    return allContacts.sort(function (a, b) {
        const firstNameA = a.name.split(' ')[0];
        const firstNameB = b.name.split(' ')[0];
        return firstNameA.localeCompare(firstNameB);
    });
}


/**
 * This function allows to close one of the dropdowns, when you click outside of the dropdwon
 * @param {symbol} event 
 */
window.onclick = function (event) {
    if (event.target.matches('.dropBtnContacts')) {
        toggleDropdown('contact');
    }
    else if (!event.target.matches('.notHide')) {
        styleContactDropdownBack();
    }
    if (event.target.matches('.selectDropdownBtn')) {
        toggleDropdown('category');
        document.getElementById('select').style.borderColor = '#29ABE2';
    }
    else if (!event.target.matches('.notHide')) {
        styleSelectDropdownBack();
    }
}


/**
 * This function switches the dropdown of contacts back (closing)
 */
function styleContactDropdownBack() {
    let dropdowns = document.getElementById("contacts");
    let dropdownBtn = document.getElementById('contact_dropdown');
    let dropArrow1 = document.getElementById('drop_1');
    dropArrow1.classList.remove('switch');
    dropdownBtn.classList.remove('border-color');
    dropdowns.classList.remove("active");
}


/**
 * This function switches the dropdown of category back (closing)
 */
function styleSelectDropdownBack() {
    var dropdowns = document.getElementById("content");
    let dropdownBtn = document.getElementById('select');
    let dropArrow1 = document.getElementById('drop_2');
    dropArrow1.classList.remove('switch');
    dropdownBtn.style.borderColor = '#D1D1D1';
    dropdowns.classList.remove("active");
}


/**
 * This function makes sure that the detailed Task is still clickable
 * @param {symbol} event 
 */
function doNotClose(event) {
    event.stopPropagation();
}