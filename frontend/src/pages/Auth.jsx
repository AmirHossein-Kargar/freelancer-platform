import SendOTPForm from "../features/authentication/SendOTPForm";
import CheckOTPForm from "../features/authentication/CheckOTPForm";

export default function Auth() {
    return (

        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-sm rounded-2xl bg-secondary-0 dark:bg-secondary-800 px-8 py-10 shadow-lg">
                <SendOTPForm />
                {/* <CheckOTPForm /> */}
            </div>
        </div>

    )
}
