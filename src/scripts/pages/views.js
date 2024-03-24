function stockTag(name){
    return (`<span class="tag is-light">${name}</span>`);
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

    window.callBackendApi("/views/getAll",{}).then(function(response){
        console.log(response);
        let viewCardContent = response.data.map(((stock)=>viewCard(stock)));
        viewContainer.innerHTML = viewCardContent.join("");
    });
    window.callBackendApi("/site/getLastPriceUpdateTime",{}).then(function(response){
        lastPriceUpdate.innerHTML =  response.data.lastPriceUpdate;
    });
});