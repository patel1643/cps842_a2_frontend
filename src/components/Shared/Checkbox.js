import React from 'react'

function Checkbox({name, defaultChecked=false, handleChange, className}) {
    return (
        <div className="form-control w-52">
            <label className="cursor-pointer label">
            <span className="">{name}</span> 
            <input type="checkbox" className={`toggle ${className}`} defaultChecked={defaultChecked} onChange={() => handleChange()} />
            </label>
        </div>

    )
}

export default Checkbox