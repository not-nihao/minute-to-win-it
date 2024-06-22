const getToken = localStorage.getItem("token");
const user_id = localStorage.getItem("userId");
const warningCard = document.getElementById("warningCard");
const warningText = document.getElementById("warningText");
const warningCard1 = document.getElementById("warningCard1");
const warningText1 = document.getElementById("warningText1");
const completedList = document.getElementById("completedList");
var completed = [];

document.addEventListener("DOMContentLoaded", function () {
  if (!(user_id && getToken)) {
    warningCard.classList.remove("d-none");
    warningText.innerText = "Login to accept community tasks";
  }
    const callbackForProgress = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
      if (responseStatus == 200) {
        responseData.forEach((progress) => {
          completed.push(progress.task_id);

          // ====================== grid thats shows all tasks completed as cards ===============================
          if (responseData.length == 0) {
            warningCard1.classList.remove("d-none");
            warningText1.innerHTML = "You have not accepted any tasks yet";
          }
          else {
            warningCard.classList.add("d-none");
            const callbackForCompleted = (responseStatus, responseData) => {
              if (responseStatus == 200){
              console.log("responseStatus:", responseStatus);
              console.log("responseData:", responseData);
              warningCard1.classList.add("d-none");
              const displayItem = document.createElement("div");
              displayItem.className =
                "w-auto col p-3 ";
              displayItem.innerHTML = `
          <div class="card border-white text-white">
              <div class="card-body">
                  <h5 class="card-title text-warning text-center">${responseData.title}</h5>
                  <p class="card-text">
                  <span class="text-warning">Description:</span> ${responseData.description}
                      <br>
                      <br>
                      <span class="text-warning">Pledged on:</span> ${new Date(responseData.completed_on).toDateString()}
                      <br>
                      <br>
                      <span class="text-warning"> No. of users pledging this task:</span> ${responseData.count}
                  </p>
              </div>
          </div>
          `;
              completedList.appendChild(displayItem);
              }
              else if (responseData == "Invalid token") {
                warningCard.classList.remove("d-none");
                warningText.innerText = "unauthorized access, please login again";
                setTimeout(() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("username");
                  localStorage.removeItem("userId");
                  window.location.href = currentUrl + "/login.html";
                }, 2000);
              }
              else if (responseStatus == 404) {
                warningCard1.classList.remove("d-none");
                warningText1.innerText = "No tasks accepted yet";
              }
              else {
                warningCard1.classList.remove("d-none");
                warningText1.innerText = responseData.message;
              }
            };
            fetchMethod(currentUrl + "/api/tasks/" + progress.task_id, callbackForCompleted, "GET");
          }
        });
      }
      else if (responseStatus == 401) {
        warningCard.classList.remove("d-none");
        warningText.innerText = "unauthorized access, please login again";
        setTimeout(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          localStorage.removeItem("userId");
          window.location.href = currentUrl + "/login.html";
        }, 2000);
      }

    }
      fetchMethod(currentUrl + "/api/task_progress/" + user_id, callbackForProgress, "GET", null, token = getToken);



  // =========== to fetch all the tasks that the user has not participated in ===========
  let counter = [];
  const callbackForTask = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const taskList = document.getElementById("taskList");

    responseData.forEach((task) => {
      const displayItem = document.createElement("div");
      displayItem.id = `tId-${task.task_id}`
      if (completed.includes(task.task_id) == false) {
        if (counter.length == 0) {
          counter.push(task.task_id);
          displayItem.className = "carousel-item active rounded px-4"
          // carousel images from picsum random image generator
          displayItem.innerHTML = `
                    <img src="https://picsum.photos/400/200?random=${task.task_id}" class="d-block w-100 rounded">
                    <div class="carousel-caption d-block">
                      <div class="card rounded box">
                        <div class="card-body">
                          <h5 class="card-title text-white">${task.title}</h5>
                          <h6 class="card-body text-white remove">${task.description}</h6>
                          <a class="btn btn-outline-warning m-3" id="btn-${task.task_id}">Accept Task</a>
                        </div>
                      </div>
                    </div>
          `;
        }
        else {
          counter.push(task.task_id);
          displayItem.className = "carousel-item rounded px-4"
          displayItem.innerHTML = `
                    <img src="https://picsum.photos/400/200?random=${task.task_id}" class="d-block w-100 rounded">
                    <div class="carousel-caption d-block">
                      <div class="card rounded box">
                        <div class="card-body">
                          <h5 class="card-title text-white">${task.title}</h5>
                          <h6 class="card-body text-white remove">${task.description}</h6>
                          <a class="btn btn-outline-warning m-3" id="btn-${task.task_id}">Accept Task</a>
                        </div>
                      </div>
                    </div>
          `;
        }
      }
      taskList.appendChild(displayItem);
    });
  };
  fetchMethod(currentUrl + "/api/tasks", callbackForTask, "GET");

  // =========== button action to accept a task ===========
  console.log("counter:", counter);
counter.forEach((i) => {
  const buttons = document.getElementById(`btn-${i}`);
  buttons.addEventListener("click", function () {
    const callbackForAcceptTask = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData); 
      if (responseStatus == 201) {
        if (warningCard.classList.contains("d-none") == false) {
          warningCard.classList.add("d-none");
        }
        completed.push(i);
      }
      else if (responseStatus == 401) {
        if (responseData ==  "No token provided"){
        warningCard.classList.remove("d-none");
        warningText.innerText = "Login to accept community tasks";
        setTimeout(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          localStorage.removeItem("userId");
          window.location.href = currentUrl + "/login.html";
        });
      }
      else if (responseData == "Invalid token") {
        warningCard.classList.remove("d-none");
        warningText.innerText = "unauthorized access, please login again";
        setTimeout(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          localStorage.removeItem("userId");
          window.location.href = currentUrl + "/login.html";
        });
      }
      }
      else {
        warningCard.classList.remove("d-none");
        warningText.innerText = responseData.message;
      }
    }
   const data = {
      user_id: user_id,
      task_id: i
    }
    fetchMethod(currentUrl + '/api/task_progress/', callbackForAcceptTask, "POST", data, token = getToken);
  });
});

});

