import React from 'react'
import RegisterForm from '../../components/RegisterForm'


export default function Register() {
  return (
    <div className="">
    <main className="flex pr-10 pl-10 min-h-[calc(100vh-100px) flex-col max-w-7xl mx-auto] px-4">
      <div className="flex-1 flex-grow">
        <h2 className="text-2xl dark:text-gray-200 text-gray-600 font-bold mb-4">Register</h2>
        <RegisterForm/>
      </div>
    </main>
  </div>
  )
}
