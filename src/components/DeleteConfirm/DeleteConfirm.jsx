import React from 'react'
import { BtnPrimary } from '../Buttons/BtnSucess/BtnPrimary'
import { BtnSecondary } from '../Buttons/BtnSucess/BtnSecondary'
import SWAlert from '../SwAlert/SWAlert'
import { ForzeDelete } from '../../pages/plex/components/ForzeDelete/ForzeDelete'

export const DeleteConfirm = ({ children, id, setOpenModal, exec, state } = {}) => {
    return (
        <div>
            {children}
            <div className="btns d-flex gap-3 flex-wrap">
                <BtnPrimary onClick={() => {
                    exec().then((data) => {
                        SWAlert.alert({
                            title: data.message || "Agregado"
                        })
                        setOpenModal(false);
                        state(s => !s);
                    })
                        .catch(error => {
                            SWAlert.error({ title: error.message || "Algo salio mal" })
                        })
                }} className="bg-danger" title="Si,Eliminar" />
                <BtnSecondary onClick={() => setOpenModal(false)} title="Cancelar" />

                <ForzeDelete id={id} setOpenModal={setOpenModal} state={state} />
            </div>
        </div>
    )
}
