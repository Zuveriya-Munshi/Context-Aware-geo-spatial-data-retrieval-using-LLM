'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from "react-hot-toast"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from '../styles/login.module.css'
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa'

export default function SignupPage() {
  const router = useRouter()
  const [user, setUser] = useState({ email: "", password: "", username: "" })
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSignup = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/signup", user)
      console.log("Signup success", response.data)
      router.push('/login')
    } catch (error) {
      console.log("Signup failed")
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Sign Up</h1>
        <hr />
        <div className={styles.formGroup}>
          <div className={styles.inputContainer}>
            <FaUser className={styles.icon} />
            <input
              className={styles.input}
              id='username'
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder='Enter your username'
              type="text"
            />
          </div>

          <div className={styles.inputContainer}>
            <FaEnvelope className={styles.icon} />
            <input
              className={styles.input}
              id='email'
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder='Enter your email'
              type="text"
            />
          </div>

          <div className={styles.inputContainer}>
            <FaLock className={styles.icon} />
            <input
              className={styles.input}
              id='password'
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder='Enter your password'
              type="password"
            />
          </div>

          <button
            onClick={onSignup}
            className={styles.button}
            disabled={buttonDisabled}
          >
            {loading ? "Processing..." : "Sign Up"}
            </button>
          <div className={styles.linkContainer}>
          Already have an Account?  <Link href="/login" className={styles.signinLink}>Login</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
