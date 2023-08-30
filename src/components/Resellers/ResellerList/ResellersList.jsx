import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import useFetchApi from '../../../hook/useFetchApi'
import { CoinsIcon } from '../../icons/CoinsIcon';
import { EditSquareIcon } from '../../icons/EditSquareIcon';
import { CoinPlusIcon } from '../../icons/InputWithIcon/CoinPlusIcon';
import { ServerIcon } from '../../icons/ServerIcon';
import { TrashIcon } from '../../icons/TrashIcon';
import Modal from '../../modal/Modal';
import { CreditsEdit } from './EditResellerForm/CreditsEdit/CreditsEdit';
import { DeleteReseller } from './EditResellerForm/DeleteReseller/DeleteReseller';
import { EditResellerForm } from './EditResellerForm/EditResellerForm';
import { ServersAndPackageEdit } from './EditResellerForm/ServersAndPackageEdit/ServersAndPackageEdit';
import "./ResellerList.scss";
import { OptionsNotAdmin } from './components/OptionsNotAdmin';
import { EditReseller } from '../../../pages/resellers/components/EditReseller';
import { ChangeServers } from '../../../pages/resellers/components/ChangeServers';
import { AddCredits } from '../../../pages/resellers/components/AddCredits';
import { DeletePlexReseller } from '../../../pages/resellers/components/DeletePlexReseller';
import { ReduceCredits } from '../../../pages/resellers/components/ReduceCredits';
export const ResellersList = ({ setResellers, setResellersState, resellers }) => {
    //State
    const [openModal, setOpenModal] = useState(false);
    const [openModalServers, setOpenModalServers] = useState(false)
    const [openModalCredits, setOpenModalCredits] = useState(false)
    const [resellerToEdit, setResellerToEdit] = useState(null);
    const [openModalDelete, setOpenModalDelete] = useState(false);

    return (
        <div className='resellers__list'>
            <div className='resellers__container'>
                <div className="resellers">
                    {resellers.map(resell => {
                        const { reseller, servers, _id, admin, creator } = resell
                        const serversNames = servers.map(s => s.server?.data?.name)
                        const creditAvailable = resell.credits.filter(c => c.new == true);
                        return (
                            <div className='reseller' key={_id}>
                                <div className="info">
                                    <h2 className='name'>
                                        {reseller.name}
                                    </h2>

                                    <small className="email">
                                        {reseller.email}
                                    </small>

                                    <div className="logo">
                                        <span className="circle1">{reseller.name && reseller?.name[0]}</span>
                                        <span className="circle2"></span>
                                    </div>

                                    <div className="servers__count">

                                        <span> <ServerIcon /> [ {serversNames.join(",")} ]</span>
                                    </div>
                                </div>

                                <div className="controls">

                                    {
                                        !creator &&
                                        <AddCredits creditAvailable={creditAvailable} setResellersState={setResellersState} reseller={resell} />
                                    }

                                    {
                                        !creator &&
                                        <ReduceCredits creditAvailable={creditAvailable} setResellersState={setResellersState} reseller={resell} />
                                    }

                                    {!creator &&
                                        <ChangeServers setResellersState={setResellersState} reseller={resell} />
                                    }

                                    {!creator &&
                                        < EditReseller setResellersState={setResellersState} reseller={resell} />
                                    }


                                    {!creator &&
                                        <DeletePlexReseller setResellersState={setResellersState} reseller={resell} />
                                    }

                                    {/* Optiones para resellers de los resellers */}
                                    {creator &&
                                        <OptionsNotAdmin creditAvailable={creditAvailable?.length} setNewResellerState={setResellersState} user={resell} />}
                                </div>




                                {
                                    openModalDelete &&
                                    <Modal title="Eliminar Reseller" setOpenModal={setOpenModalDelete}>
                                        <DeleteReseller setResellersState={setResellersState} setOpenModal={setOpenModalDelete} reseller={resellerToEdit} />
                                    </Modal>
                                }
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
