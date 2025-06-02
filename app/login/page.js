'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (res.ok) {
        const data = await res.json()
        console.log('🔑 받은 토큰:', data.accessToken) // 백엔드 응답 확인용
        localStorage.setItem('access_token', data.accessToken) // 토큰 저장
        alert('로그인 성공!')
        router.push('/') // 메인페이지로 이동
      } else {
        alert('이메일 또는 비밀번호가 잘못되었습니다.')
      }
    } catch (err) {
      console.error('로그인 오류:', err)
      alert('서버 오류가 발생했습니다.')
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <Header />

      <main className="flex-1 p-6 flex justify-center items-center">
        <form onSubmit={handleLogin} className="bg-gray-50 p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">로그인</h2>

          <label className="block mb-2 font-medium">이메일</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="block mb-2 font-medium">비밀번호</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded mb-6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition"
          >
            로그인
          </button>
        </form>
      </main>

      <Footer />
    </div>
  )
}
