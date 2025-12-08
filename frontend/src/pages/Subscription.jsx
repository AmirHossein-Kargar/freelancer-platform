import { useState } from "react";
import { HiCheckCircle } from "react-icons/hi2";

const PLANS = [
    {
        id: "basic",
        name: "پایه",
        description: "برای شروع مسیر فریلنسری و آشنایی با فرصت‌ های جدید",
        features: [
            "ارسال تا ۱۰ پیشنهاد در ماه",
            "دسترسی به تمام پروژه‌های عمومی",
            "پروفایل شخصی با امکانات پایه",
        ],
        price: null,
    },
    {
        id: "standard",
        name: "استاندارد",
        description: "برای فریلنسرهایی که می‌خواهند جدی‌تر پیش بروند",
        features: [
            "همه امکانات طرح پایه",
            "ارسال تا ۵۰ پیشنهاد در ماه",
            "پروفایل ویژه با نشان تایید",
            "مشاهده آمار بازدید پروفایل شما",
        ],
        price: 150000,
        yearlyPrice: 1440000,
        isPopular: true,
    },
    {
        id: "pro",
        name: "حرفه‌ای",
        description: "برای متخصصان و تیم‌هایی که می‌خواهند پیشتاز باشند",
        features: [
            "همه امکانات طرح استاندارد",
            "ارسال پیشنهاد نامحدود",
            "نمایش در اولویت نتایج جستجو",
            "پشتیبانی اختصاصی ۲۴ ساعته",
        ],
        price: 300000,
        yearlyPrice: 2880000,
    },
];

function ToggleSwitch({ checked, onChange }) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={onChange}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-900 focus:ring-offset-2 ${checked ? "bg-primary-900" : "bg-secondary-400 dark:bg-secondary-700"
                }`}
        >
            <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? "-translate-x-5" : "translate-x-0"
                    }`}
            />
        </button>
    );
}

