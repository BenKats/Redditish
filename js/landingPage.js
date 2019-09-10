console.log('Landing Page JS connected');

const bttn = document.querySelector('.signup-bttn');
bttn.addEventListener('click', enterSite);
let token = null;

document.querySelector('.signup-text').addEventListener('click', switchEntry);
document.querySelector('.login-text').addEventListener('click', switchEntry);

function enterSite(e) {
    e.preventDefault();
    if (e.target.className === 'signup-bttn') {
        newUser(e);
    } else if (e.target.className === 'signin-bttn') {
        getUser(e);
    } else {
        console.error('What the heck did you click?');
    }
}
function switchEntry(e) {
    console.log(e.target.className);
    //TODO make the toggle switch classes instead of changing display css rule
    let usernameField = document.getElementById('user-form');
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
        })
        .catch(error => {
            console.error(error);
        });
    console.log('MADE A NEW USER');
}

function returningUser(e) {
    e.preventDefault();
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    console.log(email);
    console.log(password);
    callLogin(email.value, password.value);
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
            console.log(res);
            return res;
        })
        .then(res => {
            return res.json();
        })
        .then(res => {
            console.log(res.token);
            token = res.token;
        })
        .catch(error => {
            console.error(error);
        });
}
