console.log('Landing Page JS connected');

const signupBttn = document.getElementById('signup-bttn');
const loginBttn = document.getElementById('login-bttn');
let token = null;
signupBttn.addEventListener('click', newUser);
loginBttn.addEventListener('click', returningUser);

function newUser(e) {
    e.preventDefault();
    let username = document.getElementById('username');
    let password = document.getElementById('signup-password');
    let email = document.getElementById('signup-email');
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
    let email = document.getElementById('login-email');
    let password = document.getElementById('login-password');
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
            // console.log(res.json());
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
