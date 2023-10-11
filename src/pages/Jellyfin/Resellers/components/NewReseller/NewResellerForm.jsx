import React, { useContext, useState } from 'react'
import { useGetEmbyAccounts } from '../../../../../hook/jellyfin/useGetEmbyAccounts'
import { SearchInput } from '../../../../../components/UsersList/SearchInput/SearchInput';
import { useSearchAdmins } from '../../../../../hook/useSearchAdmins';
import "./NewResellerForm.scss"
import { UserTieIcon } from '../../../../../components/icons/UserTieIcon';
import { ServerIcon } from '../../../../../components/icons/ServerIcon';
import { PackagesSelected } from './PackagesSelected';
import policy from "../../../policy.json"
import SWAlert from '../../../../../components/SwAlert/SWAlert';
import useFetchApi from '../../../../../hook/useFetchApi';
import { Context } from '../../ResellersContext';
export const NewResellerForm = ({ setOpenModal }) => {


    const [servers, loading] = useGetEmbyAccounts();
    const { resellers, setResellers } = useContext(Context);


    const [query, setQuery] = useState("");
    const [admins] = useSearchAdmins(query);
    const [formData, setFormData] = useState({
        reseller: null,
        credits: 0,
        connections: 0,
        servers: [],
        delete: "",
        disconnect: "",
        config: policy,
        demos: 0,
        demosTime: 0,
    })

    //Custom Hooks
    const [addReseller, loadingToAddReseller] = useFetchApi({
        url: `/api/jellyfin/resellers`,
        method: "POST"
    })

    //Functions
    const onChangeCheckbox = (e) => {
        const config = { ...formData.config }
        config[e.target.name] = e.target.checked
        setFormData({ ...formData, config });
    }

    const onChangeInputs = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const onChangeServers = (e, server_id) => {
        const isChecked = e.target.checked;

        if (isChecked) {
            const servers = [...formData.servers, {
                server: server_id,
                packages: []
            }];


            setFormData({ ...formData, servers })
        } else {
            const servers = [...formData.servers].filter(s => s.server != server_id);
            setFormData({ ...formData, servers })
        }
    }

    //Submit

    const submit = async (e) => {
        try {
            e.preventDefault();
            if (!formData.reseller) throw new Error("Seleccione un reseller")
            if (formData.servers.length < 1) throw new Error("Seleccione un server");
            if (!formData.servers.every(s => s.packages.length > 0)) throw new Error("Seleccione uno o mas paquetes de los servers seleccionados");

            const data = await addReseller({ body: JSON.stringify(formData) });
            SWAlert.alert({
                title: data.message
            })
            setResellers([...resellers, data.reseller])
            setOpenModal(false)
        } catch (error) {
            SWAlert.error({
                title: error.message
            })
        }

    }

    return (
        <>
            <SearchInput onChange={(e) => setQuery(e.target.value)} placeholder="Burcar reseller" />
            <div className="resellers__emby__container">
                {admins.map(admin => {

                    return (
                        <div onClick={() => setFormData({ ...formData, reseller: admin._id })} key={admin._id} className={`reseller ${formData.reseller === admin._id && "selected"}`}>
                            <div className="email">
                                <div className="name">
                                    <UserTieIcon /> {admin.name}
                                </div>
                                <p>{admin.email}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            {formData.reseller &&
                <form onSubmit={submit} className='form__new__emby__reseller'>

                    <div className="form__group">
                        <label htmlFor="credits">Creditos:</label>
                        <input type="number" onChange={onChangeInputs} name="credits" required min={1} id="credits" />
                    </div>

                    <div className="form__group">
                        <label htmlFor="connections">Conexiones:</label>
                        <input type="number" onChange={onChangeInputs} name="connections" required min={1} id="connections" />
                    </div>

                    <div className="form__group">
                        <label htmlFor="disconnect">Desactivar usuarios despues de vencido (DIAS):</label>
                        <small className='text-muted'>Dejar en blanco para no desactivar usuario</small>
                        <input type="number" onChange={onChangeInputs} name="disconnect" id="disconnect" />
                    </div>


                    <div className="form__group">
                        <label htmlFor="delete">Eliminar usuarios despues de vencido (DIAS):</label>
                        <small className='text-muted'>Dejar en blanco para no eliminar usuario</small>
                        <input type="number" onChange={onChangeInputs} name="delete" id="delete" />
                    </div>

                    <div className="form__group">
                        <label htmlFor="demos">Demos permitidos Por Dia:</label>

                        <input type="number" min={0} onChange={onChangeInputs} name="demos" id="demos" />
                    </div>

                    {formData.demos > 0 &&
                        <div className="form__group">
                            <label htmlFor="demosTime">Duracion de demos (Horas):</label>
                            <input type="number" required min={1} onChange={onChangeInputs} name="demosTime" id="demosTime" />
                        </div>
                    }

                    <div className="form__group emby_servers">
                        <label htmlFor="servers" className='fw-bold'>Servers:</label>
                        <div className="options">
                            {
                                servers.map(server => {
                                    return (
                                        <div className='option' key={server._id}>
                                            <div className="value">
                                                <input type="checkbox" onChange={(e) => onChangeServers(e, server._id)} name="" id="" />
                                                <ServerIcon /> {server.data.name}

                                            </div>


                                        </div>
                                    )
                                })
                            }

                        </div>

                    </div>



                    <div className="options">

                        <div className="option">
                            <div className="title">
                                Acceso a la Biblioteca
                            </div>
                            {
                                formData.servers.map(server => {
                                    const serverDb = servers.find(serv => serv._id == server.server);

                                    return (
                                        <PackagesSelected formData={formData} setFormData={setFormData} key={server.server} server={serverDb} server_id={server.server} />
                                    )
                                })
                            }

                        </div>

                        <div className="option">
                            <div className="title">
                                Permisos de acceso
                            </div>
                            <div className="value">
                                <input type="checkbox" checked={formData.config.EnableLiveTvAccess} onChange={onChangeCheckbox} name="EnableLiveTvAccess" id="" /> TV en Vivo
                            </div>
                            <div className="value">
                                <input type="checkbox" checked={formData.config.EnableLiveTvManagement} onChange={onChangeCheckbox} name="EnableLiveTvManagement" id="" />
                                Administración de Grabaciones de TV en Vivo

                            </div>


                        </div>

                        <div className="option">
                            <div className="title">Descargas</div>
                            <div className="value">
                                <input type="checkbox" checked={formData.config.EnableContentDownloading} onChange={onChangeCheckbox} name="EnableContentDownloading" id="" />
                                Permitir descarga de medios
                            </div>
                            <div className="value">
                                <input type="checkbox" checked={formData.config.EnableSyncTranscoding} onChange={onChangeCheckbox} name="EnableSyncTranscoding" id="" />
                                Permitir descarga de medios que requieran transcodificación
                            </div>
                        </div>

                    </div>

                    <div className="d-flex gap-3">
                        <button disabled={loadingToAddReseller} type='submit' className='btn btn-primary'>Agregar</button>
                        <button disabled={loadingToAddReseller} className='btn btn-secondary' onClick={() => setOpenModal(false)} > Cancelar</button>
                    </div>
                </form >
            }
        </>
    )
}
