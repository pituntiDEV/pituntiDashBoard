import React, { useEffect, useState } from 'react'
import "./Accounts.scss"
import Plex from "../../classes/Plex/Plex";
import SWAlert from '../SwAlert/SWAlert';
import useFetchApi from '../../hook/useFetchApi';
import { AccountList } from './AccountList';
import Api from "../../classes/Api/Api";
export const Accounts = React.memo(() => {
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [req] = useFetchApi({ url: "/api/plex/account" });
  const plex = new Plex();
  const api = new Api();
  const login = () => {
    setIsLoading(true);
    plex.login().then((token) => {
      plex.getAccount(token).then(async (account) => {
        api.newAccount(account).then(data => {
          SWAlert.success({
            text: data.message
          });

        }).catch(error => {
          SWAlert.error(error);
        })

      })

      setIsLoading(false);

    }).catch((error) => {
      setIsLoading(false);
      SWAlert.error({
        title: "Error",
        text: error.message
      });
    })

  }

  return (
    <div className="accounts-page">
      <div className="platforms">
        <div className="platform">
          <div className="header">
            <label className="title">{isLoading ? "Loading..." : "Add Plex Account"}</label>
          </div>
          {!isLoading &&
            <button className="btn" onClick={login}>
              <i className="fa-solid fa-right-to-bracket"></i> Login con PLEX
            </button>
          }
        </div>
      </div>

      <AccountList />
    </div>
  )
})
