import { useState } from 'react';
import { useEffect } from 'react';
import { useGetAccounts } from '../../../hook/useGetAccounts';
import { RepeatIcon } from '../../icons/RepeatIcon';
import { TrashIcon } from '../../icons/TrashIcon';
import Modal from '../../modal/Modal';
import "./AccountList.scss"
import { DeleteAccount } from './DeleteAccount/DeleteAccount';
export const AccountList = ({newAccountState,setTotalAccounts}) => {
  //State
  const [openModalToRemoveAccount,setOpenModalToRemoveAccount] = useState(false);
  const [accountID,setAccountID] = useState("");
  const [deleteAccount,setDeleteAccount] = useState(false);

  //Custom hooks
  const [getAccount, accounts, loading] = useGetAccounts();
 

  //Effects
  useEffect(() => {
    getAccount();
    
  }, [newAccountState,deleteAccount])

  useEffect(()=>{
    setTotalAccounts(accounts.length);
  },[accounts])
  return (
    <>
    <h2>Accounts:</h2>
   
    <div className="account__list">
      {loading && <div>Loading...</div>}
      

      {
        accounts.map((account) => {
          return <div className='account' key={account.email}>
            <div className="account__container">
              <div className="profile">
                <img src={account.data.user.thumb} alt="" />
              </div>
              <span>{account.email}</span>
            </div>

            <div className="controls">
              <span><RepeatIcon/></span>
              <span onClick={()=>{
                setOpenModalToRemoveAccount(true)
                setAccountID(account._id)
              }}><TrashIcon/></span>
            </div>
          </div>
        })
      }
    </div>

   {openModalToRemoveAccount &&
    <Modal setOpenModal={setOpenModalToRemoveAccount} title="Delete Account">
       <DeleteAccount setDeleteAccount={setDeleteAccount} setOpenModal={setOpenModalToRemoveAccount}  accountID={accountID}/>
    </Modal>}
    </>
  )
}
