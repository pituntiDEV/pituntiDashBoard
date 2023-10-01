import React from 'react'
import "./Card.scss";
import utils from "../../../../utils/date/index"
import { DropDown } from '../../../../components/DropDown/DropDown';
import { Options } from './Options';
import { ShowErrors } from './components/ShowErrors/ShowErrors';
import { WhatsappIcon } from '../../../../components/icons/WhatsappIcon';
export const Card = ({ user, setUsers, index, users, lang }) => {
    const userHandlerProps = {
        user,
        index,
        setUsers,
        users
    }
    const langPage = lang.pages.users.card;
    const expireAt = utils.formatDate(user.expireAt)
    const isExpired = utils.isExpired(user.expireAt);
    return (
        <div className='plex-user-card'>
            <div className={`card-header ${isExpired && "expired"}`}>
                <span className='email'>{user.email}</span>
                {user.whatsapp &&
                    <div className="whatsApp">

                        <a href={`https://api.whatsapp.com/send?phone=${user.whatsapp}&text=*`}> <WhatsappIcon /></a>
                    </div>
                }

                {user.error && <ShowErrors isExpired={isExpired} user={user} />}
                <div className="img">
                    <img loading='lazy' src={user.data[0]?.invited?.thumb || user.data?.invited?.thumb || user.thumb} alt="" />
                </div>
            </div>
            {/* Body */}

            <div className="card-body">
                <DropDown icon={<i className="fa-solid fa-circle-info"></i>} className='btn btn-secondary drop' title={langPage.moreInfo}>
                    <div className="card-body-container">

                        <div className="name info"><i className="fa-solid fa-id-card"></i><span>{user.name}</span></div>

                        <div className="servers info">
                            <i className="fa-solid fa-share-nodes"></i>
                            <span>{user.servers.length > 0 && user?.servers.map(s => s.data.name).join(",") || user?.data?.name}</span>
                        </div>

                        <div className="date info">
                            <i className="fa-solid fa-clock"></i>
                            <span>{expireAt}</span>
                        </div>

                    </div>
                </DropDown>
            </div>
            <div className="card-footer">

                <Options lang={lang} {...userHandlerProps} />
            </div>
        </div>
    )
}
