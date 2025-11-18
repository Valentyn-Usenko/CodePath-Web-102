import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'


export default function CrewList() {
const [crewmates, setCrewmates] = useState([])
const [loading, setLoading] = useState(true)


async function fetchCrewmates() {
	setLoading(true)
const { data, error } = await supabase
.from('project_crewmate')
.select('*')
.order('created_at', { ascending: false })
setLoading(false)
if (error) return console.error(error)
setCrewmates(data || [])
}


useEffect(() => {
fetchCrewmates()
}, [])


return (
<section>
<h2>Your Crewmates</h2>
{loading ? (
<p>Loading...</p>
) : crewmates.length === 0 ? (
<p>No crewmates yet — <Link to="/create">create one</Link>.</p>
) : (
<ul className="crew-list">
{crewmates.map((c) => (
<li key={c.id} className="crew-item">
<Link to={`/crewmate/${c.id}`} className="crew-link">
			<div className="crew-name">{c.name}</div>
			<div className="crew-meta"><span className="role-text">{c.role}</span> • Power {c.power}</div>
</Link>
<div>
<Link to={`/crewmate/${c.id}/edit`} className="small-button">Edit</Link>
</div>
</li>
))}
</ul>
)}
</section>
)
}