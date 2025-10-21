const BASE_URL = 'https://jsonplaceholder.typicode.com/users'

// ✅ CRUD API Calls
export const fetchUsersApi = async () => {
  const res = await fetch(BASE_URL)
  if (!res.ok) throw new Error('Failed to fetch users')
  return res.json()
}

export const addUserApi = async (user) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
  return res.json()
}

export const updateUserApi = async (id, user) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
  const data = await res.json()
  return data // must return updated user object like { id, name: "John ✅" }
}
export const deleteUserApi = async (id) => {
  await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
}
