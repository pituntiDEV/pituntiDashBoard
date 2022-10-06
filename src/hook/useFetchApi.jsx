import { useState } from "react";
import config from "../config";
 const useFetchApi = ({url="/",method="POST"}={}) => {
    const [loading, setLoading] = useState(false);
    //Functions
    const req=({body}={})=>{
        return new Promise(async(resolve, reject) => {
            try {
                setLoading(true);
                const request = await fetch(`${config.apiBackendUrl}${url}`,{
                    method,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "access-token": localStorage.getItem("access-token")
                    },
                    body
                }); 
                const data = await request.json();
                setLoading(false);
                if(data.error){
                    reject(data);
                }
                resolve(data);
            } catch (error) {
                setLoading(false);
                reject(error);
            }
        })
    }

    return [req, loading];

 
}


export default useFetchApi;