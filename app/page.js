'use client';

import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/questions')
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error('질문 불러오기 실패:', err));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <Header />

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">전체 질문 목록</h1>

        {questions.length === 0 ? (
          <p className="text-gray-600 text-lg">등록된 질문이 없습니다.</p>
        ) : (
          <ul className="grid gap-4">
            {questions.map((q) => (
              <li
                key={q.id}
                className="bg-gray-100 p-5 rounded shadow hover:bg-gray-200 transition cursor-pointer"
                onClick={() => window.location.href = `/questions/${q.id}`}
              >
                <h2 className="text-xl font-semibold text-gray-800">{q.title}</h2>
                <p className="text-gray-700 mt-1">{q.content}</p>
                <p className="text-sm text-gray-500 mt-2">작성자: {q.nickname}</p>
              </li>
            ))}
          </ul>
        )}
      </main>

      <Footer />
    </div>
  );
}
