import React, { useState } from 'react'
import Modal from '../../../../components/modal/Modal';
import { NewEmbyUserForm } from './NewEmbyUserForm';
import { CreateEmbyUser } from './Header/createEmbyUser/CreateEmbyUser';

export const NewEmbyUser = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div className="buttons__new__user d-flex gap-3">
        <CreateEmbyUser />
      </div>

    </>
  )
}
