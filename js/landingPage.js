console.log('Landing Page JS connected');

const signupBttn = document.getElementById('signup-bttn');
const loginBttn = document.getElementById('login-bttn');
let username = null;
let password = null;
let email = null;
let token = null;
signupBttn.addEventListener('click', newUser);
loginBttn.addEventListener('click', returningUser);

function newUser(e) {
    e.preventDefault();

    // console.log(e);
    username = document.getElementById('username');
    // console.log(username);
    // console.log(username.value);
    password = document.getElementById('signup-password');
    // console.log(password);
    // console.log(password.value);
    email = document.getElementById('signup-email');
    callSignup(username.value, password.value, email.value);
    // console.log(email.value);
}

function callSignup(username, password, email) {
    fetch('http://thesi.generalassemb.ly:8080/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password, email: email })
    })
        .then(res => {
            console.log(res);
            return res;
        })
        .then(res => {
            console.log('Whats inside?');
            console.log(res.json());
            token = res.json();
        })
        .catch(error => {
            console.error(error);
        });
    console.log('MADE A NEW USER');
}

function returningUser(e) {
    e.preventDefault();
    email = document.getElementById('login-email');
    password = document.getElementById('login-password');
    console.log(email);
    console.log(password);
    callLogin(email.value, password.value);
}
function callLogin(email, password) {
    fetch('http://thesi.generalassemb.ly:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password })
    })
        .then(res => {
            console.log(res);
            return res;
        })
        .then(res => {
            console.log(res.json());
            // console.log(res);
            // let temp = res.json();
            // console.log(temp);
            return res.json();
        })
        .then(res => {
            console.log(res.token);
            token = res.token;
            // console.log(token.value);
        })
        .catch(error => {
            console.error(error);
        });
}
