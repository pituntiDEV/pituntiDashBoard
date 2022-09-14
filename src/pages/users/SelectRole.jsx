import React from 'react'

export const SelectRole = ({ setData,data,setStep,setOpenModal }) => {
  return (
    <div className='roles'>
        <div className='role'>
            <span className='role-name'>Admin</span>
        </div>

        <div className='role'>
            <span className='role-name'>Reseller</span>
        </div>

          {/* Botones */}
          <div className="btns form-group mt-5 d-flex gap-2">
                    <button type="button" className="  px-5 py-2 btn btn-primary" onClick={() => {
                        setStep(step=>step+1)
                    }}>Next</button>
                    <button type="button" className=" px-5 py-2 btn btn-secondary" onClick={() => setStep(step => step - 1)}>Prev</button>
                    <button type="button" className=" px-5 py-2 btn btn-danger" onClick={() => {
                        setStep(1)
                        setOpenModal(false)
                        setData({})
                    }}>Cancel</button>
                </div>
    </div>
  )
}
