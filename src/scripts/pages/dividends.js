function stockTableRow({
    xddate,
    symbol,
    company,
    amount,
    currentPrice,
    dividendYield
}){
    return (`
    <tr>
        <td>${symbol}</td>
        <td>${company}</td>
        <td>${currentPrice}</td>
        <td>${amount}</td>
        <td>${dividendYield}</td>
        <td>${xddate}</td>
    </tr>
    `);
}

document.addEventListener('DOMContentLoaded', function() {
    let alertSettingsBtn = document.getElementById("alert-settings-btn");
    let stockTableBody = document.getElementById("stock-table-body");
    let telegramCheckbox = document.getElementById("telegram-checkbox");
    let dividendSetting = document.getElementById("dividend-setting");
    let telegramWarning = document.getElementById("telegram-warning");
    let saveSettingsButton = document.getElementById("saveSettingsButton");

    let isDividendAlertsEnabled = false;

    window.callBackendApi("/dividends/getNextWeekDividends",{}).then(function(response){
        console.log(response);
        if(response.data.length > 0){
            let tableContent = "";
            response.data.forEach(dividendItem => {
                tableContent+=stockTableRow(dividendItem);
                //console.log(dividendItem);
            });
            stockTableBody.innerHTML = tableContent;
        }else{
            stockTableBody.innerHTML = "No upcoming dividend payments";
        }
    });

    window.callBackendApi("/users/getUserSettings",{}).then(function(response){
        console.log(response);
        if(response.data.isTelegramConnected){
            telegramWarning.style.display = "none";
            dividendSetting.style.display = "block";
        }

        if(response.data.isDividendNotifsEnabled){
            telegramCheckbox.checked = true;
            isDividendAlertsEnabled =true;
        }
    });
    
    saveSettingsButton.addEventListener("click", function(event){
        saveSettingsButton.classList.add("is-loading");
        isDividendAlertsEnabled = telegramCheckbox.checked;

        window.callBackendApi("/users/updateDividendAlertSetting",{isDividendAlertsEnabled:isDividendAlertsEnabled}).then(function(response){
            console.log(response);
            if(response.data.success){
                saveSettingsButton.closest(".modal").classList.remove("is-active");
                saveSettingsButton.classList.remove("is-loading");
            }else{
                alert("Unknown error occured.")
            }
        });

    });
});