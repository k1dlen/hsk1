'use client';

import Login from "@/app/Components/Login";
import { useState } from "react";

export default function LoginPage() {
    const [user, setUser] = useState(null);

    return <Login setUser={setUser} />;
}