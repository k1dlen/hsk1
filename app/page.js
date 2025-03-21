"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      router.push(parsedUser.id_role === 2 ? "/admin" : "/home");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-4xl font-bold">Добро пожаловать!</h1>
      <p className="text-lg text-gray-600 mt-2">
        Войдите в аккаунт или зарегистрируйтесь, чтобы продолжить.
      </p>
      <div className="mt-4 flex space-x-4">
        <button
          className="bg-[#0e84f2] text-white py-3 px-6 rounded hover:bg-[#33c9fc] transition-all duration-300 ease-in-out hover:scale-105"
          onClick={() => router.push("/login")}
        >
          Войти
        </button>
        <button
          className="bg-[#33c9fc] text-white hover:bg-[#0e84f2] hover:scale-105 transition-all duration-300 ease-in-out py-3 px-6 rounded"
          onClick={() => router.push("/register")}
        >
          Зарегистрироваться
        </button>
      </div>
    </div>
  );
}
