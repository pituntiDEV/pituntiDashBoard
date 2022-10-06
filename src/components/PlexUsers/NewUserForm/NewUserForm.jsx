import React, { useEffect, useState } from 'react'
import useFetchApi from '../../../hook/useFetchApi';
import { Plans } from '../../NewUserBar/Plans/Plans';
import { UserInfo } from '../../NewUserBar/UserInfo/UserInfo';
import SWAlert from '../../SwAlert/SWAlert';
import "./NewUserForm.scss";
export const NewUserForm = ({setNewUserState,setOpenModal}) => {
  const [url,setUrl] = useState("");
  const [step, setStep] = useState(1);
  const [state, setState] = useState({
    name: "",
    server: {
      id: "",
      owner: false,
      ownerID: "",
    },
    email: "",
    package: "",
    packages: [],
    description: "",
    date: "",
    credits: 0,
    connections: "",
    delete: false,
    deleteDays: 6,
    removeLibs: false,
    removeLibsDays: 3,
    byMonth: false
  });

  //Custom Hooks
  const [addUser, loading] = useFetchApi({
    url: url,
  })
  //Props

  const props = {
    state,
    setState,
    setStep,
  }


  //Steps
  const steps = {
    1: <UserInfo {...props} />,
    2: <Plans {...props} />
  }


  //Effects
  useEffect(()=>{
    const uri = state.server.owner?"/api/plex/user/add":"/api/plex/user/add/reseller"
    setUrl(uri)
  },[state.server]
  )

  const submit=(e)=>{
    e.preventDefault();
    if(step < Object.keys(steps).length){
      setStep(step+1);
      return;
    }
    addUser({
      body:JSON.stringify(state)
    }).then(data=>{
      SWAlert.alert({
        title:data.message || "Usuario Agregado"
      })
      setNewUserState(a=>!a);
      setOpenModal(false);
    }).catch(error=>{
      SWAlert.error({
        title:error.message || "Algo salio mal"
      })
    })
   
  }

  return (
    <form onSubmit={submit}>
      {steps[step]}

    </form>
  )
}
