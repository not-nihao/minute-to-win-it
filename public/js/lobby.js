const user_id = localStorage.getItem("userId");
const getToken = localStorage.getItem("token");
const header = document.getElementById("greetingHeader");
const warningCard = document.getElementById("warningCard");
const referrerUrl = document.referrer;
const startBtn = document.getElementById("startBtn");

document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("token") != null) {
        header.className = "text-white text-center";
        warningCard.classList.add("d-none");
        if (referrerUrl === "http://localhost:3000/login.html") {
            header.innerHTML = `Welcome back, <span class="headerEffect">${localStorage.getItem("username")}</span>`;
        } else if (referrerUrl === "http://localhost:3000/register.html") {
            header.innerHTML = `Welcome, <span class="headerEffect">${localStorage.getItem("username")}</span>`;
        }
    }
    else {
        warningCard.classList.remove("d-none");
    }

    startBtn.addEventListener("click", function () {

        if (!(user_id && getToken)) {
            window.location.href = currentUrl + "/login.html";
        }
        else {
            const callbackForPost = (responseStatus, responseData) => {
                console.log(responseStatus);
                console.log(responseData);
                if (responseStatus == 201) {
                    if (warningCard.classList.contains("d-none") == false) {
                        warningCard.classList.add("d-none");
                    }
                    localStorage.setItem("gameId", responseData.game_id);
                    localStorage.setItem("heroId", responseData.hero_id);
                    window.location.href = currentUrl + "/quest.html";
                }
                else if (responseStatus == 401) {
                    if (responseData.message == "Invalid token") {
                        warningCard.classList.remove("d-none");
                        warningText.innerText = "Unauthorized access, please login again";
                        setTimeout(() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("username");
                            localStorage.removeItem("userId");
                            window.location.href = currentUrl + "/login.html";
                        }, 2000);
                    }
                    else if (responseData.message == "Token not provided") {
                        warningCard.classList.remove("d-none");
                        warningText.innerText = "Please login/register to start game";
                        setTimeout(() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("username");
                            localStorage.removeItem("userId");
                            window.location.href = currentUrl + "/login.html";
                        }, 2000);
                    }
                }
                else if (responseStatus == 404) {
                    warningCard.classList.remove("d-none");
                    warningText.innerText = responseData.message;
                    localStorage.removeItem("token");
                    localStorage.removeItem("username");
                    localStorage.removeItem("userId");
                    setTimeout(() => {
                        window.location.href = currentUrl + "/login.html";
                    }, 2000);
                }
                else {
                    warningCard.classList.remove("d-none");
                    warningText.innerText = responseData.message;
                }
            };

            fetchMethod(currentUrl + '/api/games/' + user_id, callbackForPost, "POST", null, token = getToken);
        }
    });
});
