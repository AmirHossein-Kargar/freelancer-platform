export default function AuthHero() {
    return (
        <div className="hidden lg:flex relative flex-col items-center justify-center bg-white dark:bg-secondary-900 p-12 text-center overflow-hidden h-full">
            {/* Background overlay */}
            <div className="absolute inset-0 z-0 bg-primary-50/50 dark:bg-primary-900/10 mask-[radial-gradient(ellipse_100%_70%_at_50%_0%,#000_70%,transparent_110%)]" />

            {/* Background pattern */}
            <svg
                aria-hidden="true"
                className="absolute inset-0 z-0 h-full w-full stroke-primary-100 dark:stroke-primary-900/20 mask-[radial-gradient(100%_100%_at_top,white,transparent)]"
            >
                <defs>
                    <pattern id="pattern-bg" width="200" height="200" patternUnits="userSpaceOnUse" x="50%" y="-1">
                        <path d="M.5 200V.5H200" fill="none" />
                    </pattern>
                </defs>
                <svg x="50%" y="-1" className="overflow-visible fill-gray-50/20 dark:fill-gray-900/20">
                    <path
                        d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                        strokeWidth="0"
                    />
                </svg>
                <rect width="100%" height="100%" fill="url(#pattern-bg)" strokeWidth="0" />
            </svg>

            {/* Content */}
            <div className="max-w-xl w-full relative z-10 select-none">
                {/* Icon */}
                <div className="flex justify-center mb-8">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white dark:bg-secondary-800 shadow-sm border border-gray-100 dark:border-secondary-700">
                        <svg className="w-12 h-12 text-primary-900" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.378 1.602a.75.75 0 00-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03zM21.75 7.93l-9 5.25v9.32l9-5.25V7.93zM2.25 7.93v9.32l9 5.25v-9.32l-9-5.25z" />
                        </svg>
                    </div>
                </div>

                {/* Text content */}
                <div className="space-y-6">
                    <h2 className="text-4xl font-extrabold leading-tight text-secondary-900 dark:text-secondary-100">
                        پلتفرم هوشمند فریلنسینگ
                    </h2>
                    <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                        اتصال سریع و مطمئن متخصصان به پروژه‌ های واقعی.
                        <br />
                        با ابزارهای پیشرفته مدیریت پروژه، همکاری حرفه‌ای را تجربه کنید.
                    </p>
                </div>
            </div>
        </div>
    )
}
