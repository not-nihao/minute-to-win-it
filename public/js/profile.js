const user_id = localStorage.getItem("userId");
const getToken = localStorage.getItem("token");
const username = document.getElementById("username");
const email = document.getElementById("email");
const nameChange = document.getElementById("nameChange");
const emailChange = document.getElementById("emailChange");
const cancelBtn = document.getElementById("cancelBtn");
const saveBtn = document.getElementById("saveBtn");
const pwdChange = document.getElementById("pwdChange");
const pwdModal = document.getElementById("pwdModal");
const deleteBtn = document.getElementById("deleteBtn");
const warningCard = document.getElementById("warningCard");
const warningText = document.getElementById("warningText");
const successCard = document.getElementById("successCard");
const successText = document.getElementById("successText");
const saveModal = document.getElementById("saveModal");
const oldPwd = document.getElementById("oldPwd");
const newPwd = document.getElementById("newPwd");
const confirmPwd = document.getElementById("confirmPwd");
const pwdConfirm = document.getElementById("pwdConfirm");
const deleteModal = document.getElementById("deleteModal");
const deleteModalBtn = document.getElementById("deleteModalBtn");

document.addEventListener("DOMContentLoaded", function (event) {
    event.preventDefault();

    if (!(user_id && getToken)) {
        window.location.href = currentUrl + "/login.html";
    }
    else {
        const callbackForGet = (responseStatus, responseData) => {
            console.log(responseStatus);
            console.log(responseData);
            if (responseStatus == 200) {
                if (warningCard.classList.contains("d-none") == false) {
                    warningCard.classList.add("d-none");
                }

                const username = document.getElementById("username");
                const email = document.getElementById("email");
                username.value = responseData.username;
                email.value = responseData.email;
            }
            else if (responseStatus == 401) {
                warningCard.classList.remove("d-none");
                warningText.innerText = "Unauthorized access, please login again";
                setTimeout(() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("username");
                    localStorage.removeItem("userId");
                    window.location.href = currentUrl + "/login.html";
                }, 2000);
            }
            else if (responseStatus == 404) {
                warningCard.classList.remove("d-none");
                warningText.innerText = "User not found";
                setTimeout(() => {
                    window.location.href = currentUrl + "/login.html";
                }, 2000);
            }
            else {
                warningCard.classList.remove("d-none");
                warningText.innerText = responseData.message;
            }
        };

        fetchMethod(currentUrl + '/api/users/' + user_id, callbackForGet, "GET", null, token = getToken);
    }
});

nameChange.addEventListener("click", function () {
    username.disabled = false;
    nameChange.classList.add("d-none");
    pwdChange.classList.add("d-none");
    deleteBtn.classList.add("d-none")
    saveBtn.classList.remove("d-none")
    cancelBtn.classList.remove("d-none")
});


emailChange.addEventListener("click", function () {
    email.disabled = false;
    emailChange.classList.add("d-none");
    pwdChange.classList.add("d-none");
    deleteBtn.classList.add("d-none")
    saveBtn.classList.remove("d-none")
    cancelBtn.classList.remove("d-none")
});


cancelBtn.addEventListener("click", function () {
    window.location.reload();
});

saveBtn.addEventListener("click", function () {
    const callbackForPut = (responseStatus, responseData) => {
        console.log(responseStatus);
        console.log(responseData);
        if (responseStatus == 200) {
            if (warningCard.classList.contains("d-none") == false) {
                warningCard.classList.add("d-none");
            }
            // window.location.reload();
        }
        else if (responseStatus == 401) {
            warningCard.classList.remove("d-none");
            warningText.innerText = "Unauthorized access, please login again";
            setTimeout(() => {
                localStorage.removeItem("token");
                localStorage.removeItem("username");
                localStorage.removeItem("userId");
                window.location.href = currentUrl + "/login.html";
            }, 2000);
        }
        else {
            warningCard.classList.remove("d-none");
            warningText.innerText = responseData.message;
        }
    };

    if (nameChange.classList.contains("d-none") == true) {
        const data = {
            username: username.value
        }
        fetchMethod(currentUrl + '/api/users/username/' + user_id, callbackForPut, 'PUT', data, token = getToken);
    }
    else if (emailChange.classList.contains("d-none") == true) {
        const data = {
            email: email.value
        }
        fetchMethod(currentUrl + '/api/users/email/' + user_id, callbackForPut, 'PUT', data, token = getToken);
    }
});

// save button within the change password modal
saveModal.addEventListener("click", function () {
    const callbackForPut = (responseStatus, responseData) => {
        console.log(responseStatus);
        console.log(responseData);
        if (responseStatus == 200) {
            if (warningCard.classList.contains("d-none") == false) {
                warningCard.classList.add("d-none");
            }
            pwdModal.hidden = true;
            successCard.classList.remove("d-none");
            successText.innerText = "Password changed successfully";
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
        else if (responseStatus == 401) {
            if (responseData.message == "Wrong password") {
                pwdModal.hidden = true;
                warningCard.classList.remove("d-none");
                warningText.innerText = "Wrong password, please try again";
                setTimeout(() => {
                    window.location.reload();
                }, 1000);

            }
            else {
                warningCard.classList.remove("d-none");
                warningText.innerText = "wrong password, please try again";
                setTimeout(() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("username");
                    localStorage.removeItem("userId");
                    window.location.href = currentUrl + "/login.html";
                }, 2000);
            }
        }
        else {
            warningCard.classList.remove("d-none");
            warningText.innerText = responseData.message;
        }
    };

    if (newPwd.value == confirmPwd.value) {
        const data = {
            password: oldPwd.value,
            new_password: newPwd.value
        }
        fetchMethod(currentUrl + '/api/users/password/' + user_id, callbackForPut, 'PUT', data, token = getToken);
    }
    else {
        pwdModal.hidden = true;
        warningCard.classList.remove("d-none");
        warningText.innerText = "New password and confirm password are different";
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }
});

deleteModalBtn.addEventListener("click", function () {
    const callbackForDelete = (responseStatus, responseData) => {
        console.log(responseStatus);
        console.log(responseData);
        if (responseStatus == 204) {
            if (warningCard.classList.contains("d-none") == false) {
                warningCard.classList.add("d-none");
                successCard.classList.remove("d-none");
                successText.innerText = "Account deleted successfully";
            }
            setTimeout(() => {
                localStorage.removeItem("token");
                localStorage.removeItem("username");
                localStorage.removeItem("userId");
                window.location.href = currentUrl + "/register.html";
            }, 2000);
        }
        else if (responseStatus == 401) {
            if (responseData.message == "Wrong password") {
                deleteModal.hidden = true;
                warningCard.classList.remove("d-none");
                warningText.innerText = "Wrong password, please try again";
                setTimeout(() => {
                    window.location.reload();
                }, 1000);

            }
            else {
                deleteModal.hidden = true;
                warningCard.classList.remove("d-none");
                warningText.innerText = "Unauthorized access, please login again";
                setTimeout(() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("username");
                    localStorage.removeItem("userId");
                    window.location.href = currentUrl + "/login.html";
                }, 2000);
            }
        }
        else {
            warningCard.classList.remove("d-none");
            warningText.innerText = responseData.message;
        }
    };
    const data = {
        password: pwdConfirm.value
    }
    fetchMethod(currentUrl + '/api/users/' + user_id, callbackForDelete, 'DELETE', data, token = getToken);

});