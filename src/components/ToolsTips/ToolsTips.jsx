import React from 'react'

export const ToolsTips = () => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')

    return (
        <>
            <button type="button" className="btn btn-secondary"
                data-bs-toggle="tooltip" data-bs-placement="top"
                data-bs-custom-className="custom-tooltip"
                data-bs-title="This top tooltip is themed via CSS variables.">
                Custom tooltip
            </button>
        </>
    )
}
