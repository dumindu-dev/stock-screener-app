export const config = {
    apiUrl : "http://localhost:3000/api",
    asgardeoConfig:{
        signInRedirectURL: "http://localhost:8080/auth/",
        signOutRedirectURL: "http://localhost:8080",
        clientID: "DOXfRsMgXVq6QTF0BiHrfPN6Ucsa",
        baseUrl: "https://api.asgardeo.io/t/purplewave",
        scope: [ "openid","profile","email"],
        resourceServerURLs:["http://localhost:3000/api"]
    },
    authHeaderKey:"x-jwt-assertion",
    authHeaderValuePrefix:""
};