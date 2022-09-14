import React, { useEffect } from 'react'
import { useState } from 'react';
import { useGetAccountPackage } from '../../hook/useGetAccountPackage'
import "./DatosCuenta.scss"
export const DatosCuenta = ({setData,data, setOpenModal, setStep }) => {
    const [getPackages, loading] = useGetAccountPackage();
    const [packages, setPackage] = useState([]);

    useEffect(() => {
        getPackages().then(data => {
            setPackage(data);
        });
    }, [])

    return (
        <>
            <form className=" DatosCuenta form-horizontal p-5">

                {/* Paquetes */}
                <div className="pk">
                    <div className="pk__title">
                        <h2>Paquetes:</h2>
                        <hr />
                        {loading && <div className="pk__loading">Loading...</div>}
                    </div>
                    {
                        packages.map((pack, index) => {
                            return (
                                <div  key={index} >
                                 
                                        <p className="pk__list" onClick={()=>{
                                            setData(data=>({...data,pack:pack}))
                                            
                                        }}><i class="fa-solid fa-cube"></i> 
                                        {pack.name} 
                                        {data?.pack?._id  === pack._id && <i className="fa-solid fa-circle-check"></i>}
                                        </p>

                                        
                                </div>
                            )
                        })


                    }
                </div>

                <div className="info">
                    <div className="form-group credits">
                        <label htmlFor="exampleInputEmail1">Creditos:</label>
                        <div className='count'>
                            1 <span className="simbol">- +</span>
                        </div>
                    </div>

                    <div className="form-group credits">
                        <label htmlFor="exampleInputEmail1">Conecciones:</label>
                        <div className='count'>
                            1 <span className="simbol">- +</span>
                        </div>
                    </div>
                </div>

                {/* Botones */}
                <div className="btns form-group mt-5 d-flex gap-2">
                    <button type="button" className="  px-5 py-2 btn btn-primary">Next</button>
                    <button type="button" className=" px-5 py-2 btn btn-secondary" onClick={() => setStep(step => step - 1)}>Prev</button>
                    <button type="button" className=" px-5 py-2 btn btn-danger" onClick={() => {
                        setStep(1)
                        setOpenModal(false)
                        setData({})
                    }}>Cancel</button>
                </div>
            </form>

        </>
    )
}
