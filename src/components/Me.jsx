import useSWR from "swr";
import { useState } from "react";
import axios from "axios";

export default function Me() {
  const { data: user, error, mutate } = useSWR("/api/auth/me");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const updateUser = async (name, email, password) => {
    const token = localStorage.getItem("token");
    const response = await fetch("/api/auth/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const data = await response.json();
    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put("/api/auth/me", { name, email });
      mutate(response.data.user);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="" className="flex flex-col gap-1">
          Name
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2 disable:cursor-not-allowed dark:bg-white dark:text-gray-700"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="" className="flex flex-col gap-1">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md p-2 disable:cursor-not-allowed dark:bg-white dark:text-gray-700"
            name="email"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white rounded-md p-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!name || !email}
        >
          Update
        </button>
      </form>
    </div>
  );
}
