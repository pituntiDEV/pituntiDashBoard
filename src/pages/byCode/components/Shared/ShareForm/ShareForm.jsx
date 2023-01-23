import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import SWAlert from '../../../../../components/SwAlert/SWAlert';
import { SearchInput } from '../../../../../components/UsersList/SearchInput/SearchInput'
import useFetchApi from '../../../../../hook/useFetchApi';

import "./ShareForm.scss";
export const ShareForm = ({setOpenModal,setResellersState}) => {
    //State
    const [searchInput, setSearchInput] = useState("");
    const [resellers,setResellers] = useState([]);
    const [accounts,setAccounts] = useState([]);
    const [formData, setFormData] = useState({
        reseller: "",
        account: "",
        credits:0,
        demoDuration:0
    })

    //Custom Hooks
    const [searcReseller] =useFetchApi({
        url:`/api/chat/users/search`,
        method:"POST",
    })

   const [share,loading] = useFetchApi({
    url:`/api/byCode/share`,
    method:"POST",
   })
    const [getAccounts]=useFetchApi({
        url:`/api/admin/get/accounts`,
        method:"GET",
    })


    //Effects
    useEffect(()=>{
        getAccounts().then(data=>{
          setAccounts(data)
        })
        
    },[])

    useEffect(()=>{
        if(searchInput){
            searcReseller({body:JSON.stringify({
                email:searchInput
            })}).then(data=>{
                let count= 0;
                const resellerReduce = data.reduce((acc,reseller)=>{
                    if(count < 2){
                        acc.push(reseller)
                        count++;
                    }
                    return acc
                },[])
                setResellers(resellerReduce)
            })
        }else{
            setResellers([])
        }
    },[searchInput]);

    //Functions
    const  onChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    
    const onChangeSearchInput = (e) => {
        setSearchInput(e.target.value)
    }
    const submit =(e)=>{
        e.preventDefault();
        share({body:JSON.stringify(formData)})
        .then(data=>{
            SWAlert.alert({
                title:data.message
            })

            setOpenModal(false)
            setResellersState(s=>!s)
        })
        .catch((err)=>{
            SWAlert.error({
                title:err.message
            })
        })
    }

    return (
        <div className='ShareForm'>
            <SearchInput onChange={onChangeSearchInput} name="reseller fw-bold" placeholder="Buscar reseller" />
            {resellers.length>0 && <h3>Reseller:</h3>}
            <div className="reseller__results">
                {
                    resellers.map(reseller=>{
                        return (
                            <div key={reseller._id} className={`reseller ${formData.reseller==reseller._id && "selected"}`} onClick={()=>{
                                setFormData({...formData,reseller:reseller._id})
                            }}>
                                {reseller.email}
                            </div>
                        )
                    })
                }
                
            </div>

            <form onSubmit={submit}>
                {/* {formData.reseller} */}
                <div className="form__group">
                    <label htmlFor="account">Cuenta a compartir:</label>

                    {/* Selecte Account */}
                    <select name="account" required onChange={onChange} id="account" defaultValue={""}>
                        <option value=""  disabled>Selecciona cuenta a compartir</option>
                        {
                            accounts.map(account=>{
                                return (
                                    <option value={account._id} key={account._id}>
                                        {account.email}
                                    </option>
                                )
                            })
                        }

                    </select>
                    
                </div>

                <div className="form__group">
                    <label htmlFor="credits">Credits:</label>
                    <input type="number" required onChange={onChange} name="credits" id="credits" min="1" />
                </div>

                <div className="form__group ">
                    <label htmlFor="demoDuration">Duracion de demos hr:</label>
                    <input type="number" required onChange={onChange} name="demoDuration" id="demoDuration" min="0" />
                </div>

                <button className='btn btn-primary'><i className="fa-solid fa-share-nodes"></i> Compartir</button>
            </form>

        </div>
    )
}
