'use client';

import Admin from "@/app/Components/Admin";
import { useState, useEffect } from "react";

export default function AdminPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return <Admin user={user} />;
}