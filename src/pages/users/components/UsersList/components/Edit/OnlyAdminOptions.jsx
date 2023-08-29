import React, { useContext } from 'react'
import utils from "../../../../../../utils/date/index"
import { useGetSellersByUsers } from '../../../../../../hook/useGetSellersByUsers';
import { Context } from '../../../../PlexUsersContext';

export const OnlyAdminOptions = ({ user, onChange, formData, setFormData, langPage }) => {
    const isAdmin = user.admin._id == localStorage.getItem("_id");
    const { users } = useContext(Context);
    const [, sellers] = useGetSellersByUsers(users);

    const onChangeSeller = (e) => {
        const sellerToJson = JSON.parse(e.target.value)
        setFormData({ ...formData, seller: sellerToJson });

    }
    if (!isAdmin) return;

    return (
        <>
            <div className="form__group">
                <label htmlFor="expireAt">{langPage.expireAt}</label>
                <input type="date" onChange={onChange} value={utils.dateToHTML(formData.expireAt)} name="expireAt" id="" />
            </div>

            <div className="form__group">
                <label htmlFor="expireAt">{langPage.info.seller || "Vendedord"}</label>
                <select name="seller" onChange={onChangeSeller}>
                    {
                        sellers.map(seller => {
                            return <option key={seller._id} value={JSON.stringify(seller)} selected={user.seller._id == seller._id}>{seller.email}</option>
                        })
                    }
                </select>
            </div>


            <div className="form__group">
                <label htmlFor="connections">{langPage.connections}:</label>
                <input type="number" required min={1} onChange={onChange} value={formData.connections || ""} name="connections" id="" />
            </div>
            <div className="form__group">
                <label htmlFor="removeLibsDays">{langPage.removeLibs}</label>
                <input type="number" min={0} onChange={onChange} value={formData.removeLibsDays} name="removeLibsDays" id="" />
            </div>
            <div className="form__group">
                <label htmlFor="deleteDays">{langPage.deleteAt}</label>
                <input type="number" min={0} onChange={onChange} value={formData.deleteDays} name="deleteDays" id="" />
            </div>


        </>
    )
}
