// src/app/auth/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

const LoginPage = () => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isHydrated, setIsHydrated] = useState(false)
  const correct = process.env.NEXT_PUBLIC_PROTECTED_PASSWORD

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // 1) empty
    if (!password) {
      setError('Please enter a password')
      return
    }

    // 2) client‑side check
    if (password !== correct) {
      setError('Invalid password')
      return
    }

    // 3) (optional) server‐side check
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (!res.ok) {
      const { message } = await res.json().catch(() => ({}))
      setError(message || 'Something went wrong')
      return
    }

    // 4) success! set your cookie & redirect
    Cookies.set('site_password', password, {
      expires: 7,
      sameSite: 'Lax',
      secure: true,
    })
    window.location.href = '/'
  }

  if (!isHydrated) return null

  return (
    <div className="flex flex-col items-center">
      <div className="p-10 rounded-xl shadow-sm bg-white">
        <h1 className="text-center text-3xl md:text-7xl pb-5">🔒</h1>
        <h2 className="text-center text-4xl font-bold text-gray-700">
          Protected Page
        </h2>
        <p className="text-gray-500 my-4 text-center font-medium">
          Please enter the password to continue.
        </p>
        <form onSubmit={handleSubmit} noValidate className="flex flex-col">
          <input
            type="password"
            placeholder="Password"
            className="my-4 pl-10 p-4 bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit"  className="shadow-lg cursor-pointer my-4 bg-blue-600 text-white p-4 rounded-full hover:bg-blue-700 transition font-medium">
            Log In
          </button>

          {/* your error banner */}
          {error && (
            <p className="text-red-500 mt-2 text-center font-medium">{error}</p>
          )}
        </form>
      </div>
    </div>
  )
}

export default LoginPage