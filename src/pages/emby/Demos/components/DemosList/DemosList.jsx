import React from 'react'
import "./DemosList.scss";
import utils from "../../../../../utils/date/index"
import { TrashIcon } from '../../../../../components/icons/TrashIcon';
import { EditSquareIcon } from '../../../../../components/icons/EditSquareIcon';
import { CoinPlusIcon } from '../../../../../components/icons/InputWithIcon/CoinPlusIcon';
import { useState } from 'react';
import Modal from '../../../../../components/modal/Modal';
import { DeleteDemo } from '../DeleteDemo/DeleteDemo';
import { AddCreditToDemo } from '../AddCreditToDemo/AddCreditToDemo';

export const DemosList = (props) => {
    const { demos, setDemos } = props;
    const [openModalToDelete, setOpenModalToDelete] = useState(false);
    const [openModalToAddCredits, setOpenModalToAddCredits] = useState(false);
    const [demo, setDemo] = useState(null);
    return (
        <div className='emby__demos'>
            <div className="demos__container">
                {
                    demos.map(demo => {
                        const isExpired = utils.isExpired(demo.expireAt);
                        return (
                            <div className='demo' key={demo._id}>
                                <div className={`header-demo ${isExpired && "expired"}`}>
                                    {demo.email}
                                </div>
                                <div className="demo-body">
                                    {utils.formatDate(demo?.expireAt, "DD/MMM/YYYY HH:mm:ss A")}
                                </div>
                                <hr />
                                <div className="options">
                                    <TrashIcon onClick={() => {
                                        setOpenModalToDelete(true);
                                        setDemo(demo);
                                    }} />
                                    <CoinPlusIcon onClick={() => {
                                        setOpenModalToAddCredits(true);
                                        setDemo(demo);
                                    }} />
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            {
                openModalToDelete &&
                <Modal title="Eliminar demo" setOpenModal={setOpenModalToDelete}>
                    <DeleteDemo {...props} demo={demo} setOpenModal={setOpenModalToDelete} />

                </Modal>
            }

            {
                openModalToAddCredits &&
                <Modal title="Agregar creditos" setOpenModal={setOpenModalToAddCredits}>
                    <AddCreditToDemo {...props} demo={demo} setOpenModal={setOpenModalToAddCredits} />
                </Modal>
            }
        </div>
    )
}
