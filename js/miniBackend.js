const STORAGE_TOKEN = 'V8J181IQQZW8KNTIQPMF1GIPXX2M4PYDR65SD4NW';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


/**
 * 
 * @param {string} key 
 * @param {object} value 
 * @returns a function that saves the object (value) on the storage under the name key
 */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
}


/**
 * 
 * @param {string} key 
 * @returns the value which is saved under the key's name
 */
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) { 
            return res.data.value;
        } throw `No users found. Please Sign Up or Guest Login".`;
    });
}


/**
 * 
 * this function clears all current users
 */
function clearUsers() {
    users = []; 
    setItem('users', JSON.stringify(users))
        .then(() => {
            console.log('Users data cleared successfully.');
        })
        .catch(error => {
            console.error('Error clearing users data:', error);
        });
}


/**
 * 
 * this function clears all current contacts
 */
function clearContacts() {
    allContacts = [];
    setItem('allContacts', JSON.stringify(allContacts))
        .then(() => {
            console.log('Contacts data cleared successfully.');
        })
        .catch(error => {
            console.error('Error clearing users data:', error);
        });
}


/**
 * sets the user mail to the local storage 
 * 
 * @param {string} userMail 
 */
function setUserToLocalStorage(userMail) {
    localStorage.setItem('lastUser', userMail);
}


/**
 * 
 * @returns the user mail from the local storage
 */
function getUserFromLocalStorage() {
    let userMail = localStorage.getItem('lastUser');
    return userMail;
}


/**
 * clears the current user mail from the local stroage 
 * 
 */
function clearLocalStorageUser() {
    localStorage.setItem('lastUser', '');
}