import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { SuccessAlert } from './SuccessAlert';


export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await response.json();

    if (response.ok) {
      console.log(data.user);
      console.log(data.token);
      localStorage.setItem("token",data.token);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
      router.push("/");
    } else{
      setError(data.message)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  
  
  return (
    <div>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
    {showAlert && <SuccessAlert/>}
      <label htmlFor="" className="flex flex-col gap-1">
        Email
        <input
          type="text"
          className="border border-gray-300 rounded-md p-2 disable:cursor-not-allowed dark:bg-white dark:text-gray-700"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label htmlFor="" className="flex flex-col gap-1">
        Password
        <input
          type="password"
          className="border border-gray-300 rounded-md p-2 disable:cursor-not-allowed dark:bg-white dark:text-gray-700"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      {error && <p className="text-red-500">{error}</p>}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white rounded-md p-2 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!email || !password}
      >
        Login
      </button>
      <Link href="/auth/register" className="text-sm font-medium text-gray-500 dark:text-gray-300">
        Don't have an account yet ?
      </Link>
    </form>
  </div>
  )
}