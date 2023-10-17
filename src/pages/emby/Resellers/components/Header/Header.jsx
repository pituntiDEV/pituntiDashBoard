import React, { useContext } from 'react'
import "./Header.scss";
import { NewReseller } from '../NewReseller/NewReseller';
import { Context } from '../../ResellersContext';
export const Header = () => {
    const { resellers, setResellers } = useContext(Context);
    return (
        <div className='emby_resellers_header2'>
            <div className="total">Total:{resellers.length}</div>
            <div className="options">
                <NewReseller />
            </div>
        </div>
    )
}
