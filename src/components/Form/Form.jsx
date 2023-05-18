import React from 'react'
import { BtnPrimary } from '../Buttons/BtnSucess/BtnPrimary';
import { BtnSecondary } from '../Buttons/BtnSucess/BtnSecondary';
import "./Form.scss";

export const Form = ({ options = [], formData, setFormData, setOpenModal, btnSubmitTitle } = {}) => {
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onChangeList = (li) => {
        const { name, data } = li;

        const existe = formData[name].findIndex(n => n == data._id);

        if (existe < 0) {
            const NewData = [...formData[name], data._id];
            setFormData({ ...formData, [name]: NewData });
        } else {
            const NewData = formData[name].filter(pk => pk != data._id);
            setFormData({ ...formData, [name]: NewData });
        }

    }
    return (
        <div className='Form'>
            {
                options?.inputs.length > 0 && options.inputs.map(opt => {
                    const { name, type, min, max, required, placeholder } = opt;
                    return (
                        <div key={opt.name} className="form__group">
                            <label htmlFor={name}>{name.charAt(0).toUpperCase() + name.slice(1)}</label>
                            {type == "number" &&
                                <input type="number" onChange={onChange} placeholder={placeholder} name={name} min={min} max={max} required={required} />
                            }
                            {
                                type == "text" &&
                                <input type={"text"} onChange={onChange} required={required} name={name} />
                            }
                            {
                                type != "text" && type != "number" &&
                                <input type={type} onChange={onChange} required={required} name={name} />
                            }

                        </div>
                    )
                })

            }

            {
                options.selects && options.selects.map(select => {
                    const { name, title, placeholder } = select
                    return (
                        <div key={select.name} className="form__group">
                            <label htmlFor={name}>{title.charAt(0).toUpperCase() + title.slice(1)}</label>
                            <select onChange={onChange} defaultValue={""} id={name} name={name}>
                                <option value="" disabled >{placeholder}</option>
                                {
                                    select.options && select.options.map(opt => {
                                        return <option key={opt._id} value={opt._id}>{opt.name}</option>
                                    })
                                }

                            </select>
                        </div>
                    )
                })
            }


            {
                options.list && options.list.map(li => {

                    return (
                        <div key={li.name} className="list_container">
                            {li.data.map(item => {
                                const existe = formData[li.name].includes(item._id)
                                return (
                                    <div onClick={() => onChangeList({
                                        data: item,
                                        name: li.name
                                    })} key={item._id} className={`list ${existe && "active"}`}>
                                        {item.name}
                                    </div>
                                )
                            })}
                        </div>
                    )


                })
            }

            <div className="d-flex gap-3">
                <BtnPrimary title={btnSubmitTitle || "Agregar"} />
                <BtnSecondary onClick={() => setOpenModal(false)} title="Cancelar" />
            </div>
        </div>
    )
}
