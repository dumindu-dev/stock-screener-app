document.addEventListener('DOMContentLoaded', function() {
    let telegramConnectedMessage = document.getElementById("telegram-connected-message");
    let telegramNotConnectedMessage = document.getElementById("telegram-not-connected-message");
    let loadingImage = document.getElementById("loading-image");
    let disconnectBtn = document.getElementById("disconnect-btn");
    let telegramToken = document.getElementById("telegramToken");

    window.callBackendApi("/users/getUserSettings",{}).then(function(response){
        console.log(response);
        loadingImage.style.display = "none";
        if(!response.data.isTelegramConnected){
            telegramNotConnectedMessage.style.display = "block";
            window.callBackendApi("/users/getTelegramToken",{}).then(function(response){
                console.log(response);
                telegramToken.innerHTML = "tk"+response.data.telegramToken;
            });
        }else{
            telegramConnectedMessage.style.display = "block";
        }
    });

    disconnectBtn.addEventListener("click", function(event){
        window.callBackendApi("/users/disconnectTelegram",{}).then(function(response){
            console.log(response);
            if(response.data.success){
                window.location.reload();
            }else{
                alert("Unknown error occured");
            }
        });
    });
});