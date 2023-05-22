import React from 'react'
import { useRouter } from 'next/router'

const LogoutButton = () => {
  const router = useRouter()

  const handleLogout = async () => {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
    })

    if (response.ok) {
      // Rediriger l'utilisateur vers la page de connexion
      localStorage.setItem("token",null)
      router.push('/auth/login')
    } else {
      // Gérer les erreurs
      const data = await response.json()
      console.error(data.message)
    }
  }
  return (
    <div>
        <button
        onClick={handleLogout}
        type="button"
        className="text-white bg-slate-900 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center mr-3 md:mr-0 dark:bg-gray-800 dark:hover:bg-gray-600 dark:focus:ring-gray-800"
        >
        Logout
        </button>
    </div>
  )
}
export default LogoutButton;
