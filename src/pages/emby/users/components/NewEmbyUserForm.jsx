import React, { useEffect, useState } from 'react'
import { BtnPrimary } from '../../../../components/Buttons/BtnSucess/BtnPrimary';
import SWAlert from '../../../../components/SwAlert/SWAlert';
import useFetchApi from '../../../../hook/useFetchApi';

export const NewEmbyUserForm = ({setOpenModal,setUpdateUserState}) => {
    // State
    const [accounts,setAccounts] = useState([]);
    const [formData,setFormData] = useState({
        name:"",
        userName:"",
        credits:1,
        connections:1,
        account:"",
    });

    // Custom Hooks
    const [getAccounts,loadingGetAccounts] = useFetchApi({
        url:`/api/emby/accounts`,
        method:"GET"
    });

    const [addUser,loading] = useFetchApi({
        url:`/api/emby/users`,
        method:"POST"
    })

    // Effects
    useEffect(()=>{
        getAccounts().
            then(accounts=>{
                setAccounts(accounts)
            })
    },[])

    // Functions

    const onChange=(e)=>{
       setFormData({...formData,[e.target.name]:e.target.value})
    };

    const submit=(e)=>{
        e.preventDefault();
        addUser({body:JSON.stringify(formData)})
            .then(data=>{
                SWAlert.alert({
                    title:"Agregado con exito"
                })

                setOpenModal(false);
                setUpdateUserState(s=>!s);
            })
            .catch(error=>{
                SWAlert.error({
                    title:error.message || "Algo salio mal "
                })
            })
    }
  return (
    <form onSubmit={submit}>
        <div className="form__group">
            <label htmlFor="name">Name:</label>
            <input onChange={onChange} type="text" minLength={3} required name="name" id="name" />
        </div>
        <div className="form__group">
            <label htmlFor="email">email:</label>
            <input type="email" onChange={onChange} required name="userName" id="email" />
        </div>

        <div className="form__group">
            <label htmlFor="credits">Credits:</label>
            <input type="number" onChange={onChange} min={1} value={formData.credits} required name="credits" id="credits" />
        </div>

        <div className="form__group">
            <label htmlFor="conexiones">Conexiones:</label>
            <input type="number" onChange={onChange} min={1} value={formData.connections} required name="connections" id="conexiones" />
        </div>

        <div className="form__group">
            <label htmlFor="credits">Server:</label>
            <select onChange={onChange} required name="account" defaultValue={""} id="account">
                <option value="" disabled>Selecciona un Server</option>
                {
                    accounts.map(account=>{
                        return (
                            <option value={account._id} key={account._id}>
                               {account.data.name}
                            </option>
                        )
                    })
                }
            </select>
        </div>

       <div className="buttonss">
            <BtnPrimary title="Agregar"/>
       </div>
    </form>
  )
}
