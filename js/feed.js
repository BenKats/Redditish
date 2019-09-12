console.log('Profile Page JS connected');

let token = window.localStorage.getItem('token');

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
        })
        .catch(error => {
            console.error(error);
        });
}

function displayPosts(postArr) {
    let feedContainer = document.querySelector('.feed-container');
    for (let i = 0; i < postArr.length; i++) {
        console.log(postArr[i]);
        let newPost = document.createElement('div');
        let newTitleContainer = document.createElement('div');
        let newTitle = document.createElement('h5');
        let newDesc = document.createElement('h5');
        let newCommentContainer = document.createElement('div');

        //appending, see below for   structure
        // feedContainer (all posts)
        //     newPost (title, description, comments)
        //         newTitleCOntainer (title, description)
        feedContainer.appendChild(newPost);
        newPost.append(newTitleContainer, newCommentContainer);
        newTitleContainer.append(newTitle, newDesc);

        //set classes, attributes
        newPost.setAttribute('pid', `${i}`);
        newTitleContainer.classList.add('title-container');

        //set text content
        newTitle.innerText = postArr[i].title;
        newDesc.innerText = postArr[i].description;
    }
    // console.log(postArr[0]);
    // let feedContainer = document.querySelector('.feed-container');
    // let newPost = document.createElement('div');
    // feedContainer.appendChild(newPost);
    // newPost.setAttribute('pid', 'lol');
}
