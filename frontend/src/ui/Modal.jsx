import { IoClose } from "react-icons/io5";

export default function Modal({ open, onClose, title, children }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 animate-fadeIn">

            {/* backdrop */}
            <div
                className="absolute inset-0 bg-secondary-800/50 backdrop-blur-sm animate-fadeIn"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative z-10 rounded-lg bg-secondary-0 shadow-lg p-4 sm:p-6 w-full max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto animate-slideIn">

                <div className="flex items-center justify-between border-b border-b-secondary-300 pb-2 mb-4 sm:mb-6">
                    <p className="text-secondary-700 font-bold text-sm sm:text-base">{title}</p>
                    <button
                        onClick={onClose}
                        className="hover:bg-secondary-100 rounded-md p-1 transition-colors duration-200"
                    >
                        <IoClose className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-500 cursor-pointer" />
                    </button>
                </div>

                {children}

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
                        transform: scale(0.95) translateY(-10px);
                    }
                    to { 
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }
                
                .animate-slideIn {
                    animation: slideIn 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}