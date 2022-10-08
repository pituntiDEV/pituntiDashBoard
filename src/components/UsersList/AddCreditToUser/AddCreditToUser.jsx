import React, { useContext, useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { UsersContext } from '../../../context/usersContext';
import useFetchApi from '../../../hook/useFetchApi';
import { BtnPrimary } from '../../Buttons/BtnSucess/BtnPrimary';
import { BtnSecondary } from '../../Buttons/BtnSucess/BtnSecondary';
import SWAlert from '../../SwAlert/SWAlert';
import { AddCreditsByAdmin } from './AddCreditsByAdmin';
import { AddCreditsByReseller } from './AddCreditsByReseller';
import "./AddCreditToUser.scss"
export const AddCreditToUser = ({ user, setOpenModal,setNewUserState }) => {
   

    //States
    const [myAdminID, setMyAdminID] = useState("");
    const [url, setUrl] = useState("");
    const [send,setSend] = useState(false);

    //Custom Hooks
    const [getMyAdminID, loadingGetMyID] = useFetchApi({
        url: `/api/auth/myID`,
        method: 'GET',
    })
    const [addCredits, loadingAddCredits] = useFetchApi({
        url
    })
    const { register, handleSubmit, formState: { errors } } = useForm();

    //Effects
    useEffect(() => {
        getMyAdminID()
            .then(ID => {
                setMyAdminID(ID)
            })
    }, [])

    useEffect(() => {
        const uri = myAdminID == user.admin._id ? `/api/plex/user/add/credits/admin/${user._id}` : `/api/plex/user/add/credits/reseller/${user._id}`
        setUrl(uri)
    }, [myAdminID])

    //functions
    const submit = (data) => {
        addCredits({ body: JSON.stringify(data) }).then(data => {
            SWAlert.alert({
                title: data.message || "Ok",
                icon: "success"
            })
            setNewUserState(s=>!s);
            setOpenModal(false);
  
        }).catch(error=>{
            SWAlert.alert({
                title:error.message || "Algo salio mal",
                icon:"error"
            })
        })
    }
    return (
        <form className="add_credit_to_user_form" onSubmit={handleSubmit(submit)}>
            <div className="form_container">
                {myAdminID && myAdminID == user.admin._id && <AddCreditsByAdmin register={register} errors={errors} />}

                {myAdminID && myAdminID != user.admin._id && <AddCreditsByReseller send={send}  user={user} register={register} errors={errors} />}

                {!loadingAddCredits && <div className="btns">
                    
                <BtnPrimary title="Agregar" />
                <BtnSecondary type="button" onClick={() => setOpenModal(false)} title="Cancel" />
                </div>}
            </div>
        </form>
    )
}
