import React from 'react'
import { CoinsIcon } from '../../../../components/icons/CoinsIcon';

import "./Options.scss";
import { CoinPlusIcon } from '../../../../components/icons/InputWithIcon/CoinPlusIcon';
import { ServerIcon } from '../../../../components/icons/ServerIcon';
import { Ellipsis } from '../../../../components/icons/Ellipsis';
import { Edit } from './components/Edit/Edit';
export const Options = ({ user }) => {
    const numLibs = user.data.reduce((acc, d) => {
        acc += d.numLibraries
        return acc
    }, 0)
    return (
        <div className='card-options'>
            <div className="option">
                <Edit user={user} />
            </div>
            <div className="option coin">
                <CoinPlusIcon />
            </div>

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
                <ServerIcon />
            </div>

            <div className="option remove">
                <i className="fa-solid fa-trash-can"></i>
            </div>

            <div className="option">
                <Ellipsis />
            </div>
        </div >
    )
}
