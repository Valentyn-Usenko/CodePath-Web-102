import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'


export default function CrewDetail() {
	const { id } = useParams()
	const navigate = useNavigate()
	const [crewmate, setCrewmate] = useState(null)
	const [loading, setLoading] = useState(true)


	async function fetchOne() {
		setLoading(true)
		const { data, error } = await supabase
			.from('project_crewmate')
			.select('*')
			.eq('id', id)
			.single()
		setLoading(false)
		if (error) return console.error(error)
		setCrewmate(data)
	}


useEffect(() => {
fetchOne()
}, [id])


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
<article className="card">
<h2>{crewmate.name}</h2>
<p><strong>Role:</strong> <span className="role-text">{crewmate.role}</span></p>
<p><strong>Power:</strong> {crewmate.power}</p>
<p className="muted">Created at: {new Date(crewmate.created_at).toLocaleString()}</p>


<div className="detail-actions">
<Link to={`/crewmate/${id}/edit`} className="button">Edit</Link>
<button onClick={handleDelete} className="button danger">Delete</button>
</div>
</article>
)
}