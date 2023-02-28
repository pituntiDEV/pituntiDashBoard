import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { appContext } from '../../../context/AppContext';
import useFetchApi from '../../../hook/useFetchApi';
import { Plans } from '../../NewUserBar/Plans/Plans';
import { UserInfo } from '../../NewUserBar/UserInfo/UserInfo';
import SWAlert from '../../SwAlert/SWAlert';
import "./NewUserForm.scss";
export const NewUserForm = ({setNewUserState,setOpenModal}) => {

  //Context
    const appContextValue = useContext(appContext);
  
  //States
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
    byMonth: false,
    totalCredits:0,
    servers:[],
    whatsapp:null
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
    const _id= localStorage.getItem("_id")
    const validateAdmin = state.servers.reduce((acc,server)=>{
      if(server.admin._id == _id){
          acc = [...acc,true]
      }
      return acc;
  },[]);

 

  const isNotAdmin = state.servers.filter(s=>s.admin._id != _id);
  const isAdmin = isNotAdmin.length ==0 ? true:false
    const uri = isAdmin?"/api/plex/user/add":"/api/plex/user/add/reseller";
    setUrl(uri)
  },[state.servers]
  )


  //Finctions
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
      appContextValue.setState({...appContextValue.state,onChangeCredits:!appContextValue.state.onChangeCredits});
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
