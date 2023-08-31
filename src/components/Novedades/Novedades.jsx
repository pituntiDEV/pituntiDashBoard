import React from 'react'
import "./Novedades.scss";
import { TrashIcon } from '../icons/TrashIcon';
import { NovedadItem } from './NovedadItem';
const OnChangeIcon = <i className="fas fa-exchange-alt"></i>
const plusIcon = <i className="fa-regular fa-square-plus"></i>
const chartPieIcon = <i className="fa-solid fa-chart-pie"></i>
const filterIcon = <i className="fa-solid fa-filter"></i>
const whatsAppIcon = <i className="fa-brands fa-whatsapp"></i>
export const Novedades = () => {
    return (
        <div className='novedades'>
            <div className="">
                <i className="fas fa-arrow-up"></i>
            </div>

            <div className="novedades_list">

                <ol>
                    <NovedadItem icon={<TrashIcon />} message={" Se pueden eliminar créditos a los resellers."} />
                    <NovedadItem icon={OnChangeIcon} message={"Se agrego para poder cambiar de vendedor en los usuarios de Plex."} />
                    <NovedadItem icon={whatsAppIcon} message={"Se agrego el icono de WhatsApp en los usuarios de plex."} />
                    <NovedadItem icon={plusIcon} message={"Se agrego la restricción de transcodificacíon (1080 4k) en servers de plex. "} />
                    <NovedadItem icon={<i className="fa-solid fa-globe"></i>} message={"Se agrego demos públicos en plex."} />
                    <NovedadItem icon={plusIcon} message={"Se agrego la sección de tendencias en el home."} />
                    <NovedadItem icon={chartPieIcon} message={"Se agrego nueva gráfica de total usuarios activos y inactivos."} />
                    <NovedadItem icon={filterIcon} message={"Se agrego un filtro de próximos a vencer en activación por código."} />
                    <NovedadItem icon={plusIcon} message={"Se agrego para crear usuario personalizado en Emby."} />
                    <NovedadItem icon={plusIcon} message={"Se agrego la sección de resellers para Emby."} />
                    <NovedadItem icon={whatsAppIcon} message={"Se agrego para poder agregar un campo de WhatsApp en los dispositivos activados por código."} />
                    <NovedadItem icon={plusIcon} message={" Se agrego para permitir si los reseller puedan crear resellers."} />
                </ol>

            </div>

        </div>
    )
}
