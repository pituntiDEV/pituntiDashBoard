import React from 'react'
import { Ellipsis } from '../../../../../components/icons/Ellipsis'
import "./MoreInfo.scss";
import { DropDown } from '../../../../../components/DropDown/DropDown';
export const MoreInfo = ({ user }) => {
    return (
        <div className='more_info_plex_users'>
            <Ellipsis />
            <div className="info_container">
                <div className="side">
                    <div className="info">
                        <DropDown title='Vendedor' className='bg-danger'>
                            <div className="">{user.seller.email}</div>
                        </DropDown>
                    </div>
                    <div className="info">
                        <div className="title">Librerias</div>
                        <div className="number">
                            <div className="value">
                                {Array.isArray(user.data) ? user?.data?.reduce((acc, data) => {
                                    acc += data.numLibraries;
                                    return acc;
                                }, 0) :
                                    user.data.numLibraries
                                }
                            </div>
                        </div>
                    </div>
                    <div className="info">
                        <div className="title">Packges</div>
                        <div className="number">
                            <div className="value">
                                {user.packages.length}
                            </div>
                        </div>

                    </div>
                </div>
                <div className="side">
                    <div className="info">
                        <DropDown title='comentarios'>

                            <div className="">
                                {user.comments}
                            </div>
                        </DropDown>
                    </div>



                    <div className="info">
                        <div className="title">Servers total</div>
                        <div className="number">
                            <div className="value">
                                {user?.data?.length || 0}</div>

                        </div>
                    </div>
                    <div className="info">
                        <div className="title">Creditos</div>
                        <div className="number">
                            <div className="value">
                                {user.credits.length}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
