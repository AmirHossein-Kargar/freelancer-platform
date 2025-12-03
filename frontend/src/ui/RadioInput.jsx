export default function RadioInput({ label, name, value, checked, onChange }) {
    return (
        <label className="flex items-center gap-3 rounded-xl border border-secondary-200 dark:border-secondary-700 p-4 cursor-pointer transition-all duration-200 hover:border-primary-300 dark:hover:border-primary-500 has-checked:border-primary-500 has-checked:bg-primary-50 dark:has-checked:bg-primary-900/10">
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                className="h-4 w-4 border-secondary-300 dark:border-secondary-600 text-primary-900 focus:ring-primary-900"
            />
            <span className="text-sm font-medium text-secondary-900 dark:text-secondary-100">
                {label}
            </span>
        </label>
    );
}
