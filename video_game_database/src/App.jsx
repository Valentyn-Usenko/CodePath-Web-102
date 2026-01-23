import React, { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import PostList from './components/PostList'
import PostModal from './components/PostModal'
import PostPage from './components/PostPage'
import AuthModal from './AuthModal' // Make sure import path matches where you saved it
import './App.css'

export default function App() {
  const [showPostModal, setShowPostModal] = useState(false)
  const [activePost, setActivePost] = useState(null)
  
  // New Auth State
  const [session, setSession] = useState(null)
  const [authMode, setAuthMode] = useState(null) // 'login', 'signup', or null

  useEffect(() => {
    // 1. Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // 2. Listen for auth changes (login, logout, signup)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div className="app-root">
      <header>
        <h1>GameSocial</h1>
        
        {/* Auth Controls */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          {!session ? (
            <>
              <button onClick={() => setAuthMode('signup')}>Sign Up</button>
              <button onClick={() => setAuthMode('login')}>Login</button>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '0.9rem' }}>{session.user.email}</span>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>

        <button onClick={() => setShowPostModal(true)}>Create Post</button>
      </header>

      <main>
        {!activePost && <PostList onOpenPost={(p) => setActivePost(p)} />}
        {activePost && <PostPage postId={activePost.id} onBack={() => setActivePost(null)} />}
      </main>

      {showPostModal && (
        <PostModal 
          onClose={() => setShowPostModal(false)} 
          onCreated={(p) => { setShowPostModal(false); setActivePost(p); }} 
        />
      )}

      {authMode && (
        <AuthModal 
          mode={authMode} 
          onClose={() => setAuthMode(null)} 
        />
      )}
    </div>
  )
}