
import SWAlert from "../../components/SwAlert/SWAlert";
import useFetchApi from "../../hook/useFetchApi"

class Api {
    constructor() {

    }

    request = ({ url, method = "POST", body } = {}) => {
        return new Promise(async (resolve, reject) => {
            try {
                const api_URL = process.env.REACT_APP_API_URL;
                const request = await fetch(`${api_URL}${url}`, {
                    method,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "access-token": localStorage.getItem("access-token")
                    },
                    body
                });
                const data = await request.json();
                resolve(data);
            } catch (error) {
                reject(error);
            }
        })
    }

    newServer = (server) => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await this.request({
                    url: "/api/server/plex",
                    method: "POST",
                    body: JSON.stringify({server})
                });

                if (data.error) {
                    reject(data);
                }
                resolve(data);

            } catch (error) {
                reject(error);
            }
        })

    }

    newAccount = (account) => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await this.request({ 
                    url: "/api/plex/account", 
                    body: JSON.stringify({
                        account: account,
                    })
                 });
                if (data.error) {
                    reject(data);
                }
                resolve(data);

            }
            catch (error) {
                reject(error);
            }
        });
    }
}

export default Api;