"use client";

import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-4">
          <Link href="/home">
            <img src="/images/logo.svg" alt="Logo" className="h-20" />
          </Link>
        </div>
        <nav className="flex space-x-6">
          <Link href="/home" className="hover:text-gray-400 transition text-lg">
            Главная
          </Link>
          <Link
            href="/words"
            className="hover:text-gray-400 transition text-lg"
          >
            Иероглифы
          </Link>
          <Link
            href="/profile"
            className="hover:text-gray-400 transition text-lg"
          >
            Личный кабинет
          </Link>
        </nav>
      </div>
    </header>
  );
}
