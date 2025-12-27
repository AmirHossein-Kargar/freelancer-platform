
export default function ConfirmDelete({ resourceName, onClose, onConfirm, disabled}) {
    return (
        <div>
            <h2 className="font-bold text-base mb-8 text-secondary-900 dark:text-secondary-50">آیا از حذف {resourceName} مطمعن هستید؟</h2>

            <div className="flex justify-end items-center gap-x-3">
                <button className="btn badge--primary" disabled={disabled} onClick={onConfirm}>تایید</button>
                <button className="btn badge--secondary" onClick={onClose} disabled={disabled}>انصراف</button>
            </div>
        </div>
    )
}
