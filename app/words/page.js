"use client";
import { useState, useEffect } from "react";
import Card from "@/app/Components/Card";
import Header from "@/app/Components/Header";
import Footer from "@/app/Components/Footer";

export default function WordsPage() {
  const [words, setWords] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserData = localStorage.getItem("user");      

      const user = JSON.parse(storedUserData);
        console.log(user);
        
      if (user && user.id) {
        setUserId(user.id);
      } else {
        console.log("User ID не найден в localStorage");
      }
    }
  }, []);

  useEffect(() => {
    const fetchWords = async () => {
      if (!userId) {
        return;
      }
      try {
        const response = await fetch(`/api/words?userId=${userId}`);
        const data = await response.json();
        console.log(data);
        
        setWords(data);
      } catch (error) {
        console.error("Ошибка при загрузке карточек:", error);
      }
    };

    fetchWords();
  }, [userId]);


  const markAsLearned = async (wordId) => {
    try {
      const response = await fetch(`/api/words/${wordId}/learned/${userId}`, {
        method: "POST",
      });

      if (response.ok) {
        setWords((prevWords) =>
          prevWords.map((word) =>
            word.id === wordId ? { ...word, is_learned: true } : word
          )
        );
      } else {
        console.error("Ошибка при отметке карточки как изученной.");
      }
    } catch (error) {
      console.error("Ошибка при изменении статуса карточки:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="container words-page">
        <h1 className="title mt-2">Карточки для изучения</h1>
        <div className="cards-container">
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
      </div>
      <Footer />
    </>
  );
}
