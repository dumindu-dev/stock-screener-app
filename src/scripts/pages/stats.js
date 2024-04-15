function isNumeric(num){
	num = "" + num;
	return !isNaN(num) && !isNaN(parseFloat(num));
}

document.addEventListener('DOMContentLoaded', function() {
    let footerStat = document.getElementById("footer-stat");

    window.callBackendApi("/site/getActiveUserCount",{}).then(function(response){
        const userCount = response.data;
        if(isNumeric(userCount)){
            footerStat.innerHTML = "Active users: "+userCount;
        }
    });

});