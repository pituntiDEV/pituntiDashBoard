import React, { useEffect, useState } from 'react'
import { BtnPrimary } from '../../../../components/Buttons/BtnSucess/BtnPrimary';
import SWAlert from '../../../../components/SwAlert/SWAlert';
import useFetchApi from '../../../../hook/useFetchApi';
import { useGetEmbyLibraries } from '../../../../hook/emby/useGetEmbyLibraries';
import { useGetAllPackages } from '../../../../hook/emby/useGetAllPackages';
import "./styles.scss";
import { useGetPackagesByAccount } from '../../../../hook/emby/useGetPackagesByAccount';

export const NewEmbyUserForm = ({ setOpenModal, setUpdateUserState }) => {



    // State
    const [accounts, setAccounts] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        userName: "",
        credits: 1,
        connections: 1,
        packages: [],
        account: null,
    });


    // Custom Hooks
    const [packages, , loadingPackagesByAccount] = useGetPackagesByAccount(formData.account)
    const [addUser, loading] = useFetchApi({
        url: `/api/emby/users`,
        method: "POST"
    })
    const [getAccounts, loadingGetAccounts] = useFetchApi({
        url: `/api/emby/accounts`,
        method: "GET"
    });
    // Effects
    useEffect(() => {
        getAccounts()
            .then(accounts => {
                setAccounts(accounts)
            })
    }, []);


    // Functions
    const onChangePackages = (pack) => {
        const existe = formData.packages.find(pk => pk._id === pack._id);
        if (!existe) {
            const packagesUpdated = [...formData.packages, pack];
            setFormData({ ...formData, packages: packagesUpdated })
        } else {
            const packagesUpdated = formData.packages.filter(pk => pk._id !== pack._id);
            setFormData({ ...formData, packages: packagesUpdated })
        }
    }
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const submit = (e) => {
        e.preventDefault();
        if (formData.packages.length == 0) {
            SWAlert.error({
                title: "Selecciona minimo un paquete"
            })

            return
        }

        addUser({ body: JSON.stringify(formData) })
            .then(data => {
                SWAlert.alert({
                    title: "Agregado con exito"
                })

                setOpenModal(false);
                setUpdateUserState(s => !s);
            })
            .catch(error => {
                SWAlert.error({
                    title: error.message || "Algo salio mal "
                })
            })
    }
    return (
        <form className='Add_Emby_User' onSubmit={submit}>
            <div className="form__group">
                <label htmlFor="name">Name:</label>
                <input onChange={onChange} type="text" minLength={3} required name="name" id="name" />
            </div>
            <div className="form__group">
                <label htmlFor="email">email:</label>
                <input type="email" onChange={onChange} required name="userName" id="email" />
            </div>

            <div className="form__group">
                <label htmlFor="credits">Credits:</label>
                <input type="number" onChange={onChange} min={1} value={formData.credits} required name="credits" id="credits" />
            </div>



            <div className="form__group">
                <label htmlFor="conexiones">Conexiones:</label>
                <input type="number" onChange={onChange} min={1} value={formData.connections} required name="connections" id="conexiones" />
            </div>

            <div className="form__group">
                <label htmlFor="daysToDeleteAfterExpired">Eliminar despues de vencido(DIAS):</label>
                <input type="number" placeholder='Dejar en blanco para no activar' onChange={onChange} min={1} value={formData.daysToDeleteAfterExpired} name="daysToDeleteAfterExpired" id="daysToDeleteAfterExpired" />
            </div>

            <div className="form__group">
                <label htmlFor="daysToRemoveLibsAfterToExpired">Quitar LIBS despues de vencido(DIAS):</label>
                <input type="number" placeholder='Dejar en blanco para no activar' onChange={onChange} min={1} value={formData.daysToRemoveLibsAfterToExpired} name="daysToRemoveLibsAfterToExpired" id="daysToRemoveLibsAfterToExpired" />
            </div>

            <div className="form__group">
                <label htmlFor="credits">Server:</label>
                <select onChange={onChange} required name="account" defaultValue={""} id="account">
                    <option value="" disabled>Selecciona un Server</option>
                    {
                        accounts.map(account => {
                            return (
                                <option value={account._id} key={account._id}>
                                    {account.data.name}
                                </option>
                            )
                        })
                    }
                </select>
            </div>


            <div className="form__group">
                <div className="packages">
                    {
                        packages.map(pack => {
                            const isSelected = formData.packages.find(pk => pk._id === pack._id);
                            return (
                                <div onClick={() => onChangePackages(pack)} key={pack._id} className={`pack ${isSelected && "selected"}`}>
                                    {pack.name}
                                </div>
                            )
                        })
                    }

                </div>
            </div>

            <div className="buttonss">
                <BtnPrimary title="Agregar" />
            </div>
        </form>
    )
}
