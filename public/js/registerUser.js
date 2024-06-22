document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");
    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");
    const pwdGenBtn = document.getElementById("pwdGenBtn");

    // Rest of the code will be added here
    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Rest of the code will be added here
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        // Perform signup logic
        if (password === confirmPassword) {
            // Passwords match, proceed with signup
            console.log(`Signup successful`, `Username: ${username}`, `Email: ${email}`, `Password: ${password}` );
      warningCard.classList.add("d-none");

      const data = {
        username: username,
        email: email,
        password: password,
      };

      const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        if (responseStatus == 200) {
          // Check if signup was successful
          if (responseData.token) {
            // Store the token in local storage
            localStorage.setItem("token", responseData.token);
            localStorage.setItem("userId", responseData.userId);
            localStorage.setItem("username", responseData.username);
            // Redirect or perform further actions for logged-in user
            window.location.href = "index.html";
          }
        } else {
          warningCard.classList.remove("d-none");
          warningText.innerText = responseData.message;
        }
      };

      // Perform signup request
      fetchMethod(currentUrl + "/api/register", callback, "POST", data);

      // Reset the form fields
      signupForm.reset();
            // Rest of the code will be added here
        } else {
            // Passwords do not match, handle error
            warningCard.classList.remove("d-none");
            warningText.innerText = "Passwords do not match";
        }
    });
    
    pwdGenBtn.addEventListener("click", function (event) {
        event.preventDefault();
        const password = document.getElementById("password");
        const confirmPassword = document.getElementById("confirmPassword");

       const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        if (responseStatus == 200) {
          
          password.value = responseData.password;
          confirmPassword.value = responseData.password;
          password.type = "text";
          confirmPassword.type = "text";
        }
        else {
          warningCard.classList.remove("d-none");
          warningText.innerText = responseData.message;
        }
      }
      fetchMethod('https://www.psswrd.net/api/v1/password/', callback, "GET")

    });

    const successCard = document.getElementById("successCard");
    const successText = document.getElementById("successText");
    const referrerUrl = document.referrer;
        if (successCard.classList.contains("d-none") == false) {
          successCard.classList.add("d-none");
          }
        if (referrerUrl === "http://localhost:3000/profile.html") {
            successCard.classList.remove("d-none");
            successText.innerText = "Account deleted successfully";
            setTimeout(() => {
                successCard.classList.add("d-none");
            }, 3000);
        }
    
});