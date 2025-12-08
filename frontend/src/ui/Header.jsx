import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    return (
        <div className="sticky top-0 z-50 w-full py-4">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <header className="flex h-16 items-center justify-between gap-4 border border-secondary-200 dark:border-secondary-700 bg-secondary-50 dark:bg-secondary-900 px-4 rounded-xl shadow-lg">
                    <div className="flex items-center gap-3">
                        <div
                            onClick={() => navigate("/")}
                            className="flex items-center gap-3 cursor-pointer"
                        >
                            <svg
                                className="h-8 w-8 text-primary-900 dark:text-primary-500"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-label="لنسر"
                            >
                                <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor" />
                            </svg>
                            <h1 className="text-lg font-bold text-secondary-900 dark:text-secondary-50">لنسر</h1>
                        </div>
                        <nav className="hidden md:flex items-center gap-6 mr-6">
                            <a href="#" className="text-sm font-medium text-secondary-600 dark:text-secondary-400 hover:text-primary-900 dark:hover:text-primary-500 transition-colors cursor-pointer">
                                پیدا کردن پروژه
                            </a>
                            <a href="#" className="text-sm font-medium text-secondary-600 dark:text-secondary-400 hover:text-primary-900 dark:hover:text-primary-500 transition-colors cursor-pointer">
                                پیدا کردن فریلنسر
                            </a>
                        </nav>
                    </div>

                    <button
                        onClick={() => navigate("/auth")}
                        className="min-w-[84px] h-10 rounded-xl px-4 bg-primary-900 dark:bg-primary-800 text-sm font-semibold text-white hover:bg-primary-800 dark:hover:bg-primary-700 transition-all duration-200 shadow-lg shadow-primary-300 dark:shadow-primary-900/50 cursor-pointer"
                    >
                        ورود / ثبت نام
                    </button>
                </header>
            </div>
        </div>
    );
}
