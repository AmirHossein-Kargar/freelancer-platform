import { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "../../ui/TextField";
import RadioInput from "../../ui/RadioInput";
import { usePreventBackNavigation } from "../../hooks/usePreventBackNavigation";


export default function CompleteProfileForm() {
    const [role, setRole] = useState("FREELANCER");
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onChange"
    });


    usePreventBackNavigation(true);

    const submitHandler = async (data) => {
        const fullName = `${data.name} ${data.lastName}`;
        console.log({ ...data, name: fullName, role });
        // TODO: API call to complete profile
    };


    return (
        <div className="w-full max-w-sm rounded-2xl bg-secondary-0 dark:bg-secondary-800 px-8 py-10 shadow-lg select-none">
            <form className="space-y-6" onSubmit={handleSubmit(submitHandler)}>

                <div className="text-center">
                    <h1 className="text-2xl font-bold tracking-tight text-secondary-900 dark:text-secondary-100">
                        تکمیل پروفایل
                    </h1>
                </div>

                <div className="space-y-4">
                    <TextField
                        label="نام"
                        name="name"
                        type="text"
                        placeholder="نام خود را وارد کنید"
                        register={register}
                        errors={errors}
                        validation={{
                            required: "نام الزامی است",
                            minLength: {
                                value: 2,
                                message: "نام باید حداقل ۲ کاراکتر باشد"
                            },
                            pattern: {
                                value: /^[\u0600-\u06FF\s]+$/,
                                message: "نام باید با حروف فارسی نوشته شود"
                            }
                        }}
                    />

                    <TextField
                        label="نام خانوادگی"
                        name="lastName"
                        type="text"
                        placeholder="نام خانوادگی خود را وارد کنید"
                        register={register}
                        errors={errors}
                        validation={{
                            required: "نام خانوادگی الزامی است",
                            minLength: {
                                value: 2,
                                message: "نام خانوادگی باید حداقل ۲ کاراکتر باشد"
                            },
                            pattern: {
                                value: /^[\u0600-\u06FF\s]+$/,
                                message: "نام خانوادگی باید با حروف فارسی نوشته شود"
                            }
                        }}
                    />

                    <TextField
                        label="ایمیل"
                        name="email"
                        type="email"
                        placeholder="ایمیل خود را وارد کنید"
                        register={register}
                        errors={errors}
                        validation={{
                            required: "ایمیل الزامی است",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "فرمت ایمیل صحیح نیست"
                            },
                            validate: (value) => {
                                if (/[\u0600-\u06FF]/.test(value)) {
                                    return "ایمیل باید با حروف انگلیسی نوشته شود";
                                }
                                return true;
                            }
                        }}
                    />
                </div>

                <div className="space-y-3">
                    <label className="block text-sm font-medium text-secondary-900 dark:text-secondary-100">
                        نقش
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        <RadioInput
                            label="فریلنسر"
                            name="role"
                            value="FREELANCER"
                            checked={role === "FREELANCER"}
                            onChange={(e) => setRole(e.target.value)}
                        />
                        <RadioInput
                            label="کارفرما"
                            name="role"
                            value="OWNER"
                            checked={role === "OWNER"}
                            onChange={(e) => setRole(e.target.value)}
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn--primary w-full mt-4">
                    تکمیل و ادامه
                </button>
            </form>
        </div>
    )
}
