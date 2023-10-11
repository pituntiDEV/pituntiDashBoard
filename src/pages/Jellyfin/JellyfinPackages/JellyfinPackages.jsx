import React from 'react'
import "./JellyfinPackages.scss";
import { Options } from './components/Options';
import { useGetAllPackages } from '../../../hook/jellyfin/useGetAllPackages';
import { PackagesList } from './components/PackagesList';
export const JellyfinPackages = () => {
    const [packages, setPackages, loading] = useGetAllPackages();

    return (
        <div className='jellyfin__packages'>
            <div className="bar">
                <div className="count">Total:{packages.length}</div>
                <div className="options">
                    <Options packages={packages} setPackages={setPackages} />
                </div>
            </div>
            <PackagesList packages={packages} setPackages={setPackages} loading={loading} />
        </div>
    )
}
