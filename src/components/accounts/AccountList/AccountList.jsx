import { useState } from 'react';
import { useEffect } from 'react';
import useFetchApi from '../../../hook/useFetchApi';
import { useGetAccounts } from '../../../hook/useGetAccounts';
import { RepeatIcon } from '../../icons/RepeatIcon';
import { TrashIcon } from '../../icons/TrashIcon';
import Modal from '../../modal/Modal';
import "./AccountList.scss"
import { DeleteAccount } from './DeleteAccount/DeleteAccount';
export const AccountList = ({ newAccountState, setTotalAccounts }) => {
  //State
  const [openModalToRemoveAccount, setOpenModalToRemoveAccount] = useState(false);
  const [accountID, setAccountID] = useState("");
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [embyAccounts, setEmbyAccounts] = useState([]);
  const [jellyfinAccounts, setJellyfinAccounts] = useState([]);

  //Custom hooks
  const [getAccount, accounts, loading] = useGetAccounts();
  const [getEmbyAccounts, loadingGetEmbyAccounts] = useFetchApi({
    url: `/api/emby/accounts`,
    method: 'GET',
  });

  const [getJellyfinAccounts, loadingGetJellyfinAccounts] = useFetchApi({
    url: `/api/jellyfin/accounts`,
    method: 'GET',
  });


  //Effects
  useEffect(() => {
    getAccount();
    getEmbyAccounts()
      .then(data => {
        setEmbyAccounts(data)
      })

    getJellyfinAccounts()
      .then(data => {
        setJellyfinAccounts(data)
      })


  }, [newAccountState, deleteAccount])

  useEffect(() => {
    setTotalAccounts(accounts.length);
  }, [accounts])
  return (
    <>
      <h2>Accounts:</h2>

      <div className="account__list">
        {loading && <div>Loading...</div>}

        {
          embyAccounts.map(account => {
            return (
              <div className='account' key={account._id}>
                <div className="account__container">
                  <div className="profile">
                    {/* <img src={account.data.user.thumb} alt="" /> */}
                    {account.email[0]}
                  </div>
                  ({account.platform})
                  <span>{account.email}</span>
                </div>

                <div className="controls">
                  <span><RepeatIcon /></span>
                  <span onClick={() => {
                    setOpenModalToRemoveAccount(true)
                    setAccountID(account._id)
                  }}><TrashIcon /></span>
                </div>
              </div>
            )
          })
        }

        {
          jellyfinAccounts.map(account => {
            return (
              <div className='account' key={account._id}>
                <div className="account__container">
                  <div className="profile">
                    {/* <img src={account.data.user.thumb} alt="" /> */}
                    {account.email[0]}
                  </div>
                  ({account.platform})
                  <span>{account.email}</span>
                </div>

                <div className="controls">
                  <span><RepeatIcon /></span>
                  <span onClick={() => {
                    setOpenModalToRemoveAccount(true)
                    setAccountID(account._id)
                  }}><TrashIcon /></span>
                </div>
              </div>
            )
          })
        }


        {
          accounts.map((account) => {
            return <div className='account' key={account.email}>
              <div className="account__container">
                <div className="profile">
                  <img src={account.data.user.thumb} alt="" />
                </div>
                ({account.platform})
                <span>{account.email}</span>
              </div>

              <div className="controls">
                <span><RepeatIcon /></span>
                <span onClick={() => {
                  setOpenModalToRemoveAccount(true)
                  setAccountID(account._id)
                }}><TrashIcon /></span>
              </div>
            </div>
          })
        }
      </div>

      {openModalToRemoveAccount &&
        <Modal setOpenModal={setOpenModalToRemoveAccount} title="Delete Account">
          <DeleteAccount setDeleteAccount={setDeleteAccount} setOpenModal={setOpenModalToRemoveAccount} accountID={accountID} />
        </Modal>}
    </>
  )
}