function PlanCard({ plan, isPopular, isSelected, hasAnySelection, isYearly, onSelect }) {
    const handleClick = () => {
        if (plan.price) onSelect(plan.id);
    };

    const showBadge = isSelected || (isPopular && !hasAnySelection);
    const badgeText = isSelected ? "انتخاب شده ✓" : "محبوب‌ترین";

    const displayPrice = isYearly && plan.yearlyPrice ? plan.yearlyPrice : plan.price;
    const priceLabel = isYearly ? "تومان/سال" : "تومان/ماه";

    return (
        <div
            onClick={handleClick}
            className={`relative flex flex-col gap-4 rounded-xl p-6 transition-all duration-200 md:flex-row md:items-start md:gap-6 bg-secondary-0 dark:bg-secondary-800 ${plan.price ? "cursor-pointer" : "cursor-default"
                } ${isSelected
                    ? "border-2 border-primary-900 shadow-lg shadow-primary-300/50 dark:shadow-primary-900/30"
                    : "border border-secondary-200 dark:border-secondary-700 hover:border-primary-900 hover:shadow-lg hover:shadow-secondary-300/50 dark:hover:shadow-black/20"
                }`}
        >
            {showBadge && (
                <span className="absolute -top-3 right-6 inline-flex items-center rounded-full bg-primary-900 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                    {badgeText}
                </span>
            )}

            <div className="grow select-none">
                <h3 className="text-xl font-bold text-secondary-900 dark:text-secondary-50">{plan.name}</h3>
                <p className="mt-2 text-sm text-secondary-600 dark:text-secondary-400">{plan.description}</p>

                <div className="mt-4 border-t border-secondary-200 dark:border-secondary-700 pt-4">
                    <ul className="space-y-3">
                        {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-3">
                                <HiCheckCircle className="text-green-500 text-xl shrink-0" aria-hidden="true" />
                                <span className="text-sm text-secondary-900 dark:text-secondary-100">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="flex w-full flex-col items-center justify-start text-center md:w-48 md:shrink-0 md:border-r md:border-secondary-200 dark:md:border-secondary-700 md:pr-6 select-none">
                {plan.price ? (
                    <>
                        <div className="flex items-baseline gap-1 text-secondary-900 dark:text-secondary-50">
                            <span className="text-3xl font-extrabold">{displayPrice.toLocaleString("fa-IR")}</span>
                            <span className="text-sm font-bold whitespace-nowrap">{priceLabel}</span>
                        </div>
                        {isYearly && (
                            <p className="mt-1 text-xs text-green-600 dark:text-green-400 font-semibold">
                                ۲۰٪ صرفه‌جویی
                            </p>
                        )}
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onSelect(plan.id);
                            }}
                            className={`mt-4 flex w-full max-w-[480px] items-center justify-center rounded-xl h-10 px-4 text-sm font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-900 focus:ring-offset-2 ${isSelected
                                ? "bg-primary-900 text-white shadow-lg shadow-primary-300/50 dark:shadow-primary-900/50"
                                : "bg-secondary-100 dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 hover:bg-primary-900 hover:text-white"
                                }`}
                        >
                            {isSelected ? "انتخاب شده ✓" : "انتخاب این طرح"}
                        </button>
                    </>
                ) : (
                    <>
                        <span className="text-3xl font-extrabold text-secondary-900 dark:text-secondary-50">رایگان</span>
                        <button
                            type="button"
                            disabled
                            className="mt-4 flex w-full max-w-[480px] cursor-not-allowed items-center justify-center rounded-xl h-10 px-4 bg-secondary-100 dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 text-sm font-bold opacity-60"
                        >
                            طرح فعلی شما
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default function Subscription() {
    const [isYearly, setIsYearly] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);

    const handlePurchase = (planId, isYearly) => {
        console.log("خرید پلن:", planId, "نوع:", isYearly ? "سالانه" : "ماهانه");
        // اینجا میتونی درخواست پرداخت رو بفرستی
    };

    return (
        <div className="flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
            <div className="flex h-full grow flex-col">
                <div className="flex flex-1 justify-center py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
                    <main className="flex w-full max-w-5xl flex-col items-center gap-10">
                        <div className="flex w-full flex-col items-center gap-4 text-center select-none">
                            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-secondary-900 dark:text-secondary-50">
                                طرحی که با شما همراه می‌شود
                            </h1>

                            <p className="max-w-2xl text-lg text-secondary-600 dark:text-secondary-400">
                                هر کدام از این طرح‌ها برای مرحله‌ای از مسیر شما طراحی شده‌اند. طرحی را انتخاب کنید که با اهداف و نیازهای فعلی شما هم‌خوانی دارد.
                            </p>

                            <div className="mt-2 flex items-center gap-4 select-none">
                                <span className="text-sm font-medium text-secondary-900 dark:text-secondary-100">پرداخت ماهانه</span>
                                <ToggleSwitch checked={isYearly} onChange={() => setIsYearly(!isYearly)} />
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-secondary-900 dark:text-secondary-100">پرداخت سالانه</span>
                                    <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/50 px-2.5 py-0.5 text-xs font-semibold text-green-800 dark:text-green-300">
                                        ۲۰٪ صرفه‌جویی
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full space-y-4">
                            {PLANS.map((plan) => (
                                <PlanCard
                                    key={plan.id}
                                    plan={plan}
                                    isPopular={plan.isPopular}
                                    isSelected={selectedPlan === plan.id}
                                    hasAnySelection={selectedPlan !== null}
                                    isYearly={isYearly}
                                    onSelect={setSelectedPlan}
                                />
                            ))}
                        </div>

                        {selectedPlan && (
                            <button
                                type="button"
                                onClick={() => handlePurchase(selectedPlan, isYearly)}
                                className="w-full cursor-pointer max-w-md bg-primary-900 text-white rounded-xl h-12 px-6 text-base font-bold shadow-lg shadow-primary-300/50 dark:shadow-primary-900/50 hover:bg-primary-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-900 focus:ring-offset-2 select-none"
                            >
                                ادامه و تکمیل خرید
                            </button>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
