"use client";
import { useState } from "react";

export default function Card({
  chinese,
  pinyin,
  translation,
  type,
  wordId,
  userId,
  isLearned,
  onMarkAsLearned,
}) {
  console.log(chinese, pinyin, translation, type, wordId, userId, isLearned);

  const [isFlipped, setIsFlipped] = useState(false);

  const toggleCard = () => {
    setIsFlipped(!isFlipped);
  };

  const markAsLearned = async () => {
    try {
      const response = await fetch(`/api/words/${wordId}/learned/${userId}`, {
        method: "POST",
      });

      if (response.ok) {
        onMarkAsLearned(wordId);
      } else {
        console.error("Ошибка при отметке карточки как изученной.");
      }
    } catch (error) {
      console.error("Ошибка при изменении статуса карточки:", error);
    }
  };

  return (
    <div className="card">
      <div className={`card-inner ${isFlipped ? "flipped" : ""}`}>
        <div className={`card-front ${isFlipped ? "hidden" : ""}`}>
          <h3 className="card-title">{chinese}</h3>
          <p className="card-type">{type}</p>
          <div className="card-buttons">
            <button className="btn primary" onClick={toggleCard}>
              Показать перевод и транскрипцию
            </button>
            <button
              className={`btn secondary ${isLearned ? "learned" : ""}`}
              onClick={markAsLearned}
            >
              {isLearned ? "Изучено" : "Отметить как изученное"}
            </button>
          </div>
        </div>

        <div className={`card-back ${isFlipped ? "visible" : ""}`}>
          <h4>{pinyin}</h4>
          <p>{translation}</p>
          <div className="card-buttons">
            <button
              className={`btn secondary ${isLearned ? "learned" : ""}`}
              onClick={markAsLearned}
            >
              {isLearned ? "Изучено" : "Отметить как изученное"}
            </button>
            <button className="btn primary" onClick={toggleCard}>
              Назад
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
