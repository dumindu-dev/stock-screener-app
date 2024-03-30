function stockTag(name){
    return (`<span class="tag is-light m-1">${name}</span>`);
}

function tableRow(symbol,name,price){
    return (`
    <tr>
        <td>${symbol}</td>
        <td>${name}</td>
        <td>${price}</td>
        <td class="remove-row" sSymbol="${symbol}">remove</td>
    </tr>
    `);
}

function MainTableRow({symbol,longName,currentPrice,previousClose,change},yearchange){
    return (`
    <tr>
        <td>${symbol}</td>
        <td>${longName}</td>
        <td>${currentPrice}</td>
        <td>${previousClose}</td>
        <td>${change.toFixed(2)}%</td>
        <td>${yearchange}</td>
    </tr>
    `);
}



function dropdownItem({longName,symbol,currentPrice}){
    const dataAttributes = `sName="${longName}" sPrice="${currentPrice}" sSymbol="${symbol}"`;
    return (`<a href="#" class="dropdown-item" ${dataAttributes}>${longName} (${symbol})</a>`);
}

document.addEventListener('DOMContentLoaded', function() {
    let lastPriceUpdate = document.getElementById("lastPriceUpdate");
    let stockSearchBox = document.getElementById("stockSearchBox");
    let dropdown = document.getElementById("dropdown");
    let dropdownContent = document.getElementById("dropdownContent");
    let stockTableBody = document.getElementById("stock-table-body");
    let stockModalTableBody = document.getElementById("stock-modal-table-body");
    let saveViewBtn = document.getElementById("saveViewBtn");
    let deleteViewBtn = document.getElementById("delete-view-btn");
    let viewName = document.getElementById("view-name");
    let viewDescription = document.getElementById("view-description");

    let newViewStocks = [];

    let currentUrl = new URL(window.location.href);
    let view_id=currentUrl.searchParams.get("view_id");

    window.callBackendApi("/views/getSingleView",{view_id:view_id}).then(function(response){
        console.log(response);
        if(response.data){
            document.title = response.data.view_name + " | View";
            document.getElementById("page-hero-title").innerHTML = response.data.view_name;
            document.getElementById("view-description-wall").innerHTML = response.data.view_description;
            document.getElementById("overall-performance").innerHTML = response.data.performance;

            viewName.value = response.data.view_name;
            viewDescription.value = response.data.view_description;

            response.data.result.forEach(stockItem => {
                console.log(stockItem);
                stockTableBody.innerHTML += MainTableRow(stockItem, stockItem["52WeekChange"]);

                stockModalTableBody.innerHTML += tableRow(stockItem.symbol,stockItem.longName,stockItem.currentPrice);
                newViewStocks.push(stockItem.symbol);
            });

        }else{
            alert("Something went wrong. Please refresh this page.");
        }
    });

    window.callBackendApi("/site/getLastPriceUpdateTime",{}).then(function(response){
        lastPriceUpdate.innerHTML =  response.data.lastPriceUpdate;
    });

    stockSearchBox.addEventListener("keyup", function(event){
        dropdown.classList.add("is-active");
        if(stockSearchBox.value && stockSearchBox.value.length >= 3){
            dropdownContent.innerHTML = "searching...";
            window.callBackendApi("/stock/searchByCompanyName",{searchQuery:stockSearchBox.value}).then(function(response){
                console.log(response);
                if(response.data.length > 0){
                    dropdownContent.innerHTML = response.data.map((item) => dropdownItem(item)).join("");
                }else{
                    dropdownContent.innerHTML = "No stocks found";
                }
            });
        }else{
            dropdownContent.innerHTML = "Type 3 or more letters for suggestions";
        }
    });

    document.addEventListener("click", function(event){
        dropdown.classList.remove("is-active");
    });
    dropdownContent.addEventListener("click", function(event){
        event.preventDefault();
        if (event.target.classList.contains('dropdown-item')) {
            let clickedItem = event.target;

            let stockName = clickedItem.getAttribute("sName");
            let stockSymbol = clickedItem.getAttribute("sSymbol");
            let stockPrice = clickedItem.getAttribute("sPrice");

            if(newViewStocks.includes(stockSymbol)){
                alert(stockSymbol + " is added already.")
            }else{
                newViewStocks.push(stockSymbol);
                stockModalTableBody.innerHTML += tableRow(stockSymbol,stockName,stockPrice);
            }
        }
    });

    stockModalTableBody.addEventListener("click", function(event){
        if (event.target.classList.contains('remove-row')) {
            event.stopPropagation();
            let stockSymbol = event.target.getAttribute("sSymbol");
            newViewStocks = newViewStocks.filter(stock => stock !== stockSymbol);
            event.target.parentNode.remove();
        }
    });

    saveViewBtn.addEventListener("click",function(event){
        event.preventDefault();
        let addView = true;
        
        if(!viewName.value){
            alert("View name is mandotory.");
            addView= false;
        }
        if(newViewStocks.length == 0){
            alert("You should add atleast one stock to the view.");
            addView= false;
        }
        
        if(addView){
            saveViewBtn.classList.add("is-loading");
            window.callBackendApi("/views/updateView",{view_id:view_id,name:viewName.value, description:viewDescription.value,stocks:newViewStocks}).then(function(response){
                console.log(response);
                window.location.reload();
            }).catch(function(e){
                saveViewBtn.classList.remove("is-loading");
                alert("Error updating the view. Try again. "+ e)
            });
        }
    });

    deleteViewBtn.addEventListener("click",function(event){
        deleteViewBtn.classList.add("is-loading");
        window.callBackendApi("/views/deleteView",{view_id:view_id}).then(function(response){
            console.log(response);
            window.location="/views";
        }).catch(function(e){
            deleteViewBtn.classList.remove("is-loading");
            alert("Error deleting the view. Try again. "+ e)
        });
    });
});