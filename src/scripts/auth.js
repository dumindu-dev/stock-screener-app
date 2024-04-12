function authenticateUser(auth,noticeBanner){
    /*auth.getAccessToken().then((accessToken)=>{
        let authHeader = {};
        authHeader[config.authHeaderKey] = config.authHeaderValuePrefix+accessToken;

        axios.get(config.apiUrl + "/auth/authenticate", {
            headers: authHeader
        }).then((response) => {
            console.log(response);
            if(response.data.success === 1){
                noticeBanner.innerHTML = "Redirecting to the dashboard";
                window.location = "/dashboard";
            }else{
                alert("Invalid response from the server. Please refresh this page");
            }
        },(e) => {
            alert("Something went wrong. Please refresh this page");
        });
    });*/
    window.callBackendApi("/auth/authenticate",{}).then(function(response){
        console.log(response);
        if(response.data.success === 1){
            noticeBanner.innerHTML = "Redirecting to the dashboard";
            window.location = "/dashboard";
        }else{
            alert("Invalid response from the server. Please refresh this page");
        }
    },(e) => {
        console.log(e);
        //alert("Something went wrong. Please refresh this page: ");
    });
}

document.addEventListener('DOMContentLoaded', function() {
    let auth = AsgardeoAuth.AsgardeoSPAClient.getInstance();
    let noticeBanner = document.getElementById("notice");

    //auth.initialize(config.asgardeoConfig);
    //auth.signIn();
    noticeBanner.innerHTML = "Authenticating the user";


    auth.on("sign-in", (response) => {
        authenticateUser(auth,noticeBanner);
    });

    /*document.getElementById("signout").addEventListener("click", function(ev){
        auth.signOut();
    });*/

    const waitTillAuth = new Promise(function (resolve, reject) {
        (function wait(){
            if (auth.isAuthenticated()) return resolve();
            console.log("waiting");
            setTimeout(wait, 5000);
        })();
    });
    waitTillAuth.then(function(){
        authenticateUser(auth,noticeBanner);
    });

    setTimeout(()=>{
        alert("Oops! It seems like the redirect is taking longer than expected. Please wait a moment or refresh the page");
    }, 15000);

});