export default function TextField({ label, name, register, errors, type = "tel", validation }) {

    const handleInput = (e) => {
        e.target.value = e.target.value.replace(/[^0-9۰-۹]/g, '');
    };

    return (
        <div className='space-y-2'>
            <label htmlFor={name} className='block text-sm font-medium text-secondary-900 dark:text-gray-200'>
                {label}
            </label>

            <input
                id={name}
                type={type}
                className='textField__input'
                autoComplete='off'
                placeholder='مثال: 09123456789'
                onInput={handleInput}
                {...register(name, validation)}
            />

            {errors?.[name] && (
                <p className='text-red-500 text-sm'>{errors[name].message}</p>
            )}
        </div>
    );
}
