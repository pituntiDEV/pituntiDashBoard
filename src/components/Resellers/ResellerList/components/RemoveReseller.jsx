import React from 'react'
import useFetchApi from '../../../../hook/useFetchApi'
import { BtnPrimary } from '../../../Buttons/BtnSucess/BtnPrimary';
import { BtnSecondary } from '../../../Buttons/BtnSucess/BtnSecondary';
import SWAlert from '../../../SwAlert/SWAlert';

export const RemoveReseller = ({ user, setOpenModal }) => {
    //custom hooks
    const [deleteReseller, loading] = useFetchApi({
        url: `/api/resellers/shared/accounts/${user._id}`,
        method: "DELETE",
    })

    const deleteResellerFunc = () => {
        deleteReseller()
            .then((data) => {
                SWAlert.alert({
                    title: data.message || "Sucess"
                })
                setOpenModal(false);
            })
            .catch(error => {
                SWAlert.error({
                    title: error.message || "Algo salio mal"
                })
            })
    }
    return (
        <div>
            <div className="alert alert-danger fw-bold">Seguro quieres eliminar a {user.reseller?.email}</div>
            <div className="d-flex gap-3">
                <BtnPrimary onClick={deleteResellerFunc} title="SI,Eliminar" />
                <BtnSecondary type="button" title="Cancelar" />
            </div>
        </div>
    )
}
