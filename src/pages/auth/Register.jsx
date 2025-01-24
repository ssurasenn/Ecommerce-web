import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import zxcvbn from 'zxcvbn'

const registerSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(8, { message: "Password must be more than 8 characters!!" }),
  confirmPassword: z.string()
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password is not match",
    path: ["confirmPassword"],
  })
const Register = () => {
  //javasrcipt
  const [passwordScore, setPasswordScore] = useState(0)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema)
  })
  const validatePassword = () => {
    let password = watch().password
    return zxcvbn(password ? password : " ").score
  }
  useEffect(() => {
    setPasswordScore(validatePassword())
  }, [watch().password])
  // console.log(passwordScore)

  const onSubmit = async (data) => {

    // const passwordScore = zxcvbn(data.password).score
    // if (passwordScore < 3) {
    //   toast.warning('Password not strong!')
    //   return
    // }
    // console.log('Ready to register ')

    // sent to back end
    try {
      const res = await axios.post(
        "http://localhost:5001/api/register", data);

      // console.log(res);
      toast.success(res.data);

    } catch (err) {
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
      console.log(err);
    }
  }

  // const test = Array.from(Array(5))
  // console.log("test-->",test)

  return (
    <div className="min-h-screen flex items-center 
    justify-center bg-gray-300">

      <div className="w-full bg-white p-8 shadow-md max-w-md">
        <h1 className="text-2xl font-bold text-center my-4">
          Register
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">

            <div>
              <input {...register("email")}
                placeholder="Email"
                className={`border w-full px-3 py-2 rounded-md
            focus: outline-none focus:ring-2 focus:ring-blue-500
            
            ${errors.email && ('border-red-500 text-red-300')}
            `}
              />
              {errors.email &&
                <p className="text-red-500 text-sm">
                  {errors.email.message}
                </p>}
            </div>

            <div>
              <input {...register("password")}
                type="password"
                placeholder="Password"
                className={`border w-full px-3 py-2 rounded-md
            focus: outline-none focus:ring-2 focus:ring-blue-500
            
            ${errors.password && ('border-red-500 text-red-300')}
            `}
              />
              {errors.password &&
                <p
                  className="text-red-500 text-sm">
                  {errors.password.message}
                </p>}

              {
                watch().password?.length > 0 && (
                  <div className="flex mt-2">
                    {Array.from(Array(5).keys()).map((item, index) =>
                      <span className="w-1/5 px-1" key={index}>
                        <div
                          className={`rounded-md h-2 ${passwordScore <= 2
                            ? 'bg-red-500'
                            : passwordScore < 4
                              ? 'bg-yellow-300'
                              : 'bg-green-300'
                            }`}>
                        </div>
                      </span>
                    )
                    }
                  </div>
                )
              }
            </div>

            <div>
              <input {...register("confirmPassword")}
                type="password"
                placeholder="ConfirmPassword"
                className={`border w-full px-3 py-2 rounded-md
          focus: outline-none focus:ring-2 focus:ring-blue-500
          ${errors.confirmPassword && ('border-red-500 text-red-300')}
          `}
              />
              {errors.confirmPassword &&
                <p className="text-red-500 text-sms">
                  {errors.confirmPassword.message}
                </p>}
            </div>

            <button
              className=" border w-full px-2 py-1 text-white
             bg-gray-500 rounded-md hover:bg-gray-600">
              Register
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default Register;
