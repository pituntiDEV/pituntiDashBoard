import React from 'react'
import "./FilterBar.scss"
import { useGetPlexUsersSellersEmail } from '../../../../hook/plex/useGetPlexUsersSellersEmail'
import { useContext } from 'react'
import { Context } from '../../PlexUsersContext'
import { useGetAllServers } from '../../../../hook/plex/useGetAllServers'
export const FilterBar = ({ users, lang, setFilterValue }) => {
    const langPage = lang.pages.users.filters;

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
                    <input type="text" name="nameOrEmail" placeholder={langPage.nameOrEmail} onChange={onChange} />
                </div>
                <div className="plex-filter">
                    <select onChange={onChange} name="seller" id="" defaultValue={''}>
                        <option value="" >{langPage.allSellers}</option>
                        {sellerEmail.map(seller => {
                            return (
                                <option key={seller} value={seller}>{seller}</option>
                            )
                        })}

                    </select>
                </div>
                <div className="plex-filter">
                    <select name="state" defaultValue={""} placeholder="State" onChange={onChange}>
                        <option value="">{langPage.allStates}</option>
                        <option value="active">{langPage.active}</option>
                        <option value="expired">{langPage.expired}</option>
                    </select>
                </div>
                <div className="plex-filter">
                    <input type="number" name="byExpireDay" placeholder="By Expire Day" onChange={onChange} />
                </div>

                <div className="plex-filter">
                    <select onChange={onChange} defaultValue={""} name="server" id="server">
                        <option value="">{langPage.allServers}</option>
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
