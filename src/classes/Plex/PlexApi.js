class PlexApi {
    constructor() {
    }
    getCode = async () => {
        try {
            const url = "https://plex.tv/api/v2/pins?strong=true";
            const data = {
                method: "POST",
                headers: {
                    'X-Plex-Client-Identifier': "pitunti",
                    accept: "application/json",
                    'Content-Type': 'application/json',
                    "X-Plex-Product": "PlexPanel",
                },
            };
            const resp = await fetch(url, data);
            const dataResp = await resp.json();
            return dataResp;
        } catch (error) {
            return error;
        }
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


}

export default PlexApi;