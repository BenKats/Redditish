//click on button and window appears
function postWindow() {
  let postBoxWindow = document.getElementById("postBox");
  postBoxWindow.style.display = "block";
}

//click post button then postBox will appear on body
function postBoxComplete() {
  let displayPostTitle = document.createElement("div");
  displayPostTitle.innerText = document.getElementById("postTitle").value;
  document.body.appendChild(displayPostTitle);

  //input for textBox to display
  let displayTextBox = document.createElement("div");
  displayTextBox.innerText = document.getElementById("textBox").value;
  document.body.appendChild(displayTextBox);

  // close postBox after submit
  let postBoxWindow = document.getElementById("postBox");
  postBoxWindow.style.display = "none";

  //clear form
  document.getElementById("postTitle").value = "";
  document.getElementById("textBox").value = "";
}
