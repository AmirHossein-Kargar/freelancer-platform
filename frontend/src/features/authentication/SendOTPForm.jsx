import React, { useState } from 'react'
import TextField from '../../ui/TextField'

export default function SendOTPForm() {
    const [phoneNumber, setPhoneNumber] = useState("")
    return (
        <div>

            <form action="" className='space-y-4'>

                <TextField name={"phoneNUmber"} value={phoneNumber} onchange={(e) => setPhoneNumber(e.target.value)} label={"شماره موبایل"}/>
                <button className='btn btn--primary w-full'>ارسال کد تایید</button>

            </form>

        </div>
    )
}
