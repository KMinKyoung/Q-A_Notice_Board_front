/*'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MyPage() {
  const [questions, setQuestions] = useState([]);
  const [nickname, setNickname] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const nickname = localStorage.getItem('nickname');
    setNickname(nickname);

    fetch('http://localhost:8080/api/questions/my', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error('내 질문 불러오기 실패:', err));
  }, []);

  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">마이페이지</h1>
          <div className="relative">
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className="bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 border"
            >
              {nickname} ▼
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-10">
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                  정보 수정
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                  비밀번호 변경
                </button>
              </div>
            )}
          </div>
        </div>

        {questions.length === 0 ? (
          <p className="text-gray-500">작성한 질문이 없습니다.</p>
        ) : (
          <ul className="space-y-4">
            {questions.map((q) => (
              <li
                key={q.id}
                className="p-4 border rounded hover:bg-gray-50 cursor-pointer"
                onClick={() => window.location.href = `/questions/${q.id}`}
              >
                <h2 className="text-xl font-semibold">{q.title}</h2>
                <p className="text-gray-700 mt-1">{q.content}</p>
                <p className="text-sm text-gray-400 mt-2">작성일: {new Date(q.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </main>

      <Footer />
    </div>
  );
}
*/