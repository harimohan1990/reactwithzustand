import React, { useEffect, useState } from 'react'
import { useUserStore } from '../Store/userStore'
import './UserList.css'

const UserList = () => {
  const { users, fetchUsers, deleteUser, updateUser, loading } = useUserStore()
  const [editName, setEditName] = useState({})

  // ✅ Load from localStorage first
  useEffect(() => {
    const localUsers = JSON.parse(localStorage.getItem('users'))
    if (localUsers && localUsers.length > 0) {
      useUserStore.setState({ users: localUsers })
    } else {
      fetchUsers()
    }
  }, [fetchUsers])

  // ✅ Save to localStorage when users change
  useEffect(() => {
    if (users?.length > 0) {
      localStorage.setItem('users', JSON.stringify(users))
    }
  }, [users])

  if (loading) return <p className="user-list-title">Loading...</p>

  return (
    <div className="user-list-container">
      <h2 className="user-list-title">👥 User List</h2>
      <ul className="user-list">
        {users.map((u) => (
          <li key={u.id || u._id} className="user-item">
            <input
              type="text"
              className="user-input"
              value={editName[u.id || u._id] ?? u.name}
              onChange={(e) =>
                setEditName({ ...editName, [u.id || u._id]: e.target.value })
              }
            />
            <button
              className="btn btn-update"
              onClick={() =>
                updateUser(u.id || u._id, {
                  name: editName[u.id || u._id] ?? u.name,
                })
              }
            >
              Update
            </button>
            <button
              className="btn btn-delete"
              onClick={() => deleteUser(u.id || u._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserList
