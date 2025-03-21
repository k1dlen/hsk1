"use client";
import Header from "@/app/Components/Header";
import Footer from "@/app/Components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const features = [
    { title: "150 иероглифов HSK1", desc: "Полный охват базового уровня" },
    { title: "Интерактивные карточки", desc: "С озвучкой и анимацией письма" },
    {
      title: "Персональная статистика",
      desc: "Отслеживайте прогресс обучения",
    },
  ];

  return (
    <>
      <Header />

      <section className="bg-blue-50 py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12 justify-between">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Освойте китайский <br />
              <span className="text-[#0e84f2]">с нуля до HSK1</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Эффективная система обучения с упором на иероглифику и
              произношение
            </p>
            <Link
              href="/words"
              className="bg-[#0e84f2] hover:scale-105 text-white w-full py-3 px-8 rounded-lg hover:bg-[#33c9fc] transition-all duration-300 ease-in-out text-lg"
            >
              Начать обучение
            </Link>
          </div>
          <div>
            <Image
              src="/images/hero-chinese.png"
              alt="Изучение китайского"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Почему выбирают нас
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full mb-4 flex items-center justify-center text-blue-600 text-xl">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
