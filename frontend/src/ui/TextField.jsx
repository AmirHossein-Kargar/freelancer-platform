import React from 'react'

export default function TextField({ label, name, value, onchange }) {
    return (
        <div>
            <label htmlFor={name} className='mb-2 block'>{label}</label>
            <input value={value} onChange={onchange} id={name} type="text" className='textField__input' autoComplete='off' />
        </div>
    )
}
