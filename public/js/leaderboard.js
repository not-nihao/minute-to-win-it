document.addEventListener("DOMContentLoaded", function () {

    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
    
        const leaderboard = document.getElementById("leaderboard");
        const positionInfo = document.getElementById("positionInfo");
        let i=1;
        if(responseStatus === 200){
            warningCard.classList.add("d-none");
        responseData.forEach((log) => {
          const displayItem = document.createElement("div");
          if (parseInt(log.user_id) === parseInt(localStorage.getItem("userId"))) {
            displayItem.className = "card bg-warning m-2 box"
            displayItem.id = "glogId-"+log.glog_id
            displayItem.innerHTML = `
            <div class="card-body row justify-content-evenly">
            <h2 class="col align-self-start text-center">${i}</h2>
            <h2 class="col align-self-center text-center">${log.username}</h2>
            <h2 class="col align-self-end text-center">${log.points}</h2>
            </div>
            `;
            positionInfo.innerHTML = `<p class="text-white">You are <span class="text-warning">#${i}</span> worldwide</p>`;
            i++;
          }
          else {
            if(i==1){
            displayItem.className = "card m-2 box gold"
            displayItem.id = "glogId-"+log.glog_id
            displayItem.innerHTML = `
            <div class="card-body row justify-content-evenly">
              <h2 class="col align-self-start text-center">${i}</h2>
              <h2 class="col align-self-center text-center">${log.username}</h2>
              <h2 class="col align-self-end text-center">${log.points}</h2>
              </div>
            `;
            i++
            }
            else if(i==2){
            displayItem.className = "card m-2 box silver placeholder-wave"
            displayItem.id = "glogId-"+log.glog_id
            displayItem.innerHTML = `
            <div class="card-body row justify-content-evenly">
              <h2 class="col align-self-start text-center">${i}</h2>
              <h2 class="col align-self-center text-center">${log.username}</h2>
              <h2 class="col align-self-end text-center">${log.points}</h2>
              </div>
            `;
            i++
            }
            else if(i==3){
            displayItem.className = "card m-2 box bronze placeholder-wave"
            displayItem.id = "glogId-"+log.glog_id
            displayItem.innerHTML = `
            <div class="card-body row justify-content-evenly">
              <h2 class="col align-self-start text-center">${i}</h2>
              <h2 class="col align-self-center text-center">${log.username}</h2>
              <h2 class="col align-self-end text-center">${log.points}</h2>
              </div>
            `;
            i++
            }
            else{
            displayItem.className = "card bg-white m-2 box"
            displayItem.id = "glogId-"+log.glog_id
            displayItem.innerHTML = `
            <div class="card-body row justify-content-evenly">
              <h2 class="col align-self-start text-center">${i}</h2>
              <h2 class="col align-self-center text-center">${log.username}</h2>
              <h2 class="col align-self-end text-center">${log.points}</h2>
              </div>
            `;
            i++
            }
          }
          leaderboard.appendChild(displayItem);
        });
    }
    else {
        const warningCard = document.getElementById("warningCard");
        const warningText = document.getElementById("warningText");
        warningCard.classList.remove("d-none");
        warningText.innerText = responseData.message;
    }
      }

    fetchMethod(currentUrl + "/api/logs/leaderboard", callback, "GET", null, null);

      // code to always auto-scroll to bottom of chatList on content load and new content added
  const isScrolledToBottom = leaderboard.scrollHeight - leaderboard.clientHeight <= leaderboard.scrollTop + 1
  if(!isScrolledToBottom){
    leaderboard.scrollTop = leaderboard.scrollHeight - leaderboard.clientHeight;
  }
    
    });