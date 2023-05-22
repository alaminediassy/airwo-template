import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UserIcon from "./UserIcon";

export default function Navbar() {
  const { theme, setTheme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const router = useRouter();
  const [token, setToken] = useState();

  const handleBackToHome = () => {
    router.push("/");
  };

  const handleBackToMe = () => {
    router.push("/auth/me");
  };


  useEffect(() => setToken(localStorage.getItem("token")));

  const handleLogout = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (response.ok) {
      // Rediriger l'utilisateur vers la page de d'accueuil
      setToken(localStorage.removeItem("token"));
      router.push("/");
    } else {
      // Gérer les erreurs
      const data = await response.json();
      console.error(data.message);
    }
  };

  return (
    <div>
      <nav className="mr-36 ml-36 pt-3 border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <button onClick={handleBackToHome}>
            <a href="#" className="flex items-center">
              <span className="self-center text-4xl text-gray-700  font-semibold whitespace-nowrap dark:text-white">
                Airwo <span className="text-orange-500 text-sm">Alamine®</span>
              </span>
            </a>
          </button>
          <div className="flex gap-6 items-center md:order-2">
            {currentTheme === "dark" ? (
              <button
                onClick={() => setTheme("light")}
                className="p-1 hover:bg-gray-700 hover:rounded-full"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  />
                </svg>
              </button>
            ) : (
              <button
                className="p-1 hover:bg-gray-200 hover:rounded-full"
                onClick={() => setTheme("dark")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                  />
                </svg>
              </button>
            )}
            {token ? (
              <>
                <button onClick={handleBackToMe}>
                  <UserIcon />
                </button>
                <button
                  className="text-white bg-slate-900 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center mr-3 md:mr-0 dark:bg-gray-800 dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                  onClick={handleLogout}
                >
                  logout
                </button>
              </>
            ) : (
              <Link href="/auth/login">
                <button
                  type="button"
                  className="text-white bg-slate-900 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center mr-3 md:mr-0 dark:bg-gray-800 dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                >
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
