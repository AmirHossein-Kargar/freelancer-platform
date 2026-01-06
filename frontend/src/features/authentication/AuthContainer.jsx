import { useState } from 'react'
import SendOTPForm from "./SendOTPForm";
import CheckOTPForm from "./CheckOTPForm";
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { handleApiError } from '../../utils/errorHandler'
import { usePreventBackNavigation } from '../../hooks/usePreventBackNavigation'
import { getOtp } from '../../services/authService';

export default function AuthContainer({ onStepChange }) {
    const [step, setStep] = useState(1);
    const [phoneNumber, setPhoneNumber] = useState("");

    usePreventBackNavigation(step === 2);

    const { mutateAsync, isPending } = useMutation({
        mutationFn: getOtp
    });

    const handleStepChange = (newStep) => {
        setStep(newStep);
        onStepChange?.(newStep);
    };

    const sendOtpHandler = async (phone) => {
        try {
            const data = await mutateAsync({ phoneNumber: phone });
            toast.success(data.message);
            setPhoneNumber(phone);
            handleStepChange(2);
        } catch (error) {
            handleApiError(error);
        }
    };


    const renderStep = () => {
        switch (step) {
            case 1:
                return <SendOTPForm onSendOtp={sendOtpHandler} isPending={isPending} />
            case 2:
                return <CheckOTPForm phoneNumber={phoneNumber} setStep={handleStepChange} onResendOtp={() => sendOtpHandler(phoneNumber)} />
            default: return null
        }
    }

    return <div className="w-full max-w-sm rounded-2xl bg-secondary-0 dark:bg-secondary-800 px-8 py-10 shadow-lg">{renderStep()}</div>
}