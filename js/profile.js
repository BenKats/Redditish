console.log('Profile Page JS connected');
//TODO maybe switch the actual methods of create and get, might be calling one when the other, if that fails try adding another button or another event listener
//maybe handle toggle entry like landing page, add a cancel button?
let token = window.localStorage.getItem('token');
console.log(token);

updateDisplayText();
function updateProfile(e) {
    e.preventDefault();

    // bttn.addEventListener('click', saveChanges);
    const altEmail = document.getElementById('alt-email');
    const mobile = document.getElementById('mobile');
    const url = document.getElementById('url');
    const bttn = document.getElementById('edit-button');

    const allInputs = document.querySelectorAll('.input-form');
    const allDisplayedText = document.querySelectorAll('.displayed-text');

    //same number of input-form and displayed-text classes, loop through them all and based on the button they will appear or hide
    updateDisplayText();

    if (bttn.textContent === 'Edit') {
        for (let i = 0; i < allInputs.length; i++) {
            allInputs[i].style.display = 'inline';
            allDisplayedText[i].style.display = 'none';
        }

        bttn.textContent = 'Save';
    } else if (bttn.textContent === 'Save') {
        for (let i = 0; i < allInputs.length; i++) {
            allInputs[i].style.display = 'none';
            allDisplayedText[i].style.display = 'inline';
        }
        callCreateProfile(altEmail, mobile, url);
        bttn.textContent = 'Edit';
    }
    updateDisplayText();
}

// edit();
// function updateProfile(e) {
//     e.preventDefault();

//     // bttn.addEventListener('click', saveChanges);
//     const username = document.getElementById('username');
//     const altEmail = document.getElementById('alt-email');
//     const mobile = document.getElementById('mobile');
//     const url = document.getElementById('url');
//     const usernameDisplayed = document.getElementById('username-displayed');
//     const altEmailDisplayed = document.getElementById('alt-email-displayed');
//     const mobileDisplayed = document.getElementById('mobile-displayed');
//     const urlDisplayed = document.getElementById('url-displayed');
//     const bttn = document.getElementById('edit-button');

//     const allInputs = document.querySelectorAll('.input-form');
//     const allDisplayedText = document.querySelectorAll('.displayed-text');

//     if (bttn.textContent === 'Edit') {
//         for (let i = 0; i < allInputs.length; i++) {
//             allInputs[i].style.display = 'inline';
//             allDisplayedText[i].style.display = 'none';
//         }
//         bttn.textContent = 'Save';
//     } else if (bttn.textContent === 'Save') {
//         for (let i = 0; i < allInputs.length; i++) {
//             allInputs[i].style.display = 'none';
//             allDisplayedText[i].style.display = 'inline';
//         }
//         bttn.textContent = 'Edit';
//     }

//     if (bttn.textContent === 'Edit') {
//         edit();
//     } else if (bttn.textContent === 'Save') {
//         save();
//     }
// }
function updateDisplayText() {
    // bttn.addEventListener('click', saveChanges);
    const username = document.getElementById('username');
    const altEmail = document.getElementById('alt-email');
    const mobile = document.getElementById('mobile');
    const url = document.getElementById('url');
    const usernameDisplayed = document.getElementById('username-displayed');
    const altEmailDisplayed = document.getElementById('alt-email-displayed');
    const mobileDisplayed = document.getElementById('mobile-displayed');
    const urlDisplayed = document.getElementById('url-displayed');

    //same number of input-form and displayed-text classes, loop through them all and based on the button they will appear or hide
    callGetProfile(
        username,
        altEmail,
        mobile,
        url,
        usernameDisplayed,
        altEmailDisplayed,
        mobileDisplayed,
        urlDisplayed
    );
}
// function save() {
//     // bttn.addEventListener('click', saveChanges);
//     const altEmail = document.getElementById('alt-email');
//     const mobile = document.getElementById('mobile');
//     const url = document.getElementById('url');

//     //same number of input-form and displayed-text classes, loop through them all and based on the button they will appear or hide
//     callCreateProfile(altEmail, mobile, url);
// }
function callGetProfile(
    username,
    altEmail,
    mobile,
    url,
    usernameDisplayed,
    altEmailDisplayed,
    mobileDisplayed,
    urlDisplayed
) {
    fetch('http://thesi.generalassemb.ly:8080/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(res => {
            console.log(res);
            return res;
        })
        .then(res => {
            // console.log(res.json());
            return res.json();
        })
        .then(res => {
            username.value = res.user.username;
            altEmail.value = res.additionalEmail;
            mobile.value = res.mobile;
            url.value = res.address;
            usernameDisplayed.innerText = res.user.username;
            altEmailDisplayed.innerText = res.additionalEmail;
            mobileDisplayed.innerText = res.mobile;
            urlDisplayed.innerText = res.address;
        })
        .catch(error => {
            console.error(error);
        });
}

function callCreateProfile(altEmail, mobile, url) {
    console.log(`You're in call create profile, token is ${token}`);
    console.log('localstorage contains:' + window.localStorage.getItem(token));
    if (token == null) {
        console.error('Can not create profile, token is null');
    }
    fetch('http://thesi.generalassemb.ly:8080/profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
            additionalEmail: altEmail.value,
            mobile: mobile.value,
            address: url.value
        })
    })
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(res => {
            console.log('Entered create Profile');
            console.log(res);
            console.log('You in');
        })
        .catch(error => {
            console.error(error);
        });
    console.log(`TOKEN INSIDE CALL SIGNUP IS ${token}`);
}
