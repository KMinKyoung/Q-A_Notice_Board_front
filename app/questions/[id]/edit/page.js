'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function EditQuestionPage() {
  const params = useParams();
  const router = useRouter();
  const questionId = params.id;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8080/api/questions/${questionId}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setContent(data.content);
      })
      .catch((err) => console.error('질문 불러오기 실패:', err));
  }, [questionId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');

    try {
      const res = await fetch(`http://localhost:8080/api/questions/${questionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (res.ok) {
        alert('질문이 수정되었습니다.');
        router.push(`/questions/${questionId}`);
      } else {
        alert('수정 실패');
      }
    } catch (err) {
      console.error('수정 오류:', err);
      alert('서버 오류');
    }
  };

  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-6 max-w-screen-xl w-full mx-auto">
        <h1 className="text-3xl font-bold mb-6">질문 수정하기</h1>
        <form onSubmit={handleUpdate} className="space-y-6 w-full">
          <div className="w-full">
            <label className="block mb-1 font-semibold text-lg">제목</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-3 rounded text-base"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="w-full">
            <label className="block mb-1 font-semibold text-lg">내용</label>
            <textarea
              className="w-full border border-gray-300 p-3 rounded text-base"
              rows={12}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 text-lg rounded hover:bg-blue-700"
            >
              수정 완료
            </button>
            <button
              type="button"
              className="bg-gray-300 text-black px-6 py-2 text-lg rounded hover:bg-gray-400"
              onClick={() => router.back()}
            >
              취소
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
