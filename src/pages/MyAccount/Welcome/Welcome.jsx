import React, { useState } from 'react'
import { SearchIcon } from '../../../components/icons/SearchIcon';
import SWAlert from '../../../components/SwAlert/SWAlert';
import "./Welcome.scss";
export const Welcome = () => {
  const [email, setEmail] = useState("");
  const saveEmail = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/my-account-info?email=${email}`)
      .then(data => data.json())
      .then(data => {
        if (!data.error) {
          localStorage.setItem("email_to_info", email)
          window.location.reload();
        } else {
          SWAlert.error({
            title: "No se pudo encotrar el usuario"
          })
        }

      }).catch((error) => {
        SWAlert.error({
          title: error.message || "algo salio mal"
        })
      })
  }
  return (
    <div className='welcome'>
      <div className="login">
        <div className="email-form">
          <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Ingresa tu email' />
          <SearchIcon onClick={saveEmail} />
        </div>
      </div>
    </div>
  )
}
