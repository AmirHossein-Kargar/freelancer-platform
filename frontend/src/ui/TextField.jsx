export default function TextField({ label, name, value, onChange }) {
    return (
        <div className='space-y-2'>
            <label htmlFor={name} className='block text-sm font-medium text-secondary-900 dark:text-gray-200'>{label}</label>
            <input value={value} onChange={onChange} id={name} type="text" className='textField__input' autoComplete='off' placeholder='مثال: ۰۹۱۲۳۴۵۶۷۸۹' />
        </div>
    )
}
