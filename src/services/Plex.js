class Plex {
    fetch = async ({ url, method, headers, body }) => {
        try {
            const req = await fetch(url, {
                method,
                headers,
                body
            });
            return req.json();
        } catch (error) {
            return error;
        }
    }
    generateCode = async () => {
        try {

            const fetchConfig = {
                url: "https://plex.tv/api/v2/pins?strong=true",
                method: "POST",
                headers: {
                    'X-Plex-Client-Identifier': "pitunti",
                    accept: "application/json",
                    'Content-Type': 'application/json',
                    "X-Plex-Product": "PlexPanel",
                },
            };
            const { code, id } = await this.fetch(fetchConfig);
            return {
                code,
                id
            }
        } catch (error) {
            return error;
        }
    }

    login = async () => {
        return new Promise(async (resolve, reject) => {
            const { code, id } = await this.generateCode();
            const urlToLogin = `https://app.plex.tv/auth/#?clientID=pitunti&code=${code}`;
            window.open(urlToLogin, "_blank");
            let count = 0;
            const insterval = setInterval(() => {

                this.getToken(id).then((data) => {
                    const { authToken } = data;
                    count++;
                    if (!authToken && count > 20) {
                        //Return Error
                        clearInterval(insterval);
                        reject("Timeout");
                    }
                    if (authToken) {
                        //Return Token
                        clearInterval(insterval);
                        resolve(authToken);
                    }
                })
            }, 3000)

        });

    }


    getToken = async (id) => {
        try {
            const url = `https://plex.tv/api/v2/pins/${id}.json?X-Plex-Client-Identifier=pitunti`;
            const data = {
                method: "GET",
                headers: {
                    accept: "application/json",
                    'Content-Type': 'application/json',
                    "X-Plex-Product": "PlexPanel",
                },
            };
            const resp = await fetch(url, data)
            const dataResp = await resp.json();
            return dataResp;
        } catch (error) {
            return error;
        }
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