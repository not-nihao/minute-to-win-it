const game_id = localStorage.getItem("gameId");
const deleteButton = document.getElementById("deleteButton");

deleteButton.addEventListener("click", function () {
    callbackForDelete = (responseStatus, responseData) => {
        console.log(responseStatus);
        console.log(responseData);
        if (responseStatus == 204) {
            localStorage.removeItem("gameId");
            localStorage.removeItem("heroId");
            window.location.href = currentUrl + "/index.html";
    };
    };
    fetchMethod(currentUrl + '/api/games/' + game_id, callbackForDelete, 'DELETE', null, null);
});