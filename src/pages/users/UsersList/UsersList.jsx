import React, { useState, useEffect, useContext } from 'react'
import Modal from '../../../components/modal/Modal';
import { UserCard } from '../../../components/users/UserCard';
import { appContext } from '../../../context/AppContext';
import { UsersContext } from '../../../context/usersContext';
import useFetchApi from '../../../hook/useFetchApi'
import useSearchUser from '../../../hook/useSearchUser';
import { EditUser } from '../editUser/EditUser';
import "./UsersList.scss";

//CONFIG
import config from "../../../config";
export const UsersList = () => {

    //Context
    const { socket, state: { openEditModal }, setOpenEditModal } = useContext(appContext);
    const { state, setState } = useContext(UsersContext);

    //Custom Hooks
    const [searchUser] = useSearchUser()
    const [getAllUsers, loading] = useFetchApi({ url: config.apiUrls.plex.getAllUsers, method: "GET" });

    //States
    const [usersFilter, setUsersFilter] = useState([]);
    const [showCover, setShowCover] = useState(null);
    const [user, setUser] = useState({});
    const [sellers, setSellers] = useState([]);
    const [ inputFilterValue , setInputFilterValue] = useState("");
    const [selectFilterValue , setSelectFilterValue] = useState("");

    //Effects
    useEffect(() => {
        setUsersFilter(state.users.reverse());
        socket.on("user:new", (user) => {
            const newUsers = [user, ...usersFilter];
            setUsersFilter(newUsers);
        })

        setSellers(state.users.reduce((acc, user) => {
            if (!acc.includes(user.admin.email)) {
                acc.push(user.admin.email);
            }
            if (!acc.includes(user.seller.email)) {
                acc.push(user.seller.email);
            }
            return acc
        }, []))
    }, [state.users])

    useEffect(() => {
        getAllUsers()
            .then(data => setState({ ...state, users: data.users }))
            .catch(error => console.log(error));


    }, []);

    useEffect(() => {
        const filter = state.users.filter(filterByNameAndEmail).filter(filterBySeller);
        setUsersFilter(filter);
    },[inputFilterValue,selectFilterValue]);


    //Filters

    const filterByNameAndEmail = (user)=>{
       
       if(inputFilterValue){
         return user.name.toLowerCase().includes(inputFilterValue.toLowerCase()) || user.email.toLowerCase().includes(inputFilterValue.toLowerCase());;
       }else{
        return user;
       }
        
    }

    const filterBySeller = (user)=>{
        if(selectFilterValue){
            return user.seller.email.toLowerCase().includes(selectFilterValue.toLowerCase());
        }else{
            return user;
        }

    }


    //Functions
    const search = (e) => {
        setInputFilterValue(e.target.value);
    }

    const showCoverHandler = (user, type) => {
        setShowCover({ ...user, type });
    }

    const hanledChange=(e)=>{
        setSelectFilterValue(e.target.value);
    }


    return (
        <div className='container'>

            <div className='filter'>
                <p className='title'>Filter By:</p>
                <div className='inputs'>
                    <div className='inputFilter'>
                    <small>Estado:</small>
                    <select name="" id="" defaultValue={''}>
                        <option value="" disabled>Estado</option>
                        <option value="todos">Todos</option>
                        <option value="activos">Activos</option>
                        <option value="Vencidos">Vencidos</option>
                    </select>
                    </div>

                    <div className='inputFilter'>
                        <small>Seller:</small>
                        <select onChange={hanledChange}  name="" id="" defaultValue={''}>
                            <option value="" >All Sellers</option>
                            {sellers.map(seller => {
                                return (
                                    <option key={seller} value={seller}>{seller}</option>
                                )
                            })}

                        </select>

                    </div>
                </div>
            </div>

            <div className='search'>
                <input type="text" onChange={search} />
                <i className="fa-solid fa-magnifying-glass"></i>

            </div>
                {
                    inputFilterValue && <div>total: {usersFilter.length}</div>
                    
                }
                 {
                    selectFilterValue && <div>total: {usersFilter.length}</div>
                    
                }
            {usersFilter.length < 1 && !loading && (<div className="no-user">
                    No se encontró ningun usuario!
                </div>)}
            <div className="user-list">
                 
                {usersFilter.map(user => {
                    return (
                        <UserCard setUser={setUser} key={user._id} user={user} showCoverHandler={showCoverHandler} showCover={showCover} setShowCover={setShowCover} />
                    )
                })}
                {openEditModal && <Modal setOpenModal={setOpenEditModal} title="Edit" reset={() => { }}>
                    <EditUser user={user} />
                </Modal>}
            </div>
        </div>
    )
}
