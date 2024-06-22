document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
      if (responseStatus == 200) {
        // Check if login was successful
        if (responseData.token) {
          if (!(warningCard.classList.contains("d-none"))){
          warningCard.classList.add("d-none");
          }
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
  
    const loginForm = document.getElementById("loginForm");
    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");
    // const pwd = document.getElementById("password");
  
    // Rest of the code will be added here
    loginForm.addEventListener("submit", function (event) {
        console.log("loginForm.addEventListener");
        event.preventDefault();
    
        // Rest of the code will be added here
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const data = {
            email: email,
            password: password
          };
         // Perform login request
        fetchMethod(currentUrl + "/api/login", callback, "POST", data);

        // Reset the form fields
        loginForm.reset();
      });
      
    const referrerUrl = document.referrer;
        if (warningCard.classList.contains("d-none") == false) {
          warningCard.classList.add("d-none");
          }
        if (referrerUrl === "http://localhost:3000/profile.html") {
            warningCard.classList.remove("d-none");
            warningText.innerText = "Unauthorized access";
            setTimeout(() => {
                warningCard.classList.add("d-none");
            }, 3000);
        }

  });