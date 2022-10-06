import React from 'react'
import { TrashIcon } from '../../icons/TrashIcon';
import "./DemosList.scss";
import dayjs from 'dayjs';
import { CoinPlusIcon } from '../../icons/InputWithIcon/CoinPlusIcon';
import Modal from '../../modal/Modal';
import { useState } from 'react';
import { DeleteConfirm } from '../../DeleteConfirm/DeleteConfirm';
import useFetchApi from '../../../hook/useFetchApi';
import { AddCreditToDemo } from '../AddCreditToDemo/AddCreditToDemo';
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
var calendar = require('dayjs/plugin/calendar')
dayjs.extend(calendar)

export const DemosList = ({ demos,setDemoState }) => {
    const [openEditModal,setOpenEditModal] = useState(false)
    const [openModalToAddCredits,setOpenModalToAddCredits] = useState(false);
    const [user,setUser] = useState({});
    const [deleteDemo,loadingDeleteDemo] = useFetchApi({
        url:`/api/demos/${user._id}`,
        method: 'DELETE',
    })

    return (
        <div className='demos_list container'>
            <div className="demos_container">
                {
                    demos.map(demo => {
                        const isActive = dayjs(demo.expireAt).isAfter(dayjs());
                        return <>
                            <div className={`demo_card ${!isActive &&  "no_active"}`}>
                                <div className="data">
                                    <div className="background">
                                        <span><img src={demo.data.invited.thumb} alt="" /></span>
                                    </div>
                                    <div className="info">

                                        <div>
                                            {isActive && dayjs(demo.expireAt).calendar()}

                                            {!isActive && <small>
                                                <small className='text-danger'>Vencio:</small>
                                                <div>
                                                    {dayjs(demo.expireAt).calendar()}
                                                </div>
                                            </small>}

                                        </div>

                                        <span> {demo.name}</span>
                                        <span> {demo.email}</span>
                                    </div>
                                </div>

                                <div className="controls">
                                    <CoinPlusIcon onClick={()=>{
                                        setUser(demo);
                                        setOpenModalToAddCredits(true)
                                    }} />
                                    <TrashIcon onClick={()=>{
                                        setUser(demo);
                                        setOpenEditModal(true)
                                    }} />
                                </div>
                            </div>
                        </>
                    })
                }
            </div>

        {openEditModal &&
            <Modal title="Delete demo" setOpenModal={setOpenEditModal}>
                <DeleteConfirm state={setDemoState} exec={deleteDemo} setOpenModal={setOpenEditModal}>
                    <span>Estas Seguro que quires eliminar a </span>
                    <span className='text-danger fw-bold'>{user.email}?</span>
                </DeleteConfirm>
            </Modal>}

            {
                openModalToAddCredits && 
                <Modal setOpenModal={setOpenModalToAddCredits}>
                    <AddCreditToDemo setDemoState={setDemoState} setOpenModal={setOpenModalToAddCredits} user={user}/>
                </Modal>
            }
        </div>
    )
}
