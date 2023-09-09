import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { Context } from '../../NoRegisterContext'
import useFetchApi from '../../../../hook/useFetchApi'
import { useEffect } from 'react'
import { PlexServersAndPackages } from '../../../users/PlexServersAndPackages/PlexServersAndPackages'
import SWAlert from '../../../../components/SwAlert/SWAlert'

export const RegisterForm = ({ user, setOpenModal }) => {
    //Constex
    const { accountID, setPlexUsers, plexUsers } = useContext(Context);


    //State
    const [formData, setFormData] = useState({
        name: "",
        email: user.invited.email || user.invited.username || user.invited.title,
        data: user,
        expireAt: new Date(),
        plexUserID: user.invited.id,
        whatsapp: "",
        status: "active",
        accountID,
        servers: [],
        packages: [],
        connections: 0,
        comments: ""


    })
    const [resellers, setResellers] = useState([]);
    //hooks
    const [registerUser, loadingRegisterUser] = useFetchApi({
        url: `/api/plex/register`,
    })
    //Custom hooks
    const [getResellers] = useFetchApi({
        url: "/api/resellers/",
        method: "GET",
    })
    // Effects
    useEffect(() => {
        getResellers()
            .then(data => setResellers(data))
    }, [])

    //Functions
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const submit = (e) => {
        e.preventDefault();
        registerUser({ body: JSON.stringify(formData) })
            .then(data => {
                const plexUsersUpdated = plexUsers.filter(u => u.id != user.id);
                setPlexUsers(plexUsersUpdated);
                setOpenModal(false);
                SWAlert.alert({
                    title: "Success"
                })
            })
            .catch(error => {
                SWAlert.error({
                    title: error.message || "Algo salio mal"
                })
            })

    }
    return (
        <form onSubmit={submit}>

            <div className="form__group">
                <label htmlFor="name">Name:</label>
                <input onChange={onChange} type="text" name="name" required minLength={2} id="" />
            </div>
            <div className="form__group">
                <label htmlFor="comments">comentarios:</label>
                <input onChange={onChange} type="text" name="comments" />
            </div>

            <div className="form__group">
                <label htmlFor="name">Fecha expiracion:</label>
                <input onChange={onChange} type="date" name="expireAt" required />
            </div>

            <div className="form__group">
                <label htmlFor="connections">Conexiones:</label>
                <input onChange={onChange} type="number" min={1} name="connections" required />
            </div>

            <div className="form__group">
                <label htmlFor="seller">Vendedor:</label>
                <select onChange={onChange} name="seller" defaultValue={""} id="">
                    <option value={""}>Yo</option>
                    {
                        resellers.map(resell => {
                            return <option value={resell.reseller._id} key={resell._id}>{resell.reseller.email}</option>
                        })
                    }
                </select>
            </div>

            <PlexServersAndPackages setFormData={setFormData} formData={formData} />

            <div className="form__group">
                <label htmlFor="whatsapp">WhatsApp:</label>
                <input onChange={onChange} type="text" name="whatsapp" placeholder='+19565453355' />
            </div>

            <div className="form__group">
                <label htmlFor="deleteDays">Eliminar despues de vencido (DIAS):</label>
                <input onChange={onChange} type="number" name="deleteDays" min={0} />
            </div>

            <div className="form__group">
                <label htmlFor="removeLibsDays">Quitar Libs despues de vencido (DIAS):</label>
                <input onChange={onChange} type="number" name="removeLibsDays" min={0} />
            </div>



            <div className="d-flex gap-3">
                <button className='btn btn-primary'>Registrar</button>
            </div>

        </form>
    )
}
