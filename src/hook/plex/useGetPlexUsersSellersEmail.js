
import { useEffect } from "react";
import { useState } from "react";
export const useGetPlexUsersSellersEmail = (users) => {
    const [sellers, setSellers] = useState([]);
    useEffect(() => {
        const sellersEmails = users.reduce((acc, user) => {
            if (!acc.includes(user.seller.email)) {
                acc.push(user.seller.email);
            }
            return acc;
        }, [])

        setSellers(sellersEmails)

    }, [users]);
    return [sellers]
}
