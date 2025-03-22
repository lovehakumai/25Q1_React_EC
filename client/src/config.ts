interface Config{
    baseUrl: string
}

const checkConfig = (server:string)=> {
    let config;
    switch(server){
        case "production":
            config = {
                baseUrl: "https://ec-review.vercel.app",
            };
            break;
        case "local":
            config = {
                baseUrl: "http://localhost:8000",
            };
            break;
        default:
            break;
    };
    return config;
}

const selectServer = 'production';
export const config = checkConfig(selectServer) as Config;