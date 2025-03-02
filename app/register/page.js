'use client';

import Register from "@/app/Components/Register";
import { useState } from "react";

export default function RegisterPage() {
    const [user, setUser] = useState(null);

    return <Register setUser={setUser} />
}