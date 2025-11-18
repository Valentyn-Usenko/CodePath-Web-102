import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export default function PostPage({ postId, onBack }) {
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [commentText, setCommentText] = useState('')
  const [secretInput, setSecretInput] = useState('')

  const fetchData = async () => {
    setLoading(true)

    const { data: p } = await supabase
      .from('posts')
      .select('*')
      .eq('id', postId)
      .single()

    const { data: c } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true })

    setPost(p)
    setComments(c || [])
    setLoading(false)
  }

  useEffect(() => {
    Promise.resolve().then(fetchData)
  }, [postId])

  const addComment = async () => {
    if (!commentText) return
    await supabase
      .from('comments')
      .insert([{ post_id: postId, name: 'Anon', content: commentText }])

    setCommentText('')
    fetchData()
  }

  const upvote = async () => {
    const { data: p } = await supabase
      .from('posts')
      .select('upvotes')
      .eq('id', postId)
      .single()

    await supabase
      .from('posts')
      .update({ upvotes: (p.upvotes || 0) + 1 })
      .eq('id', postId)

    fetchData()
  }

  const handleDelete = async () => {
    if (!secretInput) return alert('Enter secret key')
    if (secretInput !== post.secret_key) return alert('Wrong secret key')

    await supabase.from('posts').delete().eq('id', postId)
    onBack()
  }

  if (loading)
    return (
      <div className="global-loading">
        <div className="dot" /><div className="dot" /><div className="dot" />
      </div>
    )

  if (!post) return <div>Post not found.</div>

  return (
    <div className="post-page">
      <button onClick={onBack}>← Back</button>
      <h2>{post.title}</h2>
      <div className="meta">
        By {post.name} • {new Date(post.created_at).toLocaleString()}
      </div>

      {post.game_art_url && (
        <img className="game-art" src={post.game_art_url} alt="art" />
      )}

      <p>{post.content}</p>

      <button onClick={upvote}>Upvote ({post.upvotes})</button>

      <div className="comments">
        <h3>Comments</h3>

        {comments.map(c => (
          <div key={c.id} className="comment">
            <div className="c-meta">
              {c.name} • {new Date(c.created_at).toLocaleString()}
            </div>
            <div>{c.content}</div>
          </div>
        ))}

        <textarea
          placeholder="Write a comment"
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
        />

        <button onClick={addComment}>Add comment</button>
      </div>

      <div className="danger-zone">
        <h4>Delete post</h4>
        <input
          type="password"
          placeholder="Enter secret key"
          value={secretInput}
          onChange={e => setSecretInput(e.target.value)}
        />
        <button onClick={handleDelete} disabled={!secretInput}>Delete</button>
      </div>
    </div>
  )
}
