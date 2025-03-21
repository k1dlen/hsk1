"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "./Footer";

export default function Login({ setUser }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ login, password }),
    });

    if (res.ok) {
      const { user } = await res.json();
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      router.push(user.id_role === 2 ? "/admin" : "/home");
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
        <h1 className="text-3xl font-bold mb-6">Авторизация</h1>
        <form
          className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md"
          onSubmit={handleLogin}
        >
          <input
            className="w-full p-3 border rounded-md mb-4"
            type="text"
            placeholder="Логин"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
          <input
            className="w-full p-3 border rounded-md mb-4"
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className="bg-[#0e84f2] text-white w-full py-3 rounded hover:bg-[#33c9fc] transition-all duration-300 ease-in-out hover:scale-105"
            type="submit"
          >
            Войти
          </button>
          <p className="text-center mt-4">
            Нет аккаунта?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Зарегистрироваться
            </a>
          </p>
        </form>
      </div>
      <Footer />
    </>
  );
}
