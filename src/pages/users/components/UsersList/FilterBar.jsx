import React from 'react'
import "./FilterBar.scss"
import { useGetPlexUsersSellersEmail } from '../../../../hook/plex/useGetPlexUsersSellersEmail'
import { useContext } from 'react'
import { Context } from '../../PlexUsersContext'
import { useGetAllServers } from '../../../../hook/plex/useGetAllServers'
export const FilterBar = ({ users, setFilterValue }) => {
    const { users: allUsers } = useContext(Context);
    const [sellerEmail] = useGetPlexUsersSellersEmail(allUsers);
    const [servers] = useGetAllServers();
    const onChange = (e) => {
        setFilterValue(filterValue => ({ ...filterValue, [e.target.name]: e.target.value }));
    }
    return (
        <div className='plex-filter-bar'>
            <div className="filters-num">
                <h2>Filters:</h2>
                <span>{users.length}</span>
            </div>
            <div className="plex-filters">
                <div className="plex-filter">
                    <input type="text" name="nameOrEmail" placeholder="Name or Email" onChange={onChange} />
                </div>
                <div className="plex-filter">
                    <select onChange={onChange} name="seller" id="" defaultValue={''}>
                        <option value="" >Todos los vendedores</option>
                        {sellerEmail.map(seller => {
                            return (
                                <option key={seller} value={seller}>{seller}</option>
                            )
                        })}

                    </select>
                </div>
                <div className="plex-filter">
                    <select name="state" defaultValue={""} placeholder="State" onChange={onChange}>
                        <option value="">Todos los estados</option>
                        <option value="active">Activos</option>
                        <option value="expired">Vencidos</option>
                    </select>
                </div>
                <div className="plex-filter">
                    <input type="number" name="byExpireDay" placeholder="By Expire Day" onChange={onChange} />
                </div>

                <div className="plex-filter">
                    <select onChange={onChange} defaultValue={""} name="server" id="server">
                        <option value="">Todos los servers</option>
                        {
                            servers.map(server => {
                                return (
                                    <option value={server._id} key={server._id}>
                                        {server.name}
                                    </option>
                                )
                            })
                        }

                    </select>
                </div>

            </div>

        </div>
    )
}
