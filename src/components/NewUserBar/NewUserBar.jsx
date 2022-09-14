import React, { useEffect, useState } from 'react'
import useFetchApi from '../../hook/useFetchApi';
import Modal from '../modal/Modal';
import { StepCounter } from '../StepCounter/StepCounter';
import "./NewUserBar.scss";
import { Plans } from './Plans/Plans';
import { UserInfo } from './UserInfo/UserInfo';
export const NewUserBar = ({users}) => {
  //State
  const [openModal,setOpenModal] = useState(false);
  const [step,setStep]  = useState(1);
  const [state,setState] = useState({
    name:"",
    server:{
      id:"",
      owner:false,
      ownerID:"",
    },
    email:"",
    package:"",
    description:"",
    date:"",
    credits:0,
    connections:"",
    delete:false,
    deleteDays:6,
    removeLibs:false,
    removeLibsDays:3,	
    byMonth:false
  });

  const [urlAdd,setUrlAdd] = useState("");
  const [addUser,loading] = useFetchApi({
    url:urlAdd,
  })

  const submit=(e)=>{
    e.preventDefault();
    if(step < Object.keys(steps).length){
      setStep(step+1);
      return;
    }
    const url = state.server.owner?"/api/plex/user/add":"/api/plex/user/add/reseller"
    setUrlAdd(url);
    addUser({
      body:JSON.stringify(state)
    }).then(data=>{
      console.log(data)
    })
   
  }

  //Props

  const props={
    state,
    setState,
    setStep,
    submit
  }

  //Steps
  const steps={
    1: <UserInfo {...props}/>,
    2:<Plans {...props}/>
  }
  return (
    <div className="new-user-bar">
    <div className="num-users">
        <p> <i className="fa-solid fa-users"></i> Total</p>
        <span>{users.length}</span> 
        <p>Usuarios</p>
    </div>
    <div>
        <button className='btn-add' onClick={() => {
            setOpenModal(true);
        }}>
            <i className="fa-solid fa-user-plus"></i>
            Agregar nuevo usuario
        </button>
    </div>

    {openModal && 
    <Modal title='New User' setOpenModal={setOpenModal}>
      <form onSubmit={submit}>
      <StepCounter steps={steps} step={step} />
        {steps[step]}
        
      </form>
    </Modal>}
</div>
  )
}
