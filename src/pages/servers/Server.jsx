import React,{ useEffect, useState } from "react";
import "./Server.scss";
import { useGetAccounts } from "../../hook/useGetAccounts";
import SWAlert from "../../components/SwAlert/SWAlert";
import Api from "../../classes/Api/Api";
import useGetPlexServers from "../../hook/useGetPlexServers";
import { ServersList } from "../../components/Servers/ServersList";

export const Server = () => {
  const api = new Api();
  const [getAccounts, accounts, loading] = useGetAccounts();
  const [getPlexServers, servers, load] = useGetPlexServers();
  const [selectedAccount, setSelectedAccount] = useState(null);

  //Get all accounts
  useEffect(() => {
    getAccounts();
  }, [])
  
  //Get all servers of the selected account
  const getServers = (account) => {
    setSelectedAccount(account);
    getPlexServers(account.data.user.authToken);

  }
  //SaveServer
  const saveServer = (server) => {
    const newServer = { data: server.data, account: selectedAccount._id }
    api.newServer(newServer).then((data) => {
      SWAlert.success({ title: "Servidor Creado", text: data.message });
    })
      .catch((error) => {
        SWAlert.error({ title: "Error", text: error.message });
      })
  }

  return (
    <div className="server-page">
      {loading && "Loading..."}
      {
        accounts.length < 1 && !loading ? <div>No accounts found</div> :
          <>
            <h2>Selecciona Una cuenta</h2>
            <div className="accounts">
              {accounts.map((account) => {
                return (
                  <div className="account" onClick={() => {
                    getServers(account)
                  }} key={account._id}>
                    <p className="platform"> {account.platform}</p>
                    {account.email}
                  </div>)
              })}
            </div>



            {/* SERVERS+++++++ */}

            <section className="">
              {
                !load && selectedAccount && servers.length > 0 && <h2>Selecciona Server</h2>
              }
              <div className="servers">
                {load && "Loading..."}
                {


                  servers.length < 1 && selectedAccount && !load && <div>No servers found</div>

                }

                {
                   servers.map((server) => {
                    return (
                      <div className="server" onClick={() => saveServer({ data: server })} key={server.clientIdentifier}>
                        <i className="fa-solid fa-server"></i>
                        <p className="platform"> {server.platform}</p>
                        <p className="name">{server.name}</p>
                        <p className="address">{server.address}</p>
                        <small>{server.publicAddress}</small>
                        <i className="fa-solid fa-plug-circle-bolt add"></i>
                      </div>
                    )
                  })
                }
              </div>
            </section>


          </>
      }


      <ServersList/>

    </div>
  )
}
