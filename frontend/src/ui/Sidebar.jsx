import { NavLink } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { HiOutlineCollection } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { FiSettings, FiLogOut } from "react-icons/fi";
import Badge from "./Badge";

export default function Sidebar() {

    const user = {
        name: "کاربر تستی",
        role: "کارفرما",
        avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=128&h=128&dpr=2&q=70&crop=faces&fit=crop"
    }

    return (
        <div className="h-full p-4 flex flex-col">
            <div className="space-y-1">
                <NavLink to="/owner/dashboard" className={({ isActive }) => `w-full p-2 text-sm ${isActive ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300' : 'text-secondary-700 dark:text-secondary-300'} hover:bg-primary-50 hover:text-primary-700 dark:hover:bg-primary-900/20 dark:hover:text-primary-300 rounded transition-colors duration-200 cursor-pointer flex items-center gap-2`}>
                    <GoHome className="w-4 h-4" />
                    <span>خانه</span>
                </NavLink>
                <NavLink to="projects" className={({ isActive }) => `w-full p-2 text-sm ${isActive ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300' : 'text-secondary-700 dark:text-secondary-300'} hover:bg-primary-50 hover:text-primary-700 dark:hover:bg-primary-900/20 dark:hover:text-primary-300 rounded transition-colors duration-200 cursor-pointer flex items-center gap-2`}>
                    <HiOutlineCollection className="w-4 h-4" />
                    <span>پروژه ها</span>
                </NavLink>
            </div>

            <div className="flex-1" />

            <div className="pt-4 border-t border-secondary-200 dark:border-secondary-700">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-700/40 transition-colors duration-200">
                    {/* avatar */}
                    <div className="shrink-0">
                        {user.avatarUrl ? (
                            <img
                                src={user.avatarUrl}
                                alt={user.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 flex items-center justify-center font-semibold">
                                <FaUser />
                            </div>
                        )
                        }
                    </div>

                    {/* info */}
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-secondary-900 dark:text-secondary-100 truncate">
                                {user.name}
                            </p>
                            <Badge size="xs">{user.role}</Badge>
                        </div>
                    </div>

                </div>

                {/* actions */}
                <div className="mt-2 grid grid-cols-2 gap-2">
                    <NavLink
                        to="/owner/settings"
                        className={({ isActive }) => `flex items-center justify-center gap-2 text-xs p-2 rounded ${isActive ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300' : 'text-secondary-700 dark:text-secondary-300'} hover:bg-primary-50 hover:text-primary-700 dark:hover:bg-primary-900/20 dark:hover:text-primary-300 transition-colors duration-200 cursor-pointer`}
                    >
                        <FiSettings className="w-4 h-4" />
                        تنظیمات
                    </NavLink>
                    <button
                        type="button"
                        onClick={() => {
                            // اینجا logout واقعی‌ت رو صدا بزن
                            console.log("logout");
                        }}
                        className="flex items-center justify-center gap-2 text-xs p-2 rounded text-red-600 dark:text-red-400 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20 dark:hover:text-red-300 transition-colors duration-200 cursor-pointer"
                    >
                        <FiLogOut className="w-4 h-4" />
                        خروج
                    </button>
                </div>

            </div>

        </div>
    );
}