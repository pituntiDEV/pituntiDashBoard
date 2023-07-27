import React, { useState } from 'react'

export const Register = ({ account, users, setUsers, user, setUSersState, setOpenModal }) => {

  const [formData, setFormData] = useState({
    name: "",
  });
  return (
    <div>
      Register
      {user.invited.email}

    </div>
  )
}
