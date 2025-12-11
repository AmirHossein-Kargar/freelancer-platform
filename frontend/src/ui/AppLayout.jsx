import { Outlet } from "react-router-dom";

export default function AppLayout() {
    return (
        <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
            <main>
                <Outlet />
            </main>
        </div>
    );
}
