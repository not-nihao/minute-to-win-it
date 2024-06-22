const getToken = localStorage.getItem("token");
const sendBtn = document.getElementById("sendBtn");
const warningCard = document.getElementById("warningCard");
const warningText = document.getElementById("warningText");
const chatList = document.getElementById("chatList");

document.addEventListener("DOMContentLoaded", function () {
  let counter = []
  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);


    responseData.forEach((message) => {
      if(message.username != null){
      const displayItem = document.createElement("div");
      if (parseInt(message.user_id) === parseInt(localStorage.getItem("userId"))) {
        counter.push(message.message_id)
        displayItem.className = "card bg-warning m-2 box my-msg"
        displayItem.id = "mId-"+message.message_id
        displayItem.innerHTML = `
          <div class="card-header row justify-content-evenly">
          <h4 class="col align-self-start">${message.username}</h4>
          <button class="btn btn-danger msgDeleteBtn col align-self-end" id="delete-${message.message_id}"><ion-icon name="trash-outline"></ion-icon></button></div>
          <div class="card-body">${message.message_text}</div>
          <div class="card-footer">${new Date(message.created_at).toGMTString()}</div>
        `;
      }
      else {
        displayItem.className = "card bg-white m-2 box other-msg"
        displayItem.id = "mId-"+message.message_id
        displayItem.innerHTML = `
        <h4 class="card-header">${message.username}</h4>
          <div class="card-body">${message.message_text}</div>
          <div class="card-footer">${new Date(message.created_at).toGMTString()}</div>
        `;
      }
      chatList.appendChild(displayItem);
    }
  }
  )
  
  // code to always auto-scroll to bottom of chatList on content load and new content added
  const isScrolledToBottom = chatList.scrollHeight - chatList.clientHeight <= chatList.scrollTop + 1
  if(!isScrolledToBottom){
    chatList.scrollTop = chatList.scrollHeight - chatList.clientHeight;
  }
  
  for (let i of counter) {
    const buttons = document.getElementById(`delete-${i}`);
    buttons.addEventListener("click", function () {
      const callbackForDelete = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData); 
        if (responseStatus == 204) {
          if (warningCard.classList.contains("d-none") == false) {
            warningCard.classList.add("d-none");
          }
          window.location.reload();
        }
        else {
          warningCard.classList.remove("d-none");
          warningText.innerText = responseData.message;
        }
      }
      fetchMethod(currentUrl + '/api/messages/' + i, callbackForDelete, "DELETE", null, null);
    });
  }
  
};
fetchMethod(currentUrl + "/api/messages", callback);

});



sendBtn.addEventListener("click", function () {
  data = {
    message_text: document.getElementById("chatInput").value,
    user_id: localStorage.getItem("userId")
  }
  const callbackForCreate = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
    if (responseStatus == 201) {
      if (warningCard.classList.contains("d-none") == false) {
        warningCard.classList.add("d-none");
      }
      window.location.reload();
    }
    else if (responseStatus == 401) {
      warningCard.classList.remove("d-none");
      if (responseData.message ==  "No token provided"){
        warningText.innerText = "Login to send messages";
        setTimeout(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          localStorage.removeItem("userId");
          window.location.href = currentUrl + "/login.html";
        }, 2000);
      }
      else if (responseData.message == "Invalid token") {
        warningText.innerText = "unauthorized access, please login again";
        setTimeout(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          localStorage.removeItem("userId");
          window.location.href = currentUrl + "/login.html";
        }, 1000);
      }
    }
    else {
      warningCard.classList.remove("d-none");
          warningText.innerText = responseData.message;
    }
  }
  fetchMethod(currentUrl + '/api/messages', callbackForCreate, "POST", data, token = getToken);
});
