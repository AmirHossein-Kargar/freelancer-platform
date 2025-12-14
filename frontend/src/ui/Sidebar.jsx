import { NavLink } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { HiOutlineCollection } from "react-icons/hi";

export default function Sidebar() {
    return (
        <div className="h-full p-4">
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
        </div>
    );
}