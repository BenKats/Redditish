console.log('Landing Page JS connected');

const signinBttn = document.getElementById('signup-bttn');
signinBttn.addEventListener('click', newUser);

function newUser(e) {
    e.preventDefault();

    console.log(e.value);
    const user = document.getElementById('username');
    const pass = document.getElementById('id');
    const email = document.getElementById('email');
    callSignup(user, pass, email);
}

function callSignup(user, pass, email) {
    fetch('http://thesi.generalassemb.ly:8080/signup', {
        method: 'POST'
    });
}
