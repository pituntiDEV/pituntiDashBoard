import React from 'react'

export const BtnLoading = ({ text = true }) => {
    return (
        <>
            {
                text ?
                    <button className="btn btn-primary" type="button" disabled>
                        <span className="spinner-border spinner-border-sm m-2" aria-hidden="true"></span>
                        <span role="status">Loading...</span>
                    </button>
                    :
                    <button className="btn btn-primary" type="button" disabled>
                        <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                        <span className="visually-hidden" role="status">Loading...</span>
                    </button>
            }
        </>
    )
}
