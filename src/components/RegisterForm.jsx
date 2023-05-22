import Link from "next/link";
import React, { useState } from "react";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // L'utilisateur a été inscrit avec succès
      // Rediriger l'utilisateur vers la page de connexion
      window.location.href = "/auth/login";
    } else {
      // Afficher une erreur de validation
      setError(data.message);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} action="" className="flex flex-col gap-4">
        <label htmlFor="" className="flex flex-col gap-1">
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-md p-2 disable:cursor-not-allowed dark:bg-white dark:text-gray-700"
            name="name"
            autocomplete="email"
            required
          />
        </label>
        <label htmlFor="" className="flex flex-col gap-1">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md p-2 disable:cursor-not-allowed dark:bg-white dark:text-gray-700"
            name="email"
            autocomplete="email"
            required
          />
        </label>
        <label htmlFor="" className="flex flex-col gap-1">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-md p-2 disable:cursor-not-allowed dark:bg-white dark:text-gray-700"
            name="password"
            required
          />
        </label>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white rounded-md p-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Register'}
        </button>
        {error && <p className="text-red-500">{error}</p>}
        <Link href="/auth/login" className="text-sm font-medium text-gray-500 dark:text-gray-200">
          Already have an account? Login
        </Link>
      </form>
    </div>
  );
}
