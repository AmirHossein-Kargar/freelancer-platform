import { useState } from 'react'
import TextField from '../../ui/TextField'

export default function SendOTPForm() {
    const [phoneNumber, setPhoneNumber] = useState("")
    return (
        <div>

            <form action="" className='space-y-8'>
                <div className='text-center space-y-4'>
                    <h1 className='text-2xl font-bold text-secondary-900 dark:text-white'>ورود یا ثبت نام</h1>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>برای ورود یا ثبت نام شماره موبایل خود را وارد کنید</p>
                </div>
                <TextField name={"phoneNumber"} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} label={"شماره موبایل"} />
                <button className='btn btn--primary w-full'>ارسال کد تایید</button>
            </form>

        </div>
    )
}