import {config} from "./config.js";

let auth = AsgardeoAuth.AsgardeoSPAClient.getInstance();

auth.initialize(config.asgardeoConfig);
auth.signIn();

window.callBackendApi = function async (path, data){
    const requestConfig = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: "POST",
        url: config.apiUrl + path,
        data:data
    };
    return auth.httpRequest(requestConfig);
}

setInterval(async ()=>{
    await auth.refreshAccessToken();
},1000*60*3);