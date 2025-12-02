import SendOTPForm from "../features/authentication/SendOTPForm";
import CheckOTPForm from "../features/authentication/CheckOTPForm";
import AuthHero from "../features/authentication/AuthHero";

export default function Auth() {
    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Form Section - centered on mobile/tablet, left on desktop */}
            <div className="flex justify-center items-center flex-1 px-4 py-8 lg:px-12 lg:py-0">
                <div className="w-full max-w-sm rounded-2xl bg-secondary-0 dark:bg-secondary-800 px-8 py-10 shadow-lg">
                    <SendOTPForm />
                    {/* <CheckOTPForm /> */}
                </div>
            </div>

            {/* Hero Section - hidden on mobile/tablet, visible on desktop */}
            <div className="flex-1">
                <AuthHero />
            </div>
            
        </div>
    )
}
