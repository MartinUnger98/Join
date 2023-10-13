/**
 * This function opens the submenu
 */
function toggleSubmenu() {
    let subMenu = document.getElementById('submenu');
    let cursor = document.getElementById('userProfileInit');
    let profileBackground = document.getElementById('frame31');
    if(subMenu.style.display == 'none') {
        showSubMenu(subMenu);
        switchCursor(cursor);
        changeBg(profileBackground);
        scrollToTop();
    } else {
        hideSubMenu(subMenu);
        switchCursorBack(cursor);
        changeBgBack(profileBackground);
    }
}


/**
 * This function makes the submenu visible
 * @param {string} subMenu - id of submenu
 */
function showSubMenu(subMenu) {
    subMenu.style.display = 'block';
}


/**
 * Thsi function switches the cursor style
 * @param {string} cursor - id of userProfile 
 */
function switchCursor(cursor) {
    cursor.style.cursor ='default';
}


/**
 * This function changes the loggedIn-profile
 * @param {string} profileBackground 
 */
function changeBg(profileBackground) {
    profileBackground.classList.add('bg-upI');
}


/**
 * This function hides the submenu
 * @param {string} subMenu - id of submenu
 */
function hideSubMenu(subMenu) {
    subMenu.style.display = 'none';
}


/**
 * This function switches the cursor back
 * @param {string} cursor - id of user profile
 */
function switchCursorBack(cursor) {
    cursor.style.cursor ='pointer';
}


/**
 * This function changes the profile background
 * @param {string} profileBackground - id of profile background
 */
function changeBgBack(profileBackground) {
    profileBackground.classList.remove('bg-upI');
}