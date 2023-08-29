import { useEffect, useState } from "react";

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
    useEffect(() => {
        try {
            const sellersEmails = users.reduce((acc, user) => {
                const existe = acc.find(s => s.email == user.seller.email)

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
    }, [])
    return [getSellers, sellers];

}
