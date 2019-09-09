console.log('Landing Page JS connected');

const signinBttn = document.getElementById('signup-bttn');
signinBttn.addEventListener('click', newUser);

function newUser(e) {
    e.preventDefault();

    console.log(e);
    let user = document.getElementById('username');
    console.log(user);
    console.log(user.value);
    let pass = document.getElementById('password');
    console.log(pass);
    console.log(pass.value);
    let email = document.getElementById('email');
    callSignup(user.value, pass.value, email.value);
    console.log(email.value);
}

function callSignup(user, pass, emailAddress) {
    fetch('http://thesi.generalassemb.ly:8080/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, password: pass, email: emailAddress })
    })
        .then(res => {
            console.log(res);
            return res;
        })
        .catch(error => {
            console.error(error);
        });
    console.log('MADE A NEW USER');
}
