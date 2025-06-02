'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    setIsLoggedIn(!!token)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    setIsLoggedIn(false)
    alert('로그아웃되었습니다.')
    router.push('/')
  }

  return (
    <header className="bg-blue-700 text-white p-4 flex justify-between items-center">
      <Link href="/" passHref>
        <span className="text-2xl font-bold hover:underline cursor-pointer">
          📝 Q&A 게시판
        </span>
      </Link>

      <div className="flex gap-4 items-center">
        {!isLoggedIn ? (
          <>
            <Link href="/login" passHref>
              <button className="bg-white text-blue-700 font-semibold px-4 py-1 rounded shadow hover:bg-blue-100">
                로그인
              </button>
            </Link>
            <Link href="/signup" passHref>
              <button className="bg-white text-blue-700 font-semibold px-4 py-1 rounded shadow hover:bg-blue-100">
                회원가입
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link href="/questions/new" passHref>
              <button className="bg-white text-blue-700 font-semibold px-4 py-1 rounded shadow hover:bg-blue-100">
                글 작성하기
              </button>
            </Link>
            <Link href="/Mypage" passHref>
              <button className="bg-white text-blue-700 font-semibold px-4 py-1 rounded shadow hover:bg-blue-100">
                마이페이지
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white font-semibold px-4 py-1 rounded shadow hover:bg-red-700"
            >
              로그아웃
            </button>
          </>
        )}
      </div>
    </header>
  )
}
