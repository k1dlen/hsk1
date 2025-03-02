"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "@/app/styles/global.css";


export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      router.push(parsedUser.id_role === 2 ? '/admin' : '/');
    }
  }, []);

  return (
    <div className="container">
      <main className="main">
        <h1 className="title">Добро пожаловать!</h1>
        <p className="subtitle">
          Войдите в аккаунт или зарегистрируйтесь, чтобы продолжить.
        </p>
        <div className="buttons mt-2">
          <button className="btn primary" onClick={() => router.push("/login")}>
            Войти
          </button>
          <button
            className="btn secondary"
            onClick={() => router.push("/register")}
          >
            Зарегистрироваться
          </button>
        </div>
      </main>
      
    </div>
  );
}
