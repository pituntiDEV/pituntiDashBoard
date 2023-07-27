import { useState } from "react";

export const useGetSellersByUsers = (users) => {
    const [sellers, setSellers] = useState([]);
    const getSellers = async () => {
        try {
            const sellersEmails = users.reduce((acc, user) => {
                if (!acc.includes(user?.seller?.email)) {
                    acc.push(user?.seller?.email);
                }
                return acc;
            }, [])

            setSellers(sellersEmails)
        } catch (error) {
            console.log(error)
            return []
        }
    }
    return [getSellers, sellers];

}
