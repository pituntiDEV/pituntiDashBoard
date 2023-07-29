import React from 'react'
import "./PlexOptions.scss";
import { DropDown } from '../../../components/DropDown/DropDown';
import { CreditsAndConnections } from '../CreditsAndConnections/CreditsAndConnections';
import { WhatsappIcon } from '../../../components/icons/WhatsappIcon';

export const PlexOptions = ({ formData, setFormData, onChange }) => {
    const myID = localStorage.getItem("_id");
    const isAdmin = myID == formData.admin;
    return (
        <>

            <div className='plexOptions'>
                <h2>Opciones</h2>
                {isAdmin ? <>
                    <div className="plex-options">
                        <div className="plex-option">
                            <label htmlFor="connections">Conexiones:</label>
                            <input type="number" min={1} onChange={onChange} value={formData.connections} required name="connections" id="connections" />
                        </div>
                        <div className="plex-option">
                            <label htmlFor="credits">Mes:</label>
                            <input type="number" min={1} onChange={onChange} value={formData.credits} required name="credits" id="credits" />
                        </div>
                    </div>
                </> :
                    <CreditsAndConnections setFormData={setFormData} formData={formData} servers={formData.servers} />
                }

                <div className="plex-options">
                    <div className="plex-option">
                        <label htmlFor="deleteDays">Eliminar usuarios despues de vencido en (dias)</label>
                        <input min={0} type="text" value={formData.deleteDays} onChange={onChange} name="deleteDays" placeholder='Dejar en blaco para no eliminar' />
                    </div>
                    <div className="deleteLibs plex-option">
                        <label htmlFor="">Quitar librerias despues de vencido (dias)</label>
                        <input min={0} type="number" value={formData.removeLibsDays} onChange={onChange} name="removeLibsDays" placeholder='Dejar en blaco para no quitar librerias' />
                    </div>
                </div>
            </div>


            <DropDown title='OPTIONES EXTRAS' className='btn btn-warning '>
                <div className="form__group">
                    <label htmlFor="email">Comentarios:</label>
                    <input type="text" placeholder='Opcional' onChange={onChange} value={formData.comments} name="comments" id="comments" />

                </div>

                <div className="form__group">
                    <label htmlFor="whatsapp"><WhatsappIcon /> Whatsapp:</label>
                    <input type="tel" onChange={onChange} value={formData.whatsapp} name="whatsapp" id="whatsapp" />
                </div>
            </DropDown>



        </>
    )
}
