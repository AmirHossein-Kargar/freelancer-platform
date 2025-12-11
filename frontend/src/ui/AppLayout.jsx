import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function AppLayout() {
    return (
        <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    );
}
