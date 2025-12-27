import { IoClose } from "react-icons/io5";

export default function Modal({ open, onClose, title, children }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fadeIn">

            {/* backdrop */}
            <div
                className="absolute inset-0 bg-secondary-900/60 dark:bg-backdrop-dark/70 backdrop-blur-md animate-fadeIn"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative z-10 rounded-3xl bg-secondary-0 dark:bg-secondary-800 shadow-2xl border border-secondary-200 dark:border-secondary-700 p-5 sm:p-6 w-full max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl max-h-[85vh] sm:max-h-[80vh] overflow-hidden animate-slideIn">

                <div className="flex items-center justify-between border-b border-secondary-200 dark:border-secondary-700 pb-3 mb-5">

                    <h2 className="text-secondary-900 dark:text-secondary-50 font-semibold text-base sm:text-lg tracking-tight">{title}</h2>
                    <button
                        onClick={onClose}
                        className="hover:bg-secondary-100 dark:hover:bg-secondary-700 active:bg-secondary-200 dark:active:bg-secondary-600 rounded-2xl p-2 cursor-pointer transition-all duration-200 ease-out group focus:outline-none focus:ring-2 focus:ring-secondary-300/50 dark:focus:ring-secondary-600/50"
                        aria-label="بستن مودال"
                    >
                        <IoClose className="w-5 h-5 text-secondary-500 dark:text-secondary-400 group-hover:text-secondary-700 dark:group-hover:text-secondary-200 transition-colors duration-200" />
                    </button>

                </div>

                <div className="overflow-y-auto max-h-[calc(80vh-7rem)] scrollbar-thin scrollbar-thumb-secondary-300 dark:scrollbar-thumb-secondary-600 scrollbar-track-transparent">
                    {children}
                </div>

            </div>

            {/* CSS animations */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideIn {
                    from { 
                        opacity: 0;
                        transform: scale(0.92) translateY(-20px);
                    }
                    to { 
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .animate-slideIn {
                    animation: slideIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
                }
            `}</style>
        </div>
    );
}

