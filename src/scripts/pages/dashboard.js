function calendarTableRow(date,title,indicator,comment,importance){
    const importanceLevel = {
        "-1":"⭐",
        "0":"⭐⭐",
        "1":"⭐⭐⭐"
    };

    return (`
    <tr>
        <td>${date.split('T')[0]}</td>
        <td>${title}</td>
        <td>${indicator}</td>
        <td>${comment}</td>
        <td>${importanceLevel[importance]}</td>
    </tr>
    `);
}

document.addEventListener('DOMContentLoaded', function() {
    let viewPerformance = document.getElementById("view-performance");
    let viewName = document.getElementById("view-name");
    let dividendYield = document.getElementById("dividend-yield");
    let dividendCompany = document.getElementById("dividend-company");
    let calendarBody = document.getElementById("calendar-body");

    window.callBackendApi("/dividends/getHighestDividendYield",{}).then(function(response){
        console.log(response);
        
        let defaultYield = "N/A";
        let defaultCompany = "No upcoming dividends";

        if(response.data.length > 0){
            defaultYield = response.data[0].dividendYield;
            defaultCompany = response.data[0].company;
        }

        dividendYield.innerHTML = defaultYield;
        dividendCompany.innerHTML = defaultCompany;
    });

    window.callBackendApi("/views/bestPerformingView",{}).then(function(response){
        console.log(response);
        
        let defaultPerf = "No views found";
        let defaultView = "<a href='/views'>Create</a> your first view";

        if(response.data.length > 0){
            defaultPerf = response.data[0].performance;
            defaultView = response.data[0].view_name;
        }

        viewPerformance.innerHTML = defaultPerf;
        viewName.innerHTML = defaultView;
    });
    window.callBackendApi("/economicEvents/getMarketEvents",{}).then(function(response){
        console.log(response);
        if(response.data.length == 0){
            calendarBody.innerHTML = "No upcoming economic events";
        }else{
            calendarBody.innerHTML = "";
            response.data.forEach(element => {
                Object.keys(element.events).forEach(eKey =>{
                    const event = element.events[eKey];
                    calendarBody.innerHTML += calendarTableRow(element.date,event["title"],event["indicator"],event["comment"],event["importance"])
                });
            });
        }
    });
});