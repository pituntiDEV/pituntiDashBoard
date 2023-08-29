import dayjs from "dayjs"
import utils from "../../../../utils/date/index";
import { useContext } from "react";
import { Context } from "../../PlexUsersContext";
import { useState } from "react";
import { useEffect } from "react";
export const useFilter = (filterValues) => {
    const { users, loading } = useContext(Context);
    const [usersFiltered, setUsersFiltered] = useState(users);
    const { nameOrEmail, seller, state, byExpireDay, server } = filterValues;

    useEffect(() => {
        const usersFilteredData = users
            .filter(user => {
                return filterByNameAndEmail(user, nameOrEmail)
            })
            .filter(user => {
                return filterBySeller(user, seller)
            })
            .filter(user => {
                return filterByState(user, state)
            })
            .filter(user => {
                return filterByExpireDate(user, byExpireDay)
            })
            .filter(user => {
                return filterByServer(user, server)
            })
        setUsersFiltered(usersFilteredData);

    }, [filterValues, users])
    return [usersFiltered, loading];

}


//Filter by name or email
const filterByNameAndEmail = (user, input) => {
    if (input) {
        return user.name.toLowerCase().includes(input.toLowerCase()) || user.email.toLowerCase().includes(input.toLowerCase());
    } else {
        return user;
    }

}

//Filter By Seller
const filterBySeller = (user, seller) => {
    if (seller) {
        return user?.seller?.email.toLowerCase().includes(seller.toLowerCase());
    } else {
        return user;
    }

}

//Filter By Server
const filterByServer = (user, server) => {
    if (server) {

        const buscar = user.servers.find(s => s._id == server);
        if (buscar) {
            return user
        }
    } else {
        return user;
    }

}

//Filter By ExpireDate
const filterByExpireDate = (user, byExpireDay) => {
    if (byExpireDay) {
        const diasFaltantes = utils.remainingTime(user.expireAt);
        if (diasFaltantes < byExpireDay) {
            return user;
        }
    } else {
        return user;
    }

}

//Filter By Seller
const filterByState = (user, state) => {
    if (state == "active") {
        const expireAt = user.expireAt || null;
        const isActive = utils.isExpired(expireAt);
        if (!isActive) {
            return user
        }


    } else if (state == "expired") {
        const expireAt = user.credits[user.credits.length - 1]?.expireAt || user.expireAt;
        const isExpired = utils.isExpired(expireAt);
        if (isExpired) {
            return user
        }
    } else {
        return user;
    }

}

