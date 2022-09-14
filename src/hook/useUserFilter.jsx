
export const useUserFilter = (users) => {
    const filter = ({nameOrEmail,seller}) => {
        return users
            .filter(user => {
                return filterByNameAndEmail(user, nameOrEmail)
            })
            .filter(user => {
                return filterBySeller(user, seller)
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

