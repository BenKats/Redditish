console.log('Profile Page JS connected');

let token = window.localStorage.getItem('token');
console.log(token);

function displayAllPosts() {
    fetch('http://thesi.generalassemb.ly:8080/post/list', {
        method: 'GET'
    }) //Force break
        .then(res => {
            console.log(res);
        });
}
