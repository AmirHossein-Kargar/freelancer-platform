import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppLayout() {
    return (
        <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 flex flex-col">
            <Header />
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-[240px_1fr] gap-4 p-4">
                {/* sidebar */}
                <aside className="hidden sm:block bg-white dark:bg-secondary-800 rounded-lg shadow-sm border border-secondary-200 dark:border-secondary-700">
                    <Sidebar />
                </aside>
                <main className="overflow-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
