import { useState } from "react";

const useFetchPlex = ({ url, method = "POST" } = {}) => {
    const [loading, setLoading] = useState(false);
    const [data,setData] = useState(null);
    const req = ({ body ,headers}={}) => {
        setLoading(true);
        return new Promise((resolve, reject) => {
            fetch(`${url}`, {
                method,
                headers:{
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    ...headers
                    
                },
                body

            })
                .then(response => response.json())
                .then(data => {
                    setData(data);
                    data.error ? reject(data) : resolve(data);
                })
                .catch(error => reject(error))
                .finally(() => setLoading(false));
        })
    }
    return [req,data, loading];
}
export default useFetchPlex;