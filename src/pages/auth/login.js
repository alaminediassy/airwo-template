import LoginForm from "../../components/LoginForm";

export default function Login() {
  return (
    <div className="">
      <main className="flex pr-10 pl-10 min-h-[calc(100vh-100px) flex-col max-w-7xl mx-auto] px-4">
        <div className="flex-1 flex-grow">
          <h2 className="text-2xl text-gray-600 dark:text-gray-300 font-bold mb-4">Login</h2>
          <LoginForm/>
        </div>
      </main>
    </div>
  )
}
