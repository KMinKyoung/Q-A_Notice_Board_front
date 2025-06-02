'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function QuestionDetailPage() {
  const router = useRouter();
  const params = useParams();
  const questionId = params.id;
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/api/questions/${questionId}`)
      .then(res => res.json())
      .then(data => setQuestion(data))
      .catch(err => console.error('질문 불러오기 실패:', err));
  }, [questionId]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/questions/${questionId}/answers`)
      .then(res => res.json())
      .then(data => setAnswers(data))
      .catch(err => console.error('답변 불러오기 실패:', err));
  }, [questionId]);

  const handleAddAnswer = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }

    const res = await fetch(`http://localhost:8080/api/answers/${questionId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: newAnswer })
    });

    if (res.ok) {
      const added = await res.json();
      setAnswers([...answers, added]);
      setNewAnswer('');
    } else {
      alert('답변 등록 실패');
    }
  };

  const handleEdit = () => {
    router.push(`/questions/${questionId}/edit`);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('access_token');
    const confirmDelete = confirm('정말 이 질문을 삭제하시겠습니까?');
    if (!confirmDelete) return;

    await fetch(`http://localhost:8080/api/questions/${questionId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    alert('삭제되었습니다.');
    router.push('/');
  };

  const handleReport = () => {
    alert('신고가 접수되었습니다.');
  };

  if (!question) return <p className="p-6">로딩 중...</p>;

  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 p-6 w-full max-w-6xl mx-auto relative">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-3xl font-bold">{question.title}</h1>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-gray-700 bg-gray-100 border border-gray-300 rounded px-2 py-1 hover:bg-gray-200"
            >
              ⋮
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-10">
                <button onClick={handleEdit} className="w-full text-left px-4 py-2 hover:bg-gray-100">✏️ 수정하기</button>
                <button onClick={handleDelete} className="w-full text-left px-4 py-2 hover:bg-gray-100">🗑️ 삭제하기</button>
                <button onClick={handleReport} className="w-full text-left px-4 py-2 hover:bg-gray-100">🚨 신고하기</button>
              </div>
            )}
          </div>
        </div>

        <p className="mb-2">{question.content}</p>
        <p className="text-sm text-gray-600">작성자: {question.nickname}</p>

        <hr className="my-6" />

        <h2 className="text-xl font-semibold mb-2">💬 답변</h2>
        {answers.length === 0 ? (
          <p className="text-gray-500">아직 등록된 답변이 없습니다.</p>
        ) : (
          <ul className="space-y-3">
            {answers.map((answer) => (
              <li key={answer.id} className="bg-gray-50 p-3 rounded shadow">
                <p>{answer.content}</p>
                <p className="text-sm text-gray-400 mt-1">작성자: {answer.nickname}</p>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6">
          <textarea
            className="w-full p-3 border rounded"
            rows={4}
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            placeholder="답변을 입력하세요"
          ></textarea>
          <button
            onClick={handleAddAnswer}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            답변 등록
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
