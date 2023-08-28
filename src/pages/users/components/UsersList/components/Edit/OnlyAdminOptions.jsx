import React from 'react'
import utils from "../../../../../../utils/date/index"

export const OnlyAdminOptions = ({ user, onChange, formData, langPage }) => {
    const isAdmin = user.admin._id == localStorage.getItem("_id");

    if (!isAdmin) return;
    return (
        <>
            <div className="form__group">
                <label htmlFor="expireAt">{langPage.expireAt}</label>
                <input type="date" onChange={onChange} value={utils.dateToHTML(formData.expireAt)} name="expireAt" id="" />
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
