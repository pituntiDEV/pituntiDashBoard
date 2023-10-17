import React, { useContext } from 'react'
import "./embyResellersList.scss";

import { CoinPlusIcon } from '../../../../../components/icons/InputWithIcon/CoinPlusIcon';
import { EditReseller } from './components/EditReseller/EditReseller';
import { DeleteReseller } from './components/DeleteReseller/DeleteReseller';
import { AddCredits } from './components/AddCredits/AddCredits';
import { Context } from '../../ResellersContext';
import { ChangeServersAndPackages } from './components/EditReseller/ChangeServersAndPackages';
export const ResellersList = () => {

    const { resellers, setResellers } = useContext(Context);

    return (
        <div className='embyResellersList'>

            <div className="emby-resellers">
                {
                    resellers.map(reseller => {
                        const data = {
                            reseller,
                            setResellers,
                            resellers
                        }
                        return (
                            <div className='reseller' key={reseller._id}>
                                <div className="header">
                                    {reseller.reseller.email}

                                </div>

                                <div className="footer">
                                    <ul>
                                        <li><AddCredits {...data} /></li>
                                        <li><ChangeServersAndPackages {...data} /></li>
                                        <li><EditReseller resellers={resellers} setResellers={setResellers} reseller={reseller} /></li>
                                        <li><DeleteReseller {...data} /></li>
                                    </ul>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}
