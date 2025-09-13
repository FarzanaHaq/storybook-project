import React from 'react'
import InputField from './InputField'

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  joinDate: string;
}

const Form = () => {
  return (
     <div className="max-w-[450px] mx-auto px-5 lg:px-10 bg-white/30 py-10 ">
              <h1 className="text-[17px] font-[700] mb-1">Sign Up</h1>
              <p className="mb-5 text-gray-900 text-[14px] font-[500]">
                Kindly fill up this to view products
              </p>
              <form action=""></form>
              <InputField
                label="Name"
                placeholder="Enter Name"
                variant="filled"
                size="md"
                type="text"
                className="placeholder:text-[14px]"
              ></InputField>
              <InputField
                label="Email"
                placeholder="Enter Email"
                variant="filled"
                size="md"
                type="email"
                className="placeholder:text-[14px]"
              ></InputField>
              <InputField
                label="Password"
                placeholder="Enter Password"
                variant="filled"
                size="md"
                type="password"
                className="placeholder:text-[14px]"
              ></InputField>
              <div className="flex justify-center">
                <button className="bg-[#8653D2] py-2 px-4 mt-5 rounded-sm text-white font-[600] text-[16px]">
                  Sign Up
                </button>
              </div>
            </div>
  )
}

export default Form