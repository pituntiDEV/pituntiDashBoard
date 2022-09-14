
import useFetchApi from "./useFetchApi";
import config from "../config";

export const useGetAccountPackage = () => {
    
  const [request,loading]=useFetchApi({
        url:config.apiUrls.getAdminPackage,
        method: 'GET',
    })

    const getPackage=()=>{
        return new Promise((resolve, reject) => {
            request().then(({data}) => {
                resolve(data);
            }).catch(error => {
                reject(error);
            })
        })
    }

   return [getPackage,loading];
}
