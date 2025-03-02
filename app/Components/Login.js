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
      router.push(user.id_role === 2 ? "/admin" : "/words");
    }
  }

  return (
    <>
    <div className="container login">
      <h1 className="title mb-3">Авторизация</h1>
      <form className="form" onSubmit={handleLogin}>
        <input
          className="input"
          type="text"
          placeholder="Логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn primary" type="submit">
          Войти
        </button>
        <p>Нет аккаунта? <a href="/register" style={{ color: "#0e84f2" }}>Зарегистрироваться</a></p>
      </form>
    </div>
    <Footer />
    </>
  );
}
