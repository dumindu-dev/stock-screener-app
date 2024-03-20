export const config = {
    apiUrl : "http://localhost:3000/api",
    asgardeoConfig:{
        signInRedirectURL: "http://localhost:5500/auth.html",
        signOutRedirectURL: "http://localhost:5500/index.html",
        clientID: "DOXfRsMgXVq6QTF0BiHrfPN6Ucsa",
        baseUrl: "https://api.asgardeo.io/t/purplewave",
        scope: [ "openid","profile","email"]
    },
    authHeaderKey:"x-jwt-assertion",
    authHeaderValuePrefix:""
};