import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import OtpInput from "react-otp-input"
import toast from "react-hot-toast"
import { handleApiError } from "../../utils/errorHandler"
import { checktOtp } from "../../services/authService"
import { useNavigate } from "react-router-dom"
import { FaArrowRightFromBracket } from "react-icons/fa6";
import Loading from "../../ui/Loading"

const RESEND_TIME = 90


export default function CheckOTPForm({ phoneNumber, setStep, onResendOtp }) {
    const [otp, setOtp] = useState("")
    const [time, setTime] = useState(RESEND_TIME)

    const navigate = useNavigate()

    const { isPending, mutateAsync } = useMutation({
        mutationFn: checktOtp
    })


    const checkOtpHandler = async (e) => {
        e.preventDefault()
        try {
            const { user, message } = await mutateAsync({ phoneNumber, otp })
            toast.success(message)
            if (user.isActive) {
                if (user.role === "OWNER") navigate("/owner")
                if (user.role === "FREELANCER") navigate("/freelancer")
            } else {
                navigate("/complete-profile")
            }

        } catch (error) {
            handleApiError(error)
        }
    }

    const handleResendOtp = async () => {
        await onResendOtp()
        setTime(90)
    }

    useEffect(() => {
        if (time === 0) return;

        const timer = setInterval(() => setTime((t) => t - 1), 1000);
        return () => clearInterval(timer);
    }, [time])

    return (
        <div style={{ userSelect: 'none' }}>
            <form action="" className="space-y-8" onSubmit={checkOtpHandler}>
                <div className="space-y-4">

                    <button type="button" onClick={() => setStep(1)} className="text-secondary-600 dark:text-secondary-400 hover:text-secondary-800 dark:hover:text-secondary-200 cursor-pointer flex justify-end transition-colors duration-200">
                        <FaArrowRightFromBracket />
                    </button>

                    <h1 className="text-2xl font-bold text-secondary-900 dark:text-white text-center">کد تایید را وارد کنید</h1>
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

                {time > 0 ? (
                    <div className="text-center">
                        <p className="text-sm text-secondary-600 dark:text-secondary-400">
                            {time} ثانیه تا ارسال مجدد
                        </p>
                    </div>
                ) : (
                    <button type="button" onClick={handleResendOtp} className="text-secondary-600 dark:text-secondary-400 w-full text-sm hover:text-secondary-800 dark:hover:text-secondary-200 transition-colors duration-200 cursor-pointer">
                        دریافت مجدد کد تایید
                    </button>
                )}
                {isPending ? <Loading /> : <button className="btn btn--primary w-full">تایید</button>}
            </form>

        </div>
    )
}