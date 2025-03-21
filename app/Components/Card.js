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
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleCard = () => setIsFlipped(!isFlipped);

  const markAsLearned = async () => {
    if (!isLearned) {
      try {
        const response = await fetch(`/api/words/${wordId}/learned/${userId}`, {
          method: "POST",
        });

        if (response.ok) {
          onMarkAsLearned(wordId);
        }
      } catch (error) {
        console.error("Ошибка при изменении статуса:", error);
      }
    }
  };

  return (
    <div className="card-container min-w-[300px] h-48">
      <div className={`card-inner ${isFlipped ? "card-flipped" : ""}`}>
        <div className="card-front bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
          <h3 className="text-2xl font-bold mb-2">{chinese}</h3>
          <p className="text-gray-500 text-sm mb-4">{type}</p>

          <div className="flex gap-2 w-full">
            <button
              className="bg-[#0e84f2] text-white px-4 py-2 rounded-lg hover:bg-[#33c9fc] transition-all flex-1 hover:scale-105 duration-300 ease-in-out"
              onClick={toggleCard}
            >
              Перевод
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-all flex-1 ${
                isLearned
                  ? "bg-green-100 text-green-700 cursor-default"
                  : "bg-[#33c9fc] text-white hover:bg-[#0e84f2] hover:scale-105 duration-300 ease-in-out"
              }`}
              onClick={markAsLearned}
              disabled={isLearned}
            >
              {isLearned ? "✓ Изучено" : "Изучить"}
            </button>
          </div>
        </div>

        <div className="card-back bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
          <div className="text-center">
            <h4 className="text-xl font-semibold mb-2">{pinyin}</h4>
            <p className="text-gray-700 text-lg">{translation}</p>
          </div>

          <div className="flex gap-2 w-full mt-6">
            <button
              className="bg-[#0e84f2] text-white py-2 px-4 rounded-lg hover:bg-[#33c9fc] transition-all duration-300 ease-in-out hover:scale-105 flex-1"
              onClick={toggleCard}
            >
              Назад
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-all flex-1 ${
                isLearned
                  ? "bg-green-100 text-green-700 cursor-default"
                  : "bg-[#33c9fc] text-white hover:bg-[#0e84f2]"
              }`}
              onClick={markAsLearned}
              disabled={isLearned}
            >
              {isLearned ? "✓ Изучено" : "Изучить"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
