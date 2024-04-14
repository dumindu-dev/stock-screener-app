import {parameterConfig} from "./parameters.config.js";

function td(item){
    return (`<td>${item}</td>`);
}
function tr(item){
    return (`<tr>${item}</tr>`);
}

document.addEventListener('DOMContentLoaded', function() {
    let tableBody = document.getElementById("table-body");

    for (const property in parameterConfig) {
        const singleParameter = parameterConfig[property];
        let trContent = "";
        trContent+= td(property);
        trContent+= td(singleParameter['type'] == 'int'?'whole number':'decimal number');
        trContent+= td(singleParameter['min']);
        trContent+= td(singleParameter['max']);
        trContent+= td(singleParameter['description']);

        tableBody.innerHTML += tr(trContent);
    }
});