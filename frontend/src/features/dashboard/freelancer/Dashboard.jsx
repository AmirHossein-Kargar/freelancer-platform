import { HiChartPie, HiWallet, HiPlus } from "react-icons/hi2";
import { HiExclamationTriangle } from "react-icons/hi2";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../../services/authService";

export default function Dashboard() {
    const { data: user } = useQuery({
        queryKey: ["user"],
        queryFn: getUser
    });

    console.log("User data:", user);
    console.log("User status:", user?.status);
    console.log("isNotVerified:", user?.status !== 2);

    const isNotVerified = user?.status !== 2;

    return (
        <div className="min-h-screen w-full bg-secondary-0 dark:bg-secondary-900 px-10 py-8 select-none">
            <main className="mx-auto max-w-7xl">
                {/* Warning Banner */}
                {isNotVerified && (
                    <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            {/* Icon + Text */}
                            <div className="flex items-start gap-3">
                                <div className="shrink-0">
                                    <HiExclamationTriangle className="h-5 w-5 text-warning dark:text-warning" />
                                </div>
                                <p className="text-sm text-amber-800 dark:text-amber-200">
                                    شما در حال حاضر اجازه فعالیت در این بخش را ندارید. لطفاً برای فعال‌سازی کامل حساب کاربری خود، احراز هویت را تکمیل کنید.
                                </p>
                            </div>
                            {/* Button */}
                            <button className="shrink-0 rounded-lg bg-primary-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 cursor-pointer">
                                تکمیل احراز هویت
                            </button>
                        </div>
                    </div>
                )}

                {/* Disabled Content */}
                <div className={isNotVerified ? "opacity-50 pointer-events-none" : ""}>
                    {/* Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Active Projects */}
                        <div className="flex flex-1 flex-col gap-4 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-secondary-50 dark:bg-secondary-800 p-6">
                            <div className="flex items-center justify-between">
                                <p className="text-base font-medium text-secondary-900 dark:text-secondary-50">پروژه‌های فعال</p>
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-900/20 text-primary-900">
                                    <HiChartPie className="h-6 w-6" />
                                </div>
                            </div>
                            <p className="text-3xl font-bold tracking-tight text-secondary-900 dark:text-secondary-0">۰</p>
                        </div>

                        {/* Total Income */}
                        <div className="flex flex-1 flex-col gap-4 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-secondary-50 dark:bg-secondary-800 p-6">
                            <div className="flex items-center justify-between">
                                <p className="text-base font-medium text-secondary-900 dark:text-secondary-50">درآمد کل</p>
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-900/20 text-primary-900">
                                    <HiWallet className="h-6 w-6" />
                                </div>
                            </div>
                            <p className="text-3xl font-bold tracking-tight text-secondary-900 dark:text-secondary-0">۰ تومان</p>
                        </div>
                    </div>

                    {/* Recent Proposals */}
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold tracking-tight text-secondary-900 dark:text-secondary-0 px-4 pb-4">پیشنهادهای اخیر</h2>

                        <div className="overflow-hidden rounded-xl border border-secondary-200 dark:border-secondary-700 bg-secondary-50 dark:bg-secondary-800">
                            <div className="flex h-48 items-center justify-center text-center">
                                <p className="text-secondary-500 dark:text-secondary-400">هنوز پیشنهادی ارسال نکرده‌اید.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Floating Button */}
            <button className={`fixed bottom-6 left-6 flex items-center gap-2 rounded-full bg-primary-900 px-5 py-3 text-white shadow-lg hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-secondary-900 cursor-pointer ${isNotVerified ? "opacity-50 pointer-events-none" : ""}`}>
                <HiPlus className="h-5 w-5" />
                <span className="text-sm font-bold">جستجوی پروژه</span>
            </button>
        </div>
    );
}
