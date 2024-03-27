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

function dropdownItem({longName,symbol,currentPrice}){
    const dataAttributes = `sName="${longName}" sPrice="${currentPrice}" sSymbol="${symbol}"`;
    return (`<a href="#" class="dropdown-item" ${dataAttributes}>${longName} (${symbol})</a>`);
}

function viewCard({view_id, view_name, view_description, stocks, performance}){
    const taglist = stocks.map(function(stock){
        return stockTag(stock);
    }).join("");

    const performanceRange = performance.startsWith("-") ? "has-text-danger" :"has-text-success";

    return (`
    <div class="column is-one-third">
        <div class="box">
            <a class="title is-3" href="/view/?view_id=${view_id}">${view_name}</a>
            <p class="is-6">${view_description}</p>
            <p class="m-2">
                ${taglist}
            </p>
            <p class="${performanceRange}">Performance: ${performance}</p>
        </div>
    </div>
    `);
}

document.addEventListener('DOMContentLoaded', function() {
    let viewContainer = document.getElementById("viewContainer");
    let lastPriceUpdate = document.getElementById("lastPriceUpdate");
    let stockSearchBox = document.getElementById("stockSearchBox");
    let dropdown = document.getElementById("dropdown");
    let dropdownContent = document.getElementById("dropdownContent");
    let stockTableBody = document.getElementById("stock-table-body");
    let saveViewBtn = document.getElementById("saveViewBtn");
    let viewName = document.getElementById("view-name");
    let viewDescription = document.getElementById("view-description");

    let newViewStocks = [];

    window.callBackendApi("/views/getAll",{}).then(function(response){
        console.log(response);
        let viewCardContent = response.data.map(((stock)=>viewCard(stock)));
        viewContainer.innerHTML = viewCardContent.join("");
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
                stockTableBody.innerHTML += tableRow(stockSymbol,stockName,stockPrice);
            }
        }
    });

    stockTableBody.addEventListener("click", function(event){
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
            window.callBackendApi("/views/createView",{name:viewName.value, description:viewDescription.value,stocks:newViewStocks}).then(function(response){
                console.log(response);
                window.location.reload();
            }).catch(function(e){
                saveViewBtn.classList.remove("is-loading");
                alert("Error creating the view. Try again. "+ e)
            });
        }
    });
});