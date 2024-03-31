function filterParamTag(name){
    return (`<span class="tag is-light m-1">${name}</span>`);
}

function filterCard({filter_id, filter_name, filter_description, conditions}){
    const taglist = conditions.map(function(prm){
        return filterParamTag(prm.name);
    }).join("");

    return (`
    <div class="column is-one-third">
        <div class="box">
            <a class="title is-3" href="/filter/?filter_id=${filter_id}">${filter_name}</a>
            <p class="is-6">${filter_description}</p>
            <p class="m-2">
                ${taglist}
            </p>
        </div>
    </div>
    `);
}

document.addEventListener('DOMContentLoaded', function() {
    let filterContainer = document.getElementById("filterContainer");

    window.callBackendApi("/filters/getAll",{}).then(function(response){
        console.log(response);
        let filterCardContent = response.data.map(((filter)=>filterCard(filter)));
        filterContainer.innerHTML = filterCardContent.join("");
    });

});