import React from 'react'

export const DatosPersonales = ({ setData,data,setStep,setOpenModal }) => {
    const onChange=(e)=>{
        setData(data=>({...data,[e.target.name]:e.target.value}))
    }
    return (
        <form className="form-horizontal p-5">
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Nombre</label>
                <input type="text" onChange={onChange} name="name" className="form-control" value={data.name} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Nombre" />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text" className="form-control" name="email" onChange={onChange} value={data.email} id="email" aria-describedby="emailHelp" placeholder="Email" />
            </div>

            <div className="form-group mt-5 d-flex gap-2">
                <button 
                type="button" 
                className=" px-5 py-2 btn btn-primary" aria-label="Guardar"
                onClick={()=>setStep(2)}>
                    Next
                </button>

                <button type="button" className="m px-5 py-2 btn btn-danger" aria-label="Guardar" onClick={()=>{
                    setStep(1)
                    setOpenModal(false);
                    setData({})
                }}>Cancel</button>
            </div>
        </form>
    )
}
