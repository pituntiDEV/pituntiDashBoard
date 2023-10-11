import React from 'react'
import { TrashIcon } from '../../../../components/icons/TrashIcon'
import { EditSquareIcon } from '../../../../components/icons/EditSquareIcon'
import { DeletePackageForm } from './DeletePackageForm'
import { EditPackage } from './EditPackage'

export const PackagesList = ({ packages, setPackages, loading }) => {
    return (
        <div className='packages__list'>
            <div className='packages'>
                {
                    packages.map(pack => {
                        return (
                            <div key={pack._id} className='pack'>
                                <div className="header">
                                    {pack.name}
                                </div>
                                <div className="options">

                                    <div className="option edit">
                                        <EditPackage packages={packages} setPackages={setPackages} packageToEdit={pack} />
                                    </div>

                                    <div className="option eliminar">
                                        <DeletePackageForm packages={packages} setPackages={setPackages} packageToDelete={pack} />
                                    </div>

                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}
