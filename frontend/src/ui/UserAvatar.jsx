import { useState, useRef, useEffect } from "react";
import { HiUser, HiArrowRightOnRectangle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

export default function UserAvatar({ user }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 h-10 rounded-xl px-3 bg-primary-900 dark:bg-primary-800 text-white hover:bg-primary-800 dark:hover:bg-primary-700 transition-all duration-200 shadow-lg shadow-primary-300 dark:shadow-primary-900/50 cursor-pointer"
            >
                <div className="w-7 h-7 rounded-full bg-primary-700 dark:bg-primary-600 flex items-center justify-center">
                    <HiUser className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium hidden sm:block">{user?.name || "کاربر"}</span>
            </button>

            {isOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-xl bg-secondary-0 dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 shadow-xl overflow-hidden">
                    <div className="px-4 py-3 border-b border-secondary-200 dark:border-secondary-700">
                        <p className="text-sm font-semibold text-secondary-900 dark:text-secondary-50">
                            {user?.name || "کاربر"}
                        </p>
                        <p className="text-xs text-secondary-600 dark:text-secondary-400 mt-1" dir="ltr">
                            {user?.phoneNumber}
                        </p>
                    </div>

                    <div className="py-1">
                        <button
                            onClick={() => {
                                navigate("/dashboard/freelancer");
                                setIsOpen(false);
                            }}
                            className="w-full px-4 py-2 text-right text-sm text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors"
                        >
                            داشبورد
                        </button>
                        <button
                            onClick={handleLogout}
                            className="w-full px-4 py-2 text-right text-sm text-error hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors flex items-center gap-2"
                        >
                            <HiArrowRightOnRectangle className="w-4 h-4" />
                            خروج
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
