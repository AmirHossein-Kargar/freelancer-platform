import { useState } from "react"
import OtpInput from "react-otp-input"

export default function CheckOTPForm() {
    const [otp, setOtp] = useState("")

    return (
        <div>
            <form action="" className="space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">کد تایید را وارد کنید</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">کد تایید ارسال شده به شماره موبایل را وارد کنید</p>
                </div>
                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderInput={(props) => <input type="number" {...props} />}
                    containerStyle="flex flex-row-reverse gap-x-2 justify-center"
                    inputStyle={{
                        width: "2.5rem",
                        height: "3rem",
                        padding: "0.5rem 0.2rem",
                        border: "1px solid #e5e7eb",
                        borderRadius: "0.75rem",
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "#111827",
                        backgroundColor: "#f9fafb",
                        outline: "none",
                        transition: "all 0.2s ease-in-out"
                    }}
                />
                <button className="btn btn--primary w-full">تایید</button>
            </form>
        </div>
    )
}