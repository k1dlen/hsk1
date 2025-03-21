"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register({ setUser }) {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
    full_name: "",
    phone: "",
    email: "",
  });

  const router = useRouter();

  async function handleRegister(e) {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const loginRes = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          login: formData.login,
          password: formData.password,
        }),
      });

      if (loginRes.ok) {
        const { user } = await loginRes.json();
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        router.push(user.id_role === 2 ? "/admin" : "/");
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-3xl font-bold mb-6">Регистрация</h1>
      <form
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md"
        onSubmit={handleRegister}
      >
        <input
          type="text"
          placeholder="Логин"
          value={formData.login}
          onChange={(e) => setFormData({ ...formData, login: e.target.value })}
          className="w-full p-3 border rounded-md mb-4"
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="w-full p-3 border rounded-md mb-4"
          required
        />
        <input
          type="text"
          placeholder="ФИО"
          value={formData.full_name}
          onChange={(e) =>
            setFormData({ ...formData, full_name: e.target.value })
          }
          className="w-full p-3 border rounded-md mb-4"
          required
        />
        <input
          type="text"
          placeholder="Телефон"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full p-3 border rounded-md mb-4"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-3 border rounded-md mb-4"
          required
        />
        <button
          type="submit"
          className="bg-[#0e84f2] text-white py-3 w-full rounded hover:bg-[#33c9fc] transition-all duration-300 ease-in-out hover:scale-105"
        >
          Зарегистрироваться
        </button>
        <p className="text-center mt-4">
          Уже есть аккаунт?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Войти
          </a>
        </p>
      </form>
    </div>
  );
}
