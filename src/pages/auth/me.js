import React from 'react'
import Me from '../../components/Me'

export default function me() {
  return (
    <div className="">
      <main className="flex pr-10 pl-10 min-h-[calc(100vh-100px) flex-col max-w-7xl mx-auto] px-4">
        <div className="flex-1 flex-grow">
          <h2 className="text-2xl text-gray-600 dark:text-gray-400 font-bold mb-4">My Profile</h2>
          <Me/>
        </div>
      </main>
    </div>
  )
}
