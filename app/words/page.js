"use client";
import { useState, useEffect } from "react";
import Card from "@/app/Components/Card";
import CategoryCard from "@/app/Components/CategoryCard";
import Header from "@/app/Components/Header";
import Footer from "@/app/Components/Footer";

export default function WordsPage() {
  const [words, setWords] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user"));
      user?.id && setUserId(user.id);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        if (selectedType) {
          const response = await fetch(
            `/api/words?userId=${userId}&type=${selectedType}`
          );
          const data = await response.json();
          setWords(data);
        } else {
          const response = await fetch(`/api/words/types?userId=${userId}`);
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Ошибка загрузки:", error);
      } finally {
        setIsLoading(false);
      }
    };

    userId && fetchData();
  }, [userId, selectedType]);

  const markAsLearned = async (wordId) => {
    try {
      const response = await fetch(`/api/words/${wordId}/learned/${userId}`, {
        method: "POST",
      });

      if (response.ok) {
        setWords((prev) =>
          prev.map((word) =>
            word.id === wordId ? { ...word, is_learned: true } : word
          )
        );
        setCategories((prev) =>
          prev.map((cat) =>
            cat.type === selectedType
              ? { ...cat, learned: cat.learned + 1 }
              : cat
          )
        );
      }
    } catch (error) {
      console.error("Ошибка при обновлении:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 min-h-screen">
        <h1 className="text-3xl font-bold mt-8 mb-6 text-center">
          {selectedType || "Все категории"}
        </h1>

        {selectedType && (
          <button
            onClick={() => setSelectedType(null)}
            className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
          >
            <span className="mr-2">←</span>
            Вернуться к категориям
          </button>
        )}

        {isLoading ? (
          <div className="text-center py-12">Загрузка...</div>
        ) : selectedType ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
            {words.map((word) => (
              <Card
                key={word.id}
                wordId={word.id}
                chinese={word.chinese}
                pinyin={word.pinyin}
                translation={word.translation}
                type={word.type}
                isLearned={word.is_learned || false}
                userId={userId}
                onMarkAsLearned={markAsLearned}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.type}
                {...category}
                onClick={() => setSelectedType(category.type)}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
