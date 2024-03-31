import {filterkeys} from "./filterkeys.config.js";

function dropdownItem(item){
    const dataAttributes = `paramName="${item}"`;
    return (`<a href="#" class="dropdown-item" ${dataAttributes}>${item}</a>`);
}


function paramConditionElement(id, paramName){
    return (`
    <div class="field is-horizontal" id="param-${id}">
        <div class="field-body">
            <div class="field">
                <p class="control is-expanded">
                    <input class="input paramkey" type="text" placeholder="Parameter" value="${paramName}" disabled/>
                </p>
            </div>
            <div class="field">
                <div class="control is-expanded">
                    <div class="select is-fullwidth">
                        <select class="paramExpr">
                            <option value="gt">Greater than</option>
                            <option value="lt">Less than</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="field">
                <p class="control is-expanded">
                    <input class="input paramVal" type="number" placeholder="Value" value="0">
                </p>
            </div>
            <button class="delete is-large" paramId="${id}"></button>
        </div>
    </div>
    `);
}

function readFilterParameters(paramIds,conditionContainer){
    let returnObject = [];

    paramIds.forEach(paramId =>{
        let paramElement = conditionContainer.querySelector("#param-"+paramId);

        if(paramElement){
            let paramNameElement = paramElement.querySelector("input[type='text']");
            let paramComparisonElement = paramElement.querySelector("select");
            let paramValueElement = paramElement.querySelector("input[type='number']");

            //console.log(paramNameElement.value,paramComparisonElement.value,paramValueElement.value);
            returnObject.push({
                name:paramNameElement.value,
                condition:paramComparisonElement.value,
                value:paramValueElement.value
            });
        }
    });

    return returnObject;
}

function tableHead(paramName){
    return (`<th>${paramName}</th>`);
}

function paginationLink(number, isCurrent){
    return (`
    <li>
        <a class="pagination-link${isCurrent?' is-current':''}">${number}</a>
    </li>
    `);
}

function processResultResponse(response,resultTable,paginationItems){
    if(response.data.result.length>0){
        let headerList = "";
        response.data.parameters.forEach(item=>{
            headerList += tableHead(item);
        });
        resultTable.querySelector('thead').innerHTML = headerList;

        let bodyRowList = "";
        response.data.result.forEach(item=>{
            let dataList = "";
            response.data.parameters.forEach(title=>{
                dataList += `<td>${item[title]}</td>`;
            });
            bodyRowList += `<tr>${dataList}</tr>`;
        });
        resultTable.querySelector('tbody').innerHTML = bodyRowList;

        const numberOfPages = Math.ceil(response.data.total/response.data.perPage);
        for(let i=1;i<=numberOfPages;i++){
            paginationItems.innerHTML+=paginationLink(i,i == (response.data.currentPage+1));
        }
    }else{
        paginationItems.innerHTML = "No stocks found matching your criteria";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    let parameterSearchBox = document.getElementById("parameterSearchBox");
    let dropdown = document.getElementById("dropdown");
    let dropdownContent = document.getElementById("dropdownContent");
    let filterName = document.getElementById("filter-name");
    let filterDescription = document.getElementById("filter-description");
    let conditionContainer = document.getElementById("condition-container");
    let saveBtn = document.getElementById("save-btn");
    let searchBtn = document.getElementById("search-btn");
    let resultTable = document.getElementById("result-table");
    let paginationItems = document.getElementById("pagination-items");

    let paramIds = [];

    parameterSearchBox.addEventListener("keyup", function(event){
        dropdown.classList.add("is-active");
        dropdownContent.innerHTML = "searching...";

        let filteredKeys = "";

        filteredKeys = filterkeys.map((item) => {
            if(item.toLowerCase().match(parameterSearchBox.value.toLowerCase())){
                return dropdownItem(item);
            }
            return "";
        }).join("");

        if(filteredKeys){
            dropdownContent.innerHTML = filteredKeys;
        }else{
            dropdownContent.innerHTML = "No parameters found";
        }
    });

    document.addEventListener("click", function(event){
        dropdown.classList.remove("is-active");
    });

    dropdownContent.addEventListener("click", function(event){
        event.preventDefault();
        if (event.target.classList.contains('dropdown-item')) {
            let clickedItem = event.target;

            let paramName = clickedItem.getAttribute("paramName");
            let randomParamId = Math.floor(Math.random() * 100000000);
            conditionContainer.innerHTML += paramConditionElement(randomParamId,paramName);
            paramIds.push(randomParamId);
        }
    });

    function retriveStocks(pageN){
        if(paramIds.length!=0){
            searchBtn.classList.add("is-loading");
            let parameterList= readFilterParameters(paramIds,conditionContainer);
            console.log(parameterList);
            resultTable.querySelector('thead').innerHTML = "";
            resultTable.querySelector('tbody').innerHTML = "";
            paginationItems.innerHTML = "";

            window.callBackendApi("/filters/filterStocks",{filters:parameterList,page:pageN}).then(function(response){
                console.log(response);
                processResultResponse(response, resultTable,paginationItems);
                searchBtn.classList.remove("is-loading");
            }).catch(function(e){
                alert("Error filtering stocks. Try again. "+ e);
                searchBtn.classList.remove("is-loading");
            });
        }else{
            alert("Please add one or more conditions");
        }
    }

    searchBtn.addEventListener("click", function(event){
        retriveStocks(0);
    });

    saveBtn.addEventListener("click", function(event){
        let createFilter = true;
        if(paramIds.length ==0){
            createFilter = false;
            alert("Please add 1 or more conditions");
        }

        if(!filterName.value){
            createFilter = false;
            alert("Filter name can not be empty");
        }

        if(createFilter){
            saveBtn.classList.add("is-loading");
            let parameterList= readFilterParameters(paramIds,conditionContainer);
            console.log(parameterList);
            window.callBackendApi("/filters/saveFilter",{filters:parameterList,name:filterName.value,description:filterDescription.value}).then(function(response){
                window.location = "/filters"
            }).catch(function(e){
                alert("Error creating the filter. Try again. "+ e);
                saveBtn.classList.remove("is-loading");
            });
        }
    });

    conditionContainer.addEventListener("click",function(event){
        if (event.target.classList.contains('delete')) {
            const deletingId = event.target.getAttribute("paramId");
            paramIds = paramIds.filter(pId => pId != deletingId);
            conditionContainer.querySelector("#param-"+deletingId).remove();
        }
    });

    paginationItems.addEventListener("click",function(event){
        if (event.target.classList.contains('pagination-link')) {
            const clickedNumber = event.target.innerHTML;
            retriveStocks(Number(clickedNumber) -1);
        }
    });

});