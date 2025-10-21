import React, { useState } from 'react'
import { useUserStore } from '../Store/userStore'
import './UserForm.css'

export default function UserForm() {
  const { addUser } = useUserStore()
  const [name, setName] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) return
    await addUser({ name })
    setName('')
  }

  return (
    <div className="user-form-container">
      <h1 className="user-form-title">👤 User Form</h1>
      <form className="user-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          className="user-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="user-btn">
          Add
        </button>
      </form>
    </div>
  )
}
