/**
 * GLOBAL VARIABLES
 */

let elemPwd = document.getElementById("pwd");
let elemCnfrmPwd = document.getElementById("pwd-cnfrm");
const MIN_PWD_LEN = 8;


/**
 * EVENT LISTENERS
 */

elemPwd.addEventListener("input", pwdCheckControl);
elemCnfrmPwd.addEventListener("input", pwdCheckControl);


/**
 * FUNCTIONS
 */

function pwdCheckControl(event) {
    let elem = event.target;
    let isValid = true;
    let pwdString = event.target.value;
    let errorString = null;

    // 1. check minlength
    if (pwdString.length < MIN_PWD_LEN) {
        isValid = false;
        errorString = `Error: password must be at least ${MIN_PWD_LEN} characters.`
    }
    // 2. check complexity
    if (!checkComplexity(pwdString) && isValid) {
        isValid = false;
        errorString = `Error: password must have at least one lowercase character,` + 
            `one uppercase character, one number, and one special character.`;
    }
    // 3. check password matching
    if((elemPwd.value !== elemCnfrmPwd.value) && isValid && elem.id === 'pwd-cnfrm') {
        isValid = false;
        errorString = `Error: passwords must match.`;
    }

    // 3. Manage styling and input state
    if (isValid) {
        elem.setCustomValidity('');
    } else {
        elem.setCustomValidity(errorString);
    }
}

/**
 * Use to check complexity of the password entered to ensure minimum complexity requirements are met
 * @param {*} event 
 * @returns true if complexity requirements are met, false otherwise
 */
function checkComplexity(password) {
    const oneUppper = new RegExp('[A-Z]');
    const oneLower = new RegExp('[a-z]');
    const oneNumber = new RegExp('[0-9]');
    const oneSpecial = new RegExp('\\W');

    return oneUppper.test(password) && 
        oneLower.test(password) &&
        oneNumber.test(password) &&
        oneSpecial.test(password);
}

