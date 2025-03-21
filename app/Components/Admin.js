"use client";

import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Admin({ user }) {
  return (
    <div>
      <Header />
      {user && user.id_role === 2 ? (
        <>Ты админ, крутое достижение, но тут ничего пока нет</>
      ) : (
        <div>У вас нет прав администратора</div>
      )}
      <Footer />
    </div>
  );
}
