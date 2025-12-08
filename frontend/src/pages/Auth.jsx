import { useState } from "react";
import AuthHero from "../features/authentication/AuthHero";
import AuthContainer from "../features/AuthContainer";

export default function Auth() {
    const [heroStep, setHeroStep] = useState("login");

    const handleStepChange = (step) => {
        setHeroStep(step === 1 ? "login" : "verify");
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-secondary-50 dark:bg-secondary-800">
            {/* Form Section - centered on mobile/tablet, left on desktop */}
            <div className="flex justify-center items-center flex-1 px-4 py-8 lg:px-12 lg:py-0">
                <AuthContainer onStepChange={handleStepChange} />
            </div>

            {/* Hero Section - hidden on mobile/tablet, visible on desktop */}
            <div className="flex-1">
                <AuthHero step={heroStep} />
            </div>

        </div>
    )
}
