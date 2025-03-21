"use client";
import { useState, useEffect } from "react";
import Header from "@/app/Components/Header";
import Footer from "@/app/Components/Footer";
import ProgressBar from "@/app/Components/ProgressBar";
import Logout from "@/app/Components/Logout";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData?.id) {
        setUser(userData);

        try {
          const res = await fetch(`/api/stats?userId=${userData.id}`);
          if (!res.ok) throw new Error("Failed to fetch stats");
          const data = await res.json();
          setStats(data);
        } catch (error) {
          console.error("Error loading stats:", error);
        }
      }
    };
    loadData();
  }, []);

  if (!user) return <div className="text-center py-8">Загрузка...</div>;

  return (
    <>
      <Header />

      <div className="container mx-auto px-4 py-8 min-h-screen">
        <h1 className="text-3xl font-bold mb-8">Личный кабинет</h1>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Пользователь: {user.full_name}
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-gray-600">
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-semibold">Телефон:</span> {user.phone}
            </p>
          </div>
        </div>

        {stats ? (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-6">
              Прогресс изучения: {stats.learned}/{stats.total} слов (
              {Math.round((stats.learned / stats.total) * 100)}%)
            </h3>

            <div className="space-y-4">
              {stats.progress.map((category, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="capitalize font-medium">
                      {category.type}
                    </span>
                    <span>
                      {category.learned}/{category.total}
                    </span>
                  </div>
                  <ProgressBar
                    progress={(category.learned / category.total) * 100}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">Загрузка статистики...</div>
        )}

        <div className="mt-8">
          <Logout />
        </div>
      </div>

      <Footer />
    </>
  );
}
