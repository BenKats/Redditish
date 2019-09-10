console.log('Landing Page JS connected');

let token = null;

document.querySelector('.signup-text').addEventListener('click', toggleEntry);
document.querySelector('.login-text').addEventListener('click', toggleEntry);

function toggleEntry(e) {
    console.log(e.target.className);
    //TODO make the toggle switch classes instead of changing display css rule
    let usernameField = document.getElementById('user-form');
    let bttn = document.getElementById('submit-button');
    if (e.target.className === 'login-text') {
        usernameField.style.display = 'none';
        bttn.className = 'signin-bttn';
        bttn.innerText = 'Sign In';
    }
    if (e.target.className === 'signup-text') {
        usernameField.style.display = 'block';
        bttn.className = 'signup-bttn';
        bttn.innerText = 'Sign Up';
    }
}
function postData(e) {
    e.preventDefault();
    let bttn = document.getElementById('submit-button');
    if (bttn.className === 'signup-bttn') {
        newUser(e);
    } else if (bttn.className === 'signin-bttn') {
        returningUser(e);
    } else {
        console.error('What the heck did you click?');
    }
}
function newUser(e) {
    e.preventDefault();
    let username = document.getElementById('username');
    let password = document.getElementById('password');
    let email = document.getElementById('email');
    callSignup(username.value, password.value, email.value);
}

function callSignup(username, password, email) {
    fetch('http://thesi.generalassemb.ly:8080/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: username,
            password: password,
            email: email
        })
    })
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(res => {
            console.log('Whats inside?');
            token = res.token;
            console.log(token);
            redirectHome();
        })
        .catch(error => {
            console.error(error);
        });
}

function returningUser(e) {
    // e.preventDefault();
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    console.log(email);
    console.log(password);
    callLogin(email.value, password.value);

    if (token != null) {
        console.log('Reeached If');
        window.location.href = './home.html';
    }
    console.log('Reached End of LogIn func');
    console.log(token);
}
function callLogin(email, password) {
    fetch('http://thesi.generalassemb.ly:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
        .then(res => {
            return res.json();
        })
        .then(res => {
            console.log(res.token);
            token = res.token;
            redirectHome();
        })
        .catch(error => {
            console.error(error);
        });
}

function redirectHome() {
    console.log(token);
    console.log('end of signup func');
    if (token != null) {
        window.location.href = './home.html';
    }
    console.log('Skipped if statement');
}
