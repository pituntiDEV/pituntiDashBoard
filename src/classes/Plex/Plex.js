import PlexApi from "./PlexApi";

class Plex extends PlexApi {
    constructor() {
        super();
    }

    login = () => {
        return new Promise(async (resolve, reject) => {
            const data = await this.getCode();
            const urlToLogin = `https://app.plex.tv/auth/#?clientID=pitunti&code=${data.code}`;
            window.open(urlToLogin, "_blank");
            let count = 0;
            const insterval = setInterval(() => {
                this.getToken(data.id).then((data) => {
                    const { authToken } = data;
                    count++;
                    if (!authToken && count > 10 ) {
                        //Return Error
                        clearInterval(insterval);
                        reject("Algo salio mal");
                    }
                    if(authToken) {
                        //Return Token
                        clearInterval(insterval);	
                        resolve(authToken);
                    }
                })
            }, 3000)

        });

    }
    getAccount = (token) => {
        return new Promise(async (resolve, reject) => {
            const url = `https://plex.tv/users/account.json?X-Plex-Token=${token}&X-Plex-Client-Identifier=pitunti`
            const data = {
                method: "GET",
                headers: {
                    accept: "application/json",
                    'Content-Type': 'application/json',
                    "X-Plex-Product": "PlexPanel",
                },
            };
           try {
                const resp = await fetch(url, data);
                const dataResp = await resp.json();
                resolve(dataResp);
           } catch (error) {
                reject(error);
           }
        });
    }
}

export default Plex;