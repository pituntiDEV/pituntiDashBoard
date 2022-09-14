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
import { EditResellerForm } from './EditResellerForm/EditResellerForm';
import { ServersAndPackageEdit } from './EditResellerForm/ServersAndPackageEdit/ServersAndPackageEdit';
import "./ResellerList.scss";
export const ResellersList = ({ setTotalResellers }) => {
    //State
    const [resellers, setResellers] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openModalServers, setOpenModalServers] = useState(false)
    const [openModalCredits, setOpenModalCredits] = useState(false)
    const [resellerToEdit, setResellerToEdit] = useState(null);

    //Custom hooks
    const [getResellers, loading] = useFetchApi({
        url: "/api/resellers/",
        method: "GET",
    })

    useEffect(() => {
        getResellers().then(data => {
            setTotalResellers(data.length);
            console.log(data);
            setResellers(data);
        })
    }, [])
    return (
        <div className='resellers__list'>
            <div className='resellers__container'>
                <div className="resellers">
                    {resellers.map(resell => {
                        const { reseller, servers, _id } = resell
                        const serversNames = servers.map(s => s.server.data.name)

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
                                        <span className="circle1">{reseller.name[0]}</span>
                                        <span className="circle2"></span>
                                    </div>

                                    <div className="servers__count">

                                        <span> <ServerIcon /> [ {serversNames.join(",")} ]</span>
                                    </div>
                                </div>

                                <div className="controls">

                                    <span onClick={()=>{
                                         setOpenModalCredits(true)
                                         setResellerToEdit(resell)
                                    }}><CoinPlusIcon /> </span>
                                    <span onClick={() => {
                                        setOpenModalServers(true)
                                        setResellerToEdit(resell)
                                    }}><ServerIcon /></span>
                                    <span onClick={() => {
                                        setResellerToEdit(resell)
                                        setOpenModal(true)
                                    }}><i className="fa-solid fa-user-gear"></i></span>
                                    <span className='text-danger'><TrashIcon></TrashIcon></span>

                                </div>


                                {openModal &&
                                    <Modal title={`Reseller Config: ${resellerToEdit.reseller.name}`} setOpenModal={setOpenModal}>
                                        <EditResellerForm reseller={resellerToEdit} />
                                    </Modal>
                                }

                                {openModalServers &&
                                    <Modal title={`Reseller Servers: ${resellerToEdit.reseller.name}`} setOpenModal={setOpenModalServers}>
                                        <ServersAndPackageEdit setOpenModal={setOpenModalServers} reseller={resellerToEdit} />
                                    </Modal>
                                }

                                {openModalCredits &&
                                    <Modal title={`Reseller Credits: ${resellerToEdit.reseller.name}`} setOpenModal={setOpenModalCredits}>
                                        <CreditsEdit setOpenModal={setOpenModalServers} reseller={resellerToEdit} />
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
