import { useState } from 'react'
import SendOTPForm from "../features/authentication/SendOTPForm";
import CheckOTPForm from "../features/authentication/CheckOTPForm";
import { useMutation } from '@tanstack/react-query'
import { getOtp } from '../services/authService'
import toast from 'react-hot-toast'
import { handleApiError } from '../utils/errorHandler'
import { usePreventBackNavigation } from '../hooks/usePreventBackNavigation'

export default function AuthContainer() {
    const [step, setStep] = useState(1)
    const [phoneNumber, setPhoneNumber] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    usePreventBackNavigation(step === 2);

    const { mutateAsync } = useMutation({
        mutationFn: getOtp
    });

    const sendOtpHandler = async (phone) => {
        try {
            setIsLoading(true);
            const data = await mutateAsync({ phoneNumber: phone });
            toast.success(data.message);
            setPhoneNumber(phone);
            setStep(2);
        } catch (error) {
            handleApiError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return <SendOTPForm onSendOtp={sendOtpHandler} isPending={isLoading} />
            case 2:
                return <CheckOTPForm phoneNumber={phoneNumber} setStep={setStep} onResendOtp={() => sendOtpHandler(phoneNumber)} />
            default: return null
        }
    }

    return <div className="w-full max-w-sm rounded-2xl bg-secondary-0 dark:bg-secondary-800 px-8 py-10 shadow-lg">{renderStep()}</div>
}
