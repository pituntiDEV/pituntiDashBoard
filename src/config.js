const config={
    userID:localStorage.getItem("_id"),
    apiBackendUrl:process.env.REACT_APP_API_URL,
    apiUrls:{
        getPackagesFromReseller:"/api/package/shared-with-me",
        getAdminPackage:"/api/package/plex/get/all",
        plex:{
            addUser:"/api/plex/user/add",
            addUserFromReseller:'/api/plex/user/add/reseller',
            getAllUsers:"/api/users/get",
            getPlexServers:"/api/server/get/all",
            //api/plex/user/userID:
            updateUser:"/api/plex/user/"
        }
    },
}
export default config