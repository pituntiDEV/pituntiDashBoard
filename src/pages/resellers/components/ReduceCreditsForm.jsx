import React, { useEffect, useState } from 'react'
import useFetchApi from '../../../hook/useFetchApi';
import SWAlert from '../../../components/SwAlert/SWAlert';

export const ReduceCreditsForm = ({ reseller, setResellersState, setOpenModal }) => {
    const [credits, setCredits] = useState([]);
    const [creditsAvailable, setCreditsAvailables] = useState([])
    const [connections, setConnections] = useState([]);
    const [getResellerInfo] = useFetchApi({
        url: `/api/resellers/get/credits/${reseller._id}`,
        method: "GET"
    })

    const [takeOffCredits] = useFetchApi({
        url: `/api/resellers/delete/credits/${reseller._id}`,
        method: "DELETE"
    })

    const [formData, setFormData] = useState({
        connections: 0,
        credits: 0
    })

    useEffect(() => {
        getResellerInfo()
            .then(data => {
                setCredits(data.credits)
                const connectionsNum = data.credits.reduce((acc, credit) => {
                    if (!acc.includes(credit.conexion)) {
                        acc.push(credit.conexion)
                    }
                    return acc
                }, []).sort((a, b) => a - b);;

                setConnections(connectionsNum);
            })
    }, [])

    const onChangeConnections = (e) => {
        const connection = e.target.value;
        setFormData({ ...formData, connections: connection })
        const creditsNum = credits.filter(c => c.conexion == connection);
        setCreditsAvailables(creditsNum);
    }

    const submit = (e) => {
        e.preventDefault();
        takeOffCredits({ body: JSON.stringify(formData) })
            .then(data => {
                SWAlert.alert({
                    title: "Créditos eliminados"
                })
                setOpenModal(false);
                setResellersState(s => !s);
            })
            .catch(error => {
                SWAlert.error({
                    title: error.title
                })
            })
    }


    return (
        <form onSubmit={submit}>
            <div className="alert alert-danger text-center">
                Esta función eliminara los créditos seleccionados permanentemente.
            </div>
            <div className="form__group">
                <label htmlFor="">Conexiones</label>
                <select required onChange={onChangeConnections} name="conections" defaultValue={""} id="">
                    <option value="" disabled>Selecciona las conexiones</option>
                    {
                        connections.map(conn => {
                            return (
                                <option key={conn} value={conn}>{conn}</option>
                            )
                        })
                    }
                </select>
            </div>

            <div className="form__group">
                <label htmlFor="">Creditos</label>
                <select required onChange={(e) => {
                    setFormData({ ...formData, credits: e.target.value })
                }} name="credits" defaultValue={""} id="">
                    <option value="" disabled>Selecciona los créditos</option>
                    {
                        creditsAvailable.map((c, i) => {
                            return (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            )
                        })
                    }
                </select>
            </div>

            <div className="d-flex gap-3">
                <button className='btn btn-danger'>Quitar</button>
            </div>

        </form>
    )
}
