import React, { useEffect, useState } from 'react'
import "./ResellersEmby.scss";
import { Header } from './components/Header/Header';
import useFetchApi from '../../../hook/useFetchApi';
import { ResellersList } from './components/ResellersList/ResellersList';
import { ResellersContext } from "./ResellersContext";
export const ResellersEmby = () => {

    return (
        <ResellersContext>
            <div className='reselelrs__emby'>
                <div className="emby_resellers__header">
                    <Header />
                </div>
                <div className="resellers__list">
                    <ResellersList />
                </div>
            </div>

        </ResellersContext>
    )
}
