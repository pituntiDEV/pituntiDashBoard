import React, { useState } from 'react'
import { CoinsIcon } from '../../../../components/icons/CoinsIcon';

import "./Options.scss";
import { CoinPlusIcon } from '../../../../components/icons/InputWithIcon/CoinPlusIcon';
import { ServerIcon } from '../../../../components/icons/ServerIcon';
import { Ellipsis } from '../../../../components/icons/Ellipsis';
import { Edit } from './components/Edit/Edit';
import { Delete } from './components/Delete/Delete';
import { AddCredits } from './components/AddCredits/AddCredits';
import { ChangePlexServer } from './components/ChangeServers/ChangePlexServer';
import Modal from '../../../../components/modal/Modal';
import { MoreInfo } from './components/MoreInfo';
import { ActivateCode } from '../ActivateCode/ActivateCode';
export const Options = (props) => {
    const { user, lang } = props;
    const langPage = lang.form;

    const [openAuthModal, setOpenAuthModal] = useState(false);
    return (
        <>
            <div className='card-options'>
                <div className="option">
                    <Edit langPage={langPage} user={user} />
                </div>
                <div className="option coin">
                    <AddCredits langPage={langPage} user={user} />
                </div>

                {user.auth &&
                    <div className="option auth" >
                        <ActivateCode user={user} />
                        <i className="fa-solid fa-user-lock" onClick={() => setOpenAuthModal(true)}></i>
                    </div>
                }

                {/* <div className="option">
                <i className="fa-solid fa-repeat"></i>
            </div> */}

                {/* <div className="option">
                <i className="fa-solid fa-circle-info"></i>
            </div> */}

                {/* <div className="option num-lib">
                <span className="num">{numLibs}</span>
                <i className="fa-solid fa-book"></i>
            </div> */}

                <div className="option">
                    <ChangePlexServer langPage={langPage} {...props} />
                </div>

                <div className="option remove">
                    <Delete langPage={langPage} user={user} />
                </div>

                <div className="option">
                    <MoreInfo user={user} />
                </div>


            </div >

            {openAuthModal &&
                <Modal setOpenModal={setOpenAuthModal} title="AUTH">
                    <p> EMAIL:{user.email}</p>
                    <p>PASSWORD: {user.auth.password}</p>

                </Modal>
            }
        </>
    )
}
