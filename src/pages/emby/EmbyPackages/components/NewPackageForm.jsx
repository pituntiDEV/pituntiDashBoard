import React, { useEffect, useState } from 'react'
import { useGetEmbyLibraries } from '../../../../hook/emby/useGetEmbyLibraries'
import { useGetEmbyAccounts } from '../../../../hook/emby/useGetEmbyAccounts';
import "./NewPackageForm.scss"
import { BtnPrimary } from '../../../../components/Buttons/BtnSucess/BtnPrimary';
import { BtnSecondary } from '../../../../components/Buttons/BtnSucess/BtnSecondary';
import useFetchApi from '../../../../hook/useFetchApi';
import SWAlert from '../../../../components/SwAlert/SWAlert';

export const NewPackageForm = ({ setOpenModal, packages, setPackages }) => {
    // States
    const [formData, setFormData] = useState({
        name: "",
        account: null,
        libs: []
    })
    const [libs, setLibs] = useState([]);
    const [getLibs, loading] = useGetEmbyLibraries(formData.account);
    // Cusntom Hooks
    const [accounts, loadingAccounts] = useGetEmbyAccounts();
    const [createPackage, loadingCreatingPackage] = useFetchApi({
        url: `/api/emby/packages`
    })

    useEffect(() => {
        if (!formData.account) return;
        getLibs()
            .then(data => {
                setLibs(data);
            })
    }, [formData.account])

    //Funtions
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onChangeLibs = (lib) => {
        const existe = formData.libs.find(l => l.Id === lib.Id);
        if (!existe) {
            const libsUpdated = [...formData.libs, lib];
            setFormData({ ...formData, libs: libsUpdated });

        }
        else {
            const libsUpdated = formData.libs.filter(l => l.Id !== lib.Id);
            setFormData({ ...formData, libs: libsUpdated });
        }
    }

    const submit = (e) => {
        e.preventDefault();
        createPackage({ body: JSON.stringify(formData) })
            .then(data => {
                SWAlert.alert({
                    title: data.message
                })
                setPackages([...packages, data.data])
                setOpenModal(false)
            }).catch(error => {
                SWAlert.error({
                    title: error.message
                })
            })

    }
    return (
        <form onSubmit={submit} className='NewEmbyPackageForm'>


            <div className="form__group libs">
                <label className="label" htmlFor="accounts">Nombre:</label>
                <input type="text" name="name" id="name" placeholder='name' onChange={onChange} />
            </div>

            <div className="form__group libs">
                <label className="label" htmlFor="accounts">Emby Accounts:</label>
                <select onChange={onChange} defaultValue={""} name="account" id="account">
                    <option value="" disabled >Selecciona una cuenta emby</option>
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
            <div className="form__group libs">
                {libs.length > 0 && <h3 className='label'>Library:</h3>}
                <div className="libs_container">
                    {
                        libs.map(lib => {
                            const active = formData.libs.find(l => l.Id === lib.Id)
                            return (
                                <div onClick={() => onChangeLibs(lib)} className={`lib ${active && "active"}`} key={lib.Id}>
                                    <div className="header">
                                        {lib.CollectionType}
                                    </div>
                                    {lib.Name}

                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <hr />
            <div className="d-flex gap-3">
                <BtnPrimary title="Agregar" />
                <BtnSecondary type="button" title="Cancelar" />
            </div>
        </form>
    )
}
