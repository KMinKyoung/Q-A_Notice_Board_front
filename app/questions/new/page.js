'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NewQuestionPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('access_token')
    if (!token) return alert('로그인이 필요합니다.')

    const res = await fetch('http://localhost:8080/api/questions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, content })
    })

    if (res.ok) {
      alert('질문이 등록되었습니다.')
      router.push('/')
    } else {
      alert('질문 등록에 실패했습니다.')
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Header />
      <main className="flex-1 px-6 py-12 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">질문 작성</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold text-gray-700">제목</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded p-3 text-lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">내용</label>
            <textarea
              className="w-full border border-gray-300 rounded p-3 text-lg min-h-[200px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="질문 내용을 자세히 입력해주세요"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-700 text-white px-6 py-2 rounded font-semibold hover:bg-blue-800 transition"
          >
            질문 등록
          </button>
        </form>
      </main>
      <Footer />
    </div>
  )
}
