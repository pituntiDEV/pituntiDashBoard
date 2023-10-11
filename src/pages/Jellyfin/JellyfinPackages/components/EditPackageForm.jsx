import React, { useEffect, useState } from 'react'
import { useGetEmbyLibraries } from '../../../../hook/jellyfin/useGetEmbyLibraries';
import { BtnPrimary } from '../../../../components/Buttons/BtnSucess/BtnPrimary';
import { BtnSecondary } from '../../../../components/Buttons/BtnSucess/BtnSecondary';
import useFetchApi from '../../../../hook/useFetchApi';
import SWAlert from '../../../../components/SwAlert/SWAlert';

export const EditPackageForm = ({ packages, packageToEdit, setPackages, setOpenModal }) => {
    // States
    const [libs, setLibs] = useState([]);
    const [formData, setFormData] = useState({
        _id: packageToEdit._id,
        name: packageToEdit.name,
        libs: packageToEdit.libs,
        account: packageToEdit.account
    });
    const [getLibs, loading] = useGetEmbyLibraries(formData.account);

    //Custom Hooks

    const [updatePackage, loadingUpdatingPackage] = useFetchApi({
        url: `/api/jellyfin/packages/${packageToEdit._id}`,
        method: "PUT"
    })

    // Effects
    useEffect(() => {
        getLibs()
            .then(data => {
                setLibs(data)
            })
    }, [])

    // funcions
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
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const submit = (e) => {
        e.preventDefault();
        updatePackage({ body: JSON.stringify(formData) })
            .then(data => {
                SWAlert.alert({
                    title: data.message || 'Updated'
                })


                const packagesCopy = [...packages];
                const packageIndex = packagesCopy.findIndex(p => p._id === packageToEdit._id);
                packagesCopy[packageIndex] = {
                    ...formData
                }

                setPackages(packagesCopy);
                setOpenModal(false)
            })

    }

    return (
        <form onSubmit={submit} className="editEmbyPackage">
            <div className="form__group">
                <label htmlFor="name">Nombre:</label>
                <input onChange={onChange} type="text" name="name" value={formData.name} id="name" />
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
