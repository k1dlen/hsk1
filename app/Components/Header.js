"use client";

import React from "react";
import Link from "next/link";
import "@/app/styles/global.css";

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <div className="logo">
            <img src="images/logo.svg"></img>
          </div>
          <Link href="/" className="link">
            Главная
          </Link>
          <Link href="/words" className="link">
            Иероглифы
          </Link>
          <Link href="/tests" className="link">
            Тесты
          </Link>
          <Link href="/profile" className="link">
            Профиль
          </Link>

        

          {/* <button className="btn secondary mr-3">
            <Link href="/register" className="link">
              Зарегистрироваться
            </Link>
          </button>
          <button className="btn primary">
            <Link href="/login" className="link" >
              Войти
            </Link>
          </button> */}
        </nav>
      </div>
    </header>
  );
}
