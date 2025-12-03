import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-secondary-0 dark:bg-secondary-900">
            <div className="flex h-full grow flex-col">
                <main className="flex flex-1 items-center justify-center px-10 py-8">
                    <div className="flex max-w-7xl flex-col items-center text-center">
                        {/* Icon */}
                        <div className="text-primary-900 dark:text-primary-500">
                            <svg
                                className="h-28 w-28"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72" />
                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72" />
                                <path d="m10.5 7.5 3 3" />
                                <path d="m13.5 16.5-3-3" />
                            </svg>
                        </div>

                        {/* Title */}
                        <h1 className="mt-8 select-none text-4xl font-extrabold tracking-tight text-secondary-900 dark:text-secondary-50 sm:text-5xl">
                            ۴۰۴ - صفحه یافت نشد
                        </h1>

                        {/* Description */}
                        <p className="mt-4 select-none text-lg text-secondary-600 dark:text-secondary-400">
                            متأسفانه صفحه‌ای که به دنبال آن هستید، پیدا نشد.
                        </p>

                        {/* Button */}
                        <button
                            onClick={() => navigate(-1)}
                            className="mt-10 cursor-pointer select-none rounded-xl bg-primary-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-300 transition-all hover:bg-primary-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-900 dark:shadow-primary-900/50 dark:hover:bg-primary-700"
                        >
                            بازگشت به صفحه قبل
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default NotFound;
