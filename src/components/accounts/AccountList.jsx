import { useEffect } from 'react';
import { useGetAccounts } from '../../hook/useGetAccounts';
export const AccountList = () => {
   const [getAccount,accounts,loading] =  useGetAccounts();
    useEffect(() => {
        getAccount();
    }, [])
  return (
    <>
      {
        loading && <div>Loading...</div>
      }

      {
        accounts.map((account) => {
            return <div key={account.email}>{account.email}</div>
        })
      }
    </>
  )
}
