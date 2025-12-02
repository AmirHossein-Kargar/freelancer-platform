import { useState } from 'react'
import TextField from '../../ui/TextField'
import { useMutation } from '@tanstack/react-query'
import { getOtp } from '../../services/authService'
import toast from 'react-hot-toast'
import { handleApiError } from '../../utils/errorHandler'

export default function SendOTPForm() {
    const [phoneNumber, setPhoneNumber] = useState("")

    const { mutateAsync } = useMutation({
        mutationFn: getOtp
    })

    const sendOtpHandler = async (e) => {
        e.preventDefault()

        try {
            const data = await mutateAsync({ phoneNumber })
            console.log(data)
            toast.success(data.message)
        } catch (error) {
            handleApiError(error)
        }

    }

    return (
        <div>

            <form action="" className='space-y-8' onSubmit={sendOtpHandler}>
                <div className='text-center space-y-4'>
                    <h1 className='text-2xl font-bold text-secondary-900 dark:text-white'>ورود یا ثبت نام</h1>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>برای ورود یا ثبت نام شماره موبایل خود را وارد کنید</p>
                </div>
                <TextField name={"phoneNumber"} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} label={"شماره موبایل"} />
                <button type='submit' className='btn btn--primary w-full'>ارسال کد تایید</button>
            </form>


        </div>
    )
}