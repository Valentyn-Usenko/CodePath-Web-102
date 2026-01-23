import React, { useState } from 'react'
import { supabase } from './supabaseClient'

export default function AuthModal({ mode, onClose }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error
        alert('Signup successful! Check your email for confirmation (if enabled) or log in.')
        onClose()
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        onClose()
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal" style={{ maxWidth: '400px' }}>
        <button className="close-btn" onClick={onClose}>✕</button>
        <h2>{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label>
            Email
            <input 
              type="email" 
              required 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              style={{ width: '100%', marginTop: '0.5rem', padding: '0.5rem' }}
            />
          </label>
          
          <label>
            Password
            <input 
              type="password" 
              required 
              minLength={6}
              value={password} 
              onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', marginTop: '0.5rem', padding: '0.5rem' }}
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : (mode === 'login' ? 'Login' : 'Sign Up')}
          </button>
        </form>
      </div>
    </div>
  )
}