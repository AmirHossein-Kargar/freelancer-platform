import AuthHero from "../features/authentication/AuthHero";
import CompleteProfileForm from "../features/authentication/CompleteProfileForm";

export default function CompleteProfile() {
    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Form Section */}
            <div className="flex justify-center items-center flex-1 px-4 py-8 lg:px-12 lg:py-0">
                <CompleteProfileForm />
            </div>

            {/* Hero Section */}
            <div className="flex-1">
                <AuthHero step="complete" />
            </div>
        </div>
    );
}
