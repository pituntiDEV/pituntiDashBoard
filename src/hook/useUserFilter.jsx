import dayjs from "dayjs"

export const useUserFilter = (users) => {
    const filter = ({nameOrEmail,seller,state}) => {
        return users
            .filter(user => {
                return filterByNameAndEmail(user, nameOrEmail)
            })
            .filter(user => {
                return filterBySeller(user, seller)
            })
            .filter(user=>{
                return filterByState(user,state)
            })
    }

    return [filter]

}


//Filters

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
        return user.seller.email.toLowerCase().includes(seller.toLowerCase());
    } else {
        return user;
    }

}

//Filter By Seller
const filterByState = (user,state) => {
    if (state == "active") {
        const expireAt = user.credits[user.credits.length - 1]?.expireAt || null;
       

        const isActive = dayjs().isBefore(expireAt)
    
        return isActive && expireAt && user
    } else if (state == "expired") {
        const expireAt = user.credits[user.credits.length - 1]?.expireAt || null;
        const isExpired = dayjs().isAfter(expireAt);
      
        
        return isExpired && expireAt && user
    } else {
        return user;
    }

}

