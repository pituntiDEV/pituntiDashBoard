
export const useGetSellersByUsers = (users) => {
    const getSellers=()=>{
        return users.reduce((acc,user)=>{
            if(!acc.includes(user.seller.email)){
                acc.push(user.seller.email);
            }
            return acc;
        },[])
    }
 return [getSellers]
}
