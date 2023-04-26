import React, { useContext, useEffect, useState } from 'react'
import { useGetSharedServers } from '../../../../hook/useGetSharedServers'
import { SearchReseller } from '../../NewResellerForm/SearchReseller/SearchReseller';
import "./SharedAccount.scss";
import { useGetAccountsSharedWithMe } from '../../../../pages/resellers/hooks/useGetAccountsSharedWithMe';
import { BtnPrimary } from '../../../Buttons/BtnSucess/BtnPrimary';
import { BtnSecondary } from '../../../Buttons/BtnSucess/BtnSecondary';
import SWAlert from '../../../SwAlert/SWAlert';
import useFetchApi from '../../../../hook/useFetchApi';
import { AppContext, appContext } from '../../../../context/AppContext';
import { Spinner } from '../../../Spinner/Spinner';
export const SharedAccount = ({ setOpenModal, setNewResellerState }) => {
    const appCOntext = useContext(appContext);



    //States

    const [formData, setFormData] = useState({
        account: "",


    });
    //Custom Hooks
    const [accounts, loading] = useGetAccountsSharedWithMe();
    const [shareAccount, loadingShared] = useFetchApi({
        url: `/api/resellers/shared/accounts`,
        method: "POST",
    })


    //Functions
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const submit = (e) => {
        e.preventDefault();
        if (!formData.reseller) {
            SWAlert.error({
                title: "Selecciona un usuario"
            })
            return;
        }
        shareAccount({ body: JSON.stringify(formData) })
            .then(data => {
                SWAlert.alert({
                    title: data.message || "Success"
                })
                setOpenModal(false);
                setNewResellerState(s => !s);
                appCOntext.setState({ ...appCOntext.state, onChangeCredits: !appCOntext.onChangeCredits });
            })
            .catch(error => {
                SWAlert.error({
                    title: error.message || "Algo salio mal"
                })
            })
        console.log(formData);
    }
    return (
        <form onSubmit={submit} className='shared__credits'>
            <SearchReseller title="Buscar usuario" state={formData} setState={setFormData} />

            <div className="form__group">
                {accounts.length > 0 && <h3>Accounts:</h3>}
                <select required name="account" onChange={onChange} className="accounts" defaultValue={""}>
                    <option value="" disabled>Seleccione una cuenta</option>

                    {
                        accounts.map(acc => {
                            return (
                                <option value={acc._id} key={acc._id}>
                                    {acc.admin.email}
                                </option>
                            )
                        })
                    }
                </select>
            </div>

            <div className="form__group">
                <label htmlFor="credits">Credits:</label>
                <input type="number" required min={1} name="credits" onChange={onChange} id="credits" />
            </div>

            <div className="form__group">
                <label htmlFor="credits">Conexiones:</label>
                <input type="number" required min={1} name="conexion" onChange={onChange} id="conexion" />
            </div>

            {!loadingShared ?
                <div className="d-flex gap-3">
                    <BtnPrimary title="Agregar" />
                    <BtnSecondary type="button" onClick={() => setOpenModal(false)} title="Cancelar" />
                </div> :
                <Spinner />
            }
        </form>
    )
}
