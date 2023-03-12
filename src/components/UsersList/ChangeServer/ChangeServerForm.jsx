import React, { useEffect, useState } from 'react'
import useFetchApi from '../../../hook/useFetchApi';
import useGetAccountServers from '../../../hook/useGetAccountServers'
import { BtnPrimary } from '../../Buttons/BtnSucess/BtnPrimary';
import { BtnSecondary } from '../../Buttons/BtnSucess/BtnSecondary';
import SWAlert from '../../SwAlert/SWAlert';
import "./ChangeServerForm.scss";

export const ChangeServerForm = ({ user,setOpenModal, users,setUsers}) => {
  const [servers, setServers] = useState([]);
  const [getServers, , loading] = useGetAccountServers();
  const [formData,setFormData] = useState([]);
  const [updateServers,loadingUpdating] = useFetchApi({
    url:`/api/plex/user/servers/${user._id}`,
    method:"PUT"
  })
  useEffect(() => {
    getServers()
      .then(data => {
        setServers(data)
      })
  }, []);
  useEffect(()=>{
    const userServers = user.servers.map(s=>{
      return {
        server:s,
        packages:[],
      }
    })

    //LLenar packages
    user.packages.forEach(pk=>{
      const server = userServers.find(s=>s.server._id==pk.server);
      server?.packages?.push(pk)

    })

    setFormData([...formData,...userServers]);

  },[])
  const onChangePack=(pk)=>{
      const serversFormData=[...formData];
      const serverFormDataFind = serversFormData.find(f=>f.server._id==pk.server);
      if(serverFormDataFind){
        const serverFormDataPackages = serverFormDataFind.packages;
        const packExiste = serverFormDataPackages.find(p=>p._id==pk._id);
        if(!packExiste){
          serverFormDataPackages.push(pk);
          setFormData(serversFormData);
        }else{
          const serversUpdated = serverFormDataPackages.filter(p=>p._id!=pk._id);
          serverFormDataFind.packages= serversUpdated;
          setFormData(serversFormData);
          if(serverFormDataFind.packages.length ==0){
             const serversUpdated=serversFormData.filter(s=>s.server._id != serverFormDataFind.server._id);
             setFormData(serversUpdated);

          }
        }

      }else{
        //Si no encuentra un server en formData [Agregarlo]
        const serverFind = servers.find(s=>s._id==pk.server);
        serversFormData.push({
          server: serverFind,
          packages:[pk]
        })

        setFormData(serversFormData);
      }
     
  };

  const submit=(e)=>{
    e.preventDefault();
    const dataToSend = formData.map(s=>{
      return {
        server:s.server._id,
        packages:s.packages.map(p=>p._id)
      }
    })
    updateServers({body:JSON.stringify({servers:dataToSend})})
      .then(data=>{
        SWAlert.alert({
          title:"Aupdated"
        });
        const usersUpdated = [...users];
        const updateUser = usersUpdated.find(u=>u._id==user._id);
        updateUser.packages=formData.map(f=>f.packages).flat();
        console.log(updateUser.packages);
        setUsers(usersUpdated)
        setOpenModal(false);

      })
      .catch(error=>{
        SWAlert.error({
          title:error.message || "Algo salio mal"
        })
      })

  }
  return (
    <form onSubmit={submit} className='change__plex__server'>
      <div className="servers">
        {servers.map(server => {
          return (
            <div className='server' key={server._id}>
              
              <div className="name">
                {server.data.name} - Paquetes:
              </div>
              <div className="packs">
                {
                  server.packages.map(pk => {
                    const serverFormData = formData.find(f=>f.server._id==server._id);
                    const existe = serverFormData?.packages?.find(p=>p._id==pk._id);
                    
                    return (
                      <div onClick={()=>onChangePack(pk)} key={pk._id} className={`pack ${existe && "active"}`}>
                        {pk.name}
                      </div>
                    )
                  })
                }
              </div>
            </div>
          )
        })}
      </div>
        <div className="d-flex gap-3">
          <BtnPrimary title="Editar"/>
          <BtnSecondary title="Cancelar" type="button" onClick={()=>{}}/>
        </div>
    </form>
  )
}
