import React from 'react'
import { ServerIcon } from '../../../../components/icons/ServerIcon'
import { useState } from 'react'
import Modal from '../../../../components/modal/Modal'
import { BtnPrimary } from '../../../../components/Buttons/BtnSucess/BtnPrimary'
import { BtnSecondary } from '../../../../components/Buttons/BtnSucess/BtnSecondary'
import { useGetEmbyAccounts } from '../../../../hook/emby/useGetEmbyAccounts'
import { useGetEmbyLibraries } from '../../../../hook/emby/useGetEmbyLibraries'
import { useEffect } from 'react'
import { useGetAllPackages } from '../../../../hook/jellyfin/useGetAllPackages'
import useFetchApi from '../../../../hook/useFetchApi'
import SWAlert from '../../../../components/SwAlert/SWAlert'

export const ChangeServer = ({ user, users, setUsers }) => {
    //States
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState({
        packages: user.packages
    });

    //Customs Hooks
    const [packages, setPackages, loadingPackages] = useGetAllPackages()
    const [changePackages, loading] = useFetchApi({
        url: `/api/jellyfin/users/packages/${user._id}`,
        method: "PUT"
    })


    //Functions
    const onChangePack = (pack) => {
        const existe = formData.packages.find(pk => pk == pack._id);
        if (existe) {
            const packages = formData.packages.filter(pk => pk != pack._id);
            setFormData({ ...formData, packages });
        }
        else {
            const packages = [...formData.packages, pack._id];
            setFormData({ ...formData, packages })
        }
    }
    const submit = (e) => {
        e.preventDefault();
        changePackages({ body: JSON.stringify(formData) })
            .then(data => {
                SWAlert.alert({
                    title: data.message,
                })
                setOpenModal(false);
                const userIndex = users.findIndex(u => u._id == user._id);
                const usersUpdated = [...users];
                usersUpdated[userIndex] = data.data;
            })
            .catch(error => {
                SWAlert.error({
                    title: error.message,
                })
            })

    }
    return (
        <li>
            <ServerIcon onClick={() => setOpenModal(true)} />

            {openModal &&
                <Modal title='Change Packages' setOpenModal={setOpenModal}>
                    <form className='emby_change_server' onSubmit={submit}>



                        <div className="form__group embyLibs">
                            {
                                packages.map(pack => {
                                    const isSelected = formData.packages.includes(pack._id)
                                    return (
                                        <div onClick={() => onChangePack(pack)} className={`libs ${isSelected && "active"}`} key={pack._id}>
                                            {pack.name}
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className="d-flex gap-3">
                            <BtnPrimary title="Change" />
                            <BtnSecondary type="button" title="Cancelar" onClick={() => setOpenModal(false)} />
                        </div>

                    </form>

                </Modal>}
        </li>
    )
}
