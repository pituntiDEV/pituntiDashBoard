import { useEffect, useState } from "react";

export const useGetSellersByUsers = (users) => {
    const [sellers, setSellers] = useState([]);

    const getSellers = async () => {

        try {

            const sellersEmails = users.reduce((acc, user) => {
                const existe = acc.find(seller => seller.email === user?.seller?.email);
                if (!existe) {
                    acc.push(user?.seller);
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
