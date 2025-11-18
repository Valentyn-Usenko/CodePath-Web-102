import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function EditCrewmate() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [crewmate, setCrewmate] = useState(null)
  const [name, setName] = useState('')
  const [role, setRole] = useState('DPS')
  const [power, setPower] = useState(5)
  const [loading, setLoading] = useState(true)
  const roles = ['Tank', 'Healer', 'DPS', 'Support']

  async function fetchOne() {
    setLoading(true)
    const { data, error } = await supabase
      .from('project_crewmate')
      .select('*')
      .eq('id', id)
      .single()
    setLoading(false)

    if (error) {
      console.error(error)
      return
    }

    setCrewmate(data)
    setName(data.name)
    setRole(data.role)
    setPower(data.power)
  }

  useEffect(() => {
    fetchOne()
  }, [id])

  async function handleSave(e) {
    e.preventDefault()
    const { error } = await supabase
      .from('project_crewmate')
      .update({ name, role, power })
      .eq('id', id)

    if (error) {
      alert('Could not update: ' + error.message)
      return
    }

    await fetchOne()
    navigate(`/crewmate/${id}`)
  }

  async function handleDelete() {
    if (!confirm('Delete this crewmate?')) return
    const { error } = await supabase.from('project_crewmate').delete().eq('id', id)
    if (error) {
      alert('Could not delete: ' + error.message)
      return
    }
    navigate('/')
  }

  if (loading) return <p>Loading...</p>
  if (!crewmate) return <p>Not found.</p>

  return (
    <section className="card">
      <h2>Edit {crewmate.name}</h2>
      <form onSubmit={handleSave} className="form">
        <label>
          Name
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <fieldset>
          <legend>Role</legend>
          <div className="options">
            {roles.map((r) => (
              <button
                type="button"
                key={r}
                className={r === role ? 'option active' : 'option'}
                onClick={() => setRole(r)}
              >
                {r}
              </button>
            ))}
          </div>
        </fieldset>

        <label>
          Power: <strong>{power}</strong>
          <input
            type="range"
            min="1"
            max="10"
            value={power}
            onChange={(e) => setPower(Number(e.target.value))}
          />
        </label>

        <div className="form-actions">
          <button type="submit">Save</button>
          <button
            type="button"
            className="danger"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </form>
    </section>
  )
}
