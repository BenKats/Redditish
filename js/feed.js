console.log('Profile Page JS connected');

let token = window.localStorage.getItem('token');
let test = null;

console.log(token);

createNewPostField();
callListPosts();
// console.log(postArr);
function callListPosts() {
    fetch('http://thesi.generalassemb.ly:8080/post/list', {
        method: 'GET'
    }) //Force break
        .then(res => {
            // console.log(res);
            return res;
        })
        .then(res => {
            return res.json();
        })
        .then(res => {
            displayPosts(res);
            return res;
        }) //.then(res => {
        //     test display comments here if doesnt work in display psots
        // })
        .then(res => {
            displayComments(res);
        })
        .catch(error => {
            console.error(error);
        });
}

function displayPosts(postArr) {
    let feedContainer = document.querySelector('.feed-container');
    for (let i = 0; i < /*postArr.length*/ 20; i++) {
        // console.log(postArr[i]);
        let newPost = document.createElement('div');
        let newTitleContainer = document.createElement('div');
        let newCommentContainer = document.createElement('div');
        let newTitle = document.createElement('h5');
        let newDesc = document.createElement('h5');
        let newUser = document.createElement('h6');
        let pid = postArr[i].id;

        feedContainer.appendChild(newPost);
        newPost.append(newTitleContainer, newCommentContainer);
        newTitleContainer.append(newTitle, newDesc, newUser);

        //set classes, attributes
        //set the pid of the div to the post id
        newPost.setAttribute('pid', pid);

        newTitleContainer.classList.add('title-container');
        newCommentContainer.classList.add('all-comment-container');
        newCommentContainer.setAttribute('ccid', pid);

        //set text content
        newTitle.innerText = postArr[i].title;
        newDesc.innerText = postArr[i].description;
        newUser.innerText = `Username: ${postArr[i].user.username}`;

        //check for comments by post id
        callGetCommentsByPostId(pid);
    }
}
function displayComments(postArr) {
    for (let i = 0; i < /*postArr.length*/ 20; i++) {
        console.log(postArr[i]);
        let pid = postArr[i].id;

        if (sessionStorage.getItem(pid) != null) {
            //retrieve cached comments relative to the pid and convert back to JSON
            let postComments = JSON.parse(window.sessionStorage.getItem(pid.toString()));

            // console.log('contents of postComments');
            // console.log(postComments);

            let targetCommentContainer = document.querySelector(`[ccid="${pid}"]`);
            console.log(postComments[0].text);

            for (let j = 0; j < postComments.length; j++) {
                //Create new elements
                let newCommentContainer = document.createElement('div');
                let newComment = document.createElement('p');
                let newUser = document.createElement('p');
                let newDeleteBttn = document.createElement('button');
                //Append
                targetCommentContainer.appendChild(newCommentContainer);
                newCommentContainer.append(newUser, newComment, newDeleteBttn);
                //Assign Attributes
                newCommentContainer.setAttribute('cid', postComments[j].id);
                newCommentContainer.classList.add('comment-container');
                //Assign Text
                newComment.innerText = postComments[j].text;
                newUser.innerText = `Username: ${postComments[j].user.username}`;
                newDeleteBttn.innerText = 'Delete';

                newDeleteBttn.addEventListener('click', deleteComment);
                newDeleteBttn.value = postComments[j].id;
            }
        }
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
    }
}

function deleteComment(e) {
    // callDeleteComment(e.target.value);
    console.log(e.target);
}

function callDeleteComment(cid) {
    fetch(`http://thesi.generalassemb.ly:8080/comment/${cid}`, {
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
}

function createNewPostField() {
    let feedContainer = document.querySelector('.feed-container');
    let formContainer = document.createElement('form');
    let newPostTitle = document.createElement('h4');
    let titleInput = document.createElement('input');
    let descInput = document.createElement('input');
    let submitBttn = document.createElement('button');
    feedContainer.appendChild(formContainer);
    formContainer.append(newPostTitle, titleInput, descInput, submitBttn);

    titleInput.classList.add('post-title-form');
    descInput.classList.add('post-desc-form');

    newPostTitle.innerText = 'Create New Post';
    titleInput.placeholder = 'Post Title';
    descInput.placeholder = 'Description';
    submitBttn.innerText = 'Submit';
    submitBttn.addEventListener('click', callCreatePost);
}

function callCreatePost(e) {
    e.preventDefault();
    console.log(`${document.querySelector('.post-title-form').value}`);
    let title = document.querySelector('.post-title-form');
    let desc = document.querySelector('.post-desc-form');
    fetch('http://thesi.generalassemb.ly:8080/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
            title: title.value,
            description: desc.value
        })
    })
        .then(res => {
            return res;
        })
        .catch(error => {
            console.error(error);
        });
    title.value = null;
    desc.value = null;
}
