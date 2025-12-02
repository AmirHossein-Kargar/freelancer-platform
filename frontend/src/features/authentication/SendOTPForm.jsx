import { useForm } from "react-hook-form";
import TextField from '../../ui/TextField'
import { useMutation } from '@tanstack/react-query'
import { getOtp } from '../../services/authService'
import toast from 'react-hot-toast'
import { handleApiError } from '../../utils/errorHandler'

export default function SendOTPForm() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { mutateAsync } = useMutation({
        mutationFn: getOtp
    });

    const sendOtpHandler = async ({ phoneNumber }) => {
        try {
            const data = await mutateAsync({ phoneNumber });
            console.log(data);
            toast.success(data.message);
        } catch (error) {
            handleApiError(error);
        }
    };

    return (
        <div>
            <form className='space-y-8' onSubmit={handleSubmit(sendOtpHandler)}>
                <div className='text-center space-y-4'>
                    <h1 className='text-2xl font-bold text-secondary-900 dark:text-white'>ورود یا ثبت نام</h1>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                        برای ورود یا ثبت نام شماره موبایل خود را وارد کنید
                    </p>
                </div>

                <TextField
                    name="phoneNumber"
                    label="شماره موبایل"
                    register={register}
                    errors={errors}
                    validation={{
                        required: "شماره موبایل الزامی است",
                        pattern: {
                            value: /^09[0-9۰-۹]{9}$/,
                            message: "شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود",
                        },
                        minLength: {
                            value: 11,
                            message: "شماره موبایل باید ۱۱ رقم باشد"
                        },
                        maxLength: {
                            value: 11,
                            message: "شماره موبایل باید ۱۱ رقم باشد"
                        }
                    }}
                />

                <button type='submit' className='btn btn--primary w-full'>
                    ارسال کد تایید
                </button>
            </form>
        </div>
    );
}
