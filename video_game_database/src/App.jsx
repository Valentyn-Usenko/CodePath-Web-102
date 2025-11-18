import React, { useState } from 'react'
import PostList from './components/PostList'
import PostModal from './components/PostModal'
import PostPage from './components/PostPage'
import './App.css'

export default function App() {
  const [showModal, setShowModal] = useState(false)
  const [activePost, setActivePost] = useState(null)

  return (
    <div className="app-root">
      <header>
        <h1>GameSocial</h1>
        <button onClick={() => setShowModal(true)}>Create Post</button>
      </header>

      <main>
        {!activePost && <PostList onOpenPost={(p) => setActivePost(p)} />}
        {activePost && <PostPage postId={activePost.id} onBack={() => setActivePost(null)} />}
      </main>

      {showModal && (
        <PostModal 
          onClose={() => setShowModal(false)} 
          onCreated={(p) => { setShowModal(false); setActivePost(p); }} 
        />
      )}
    </div>
  )
}
