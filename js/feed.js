console.log('Profile Page JS connected');

let token = window.localStorage.getItem('token');
let test = null;

console.log(token);

callListPosts();
// console.log(postArr);
function callListPosts() {
    fetch('http://thesi.generalassemb.ly:8080/post/list', {
        method: 'GET'
    }) //Force break
        .then(res => {
            console.log(res);
            return res;
        })
        .then(res => {
            return res.json();
        })
        .then(res => {
            displayPosts(res);
        }) //.then(res => {
        //     test display comments here if doesnt work in display psots
        // })
        .catch(error => {
            console.error(error);
        });
}

function displayPosts(postArr) {
    let feedContainer = document.querySelector('.feed-container');
    for (let i = 0; i < /*postArr.length*/ 20; i++) {
        console.log(postArr[i]);
        let newPost = document.createElement('div');
        let newTitleContainer = document.createElement('div');
        let newCommentContainer = document.createElement('div');
        let newTitle = document.createElement('h5');
        let newDesc = document.createElement('h5');
        let newUser = document.createElement('h6');
        let pid = postArr[i].id;
        //appending, see below for   structure
        // feedContainer (all posts)
        //     newPost (title, description, comments)
        //         newTitleContainer (title, description)
        //         newCommentContainer (comment)
        feedContainer.appendChild(newPost);
        newPost.append(newTitleContainer, newCommentContainer);
        newTitleContainer.append(newTitle, newDesc, newUser);

        //set classes, attributes
        //set the pid of the div to the post id
        newPost.setAttribute('pid', pid);
        newTitleContainer.classList.add('title-container');
        newCommentContainer.classList.add('comment-container');

        //set text content
        newTitle.innerText = postArr[i].title;
        newDesc.innerText = postArr[i].description;
        newUser.innerText = postArr[i].user.username;

        //check for comments by post id
        callGetCommentsByPostId(pid);
        //retrieve cached comments relative to the pid and convert back to JSON
        let postComments = JSON.parse(window.sessionStorage.getItem(pid.toString()));
        console.log(postComments);
    }
}

function callGetCommentsByPostId(pid) {
    fetch(`http://thesi.generalassemb.ly:8080/post/${pid}/comment`, {
        method: 'GET'
    })
        .then(res => {
            // console.log(res.status);
            return res.json();
        })
        .then(res => {
            getCommentArr(res, pid);
        })
        .catch(error => {
            console.error(error);
        });
}

function getCommentArr(commentArr, pid) {
    console.log(`post ${pid} is`);
    console.log(commentArr);
    //doesn't cache comments if no comments exist, otherwise convert JSON object to string and store in session storage
    if (commentArr.length > 0) {
        window.sessionStorage.setItem(`${pid}`, JSON.stringify(commentArr));
    } else {
        window.sessionStorage.setItem(`${pid}`, JSON.stringify({ id: '-1' }));
    }
}
