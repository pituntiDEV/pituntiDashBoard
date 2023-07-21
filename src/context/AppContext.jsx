import React from 'react';
import { useState, useEffect } from 'react';

import useFetchApi from '../hook/useFetchApi';
import { useGetPlexSharedServers } from '../hook/plex/useGetPlexSharedServers';
import { useGetMyPlexServers } from '../hook/plex/useGetMyPlexServers';

export const appContext = React.createContext();


export const AppContext = ({ children }) => {

  //State
  const [embyCredits, setEmbyCredits] = useState([]);
  const [plexCredits, setPlexCredits] = useState([]);
  const [state, setState] = useState({
    openModal: false,
    openEditModal: false,
    users: [],
    packages: [],
    account_data: {},
    onChangeCredits: null,

  });
  //Custom Hooks
  const [getMyInfo, loadingGetMyInfo] = useFetchApi({
    url: "/api/auth/my-info",
    method: "GET",
  })

  const [getEmbyCredits, loadingGetEmbyCredits] = useFetchApi({
    url: "/api/emby/resellers/creditsAvailables",
    method: "GET",
  })

  const [getPlexCredits] = useFetchApi({
    url: `/api/credits/shared-available`,
    method: 'GET',
  });

  const [plexSharedServers] = useGetPlexSharedServers();
  const [plexServers] = useGetMyPlexServers();

  //Effects
  useEffect(() => {
    getMyInfo().then(data => {
      localStorage.setItem("_id", data._id)
      setState({ ...state, account_data: data })
    });
  }, [])


  useEffect(() => {
    //Obtains Emby Credits by email activation
    getEmbyCredits().then(data => {
      setEmbyCredits(data);
    });

    //Obtains plex Credits by email activation
    getPlexCredits().then(data => {
      setPlexCredits(data);
    })
  }, [])


  const value = {
    state,
    setState,

    setOpenModal: () => {
      setState(state => ({ ...state, openModal: !state.openModal }));
    },
    setOpenEditModal: () => {
      setState(state => ({ ...state, openEditModal: !state.openEditModal }));
    },
    emby: {
      embyCredits,
      setEmbyCredits
    },
    plex: {
      plexCredits,
      setPlexCredits,
      sharedServers: plexSharedServers,
      servers: plexServers
    }
  }

  return (
    <appContext.Provider value={value}>

      {
        children
      }
    </appContext.Provider>
  )
}


