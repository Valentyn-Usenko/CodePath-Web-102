import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'


export default function CreateCrewmate() {
const navigate = useNavigate()
const [name, setName] = useState('')
const [role, setRole] = useState('DPS')
const [power, setPower] = useState(5)
const [loading, setLoading] = useState(false)
const roles = ['Tank', 'Healer', 'DPS', 'Support']


async function handleSubmit(e) {
e.preventDefault()
setLoading(true)
const { data, error } = await supabase
.from('crewmates')
.insert([{ name, role, power }])
.select()
setLoading(false)
if (error) {
alert('Error creating crewmate: ' + error.message)
return
}
const newId = data?.[0]?.id
if (newId) navigate(`/crewmate/${newId}`)
else navigate('/')
}


return (
<section className="card">
<h2>Create a Crewmate</h2>
<form onSubmit={handleSubmit} className="form">
<label>
Name
<input required value={name} onChange={(e) => setName(e.target.value)} />
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
<button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Create'}</button>
</div>
</form>
</section>
)
}