import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import useFetchApi from '../../../hook/useFetchApi';
import { BtnPrimary } from '../../Buttons/BtnSucess/BtnPrimary';
import { BtnSecondary } from '../../Buttons/BtnSucess/BtnSecondary';
import { CancelIcon } from '../../icons/CancelIcon';
import { CheckIcon } from '../../icons/CheckIcon';
import { PackOpenIcon } from '../../icons/PackOpenIcon';
import SWAlert from '../../SwAlert/SWAlert';
import "./NewDemoForm.scss";
import { Options } from './Options';


export const NewDemoForm = ({setOpenModal,setDemoState}) => {
  //State
  const [myServers, setMyServers] = useState([]);
  const [sharedServers, setsharedServers] = useState([]);//Servers
  const [packages, setPackages] = useState([]); //Packages
  const [state, setState] = useState({
    name: "",
    email: "",
    server: {
      id: "",
      packages: [],
    },
    expireAt: 1,
    deleteAt: 0,
    format: "hour",
    formatToDelete: "hour",
    owner:false


  });
  //Custom Hooks
  const [getMyServers, loading] = useFetchApi({
    url: "/api/server/get/all",
    method: "GET",
  })

  const [addDemo,loadingAddDemo] = useFetchApi({
    url:"/api/demos",
    method: "POST",
  })

  const { register, handleSubmit, unregister, formState: { errors } } = useForm({
    defaultValues: {
      expireAt: "1",
      format: "hour",
      deleteAt: "0",
      formatToDelete: "day",
      server: ""
    }
  });

  const [getSharedServers, loadingShared] = useFetchApi({
    url: "/api/server/get/shared",
    method: "GET",
  })

  //Effects
  useEffect(() => {
    getMyServers().then((servers) => {
      setMyServers(servers);
    })

    getSharedServers()
      .then(data => {
        setsharedServers(data);
      })
  }, [])


  const [getPackages, loadingPackages] = useFetchApi({
    url: "/api/package/plex/server/" + state.server.id,
    method: "GET",
  })


  //Effects
  useEffect(() => {
    if (state.server.id) {
      getPackages().then(data => {
        setPackages(data);
      })
    }
  }, [state.server]);

  useEffect(() => {
    unregister("packages");
    register("packages", {
      value: state.server.packages,
      required: "Min 1"
    })
  }, [state.server.packages])

  //Funtions
  const onChangeServer = (e) => {
    const {_id,owner} = JSON.parse(e.target.value);
    setState({
      ...state, server: {
        id: _id,
        packages: []
      },
      owner
    })
   
  }

  const selectPackage = (_id) => {
    const server = state.server;
    const existe = server.packages.includes(_id)

    if (existe) {
      server.packages = server.packages.filter(p => p != _id);
      setState({ ...state, server })

    } else {
      server.packages = [...server.packages, _id]
      setState({ ...state, server })
    }

  }

  const submit = (data) => {
     const {server,...dataToSend} = data
    addDemo({body:JSON.stringify(dataToSend)}).then(datas=>{
      SWAlert.alert({
        title:datas.message || "Success",
        icon:"success"
      })
      setOpenModal(false);
      setDemoState(s=>!s);
    }).catch(error=>{
      SWAlert.error({
        title:error.message || "Algo salio mal",
        icon:"error"
      })
    })

    console.log(dataToSend.server);
  }
  return (
    <form className='new_demo_form' onSubmit={handleSubmit(submit)}>

      <div className="form-group">
        <label htmlFor="">Name:</label>

        <input
          name="name"
          {...register("name", {
            required: "Nombre es requerido",
          })}
          className='form-control' type="text"
        />

        <p className='text-danger'>
          {errors.name?.message}
        </p>

      </div>

      <div className="form-group">
        <label htmlFor="">Email:</label>
        <input
          type="email" {...register("email", {
            required: "Email es requerido",
          })}
          className='form-control' />

        <p className='text-danger'>
          {errors.email?.message}
        </p>

      </div>

      <div className="form-group">
        <label htmlFor="Server">Server</label>
        <select
          {...register("server", {
            required: "Server es requerido",
          })}
          className='form-control'
          onChange={onChangeServer}>
          <option value="" disabled>Server</option>
          {myServers.map(server => {
            return <option key={server._id} value={JSON.stringify({
              owner:true,
              _id:server._id
            })}>{server.data.name}</option>
          })}
          {sharedServers.map(({server}) => {
            return <option key={server._id} value={JSON.stringify({
              owner:false,
              _id:server._id
            })}>[shared]{server.data?.name}</option>
          })}
        </select>
        <p className='text-danger'>
          {errors.server?.message}
        </p>
      </div>




      <div className="form-group packages_container">
        {packages.length > 0 && <h3>Packages:</h3>}
        <div className='packages_list'>
          {packages.map(pack => {
            const active = state.server.packages.includes(pack._id);
            return (
              <div key={pack._id} onClick={() => selectPackage(pack._id)} className={`pack ${active && "active"}`}>
                {active ? <CheckIcon /> : <CancelIcon />}
                <span> <PackOpenIcon /> {pack.name}</span>
              </div>
            )
          })}
        </div>
        <p className='text-danger'>
        {errors.packages?.message}
        </p>
      </div>

    {state.owner && <>
      <hr />
      <Options register={register} state={state} setState={setState} />
      <hr />
    </>}

    {!loadingAddDemo &&  <div className="btns">
        <BtnPrimary title="Add" />
        <BtnSecondary onClick={()=>setOpenModal(false)} type="button" title="Cancel" />
      </div>}

    </form>
  )
}
